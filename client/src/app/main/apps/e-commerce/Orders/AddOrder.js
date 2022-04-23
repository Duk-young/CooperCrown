import _ from '@lodash';
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from 'firebase';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CustomAutocomplete1 from './Autocomplete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DiscountAutocomplete from './DiscountAutocomplete';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useCallback, useState, useEffect } from 'react';
import ReceiveOrderPayment from './ReceiveOrderPayment';
import reducer from '../store/reducers';
import SearchFrameDialouge from './SearchFrameDialouge';
import SearchInsuranceDialouge from './SearchInsuranceDialouge';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import OrderReceipt from './OrderReceipt';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:hover': {
      backgroundColor: 'lightyellow !important'
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

function AddOrder(props) {
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [showroom, setShowroom] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [eyeglasses, setEyeglasses] = useState([]);
  const [prevEyeglasses, setPrevEyeglasses] = useState([]);
  const [selectedFrame, setSelectedFrame] = useState({});
  const { form, handleChange, setForm } = useForm(null);
  const [filteredPrescription, setFilteredPrescription] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOrderPayment, setOpenOrderPayment] = useState(false);
  const [openOrderReceipt, setOpenOrderReceipt] = useState(false);
  const [contactLens, setContactLens] = useState([]);
  const [services, setServices] = useState([]);
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlert1, setOpenAlert1] = useState(false);
  const [lensTypeNames, setLensTypeNames] = useState(false);

  const routeParams = useParams();
  const dispatch = useDispatch();

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  const handleStatusChange = async (e) => {
    const ref = firestore().collection('orders').doc(form?.id);
    let data = {
      ...form,
      orderStatus: e.target.value
    };

    await ref.set(data);
    dispatch(
      MessageActions.showMessage({
        message: 'Status changed Successfully'
      })
    );
  };

  const handleCloseAlert1 = () => {
    setOpenAlert1(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const deleteExistingInsurance = async () => {
    if (form?.orderId) {
      const queryExisting = await firestore()
        .collection('insuranceClaims')
        .where('orderId', '==', Number(form?.orderId))
        .get();
      queryExisting.forEach((doc) => {
        doc.ref.delete();
      });
    }
  };

  const fetchLensRate = async () => {
    const lensPrices = (
      await firestore().collection('lensPrice').doc('lensPrice').get()
    ).data();
    if (selectedFrame?.lensTypeName) {
      if (
        selectedFrame?.eyeglassesSphereOd &&
        selectedFrame?.eyeglassesCylinderOd
      ) {
        lensPrices[selectedFrame?.lensTypeName].map((row) => {
          if (row?.id === Number(selectedFrame?.eyeglassesSphereOd)) {
            if (row[selectedFrame?.eyeglassesCylinderOd]) {
              setSelectedFrame({
                ...selectedFrame,
                lensRate: +row[selectedFrame?.eyeglassesCylinderOd]
              });
              dispatch(
                MessageActions.showMessage({
                  message: 'Lens Rate Updated...'
                })
              );
            } else {
              toast.error('Selected Lens Rate is not available...', {
                position: 'bottom-right',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom
              });
              return null;
            }
          }
        });
      } else {
        toast.error('Please enter Sphere & Cylinder Values...', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom
        });
        return null;
      }
    } else {
      toast.error('Please select Lens Type...', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
      return null;
    }
  };

  const fetchContactLensRate = () => {
    if (selectedFrame?.type) {
      contactLens.map((row) => {
        if (row?.type === selectedFrame?.type) {
          setSelectedFrame({
            ...selectedFrame,
            contactLensRate: +row?.price
          });
          dispatch(
            MessageActions.showMessage({
              message: 'Contact Lens Rate Updated...'
            })
          );
        }
      });
    } else {
      toast.error('Please select Contact Lens Type...', {
        position: 'bottom-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
      return null;
    }
  };

  const handleSelectedFrameChange = useCallback((event) => {
    event?.persist && event.persist();
    setSelectedFrame((_selectedFrame) =>
      _.setIn(
        { ..._selectedFrame },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
  }, []);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOrderPaymentClose = () => {
    setOpenOrderPayment(false);
  };
  const handleOrderReceiptClose = () => {
    setOpenOrderReceipt(false);
  };

  const onSubmit = async () => {
    if (form?.orderId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('orders').doc(form?.id);
        let data = {
          ...form,
          eyeglasses: eyeglasses
        };

        await ref.set(data);

        if (form?.prescriptionType === 'eyeglassesRx') {
          for (var i = 0; i < prevEyeglasses.length; i++) {
            const queryFrame = await firestore()
              .collection('frames')
              .where('frameId', '==', Number(prevEyeglasses[i]?.frameId))
              .limit(1)
              .get();
            let resultFrame = queryFrame.docs[0].data();
            resultFrame.id = queryFrame.docs[0].id;
            const ref = firestore().collection('frames').doc(resultFrame?.id);
            let data = {
              ...resultFrame,
              quantity: resultFrame?.quantity + 1
            };

            await ref.set(data);
          }

          for (var j = 0; j < eyeglasses.length; j++) {
            const queryFrame = await firestore()
              .collection('frames')
              .where('frameId', '==', Number(eyeglasses[j]?.frameId))
              .limit(1)
              .get();
            let resultFrame = queryFrame.docs[0].data();
            resultFrame.id = queryFrame.docs[0].id;
            const ref = firestore().collection('frames').doc(resultFrame?.id);
            let data = {
              ...resultFrame,
              quantity: resultFrame?.quantity - 1
            };

            await ref.set(data);
          }
        }

        dispatch(
          MessageActions.showMessage({
            message: 'Order updated successfully'
          })
        );
        props.history.push('/apps/e-commerce/orders');
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    } else {
      setisLoading(true);

      try {
        const orderId = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        await firestore()
          .collection('orders')
          .add({
            ...form,
            orderDate: firestore.Timestamp.fromDate(new Date()),
            orderId: orderId?.orderId + 1,
            customerId: customer?.customerId,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            dob: customer?.dob ? customer?.dob : '',
            gender: customer?.gender ? customer?.gender : '',
            ethnicity: customer?.ethnicity ? customer?.ethnicity : '',
            state: customer?.state ? customer?.state : '',
            orderStatus: 'Order Received',
            eyeglasses: eyeglasses
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ orderId: orderId?.orderId + 1 });

        if (form?.prescriptionType === 'eyeglassesRx') {
          for (var k = 0; k < eyeglasses.length; k++) {
            const queryFrame = await firestore()
              .collection('frames')
              .where('frameId', '==', Number(eyeglasses[k]?.frameId))
              .limit(1)
              .get();
            let resultFrame = queryFrame.docs[0].data();
            resultFrame.id = queryFrame.docs[0].id;
            const ref = firestore().collection('frames').doc(resultFrame?.id);
            let data = {
              ...resultFrame,
              quantity: resultFrame?.quantity - 1
            };

            await ref.set(data);
          }
        }

        dispatch(
          MessageActions.showMessage({
            message: 'Order Details Saved Successfully'
          })
        );

        props.history.push('/apps/e-commerce/orders');
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (routeParams.orderId) {
      setisLoading(true);
      setDisabledState(true);
      const orderId = routeParams.orderId;
      const fetchDetails = async () => {
        const queryOrder = await firestore()
          .collection('orders')
          .where('orderId', '==', Number(orderId))
          .limit(1)
          .get();
        let resultOrder = queryOrder.docs[0].data();
        resultOrder.orderDate =
          resultOrder.orderDate && resultOrder.orderDate.toDate();
        resultOrder.id = queryOrder.docs[0].id;
        setForm(resultOrder);
        setEyeglasses(resultOrder?.eyeglasses);
        setPrevEyeglasses(resultOrder?.eyeglasses);
        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(resultOrder.customerId))
          .limit(1)
          .get();
        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);
        const queryPrescription = await firestore()
          .collection('prescriptions')
          .where('customerId', '==', Number(resultOrder.customerId))
          .get();
        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        let resultPrescriptionString = [];
        resultPrescription.forEach((doc) => {
          doc.prescriptionId = doc.prescriptionId.toString();
          resultPrescriptionString.push(doc);
        });
        setPrescription(resultPrescriptionString);
        const queryShowroom = await firestore().collection('showRooms').get();
        let resultShowroom = [];
        queryShowroom.forEach((doc) => {
          resultShowroom.push(doc.data());
        });
        setShowroom(resultShowroom);
        const queryDiscounts = await firestore().collection('discounts').get();
        let resultDiscounts = [];
        queryDiscounts.forEach((doc) => {
          resultDiscounts.push(doc.data());
        });
        setDiscounts(resultDiscounts);
        const queryPayments = await firestore()
          .collection('orderPayments')
          .where('orderId', '==', Number(orderId))
          .get();
        let resultPayments = [];
        queryPayments.forEach((doc) => {
          resultPayments.push(doc.data());
        });
        setPayments(resultPayments);

        const queryContactLens = await firestore().collection('contacts').get();

        let resultContacts = [];
        queryContactLens.forEach((doc) => {
          resultContacts.push(doc.data());
        });
        setContactLens(resultContacts);

        const queryServices = await firestore().collection('services').get();

        let resultServices = [];
        queryServices.forEach((doc) => {
          resultServices.push(doc.data());
        });
        setServices(resultServices);

        const lensPrice = (
          await firestore().collection('lensPrice').doc('lensPrice').get()
        ).data();
        var keys = Object.keys(lensPrice);
        let lensTypeNames = [];
        keys.forEach((row) => {
          lensTypeNames.push({ lensTypeName: row.replace(/"/g, '') });
        });
        setLensTypeNames(lensTypeNames);
        setisLoading(false);
      };
      fetchDetails();
    } else {
      setisLoading(true);

      const customerId = routeParams.customerId;
      const fetchDetails = async () => {
        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(customerId))
          .limit(1)
          .get();

        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);
        const queryPrescription = await firestore()
          .collection('prescriptions')
          .where('customerId', '==', Number(customerId))
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        let resultPrescriptionString = [];
        resultPrescription.forEach((doc) => {
          doc.prescriptionId = doc.prescriptionId.toString();
          resultPrescriptionString.push(doc);
        });
        setPrescription(resultPrescriptionString);

        const queryShowroom = await firestore().collection('showRooms').get();

        let resultShowroom = [];
        queryShowroom.forEach((doc) => {
          resultShowroom.push(doc.data());
        });
        setShowroom(resultShowroom);

        const queryDiscounts = await firestore().collection('discounts').get();

        let resultDiscounts = [];
        queryDiscounts.forEach((doc) => {
          resultDiscounts.push(doc.data());
        });
        setDiscounts(resultDiscounts);

        const queryContactLens = await firestore().collection('contacts').get();

        let resultContacts = [];
        queryContactLens.forEach((doc) => {
          resultContacts.push(doc.data());
        });
        setContactLens(resultContacts);

        const queryServices = await firestore().collection('services').get();

        let resultServices = [];
        queryServices.forEach((doc) => {
          resultServices.push(doc.data());
        });
        setServices(resultServices);

        const lensPrice = (
          await firestore().collection('lensPrice').doc('lensPrice').get()
        ).data();
        var keys = Object.keys(lensPrice);
        let lensTypeNames = [];
        keys.forEach((row) => {
          lensTypeNames.push({ lensTypeName: row.replace(/"/g, '') });
        });
        setLensTypeNames(lensTypeNames);

        setisLoading(false);
      };
      fetchDetails();
    }
  }, []);
  if (isLoading) return <FuseLoading />;

  return (
    <div>
      <FusePageCarded
        classes={{
          content: 'flex',
          header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
        }}
        header={
          <div className="mt-24">
            <IconButton
              onClick={() => {
                if (disabledState || eyeglasses.length === 0) {
                  props.history.push(`/apps/e-commerce/orders`);
                } else {
                  setOpenAlert1(true);
                }
              }}>
              <Icon className="text-20">arrow_back</Icon>
              <span className="mx-4 text-12">Orders</span>
            </IconButton>
            <div className="flex flex-row">
              <Icon className="text-20 mt-4">description</Icon>
              <Typography className="text-16 pl-16 sm:text-20 truncate">
                {routeParams.orderId
                  ? `Order: ${routeParams.orderId}`
                  : 'New Order'}
              </Typography>
            </div>
            <div>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={openAlert1}
                onClose={handleCloseAlert1}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  <h2>Discard Changes?</h2>
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    All the Changes will be lost. Are you sure?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseAlert1} color="secondary">
                    Disagree
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseAlert1();
                      props.history.push(`/apps/e-commerce/orders`);
                    }}
                    color="secondary"
                    autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        }
        content={
          <div className="flex flex-col w-full">
            <ToastContainer />
            <div className="flex flex-row p-16 sm:p-24 w-full">
              <div className="p-8 w-1/3 h-auto shadow-3 rounded-12">
                <h1 className="underline font-700">Patient Details:</h1>
                <h2>{`Customer Id: ${customer.customerId}`}</h2>
                <h2>{`Name: ${customer?.firstName} ${customer.lastName} `}</h2>
                <h2>{`Address: ${customer.address}, ${customer.state}, ${customer.zipCode}`}</h2>
                <h2>{`Phone: ${formatPhoneNumber(customer.phone1)}`}</h2>
                <h2>{`Email: ${customer.email}`}</h2>
                <h2>{`DOB: ${customer?.dob?.toDateString()}`}</h2>
                <h2>{`Sex: ${customer.gender}`}</h2>

                {disabledState && (
                  <div className="flex flex-row justify-center">
                    <Typography
                      className="username text-16 whitespace-no-wrap self-center font-700 underline"
                      color="inherit">
                      Order Status
                    </Typography>
                    <FormControl className="ml-32 ">
                      <Select
                        labelId="demo-simple-select-autowidth-label"
                        id="ethnicityId"
                        defaultValue={form?.orderStatus}
                        value={form?.orderStatus}
                        name="orderStatus"
                        onChange={(e) => {
                          handleChange(e);
                          handleStatusChange(e);
                        }}
                        autoWidth>
                        <MenuItem value={'Order Received'}>
                          Order Received
                        </MenuItem>
                        <MenuItem value={'In Process'}>In Process</MenuItem>
                        <MenuItem value={'Shipped to Showroom'}>
                          Shipped to Showroom
                        </MenuItem>
                        <MenuItem value={'Awaiting Pickup'}>
                          Awaiting Pickup
                        </MenuItem>
                        <MenuItem value={'Partially Picked Up'}>
                          Partially Picked Up
                        </MenuItem>
                        <MenuItem value={'Picked Up/Completed'}>
                          Picked Up/Completed
                        </MenuItem>
                        <MenuItem value={'Redo'}>Redo</MenuItem>
                      </Select>
                      <FormHelperText>Select from the list</FormHelperText>
                    </FormControl>
                  </div>
                )}
              </div>
              <div className="p-8 w-2/3 h-auto relative">
                <h1>Order Details</h1>
                <h3>Select type of Order:</h3>
                <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-60"
                    row
                    aria-label="prescriptionType"
                    name="prescriptionType"
                    value={form?.prescriptionType}
                    onChange={handleChange}>
                    <FormControlLabel
                      // disabled={routeParams?.customerId ? false : true}
                      value="eyeglassesRx"
                      onClick={() => {
                        let eyeglassesRx = prescription.filter(
                          (word) => word.prescriptionType === 'eyeglassesRx'
                        );

                        setFilteredPrescription(eyeglassesRx);
                      }}
                      control={<Radio />}
                      label="Eyeglasses"
                    />
                    <FormControlLabel
                      // disabled={routeParams?.customerId ? false : true}
                      onClick={() => {
                        let contactLensRx = prescription.filter(
                          (word) => word.prescriptionType === 'contactLensRx'
                        );
                        setFilteredPrescription(contactLensRx);
                      }}
                      value="contactLensRx"
                      control={<Radio />}
                      label="Contact Lens"
                    />
                    <FormControlLabel
                      // disabled={routeParams?.customerId ? false : true}
                      value="medicationRx"
                      control={<Radio />}
                      label="Medication"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
            </div>
            <div key={selectedFrame} className="flex flex-row px-16 sm:px-24">
              {form?.prescriptionType === 'eyeglassesRx' && (
                <FuseAnimate animation="transition.slideRightIn" delay={500}>
                  <div className="w-full flex flex-col rounded-12 shadow-3">
                    <div className="w-full flex flex-row ">
                      <div className="w-2/3">
                        <div className="flex flex-col p-8 flex-1 h-auto justify-between">
                          <div className="flex flex-row w-full">
                            <div className="flex flex-col px-10 w-1/2 ">
                              <CustomAutocomplete1
                                list={filteredPrescription}
                                form={selectedFrame}
                                disabled={disabledState}
                                setForm={setSelectedFrame}
                                handleChange={handleSelectedFrameChange}
                                id="prescriptionId"
                                freeSolo={false}
                                label="Select Prescription"
                              />
                            </div>
                            <div className="flex flex-col px-10 w-1/2">
                              <CustomAutocomplete
                                list={showroom}
                                form={form}
                                disabled={disabledState}
                                setForm={setForm}
                                handleChange={handleChange}
                                id="locationName"
                                freeSolo={false}
                                label="Select Showroom"
                              />
                            </div>
                          </div>

                          <div className="flex flex-row ">
                            <div className="p-8 h-auto w-40">
                              <h3 className="text-center font-700">RX</h3>
                            </div>
                            <div className="p-8 h-auto w-1/6">
                              <h3 className="text-center font-700">Sphere</h3>
                            </div>
                            <div className="p-8 h-auto w-1/6">
                              <h3 className="text-center font-700">Cylinder</h3>
                            </div>
                            <div className="p-8 h-auto w-1/6">
                              <h3 className="text-center font-700">Axis</h3>
                            </div>
                            <div className="p-8 h-auto w-1/6">
                              <h3 className="text-center font-700">Add</h3>
                            </div>
                            <div className="p-8 h-auto w-2/6">
                              <h3 className="text-center font-700">
                                Prism/Base
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                              <h3 className="text-center font-700">OD</h3>
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.eyeglassesSphereOd}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'eyeglassesSphereOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.eyeglassesCylinderOd}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'eyeglassesCylinderOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.eyeglassesAxisOd}
                                disabled={disabledState}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesAxisOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.eyeglassesAddOd}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesAddOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.eyeglassesPrismOd}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesPrismOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>

                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.eyeglassesVaOd}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesVaOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                              <h3 className="text-center font-700">OS</h3>
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.eyeglassesSphereOs}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesSphereOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.eyeglassesCylinderOs}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesCylinderOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.eyeglassesAxisOs}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesAxisOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.eyeglassesAddOs}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesAddOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>

                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                disabled={disabledState}
                                id="standard-basic"
                                value={selectedFrame?.eyeglassesPrismOs}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesPrismOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>
                            <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                disabled={disabledState}
                                id="standard-basic"
                                value={selectedFrame?.eyeglassesVaOs}
                                onChange={handleSelectedFrameChange}
                                name={'eyeglassesVaOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="flex flex-col mt-28 ml-40">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={form?.rushOrder}
                                onChange={handleChange}
                                name="rushOrder"
                                disabled={disabledState}
                              />
                            }
                            label="Rush Order"
                          />
                        </div>
                        <div className="flex flex-col p-8 mt-0 flex-1 h-auto justify-between">
                          <div className="flex flex-row ">
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">PD</h3>
                            </div>
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">OU</h3>
                            </div>
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">OD</h3>
                            </div>
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">OS</h3>
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <h3 className="text-center font-700">Distance</h3>
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.pdOuDistance}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'pdOuDistance'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.pdOdDistance}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'pdOdDistance'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.pdOsDistance}
                                disabled={disabledState}
                                onChange={handleSelectedFrameChange}
                                name={'pdOsDistance'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <h3 className="text-center font-700">Near</h3>
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.pdOuNear}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'pdOuNear'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.pdOdNear}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'pdOdNear'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.pdOsNear}
                                disabled={disabledState}
                                onChange={handleSelectedFrameChange}
                                name={'pdOsNear'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row">
                      <h1 className="px-10 my-0 underline"> Eyeglasses</h1>
                      <div className="flex flex-row w-full flex-1 h-auto border-1 justify-around">
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFrame.frameLater}
                              onChange={handleSelectedFrameChange}
                              name="frameLater"
                              disabled={disabledState}
                            />
                          }
                          label="Frame to come later"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFrame?.cutLensOnly}
                              onChange={handleSelectedFrameChange}
                              name="cutLensOnly"
                              disabled={disabledState}
                            />
                          }
                          label="Cut Lens Only"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFrame?.sendUncutLenses}
                              onChange={handleSelectedFrameChange}
                              name="sendUncutLenses"
                              disabled={disabledState}
                            />
                          }
                          label="Send Uncut Lenses"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFrame?.orderFrameInsurance}
                              onChange={handleSelectedFrameChange}
                              name="orderFrameInsurance"
                              disabled={disabledState}
                            />
                          }
                          label="Order Frame from Insurance"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedFrame?.orderLensInsurance}
                              onChange={handleSelectedFrameChange}
                              name="orderLensInsurance"
                              disabled={disabledState}
                            />
                          }
                          label="Order Lens from Insurance"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="flex flex-col w-full">
                        <div className="flex flex-row mx-6  p-6">
                          <div className="flex flex-col w-1/4 h-auto border-1 justify-center">
                            <h2 className="text-center">Frame</h2>
                            <div className="flex flex-row justify-center">
                              <SearchFrameDialouge
                                form={selectedFrame}
                                setForm={setSelectedFrame}
                              />
                            </div>
                          </div>
                          <div className="flex flex-col w-3/4">
                            <TextField
                              size="small"
                              fullWidth
                              variant="outlined"
                              disabled={true}
                              id="standard-basic"
                              value={selectedFrame?.frameBrand}
                              onChange={handleSelectedFrameChange}
                              name={'frameBrand'}
                              label="Brand"
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                            <TextField
                              size="small"
                              className="mt-4"
                              fullWidth
                              variant="outlined"
                              disabled={true}
                              id="standard-basic"
                              value={selectedFrame?.frameModel}
                              onChange={handleSelectedFrameChange}
                              name={'frameModel'}
                              label="Model"
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                            <TextField
                              size="small"
                              className="mt-4"
                              fullWidth
                              variant="outlined"
                              disabled={true}
                              id="standard-basic"
                              value={selectedFrame?.frameColour}
                              onChange={handleSelectedFrameChange}
                              name={'frameColour'}
                              label="Colour"
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                            <div className="flex flex-row">
                              <TextField
                                size="small"
                                className="mt-4"
                                fullWidth
                                variant="outlined"
                                disabled={disabledState}
                                id="standard-basic"
                                value={selectedFrame?.segHtOd}
                                onChange={handleSelectedFrameChange}
                                name={'segHtOd'}
                                label="Seg Ht OD"
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                              <TextField
                                size="small"
                                className="mt-4 ml-2"
                                fullWidth
                                variant="outlined"
                                disabled={disabledState}
                                id="standard-basic"
                                value={selectedFrame?.segHtOs}
                                onChange={handleSelectedFrameChange}
                                name={'segHtOs'}
                                label="Seg Ht OS"
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-row w-full mx-6 p-6">
                        <div className="flex flex-col w-1/5 h-auto border-1 justify-center">
                          <h2 className="text-center">Lens</h2>
                        </div>
                        <div className="flex flex-col w-3/4">
                          <div className="flex flex-row ">
                            <h2 className="self-center px-10">Type:</h2>
                            <div className="ml-4">
                              <FormControl component="fieldset">
                                <RadioGroup
                                  className="ml-4"
                                  row
                                  aria-label="lensType"
                                  name="lensType"
                                  value={selectedFrame?.lensType}
                                  onChange={handleSelectedFrameChange}>
                                  <FormControlLabel
                                    disabled={disabledState}
                                    value="distance"
                                    control={<Radio />}
                                    label="Distance"
                                  />
                                  <FormControlLabel
                                    value="read"
                                    disabled={disabledState}
                                    control={<Radio />}
                                    label="Read"
                                  />
                                  <FormControlLabel
                                    value="fTop"
                                    disabled={disabledState}
                                    control={<Radio />}
                                    label="F. Top"
                                  />
                                  <FormControlLabel
                                    value="progressive"
                                    disabled={disabledState}
                                    control={<Radio />}
                                    label="Progressive"
                                  />
                                </RadioGroup>
                              </FormControl>
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <div className="flex flex-col px-10 w-1/2">
                              <CustomAutocomplete
                                list={lensTypeNames}
                                form={selectedFrame}
                                setForm={setSelectedFrame}
                                handleChange={handleSelectedFrameChange}
                                id="lensTypeName"
                                freeSolo={false}
                                label="Select Lens Type"
                              />
                            </div>
                            <Fab
                              onClick={fetchLensRate}
                              disabled={disabledState}
                              variant="extended"
                              color="secondary"
                              aria-label="add">
                              Fetch Rate
                            </Fab>
                          </div>
                          <TextField
                            className="mt-4"
                            fullWidth
                            variant="outlined"
                            disabled={disabledState}
                            id="standard-basic"
                            value={selectedFrame?.lensDetail}
                            onChange={handleSelectedFrameChange}
                            name={'lensDetail'}
                            label="Detail"
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                          <TextField
                            className="mt-4"
                            fullWidth
                            variant="outlined"
                            disabled={disabledState}
                            id="standard-basic"
                            value={selectedFrame?.lensColour}
                            onChange={handleSelectedFrameChange}
                            name={'lensColour'}
                            label="Colour/Tint"
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="flex flex-col p-12 m-12 w-1/2 flex-1 h-auto border-1">
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          inputProps={{
                            style: { fontSize: 28, lineHeight: 0.8 }
                          }}
                          multiline
                          rows={4}
                          value={selectedFrame?.eyeglassesOrderComments}
                          disabled={disabledState}
                          onChange={handleSelectedFrameChange}
                          label="Comments"
                          name={'eyeglassesOrderComments'}
                          variant="outlined"
                        />
                      </div>
                      <div className="flex flex-col p-12 m-12 w-1/2 flex-1 h-auto border-1">
                        <FormControl component="fieldset">
                          <RadioGroup
                            className="ml-4"
                            row
                            aria-label="saleType"
                            name="saleType"
                            value={selectedFrame?.saleType}
                            onChange={handleSelectedFrameChange}>
                            <FormControlLabel
                              disabled={disabledState}
                              value="retail"
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedFrame({
                                      ...selectedFrame,
                                      frameRate: selectedFrame?.frameRetailRate
                                    });
                                  }}
                                />
                              }
                              label="Retail"
                            />
                            <FormControlLabel
                              value="wsale"
                              disabled={disabledState}
                              control={
                                <Radio
                                  onClick={() => {
                                    setSelectedFrame({
                                      ...selectedFrame,
                                      frameRate: selectedFrame?.frameWsRate
                                    });
                                  }}
                                />
                              }
                              label="Whole Sale"
                            />
                          </RadioGroup>
                        </FormControl>
                        <div className="flex flex-col">
                          {eyeglasses.map((row, index) => (
                            <div className="border-1" key={index}>
                              <div className="flex flex-row justify-between">
                                <h2>Frame Price: {row.frameBrand}</h2>
                                <h2>
                                  $
                                  {row?.frameRate &&
                                    Number(row?.frameRate).toLocaleString()}
                                </h2>
                              </div>
                              <div className="flex flex-row justify-between">
                                <h2>Lens Price: {row?.lensDetail}</h2>
                                <h2>
                                  $
                                  {row?.lensRate &&
                                    Number(row?.lensRate).toLocaleString()}
                                </h2>
                              </div>
                            </div>
                          ))}

                          <div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Sub-Total:
                              </h2>
                              <h2 className="mt-6 font-700">
                                $
                                {(
                                  eyeglasses.reduce(
                                    (a, b) => +a + +b.lensRate,
                                    0
                                  ) +
                                  eyeglasses.reduce(
                                    (a, b) => +a + +b.frameRate,
                                    0
                                  )
                                ).toLocaleString()}
                              </h2>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 pt-12 ">Additional Cost</h2>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={disabledState}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Additional Cost
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.additionalCost || +0}
                                    name={'additionalCost'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col w-1/2">
                                <DiscountAutocomplete
                                  list={discounts}
                                  disabled={disabledState}
                                  form={form}
                                  setForm={setForm}
                                  handleChange={handleChange}
                                  id="code"
                                  freeSolo={false}
                                  label="Select Discount"
                                />
                              </div>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={true}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Amount
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.discount || 0}
                                    name={'discount'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Grand Total:
                              </h2>
                              {form?.additionalCost && form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.lensRate,
                                      0
                                    ) +
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.frameRate,
                                      0
                                    ) +
                                    +form?.additionalCost -
                                    +form?.discount
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {form?.additionalCost && !form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.lensRate,
                                      0
                                    ) +
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.frameRate,
                                      0
                                    ) +
                                    +form?.additionalCost
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {!form?.additionalCost && form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.lensRate,
                                      0
                                    ) +
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.frameRate,
                                      0
                                    ) -
                                    +form?.discount
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {!form?.additionalCost && !form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.lensRate,
                                      0
                                    ) +
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.frameRate,
                                      0
                                    )
                                  ).toLocaleString()}
                                </h2>
                              )}
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="pt-20">Insurance Amount:</h2>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={disabledState}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Amount
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.insuranceCost || 0}
                                    name={'insuranceCost'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 ">Total Payments:</h2>
                              <h2 className="mt-6">
                                $ {payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h2>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Balance Due:
                              </h2>
                              <h2 className="mt-6 font-700">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b?.frameRate,
                                  0
                                ) +
                                  eyeglasses.reduce(
                                    (a, b) => +a + +b?.lensRate,
                                    0
                                  ) -
                                  (form?.insuranceCost
                                    ? +form?.insuranceCost
                                    : 0) +
                                  (form?.additionalCost
                                    ? +form?.additionalCost
                                    : 0) -
                                  (form?.discount ? +form?.discount : 0) -
                                  payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-10 px-6 w-full rounded-20">
                      <div className="flex flex-row justify-center">
                        <SearchInsuranceDialouge
                          form={form}
                          handleClose={handleClose}
                          open={open}
                          customer={customer}
                          onSubmit={onSubmit}
                        />
                        <ReceiveOrderPayment
                          mainForm={form}
                          openOrderPayment={openOrderPayment}
                          handleOrderPaymentClose={handleOrderPaymentClose}
                          eyeglasses={eyeglasses}
                          payments={payments}
                        />
                      </div>
                      <div className="flex flex-row mb-10 justify-around">
                        <Fab
                          onClick={() => {
                            if (selectedFrame?.lensRate) {
                              let count = 1;
                              eyeglasses.map((row) => {
                                if (row?.frameId === selectedFrame?.frameId) {
                                  count++;
                                }
                                return;
                              });
                              if (selectedFrame?.frameQuantity < count) {
                                toast.error(
                                  'Required quantity is not available!',
                                  {
                                    position: 'bottom-right',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    transition: Zoom
                                  }
                                );
                                return null;
                              }

                              if (
                                selectedFrame !== {} &&
                                selectedFrame?.saleType !== undefined &&
                                selectedFrame?.frameBrand !== undefined
                              ) {
                                setEyeglasses([...eyeglasses, selectedFrame]);
                              } else {
                                toast.error('Please Fill Required Fields!', {
                                  position: 'bottom-right',
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  transition: Zoom
                                });
                              }
                            } else {
                              toast.error(
                                'Lens Rate is not calculated yet. Press Fetch Lens Rate...',
                                {
                                  position: 'bottom-right',
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  transition: Zoom
                                }
                              );
                            }
                          }}
                          disabled={disabledState}
                          variant="extended"
                          color="primary"
                          aria-label="add">
                          <AddIcon />
                          Add Frame
                        </Fab>

                        <Fab
                          onClick={() => {
                            if (eyeglasses.length) {
                              setOpenAlert(true);
                            } else {
                              toast.error('Please Add atleast One Pair', {
                                position: 'bottom-right',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                transition: Zoom
                              });
                            }
                          }}
                          disabled={disabledState}
                          variant="extended"
                          color="secondary"
                          aria-label="add">
                          <AddIcon />
                          {routeParams?.customerId
                            ? 'Place Order'
                            : 'Update Order'}
                        </Fab>

                        {routeParams?.orderId && (
                          <Fab
                            onClick={() => {
                              setOpenOrderPayment(true);
                            }}
                            variant="extended"
                            color="primary"
                            aria-label="add">
                            <AddIcon />
                            Receive Payment
                          </Fab>
                        )}
                        {routeParams?.orderId && (
                          <div>
                            <OrderReceipt
                              mainForm={form}
                              openOrderReceipt={openOrderReceipt}
                              handleOrderReceiptClose={handleOrderReceiptClose}
                              customer={customer}
                              eyeglasses={eyeglasses}
                              payments={payments}
                            />
                            <Fab
                              onClick={() => {
                                setOpenOrderReceipt(true);
                              }}
                              variant="extended"
                              color="primary"
                              disabled={!disabledState}
                              aria-label="add">
                              <AddIcon />
                              Print Receipt
                            </Fab>
                          </div>
                        )}
                      </div>
                      <Dialog
                        fullWidth
                        maxWidth="sm"
                        open={openAlert}
                        onClose={handleCloseAlert}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title" color="white">
                          {'Save Changes?'}
                        </DialogTitle>
                        <DialogContent>
                          <DialogContentText id="alert-dialog-description">
                            Are you sure?
                          </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleCloseAlert} color="secondary">
                            Disagree
                          </Button>
                          <Button
                            onClick={() => {
                              handleCloseAlert();
                              if (form?.insuranceCost > 0) {
                                setOpen(true);
                              } else {
                                deleteExistingInsurance();
                                onSubmit();
                              }
                            }}
                            color="secondary"
                            autoFocus>
                            Agree
                          </Button>
                        </DialogActions>
                      </Dialog>
                      <div className="flex flex-row w-full">
                        <div className="flex flex-col w-2/3">
                          <h1 className="ml-10 font-700">Eyeglasses Detail:</h1>
                          <div className="flex flex-col h-320 ">
                            <TableContainer
                              className="flex flex-col w-full m-2  overflow-scroll"
                              component={Paper}>
                              <Table aria-label="customized table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell>
                                      Frame Brand
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Frame Model
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Frame Colour
                                    </StyledTableCell>
                                    <StyledTableCell>Lens Type</StyledTableCell>
                                    <StyledTableCell>
                                      Lens Detail
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Lens Colour
                                    </StyledTableCell>
                                    <StyledTableCell>Options</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {eyeglasses.map((row, index) => (
                                    <StyledTableRow
                                      onClick={() => {
                                        setSelectedFrame(row);
                                      }}
                                      key={index}
                                      hover
                                      className="cursor-pointer">
                                      <StyledTableCell
                                        component="th"
                                        scope="row">
                                        {row?.frameBrand}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.frameModel}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.frameColour}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.lensType === 'distance' &&
                                          'Distance'}
                                        {row?.lensType === 'read' && 'Read'}
                                        {row?.lensType === 'fTop' && 'F. Top'}
                                        {row?.lensType === 'progressive' &&
                                          'Progressive'}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.lensDetail}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.lensColour}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <IconButton
                                          onClick={() => {
                                            let newEyeglasses = eyeglasses;
                                            newEyeglasses.splice(index, 1);
                                            setEyeglasses([...newEyeglasses]);
                                            setSelectedFrame(row);
                                            setDisabledState(false);
                                          }}
                                          aria-label="view">
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </div>

                        {routeParams?.orderId && (
                          <div className="flex flex-col w-1/3 ">
                            <h1 className="ml-10 font-700">Payment History</h1>
                            <div className="flex flex-col h-320 ">
                              <TableContainer
                                component={Paper}
                                className="flex flex-col w-full m-2  overflow-scroll">
                                <Table
                                  stickyHeader
                                  aria-label="customized table">
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell>
                                        Payment ID
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        Payment Date
                                      </StyledTableCell>
                                      <StyledTableCell>Amount</StyledTableCell>
                                      <StyledTableCell>
                                        Extra Notes
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {payments.map((hit) => (
                                      <StyledTableRow key={hit.orderPaymentId}>
                                        <StyledTableCell>
                                          {hit?.orderPaymentId}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {hit?.paymentDate
                                            .toDate()
                                            .toDateString()}
                                        </StyledTableCell>
                                        <StyledTableCell>{`$ ${Number(
                                          hit?.amount
                                        ).toLocaleString()}`}</StyledTableCell>
                                        <StyledTableCell>
                                          {hit?.extraNotes}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FuseAnimate>
              )}

              {form?.prescriptionType === 'contactLensRx' && (
                <FuseAnimate animation="transition.slideRightIn" delay={500}>
                  <div className="w-full flex flex-col rounded-12 shadow-3">
                    <div className="w-full flex flex-row ">
                      <div className="w-2/3">
                        <div className="flex flex-col p-8 flex-1 h-auto justify-between">
                          <div className="flex flex-row w-full">
                            <div className="flex flex-col px-10 w-1/2 ">
                              <CustomAutocomplete1
                                list={filteredPrescription}
                                form={selectedFrame}
                                disabled={disabledState}
                                setForm={setSelectedFrame}
                                handleChange={handleSelectedFrameChange}
                                id="prescriptionId"
                                freeSolo={false}
                                label="Select Prescription"
                              />
                            </div>
                            <div className="flex flex-col px-10 w-1/2">
                              <CustomAutocomplete
                                list={showroom}
                                form={form}
                                disabled={disabledState}
                                setForm={setForm}
                                handleChange={handleChange}
                                id="locationName"
                                freeSolo={false}
                                label="Select Showroom"
                              />
                            </div>
                          </div>

                          <div className="flex flex-row ">
                            <div className="p-8 h-auto w-40">
                              <h3 className="text-center font-700">RX</h3>
                            </div>
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">Sphere</h3>
                            </div>
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">Cylinder</h3>
                            </div>
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">Axis</h3>
                            </div>
                            <div className="p-8 h-auto w-1/4">
                              <h3 className="text-center font-700">Add</h3>
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                              <h3 className="text-center font-700">OD</h3>
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.contactLensSphereOd}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'contactLensSphereOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.contactLensCylinderOd}
                                onChange={handleSelectedFrameChange}
                                disabled={disabledState}
                                name={'contactLensCylinderOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                value={selectedFrame?.contactLensAxisOd}
                                disabled={disabledState}
                                onChange={handleSelectedFrameChange}
                                name={'contactLensAxisOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.contactLensAddOd}
                                onChange={handleSelectedFrameChange}
                                name={'contactLensAddOd'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                              <h3 className="text-center font-700">OS</h3>
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.contactLensSphereOs}
                                onChange={handleSelectedFrameChange}
                                name={'contactLensSphereOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.contactLensCylinderOs}
                                onChange={handleSelectedFrameChange}
                                name={'contactLensCylinderOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.contactLensAxisOs}
                                onChange={handleSelectedFrameChange}
                                name={'contactLensAxisOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                            <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                              <TextField
                                size="small"
                                fullWidth
                                id="standard-basic"
                                disabled={disabledState}
                                value={selectedFrame?.contactLensAddOs}
                                onChange={handleSelectedFrameChange}
                                name={'contactLensAddOs'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                                type="number"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="w-1/3">
                        <div className="flex flex-col mt-28 ml-40">
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={form?.rushOrder}
                                onChange={handleChange}
                                name="rushOrder"
                                disabled={disabledState}
                              />
                            }
                            label="Rush Order"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selectedFrame.contactLensInsurance}
                                onChange={handleSelectedFrameChange}
                                name="contactLensInsurance"
                                disabled={disabledState}
                              />
                            }
                            label="Order Contact Lens from Insurance"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row w-full">
                      <div className="flex flex-col px-10 w-1/4">
                        <CustomAutocomplete
                          list={contactLens}
                          form={selectedFrame}
                          disabled={disabledState}
                          setForm={setSelectedFrame}
                          handleChange={handleSelectedFrameChange}
                          id="type"
                          freeSolo={false}
                          label="Select Contact Lens"
                        />
                      </div>
                      <div className="pt-20">
                        <Fab
                          onClick={fetchContactLensRate}
                          disabled={disabledState}
                          variant="extended"
                          color="secondary"
                          aria-label="add">
                          Fetch Rate
                        </Fab>
                      </div>
                      <div className="flex flex-1 justify-around pt-20">
                        <FormControl>
                          <Select
                            disabled={disabledState}
                            labelId="demo-simple-select-autowidth-label"
                            defaultValue={selectedFrame?.contactLensStyle}
                            value={selectedFrame?.contactLensStyle}
                            name="contactLensStyle"
                            onChange={handleSelectedFrameChange}
                            autoWidth>
                            <MenuItem value={'Spherical'}>Spherical</MenuItem>
                            <MenuItem value={'Toric'}>Toric</MenuItem>
                            <MenuItem value={'Multifocal'}>Multifocal</MenuItem>
                            <MenuItem value={'Toric Multifocal'}>
                              Toric Multifocal
                            </MenuItem>
                          </Select>
                          <FormHelperText>
                            Select Contact Lens Style
                          </FormHelperText>
                        </FormControl>
                        <FormControl>
                          <Select
                            disabled={disabledState}
                            labelId="demo-simple-select-autowidth-label"
                            defaultValue={selectedFrame?.contactLensBrand}
                            value={selectedFrame?.contactLensBrand}
                            name="contactLensBrand"
                            onChange={handleSelectedFrameChange}
                            autoWidth>
                            <MenuItem value={'Acuvue'}>Acuvue</MenuItem>
                            <MenuItem value={'Alcon'}>Alcon</MenuItem>
                            <MenuItem value={'Baush & Lomb'}>
                              Baush & Lomb
                            </MenuItem>
                            <MenuItem value={'Unilens'}>Unilens</MenuItem>
                          </Select>
                          <FormHelperText>
                            Select Contact Lens Brand
                          </FormHelperText>
                        </FormControl>
                        <FormControl>
                          <Select
                            disabled={disabledState}
                            labelId="demo-simple-select-autowidth-label"
                            defaultValue={selectedFrame?.contactLensName}
                            value={selectedFrame?.contactLensName}
                            name="contactLensName"
                            onChange={handleSelectedFrameChange}
                            autoWidth>
                            <MenuItem value={'1-Day Moist'}>
                              1-Day Moist
                            </MenuItem>
                            <MenuItem value={'Acuvue Oasys Transition'}>
                              Acuvue Oasys Transition
                            </MenuItem>
                          </Select>
                          <FormHelperText>
                            Select Contact Lens Name
                          </FormHelperText>
                        </FormControl>
                        <FormControl>
                          <Select
                            disabled={disabledState}
                            labelId="demo-simple-select-autowidth-label"
                            defaultValue={selectedFrame?.contactLensDia}
                            value={selectedFrame?.contactLensDia}
                            name="contactLensDia"
                            onChange={handleSelectedFrameChange}
                            autoWidth>
                            <MenuItem value={'3'}>3</MenuItem>
                            <MenuItem value={'3.5'}>3.5</MenuItem>
                            <MenuItem value={'4'}>4</MenuItem>
                            <MenuItem value={'4.5'}>4.5</MenuItem>
                          </Select>
                          <FormHelperText>
                            Select Contact Lens DIA
                          </FormHelperText>
                        </FormControl>
                        <FormControl>
                          <Select
                            disabled={disabledState}
                            labelId="demo-simple-select-autowidth-label"
                            defaultValue={selectedFrame?.contactLensBaseCurve}
                            value={selectedFrame?.contactLensBaseCurve}
                            name="contactLensBaseCurve"
                            onChange={handleSelectedFrameChange}
                            autoWidth>
                            <MenuItem value={'8.4'}>8.4</MenuItem>
                            <MenuItem value={'8.5'}>8.5</MenuItem>
                            <MenuItem value={'8.6'}>8.6</MenuItem>
                            <MenuItem value={'8.8'}>8.8</MenuItem>
                          </Select>
                          <FormHelperText>
                            Select Contact Lens Base Curve
                          </FormHelperText>
                        </FormControl>
                      </div>
                    </div>

                    <div className="flex flex-row w-full">
                      <div className="flex flex-col p-12 m-12 w-1/2 flex-1 h-auto border-1">
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          inputProps={{
                            style: { fontSize: 28, lineHeight: 0.8 }
                          }}
                          multiline
                          rows={4}
                          value={selectedFrame?.contactLensOrderComments}
                          disabled={disabledState}
                          onChange={handleSelectedFrameChange}
                          label="Comments"
                          name={'contactLensOrderComments'}
                          variant="outlined"
                        />
                      </div>
                      <div className="flex flex-col p-12 m-12 w-1/2 flex-1 h-auto border-1">
                        <div className="flex flex-col">
                          {eyeglasses.map((row, index) => (
                            <div className="border-1" key={index}>
                              <div className="flex flex-row justify-between">
                                <h2>Contact Lens Price: {row.type}</h2>
                                <h2>
                                  $
                                  {row?.contactLensRate &&
                                    Number(
                                      row?.contactLensRate
                                    ).toLocaleString()}
                                </h2>
                              </div>
                            </div>
                          ))}

                          <div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Sub-Total:
                              </h2>
                              <h2 className="mt-6 font-700">
                                $
                                {eyeglasses
                                  .reduce((a, b) => +a + +b.contactLensRate, 0)
                                  .toLocaleString()}
                              </h2>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 pt-12 ">Additional Cost</h2>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={disabledState}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Additional Cost
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.additionalCost || +0}
                                    name={'additionalCost'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col w-1/2">
                                <DiscountAutocomplete
                                  list={discounts}
                                  disabled={disabledState}
                                  form={form}
                                  setForm={setForm}
                                  handleChange={handleChange}
                                  id="code"
                                  freeSolo={false}
                                  label="Select Discount"
                                />
                              </div>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={true}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Amount
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.discount || 0}
                                    name={'discount'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Grand Total:
                              </h2>
                              {form?.additionalCost && form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.contactLensRate,
                                      0
                                    ) +
                                    +form?.additionalCost -
                                    +form?.discount
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {form?.additionalCost && !form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.contactLensRate,
                                      0
                                    ) + +form?.additionalCost
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {!form?.additionalCost && form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.contactLensRate,
                                      0
                                    ) - +form?.discount
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {!form?.additionalCost && !form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {eyeglasses
                                    .reduce(
                                      (a, b) => +a + +b.contactLensRate,
                                      0
                                    )
                                    .toLocaleString()}
                                </h2>
                              )}
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="pt-20">Insurance Amount:</h2>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={disabledState}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Amount
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.insuranceCost || 0}
                                    name={'insuranceCost'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 ">Total Payments:</h2>
                              <h2 className="mt-6">
                                $ {payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h2>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Balance Due:
                              </h2>
                              <h2 className="mt-6 font-700">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b.contactLensRate,
                                  0
                                ) -
                                  (form?.insuranceCost
                                    ? +form?.insuranceCost
                                    : 0) +
                                  (form?.additionalCost
                                    ? +form?.additionalCost
                                    : 0) -
                                  (form?.discount ? +form?.discount : 0) -
                                  payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-10 px-6 w-full rounded-20">
                      <div className="flex flex-row justify-center">
                        <SearchInsuranceDialouge
                          form={form}
                          handleClose={handleClose}
                          open={open}
                          customer={customer}
                          onSubmit={onSubmit}
                        />
                        <ReceiveOrderPayment
                          mainForm={form}
                          openOrderPayment={openOrderPayment}
                          handleOrderPaymentClose={handleOrderPaymentClose}
                          eyeglasses={eyeglasses}
                          payments={payments}
                        />
                      </div>
                      <div className="flex flex-row mb-10 justify-between">
                        <Fab
                          onClick={() => {
                            if (selectedFrame?.contactLensRate) {
                              setEyeglasses([...eyeglasses, selectedFrame]);
                            } else {
                              toast.error(
                                'Contact Lens Rate is not calculated yet. Press Fetch Rate...',
                                {
                                  position: 'bottom-right',
                                  autoClose: 5000,
                                  hideProgressBar: false,
                                  closeOnClick: true,
                                  pauseOnHover: true,
                                  draggable: true,
                                  progress: undefined,
                                  transition: Zoom
                                }
                              );
                            }
                          }}
                          disabled={disabledState}
                          variant="extended"
                          color="primary"
                          aria-label="add">
                          <AddIcon />
                          Add Contact Lens
                        </Fab>

                        <div>
                          <Dialog
                            fullWidth
                            maxWidth="sm"
                            open={openAlert}
                            onClose={handleCloseAlert}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description">
                            <DialogTitle id="alert-dialog-title" color="white">
                              {'Save Changes?'}
                            </DialogTitle>
                            <DialogContent>
                              <DialogContentText id="alert-dialog-description">
                                Are you sure?
                              </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                              <Button
                                onClick={handleCloseAlert}
                                color="secondary">
                                Disagree
                              </Button>
                              <Button
                                onClick={() => {
                                  handleCloseAlert();
                                  if (form?.insuranceCost > 0) {
                                    setOpen(true);
                                  } else {
                                    deleteExistingInsurance();
                                    onSubmit();
                                  }
                                }}
                                color="secondary"
                                autoFocus>
                                Agree
                              </Button>
                            </DialogActions>
                          </Dialog>
                        </div>

                        <Fab
                          onClick={() => {
                            if (eyeglasses.length) {
                              setOpenAlert(true);
                            } else {
                              toast.error('Please Add atleast One Pair', {
                                position: 'bottom-right',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                transition: Zoom
                              });
                            }
                          }}
                          disabled={disabledState}
                          variant="extended"
                          color="secondary"
                          aria-label="add">
                          <AddIcon />
                          {routeParams?.customerId
                            ? 'Place Order'
                            : 'Update Order'}
                        </Fab>

                        {routeParams?.orderId && (
                          <div className="flex flex-row justify-start mt-10">
                            <Fab
                              onClick={() => {
                                setOpenOrderPayment(true);
                              }}
                              variant="extended"
                              color="primary"
                              aria-label="add">
                              <AddIcon />
                              Receive Payment
                            </Fab>
                          </div>
                        )}
                        {routeParams?.orderId && (
                          <div className="flex flex-row justify-start mt-10">
                            <OrderReceipt
                              mainForm={form}
                              openOrderReceipt={openOrderReceipt}
                              handleOrderReceiptClose={handleOrderReceiptClose}
                              customer={customer}
                              eyeglasses={eyeglasses}
                              payments={payments}
                            />
                            <Fab
                              onClick={() => {
                                setOpenOrderReceipt(true);
                              }}
                              variant="extended"
                              color="primary"
                              disabled={!disabledState}
                              aria-label="add">
                              <AddIcon />
                              Print Receipt
                            </Fab>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row w-full">
                        <div className="flex flex-col w-2/3">
                          <h1 className="ml-10 font-700">Contacts Detail:</h1>
                          <div className="flex flex-col h-320 ">
                            <TableContainer
                              className="flex flex-col w-full m-2 rounded-12 shadow-4 overflow-scroll"
                              component={Paper}>
                              <Table aria-label="customized table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell>
                                      Contact Group
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Contact Style
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Contact Brand
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Contact Name
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Contact DIA
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Base Curve
                                    </StyledTableCell>
                                    <StyledTableCell>Price</StyledTableCell>
                                    <StyledTableCell>Options</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {eyeglasses.map((row, index) => (
                                    <StyledTableRow
                                      onClick={() => {
                                        setSelectedFrame(row);
                                      }}
                                      key={index}
                                      hover
                                      className="cursor-pointer">
                                      <StyledTableCell
                                        component="th"
                                        scope="row">
                                        {row?.type}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.contactLensStyle}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.contactLensBrand}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.contactLensName}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.contactLensDia}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.contactLensBaseCurve}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        ${row?.contactLensRate}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <IconButton
                                          onClick={() => {
                                            let newEyeglasses = eyeglasses;
                                            newEyeglasses.splice(index, 1);
                                            setEyeglasses([...newEyeglasses]);
                                            setSelectedFrame(row);
                                            setDisabledState(false);
                                          }}
                                          aria-label="view">
                                          <EditIcon fontSize="small" />
                                        </IconButton>
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </div>

                        {routeParams?.orderId && (
                          <div className="flex flex-col w-1/3 ">
                            <h1 className="ml-10 font-700">Payment History</h1>
                            <div className="flex flex-col h-320 ">
                              <TableContainer
                                component={Paper}
                                className="flex flex-col w-full m-2 rounded-12 shadow-4 overflow-scroll">
                                <Table
                                  stickyHeader
                                  aria-label="customized table">
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell>
                                        Payment Date
                                      </StyledTableCell>
                                      <StyledTableCell>Amount</StyledTableCell>
                                      <StyledTableCell>
                                        Extra Notes
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {payments.map((hit) => (
                                      <StyledTableRow key={hit.orderPaymentId}>
                                        <StyledTableCell>
                                          {hit?.paymentDate
                                            .toDate()
                                            .toDateString()}
                                        </StyledTableCell>
                                        <StyledTableCell>{`$ ${Number(
                                          hit?.amount
                                        ).toLocaleString()}`}</StyledTableCell>
                                        <StyledTableCell>
                                          {hit?.extraNotes}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FuseAnimate>
              )}
              {form?.prescriptionType === 'medicationRx' && (
                <FuseAnimate animation="transition.slideRightIn" delay={500}>
                  <div className="w-full flex flex-col rounded-12 shadow-3">
                    <div className="flex flex-row w-full">
                      <div className="flex flex-col p-12 m-12 w-1/2 flex-1 h-auto border-1">
                        <div className="w-full flex flex-row ">
                          <div className="flex flex-row w-1/3">
                            <div className="flex flex-col px-10 w-full">
                              <CustomAutocomplete
                                list={showroom}
                                form={form}
                                disabled={disabledState}
                                setForm={setForm}
                                handleChange={handleChange}
                                id="locationName"
                                freeSolo={false}
                                label="Select Showroom"
                              />
                            </div>
                          </div>

                          <div className="w-1/3">
                            <div className="flex flex-col mt-28 ml-40">
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={form?.rushOrder}
                                    onChange={handleChange}
                                    name="rushOrder"
                                    disabled={disabledState}
                                  />
                                }
                                label="Rush Order"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row w-full">
                          <div className="flex flex-col px-10 w-1/4">
                            <CustomAutocomplete
                              list={services}
                              form={selectedFrame}
                              disabled={disabledState}
                              setForm={setSelectedFrame}
                              handleChange={handleSelectedFrameChange}
                              id="name"
                              freeSolo={false}
                              label="Select Services..."
                            />
                          </div>
                          <div className="pt-20">
                            <Fab
                              onClick={() => {
                                if (selectedFrame) {
                                  let count = 0;
                                  eyeglasses.map((row) => {
                                    if (row?.name === selectedFrame?.name) {
                                      count++;
                                    }
                                  });

                                  if (count > 0) {
                                    toast.error(
                                      'Selected service already added...',
                                      {
                                        position: 'bottom-right',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        transition: Zoom
                                      }
                                    );
                                  } else {
                                    services.map((row) => {
                                      if (selectedFrame?.name === row?.name) {
                                        setEyeglasses([
                                          ...eyeglasses,
                                          {
                                            ...selectedFrame,
                                            price: +row?.price
                                          }
                                        ]);
                                      }
                                    });
                                  }
                                } else {
                                  toast.error(
                                    'Please Select atleast one service...',
                                    {
                                      position: 'bottom-right',
                                      autoClose: 5000,
                                      hideProgressBar: false,
                                      closeOnClick: true,
                                      pauseOnHover: true,
                                      draggable: true,
                                      progress: undefined,
                                      transition: Zoom
                                    }
                                  );
                                }
                              }}
                              disabled={disabledState}
                              variant="extended"
                              color="primary"
                              aria-label="add">
                              <AddIcon />
                              Add Service
                            </Fab>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col p-12 m-12 w-1/2 flex-1 h-auto border-1">
                        <div className="flex flex-col">
                          {eyeglasses.map((row, index) => (
                            <div className="border-1" key={index}>
                              <div className="flex flex-row justify-between">
                                <h2> {row?.name}</h2>
                                <h2>
                                  $
                                  {row?.price &&
                                    Number(row?.price).toLocaleString()}
                                </h2>
                              </div>
                            </div>
                          ))}

                          <div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Sub-Total:
                              </h2>
                              <h2 className="mt-6 font-700">
                                $
                                {eyeglasses
                                  .reduce((a, b) => +a + +b.price, 0)
                                  .toLocaleString()}
                              </h2>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 pt-12 ">Additional Cost</h2>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={disabledState}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Additional Cost
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.additionalCost || +0}
                                    name={'additionalCost'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <div className="flex flex-col w-1/2">
                                <DiscountAutocomplete
                                  list={discounts}
                                  disabled={disabledState}
                                  form={form}
                                  setForm={setForm}
                                  handleChange={handleChange}
                                  id="code"
                                  freeSolo={false}
                                  label="Select Discount"
                                />
                              </div>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={true}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Amount
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.discount || 0}
                                    name={'discount'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Grand Total:
                              </h2>
                              {form?.additionalCost && form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.price,
                                      0
                                    ) +
                                    +form?.additionalCost -
                                    +form?.discount
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {form?.additionalCost && !form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.price,
                                      0
                                    ) + +form?.additionalCost
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {!form?.additionalCost && form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {(
                                    eyeglasses.reduce(
                                      (a, b) => +a + +b.price,
                                      0
                                    ) - +form?.discount
                                  ).toLocaleString()}
                                </h2>
                              )}
                              {!form?.additionalCost && !form?.discount && (
                                <h2 className="mt-6 font-700">
                                  $
                                  {eyeglasses
                                    .reduce((a, b) => +a + +b.price, 0)
                                    .toLocaleString()}
                                </h2>
                              )}
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="pt-20">Insurance Amount:</h2>
                              <div>
                                <FormControl
                                  className="mt-6"
                                  disabled={disabledState}
                                  fullWidth
                                  variant="outlined">
                                  <InputLabel htmlFor="outlined-adornment-amount">
                                    Amount
                                  </InputLabel>
                                  <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={form?.insuranceCost || 0}
                                    name={'insuranceCost'}
                                    onChange={handleChange}
                                    startAdornment={
                                      <InputAdornment position="start">
                                        $
                                      </InputAdornment>
                                    }
                                    labelWidth={60}
                                    type="number"
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 ">Total Payments:</h2>
                              <h2 className="mt-6">
                                $ {payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h2>
                            </div>
                            <div className="flex flex-row justify-between">
                              <h2 className="mt-6 underline font-700">
                                Balance Due:
                              </h2>
                              <h2 className="mt-6 font-700">
                                ${' '}
                                {eyeglasses.reduce((a, b) => +a + +b.price, 0) -
                                  (form?.insuranceCost
                                    ? +form?.insuranceCost
                                    : 0) +
                                  (form?.additionalCost
                                    ? +form?.additionalCost
                                    : 0) -
                                  (form?.discount ? +form?.discount : 0) -
                                  payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-10 px-6 w-full rounded-20">
                      <div className="flex flex-row justify-center">
                        <SearchInsuranceDialouge
                          form={form}
                          handleClose={handleClose}
                          open={open}
                          customer={customer}
                          onSubmit={onSubmit}
                        />
                        <ReceiveOrderPayment
                          mainForm={form}
                          openOrderPayment={openOrderPayment}
                          handleOrderPaymentClose={handleOrderPaymentClose}
                          eyeglasses={eyeglasses}
                          payments={payments}
                        />
                      </div>
                      <div className="flex flex-row mb-10 justify-between">
                        <Fab
                          onClick={() => {
                            if (eyeglasses.length) {
                              if (form?.insuranceCost > 0) {
                                setOpen(true);
                              } else {
                                onSubmit();
                              }
                            } else {
                              toast.error('Please Add atleast One Pair', {
                                position: 'bottom-right',
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                transition: Zoom
                              });
                            }
                          }}
                          disabled={disabledState}
                          variant="extended"
                          color="secondary"
                          aria-label="add">
                          <AddIcon />
                          {routeParams?.customerId
                            ? 'Place Order'
                            : 'Update Order'}
                        </Fab>

                        {routeParams?.orderId && (
                          <div className="flex flex-row justify-start mt-10">
                            <Fab
                              onClick={() => {
                                setOpenOrderPayment(true);
                              }}
                              variant="extended"
                              disabled={!disabledState}
                              color="primary"
                              aria-label="add">
                              <AddIcon />
                              Receive Payment
                            </Fab>
                          </div>
                        )}
                        {routeParams?.orderId && (
                          <div className="flex flex-row justify-start mt-10">
                            <OrderReceipt
                              mainForm={form}
                              openOrderReceipt={openOrderReceipt}
                              handleOrderReceiptClose={handleOrderReceiptClose}
                              customer={customer}
                              eyeglasses={eyeglasses}
                              payments={payments}
                            />
                            <Fab
                              onClick={() => {
                                setOpenOrderReceipt(true);
                              }}
                              variant="extended"
                              color="primary"
                              disabled={!disabledState}
                              aria-label="add">
                              <AddIcon />
                              Print Receipt
                            </Fab>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-row w-full">
                        <div className="flex flex-col w-2/3">
                          <h1 className="ml-10 font-700">Services Detail:</h1>
                          <div className="flex flex-col h-320 ">
                            <TableContainer
                              className="flex flex-col w-full m-2 rounded-12 shadow-4 overflow-scroll"
                              component={Paper}>
                              <Table aria-label="customized table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell>Sr#</StyledTableCell>
                                    <StyledTableCell>
                                      Service Name
                                    </StyledTableCell>
                                    <StyledTableCell>
                                      Service Price
                                    </StyledTableCell>
                                    <StyledTableCell>Options</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {eyeglasses.map((row, index) => (
                                    <StyledTableRow
                                      onClick={() => {
                                        setSelectedFrame(row);
                                      }}
                                      key={index}
                                      hover
                                      className="cursor-pointer">
                                      <StyledTableCell
                                        component="th"
                                        scope="row">
                                        {+index + 1}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.name}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        {row?.price}
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        <IconButton
                                          onClick={() => {
                                            let newEyeglasses = eyeglasses;
                                            newEyeglasses.splice(index, 1);
                                            setEyeglasses([...newEyeglasses]);
                                            setDisabledState(false);
                                          }}
                                          aria-label="view">
                                          <Icon>delete</Icon>
                                        </IconButton>
                                      </StyledTableCell>
                                    </StyledTableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                        </div>

                        {routeParams?.orderId && (
                          <div className="flex flex-col w-1/3 ">
                            <h1 className="ml-10 font-700">Payment History</h1>
                            <div className="flex flex-col h-320 ">
                              <TableContainer
                                component={Paper}
                                className="flex flex-col w-full m-2 rounded-12 shadow-4 overflow-scroll">
                                <Table
                                  stickyHeader
                                  aria-label="customized table">
                                  <TableHead>
                                    <TableRow>
                                      <StyledTableCell>
                                        Payment Date
                                      </StyledTableCell>
                                      <StyledTableCell>
                                        Payment Method
                                      </StyledTableCell>
                                      <StyledTableCell>Amount</StyledTableCell>
                                      <StyledTableCell>
                                        Extra Notes
                                      </StyledTableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {payments.map((hit) => (
                                      <StyledTableRow key={hit.orderPaymentId}>
                                        <StyledTableCell>
                                          {hit?.paymentDate
                                            .toDate()
                                            .toDateString()}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {hit?.paymentMode}
                                        </StyledTableCell>
                                        <StyledTableCell>{`$ ${Number(
                                          hit?.amount
                                        ).toLocaleString()}`}</StyledTableCell>
                                        <StyledTableCell>
                                          {hit?.extraNotes}
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FuseAnimate>
              )}
            </div>
          </div>
        }
        innerScroll
      />
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(AddOrder);
