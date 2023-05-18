import _ from '@lodash';
import '../Customers/Search.css';
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from 'firebase';
import { toast, Zoom } from 'react-toastify';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import ConfirmDelete from './DeleteOrder';
import ContactsOrder from './OrderComponents/ContactsOrder';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import CustomerInfo from './OrderComponents/CustomerInfo';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import EyeglassessOrder from './OrderComponents/EyeglassessOrder';
import FormControl from '@material-ui/core/FormControl';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import OrderReceipt from './OrderReceipt';
import OtherProductsOrder from './OrderComponents/OtherProductsOrder';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import ReceiveOrderPayment from './ReceiveOrderPayment';
import reducer from '../store/reducers';
import Select from '@material-ui/core/Select';
import ServicesOrder from './OrderComponents/ServicesOrder';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import ThermalReceipt from './ThermalReceipt';
import OrderTicket from './OrderTicket';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  body: {
    fontSize: 14,
    padding: '10px',
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
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    width: '100%',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  noBorder: {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
});

function AddOrder(props) {
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [showroom, setShowroom] = useState([]);
  const [newCustomer, setNewCustomer] = useState(null);
  const [eyeglasses, setEyeglasses] = useState([]);
  const [contactLenses, setContactLenses] = useState([]);
  const [medication, setMedication] = useState([]);
  const [prevEyeglasses, setPrevEyeglasses] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [otherProductInfo, setOtherProductInfo] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const [open, setOpen] = useState(false);
  const [openOrderReceipt, setOpenOrderReceipt] = useState(false);
  const [contactLens, setContactLens] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [services, setServices] = useState([]);
  const [openAlert1, setOpenAlert1] = useState(false);
  const [lensTypeNames, setLensTypeNames] = useState(false);
  const [editablePayment, setEditablePayment] = useState({});
  const [orders, setOrders] = useState([]);
  const { form, handleChange, setForm } = useForm(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [openThermalReceipt, setOpenThermalReceipt] = useState(false);
  const [openOrderTicket, setOpenOrderTicket] = useState(false);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  const classes = useStyles();

  const routeParams = useParams();
  const dispatch = useDispatch();

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  const handleCloseAlert1 = () => {
    setOpenAlert1(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOrderReceiptClose = () => {
    setOpenOrderReceipt(false);
  };

  const handleThermalReceiptClose = () => {
    setOpenThermalReceipt(false);
  };

  const handleOrderTicketClose = () => {
    setOpenOrderTicket(false);
  };

  const onSubmit = async () => {
    if (form?.orderId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('orders').doc(form?.id);
        let data = {
          ...form,
          eyeglasses: eyeglasses,
          contactLenses: contactLenses,
          medication: medication,
          otherProductInfo: otherProductInfo
        };

        await ref.set(data);

        if (eyeglasses.length) {
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
        throw error;
      }
      setisLoading(false);
    } else {
      setisLoading(true);

      try {
        const dbConfig = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        await firestore()
          .collection('orders')
          .add({
            ...form,
            orderDate: firestore.Timestamp.fromDate(new Date()),
            orderDateString: moment(new Date()).format('MM/DD/YYYY'),
            orderId: dbConfig?.orderId + 1,
            customOrderId: orders.length > 0 ?
              moment(new Date()).format('YYMMDD') +
              _.padStart(dbConfig?.customOrderId + 1, 4, '0') : moment(new Date()).format('YYMMDD') + _.padStart(1, 4, '0'),
            customerId: customer?.customerId,
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            dob: customer?.dob ? customer?.dob : '',
            gender: customer?.gender ? customer?.gender : '',
            ethnicity: customer?.ethnicity ? customer?.ethnicity : '',
            state: customer?.state ? customer?.state : '',
            orderStatus: 'draft',
            eyeglasses: eyeglasses,
            contactLenses: contactLenses,
            medication: medication,
            otherProductInfo: otherProductInfo
          });

        if (form?.insuranceCostOne > 0) {
          const insuranceComp1 = insurances.filter((ins) => ins?.insuranceId === form?.insuranceId)[0]
          await firestore()
            .collection('insuranceClaims')
            .add({
              orderDate: firestore.Timestamp.fromDate(new Date()),
              locationName: form?.locationName,
              insuranceClaimId: dbConfig?.insuranceClaimId + 1,
              orderId: dbConfig?.orderId + 1,
              customerId: customer?.customerId,
              firstName: customer?.firstName,
              lastName: customer?.lastName,
              insuranceCompany: insuranceComp1?.insuranceCompany,
              policyNo: insuranceComp1?.policyNo,
              insuranceCost: Number(form?.insuranceCostOne),
              claimStatus: 'Unclaimed'
            });

          if (form?.insuranceCostTwo > 0) {
            const insuranceComp2 = insurances.filter((ins) => ins?.insuranceId === form?.insuranceId2)[0]
            await firestore()
              .collection('insuranceClaims')
              .add({
                orderDate: firestore.Timestamp.fromDate(new Date()),
                locationName: form?.locationName,
                insuranceClaimId: dbConfig?.insuranceClaimId + 2,
                orderId: dbConfig?.orderId + 1,
                customerId: customer?.customerId,
                firstName: customer?.firstName,
                lastName: customer?.lastName,
                insuranceCompany: insuranceComp2?.insuranceCompany,
                policyNo: insuranceComp2?.policyNo,
                insuranceCost: Number(form?.insuranceCostTwo),
                claimStatus: 'Unclaimed'
              });
          }
        }
        const noOfInsuranceClaims = (form?.insuranceCostOne > 0 && 1) + (form?.insuranceCostTwo > 0 && 1)

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({
            orderId: dbConfig?.orderId + 1,
            recentUpdated: dbConfig?.recentUpdated + 1,
            customOrderId: orders.length > 0 ? dbConfig?.customOrderId + 1 : 1,
            insuranceClaimId: noOfInsuranceClaims > 0 ? dbConfig?.insuranceClaimId + noOfInsuranceClaims : dbConfig?.insuranceClaimId
          });

        await firestore()
          .collection('customers')
          .doc(customer?.id)
          .update({ recentUpdated: dbConfig?.recentUpdated + 1 });

        if (eyeglasses.length) {
          for (var k = 0; k < eyeglasses.length; k++) {
            if (eyeglasses[k]?.frameId) {
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
        }

        dispatch(
          MessageActions.showMessage({
            message: 'Order Details Saved Successfully'
          })
        );

        props.history.push('/apps/e-commerce/orders');
      } catch (error) {
        throw error;
      }
      setisLoading(false);
    }
  };

  const handleTotal = () => {
    const mainSum =
      eyeglasses.reduce((a, b) => b?.lensRate ? +a + +b.lensRate : a, 0) +
      eyeglasses.reduce((a, b) => b?.frameRate ? +a + +b.frameRate : a, 0) +
      medication.reduce((a, b) => +a + +b.price, 0) +
      contactLenses.reduce((a, b) => +a + +b.contactLensRate, 0) +
      otherProductInfo.reduce((a, b) => +a + +b.otherProductPrice, 0);

    const frameVal = eyeglasses.find(
      (item) => item?.frameAdditionalPrice || item?.frameAdditionalPrice <= 0
    );
    const lensVal = eyeglasses.find(
      (item) => item?.lensAdditionalPrice || item?.lensAdditionalPrice <= 0
    );

    const otherProductVal = otherProductInfo.find(
      (item) =>
        item?.otherProductAdditionalPrice ||
        item?.otherProductAdditionalPrice <= 0
    );

    if (frameVal || lensVal || otherProductVal) {
      return (
        mainSum +
        eyeglasses.reduce((a, b) => b?.frameAdditionalPrice ? +a + +b.frameAdditionalPrice : a, 0) +
        eyeglasses.reduce((a, b) => b?.lensAdditionalPrice ? +a + +b.lensAdditionalPrice : a, 0) +
        otherProductInfo.reduce(
          (a, b) => b?.otherProductAdditionalPrice ? +a + +b.otherProductAdditionalPrice : a,
          0
        )
      );
    } else {
      return mainSum;
    }
  };

  const handleBalance = () => {
    const total = handleTotal();

    const deductions =
      (form?.discount ? +form?.discount : 0) +
      (form?.insuranceCostOne ? +form?.insuranceCostOne : 0) +
      (form?.insuranceCostTwo ? +form?.insuranceCostTwo : 0);

    const payment = payments.reduce((a, b) => +a + +b.amount, 0);

    const balance = total - deductions - payment;

    return balance
  };

  // useEffect Hook to call delayed data to avoid loading times
  useEffect(() => {
    const fetchDelayedData = async () => {

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
    }
    fetchDelayedData()
  }, [])

  useEffect(() => {
    let resultOrder;
    let queryCustomer;

    if (routeParams.orderId) {
      setisLoading(true);
      setDisabledState(true);
      const fetchDetails = async () => {
        const queryOrder = await firestore()
          .collection('orders')
          .where('orderId', '==', Number(routeParams.orderId))
          .limit(1)
          .get();

        resultOrder = queryOrder.docs[0].data();
        resultOrder.orderDate =
          resultOrder.orderDate && resultOrder.orderDate.toDate();
        resultOrder.id = queryOrder.docs[0].id;
        setForm(resultOrder);
        setEyeglasses(resultOrder?.eyeglasses);
        setPrevEyeglasses(resultOrder?.eyeglasses);
        setContactLenses(resultOrder?.contactLenses);
        setMedication(resultOrder?.medication);
        setOtherProductInfo(resultOrder?.otherProductInfo)

        queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', resultOrder?.customerId)
          .limit(1)
          .get();

        const resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);

        const queryPrescription = await firestore()
          .collection('prescriptions')
          .where('customerId', '==', resultOrder?.customerId)
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

        const queryPayments = await firestore()
          .collection('orderPayments')
          .where('orderId', '==', routeParams.orderId)
          .get();
        let resultPayments = [];
        queryPayments.forEach((doc) => {
          resultPayments.push(doc.data());
        });
        setPayments(resultPayments);
        const queryInsurance = await firestore()
          .collection('insurances')
          .where('customerId', '==', resultOrder?.customerId)
          .get();

        let resultInsurance = [];
        queryInsurance.forEach((doc) => {
          resultInsurance.push(doc.data());
        });
        setInsurances(resultInsurance);
        setisLoading(false);
      };
      fetchDetails();
    } else {
      setisLoading(true);

      const fetchDetails = async () => {
        if (
          (newCustomer || routeParams?.customerId !== 'new')
        ) {
          queryCustomer = await firestore()
            .collection('customers')
            .where(
              'customerId',
              '==',
              routeParams?.customerId === 'new'
                ? newCustomer
                : Number(routeParams?.customerId)
            )
            .limit(1)
            .get();

          const resultCustomer = queryCustomer.docs[0].data();
          resultCustomer.dob =
            resultCustomer.dob && resultCustomer.dob.toDate();
          resultCustomer.id = queryCustomer.docs[0].id;
          setCustomer(resultCustomer);

          const queryPrescription = await firestore()
            .collection('prescriptions')
            .where('customerId', '==', newCustomer)
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
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const startOfToday = firestore.Timestamp.fromDate(today);
        const endOfToday = firestore.Timestamp.fromDate(new Date());

        const queryOrders = await firestore()
          .collection('orders')
          .where('orderDate', '>=', startOfToday)
          .where('orderDate', '<=', endOfToday)
          .get();

        let resultOrders = [];
        queryOrders.forEach((doc) => {
          resultOrders.push(doc.data());
        });
        setOrders(resultOrders);

        const queryInsurance = await firestore()
          .collection('insurances')
          .where('customerId', '==', newCustomer)
          .get();

        let resultInsurance = [];
        queryInsurance.forEach((doc) => {
          resultInsurance.push(doc.data());
        });
        setInsurances(resultInsurance);

        const queryServices = await firestore().collection('services').get();

        let resultServices = [];
        queryServices.forEach((doc) => {
          resultServices.push(doc.data());
        });
        setServices(resultServices);

        setisLoading(false);
      };
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCustomer]);

  const date = moment();

  const currentDate = date.format('YYYY-MM-DD');

  const sumPrice = (value1, value2) => {
    const sum = value1 + value2;

    return sum.toLocaleString();
  };

  if (isLoading) return <FuseLoading />;

  return (
    <div>
      <FusePageCarded
        header={
          <div className="w-full">
            <div className="order-no relative">
              <IconButton
                className="absolute top-0 bottom-0 left-0"
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
              <Typography className="text-16 sm:text-20 truncate text-center">
                {routeParams.orderId
                  ? `ORDER No. ${form?.customOrderId}`
                  : 'NEW ORDER'}
              </Typography>
            </div>
            <div className="order-header-content flex justify-between items-center p-16 sm:p-24">
              <div className="date-picker w-1/3 flex gap-10">
                <TextField
                  id="date"
                  label="Enter Date"
                  type="date"
                  defaultValue={
                    moment(form?.orderDate).format('YYYY-MM-DD') ?? currentDate
                  } // Update with info from customer
                  value={
                    moment(form?.orderDate).format('YYYY-MM-DD') ?? currentDate
                  }
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                    readOnly: true
                  }}
                />
                {routeParams.orderId && (
                  <TextField
                    id="date"
                    label="Last Edited"
                    type="date"
                    defaultValue={
                      moment(form?.orderDate).format('YYYY-MM-DD') ??
                      currentDate
                    } // Update with info from customer
                    value={
                      moment(form?.orderDate).format('YYYY-MM-DD') ??
                      currentDate
                    }
                    variant="outlined"
                    InputLabelProps={{
                      shrink: true,
                      readOnly: true
                    }}
                  />
                )}
              </div>
              <div className="showroom w-1/3">
                {routeParams.orderId ? (
                  <Typography className="text-16 sm:text-20 truncate text-center">
                    {form?.locationName}
                  </Typography>
                ) : (
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
                )}
              </div>
              {routeParams.orderId && (
                <div className="CTAs flex gap-10 w-1/3 justify-end">
                  <Button
                    style={{
                      backgroundColor: '#000',
                      color: '#fff',
                      width: 'unset'
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setOpenOrderReceipt(true);
                    }}>
                    PRINT TICKET
                  </Button>
                  <Button
                    className="w-0"
                    style={{
                      backgroundColor: '#f15a25',
                      color: '#fff',
                      width: 'unset'
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={() => { setOpenThermalReceipt(true) }}>
                    Thermal Receipt
                  </Button>
                  <Button
                    className="w-0"
                    style={{
                      backgroundColor: '#f15a25',
                      color: '#fff',
                      width: 'unset'
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={() => { setOpenOrderTicket(true) }}>
                    Order Ticket
                  </Button>
                </div>
              )}
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
          showroom.length && (
            <div className="flex flex-col w-full">
              <CustomerInfo form={form} handleChange={handleChange} customer={customer}
                disabledState={disabledState} setNewCustomer={setNewCustomer} />
              {customer && (
                <>
                  <EyeglassessOrder form={form} handleChange={handleChange} disabledState={disabledState} prescription={prescription}
                    lensTypeNames={lensTypeNames} eyeglasses={eyeglasses} setEyeglasses={setEyeglasses} />

                  <ContactsOrder form={form} handleChange={handleChange} disabledState={disabledState} prescription={prescription}
                    contactLens={contactLens} contactLenses={contactLenses} setContactLenses={setContactLenses} />

                  <ServicesOrder disabledState={disabledState} services={services} medication={medication} setMedication={setMedication} />

                  <OtherProductsOrder disabledState={disabledState} form={form} handleChange={handleChange} otherProductInfo={otherProductInfo}
                    setOtherProductInfo={setOtherProductInfo} />

                  <div className="order-list flex flex-col p-16 sm:px-24">
                    <FuseAnimate
                      animation="transition.slideRightIn"
                      delay={500}>
                      <div className="py-8 border-1 border-black border-solid rounded-6">
                        <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                          <h1 className="font-700" style={{ color: '#f15a25' }}>
                            ORDER LIST
                          </h1>
                        </div>
                        <div className="flex flex-col p-12 flex-1 h-auto">
                          <div className="flex flex-col">
                            {(eyeglasses || contactLenses || medication) && (
                              <div className="flex flex-col border-t-1 border-r-1 border-l-1 border-black border-solid">
                                {eyeglasses.map((row, index) => (
                                  <div
                                    key={index}
                                    className="px-20 py-10 border-b-1 border-black border-solid">
                                    <div className="flex flex-row justify-between">
                                      <h3>{`${row.frameBrand ?? '-'} / ${row.frameModel ?? '-'
                                        } / ${row.frameColour ?? '-'} / ${row.lensType ?? '-'
                                        } / ${row.lensColour ?? '-'}`}</h3>
                                      <h3>
                                        $
                                        {(row?.frameRate || row?.lensRate) &&
                                          sumPrice(
                                            Number(row?.frameRate) || 0,
                                            Number(row?.lensRate) || 0
                                          )}
                                      </h3>
                                    </div>
                                  </div>
                                ))}

                                {contactLenses.map((row, index) => (
                                  <div
                                    className="px-20 py-10 border-b-1 border-black border-solid"
                                    key={index}>
                                    <div className="flex flex-row justify-between">
                                      <h3>
                                        {`
                                        ${row.contactLensStyleOd ?? '-'}
                                        / ${row.contactLensBrandOd ?? '-'}
                                        / ${row.contactLensNameOd ?? '-'}
                                        / ${row.contactLensBaseCurveOd ?? '-'}
                                        / ${row.contactLensPackQtyOd ?? '-'}
                                      `}
                                      </h3>
                                      <h3>
                                        $
                                        {row?.contactLensRate &&
                                          Number(
                                            row?.contactLensRate
                                          ).toLocaleString()}
                                      </h3>
                                    </div>
                                  </div>
                                ))}

                                {medication.map((row, index) => (
                                  <div
                                    className="px-20 py-10 border-b-1 border-black border-solid"
                                    key={index}>
                                    <div className="flex flex-row justify-between">
                                      <h3> {row?.name}</h3>
                                      <h3>
                                        $
                                        {row?.price &&
                                          Number(row?.price).toLocaleString()}
                                      </h3>
                                    </div>
                                  </div>
                                ))}

                                {otherProductInfo.map((row, index) => (
                                  <div
                                    key={index}
                                    className="px-20 py-10 border-b-1 border-black border-solid">
                                    <div className="flex flex-row justify-between">
                                      <h3>
                                        {`
                                          ${row.otherProductBrand ?? '-'}
                                        / ${row.otherProductModel ?? '-'}
                                        / ${row.otherProductColour ?? '-'}
                                        / ${row.otherProductMaterial ?? '-'}
                                        / ${row.otherProductSize ?? '-'}
                                        / ${row.otherProductQty ?? '-'}
                                      `}
                                      </h3>
                                      <h3>
                                        $
                                        {row?.otherProductPrice &&
                                          Number(row?.otherProductPrice).toLocaleString()}
                                      </h3>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}

                            <div className="flex flex-col gap-10 px-20">
                              <div className="sub-total flex flex-row justify-between pt-20 pb-10">
                                <h3 className="font-700">Sub Total</h3>
                                <h3 className="font-700">
                                  ${handleTotal().toLocaleString()}
                                </h3>
                              </div>
                              <div className="discount flex flex-row justify-between items-end">
                                <FormControl style={{ minWidth: 225 }}>
                                  <InputLabel id="demo-simple-select-label">
                                    Select Discount
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    disabled={disabledState}
                                    defaultValue={form?.discount}
                                    value={form?.discount}
                                    name="discount"
                                    onChange={handleChange}>
                                    {discounts.map((row) => (
                                      <MenuItem value={row?.amount}>
                                        {row?.code}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <div className="flex gap-10 w-1/2">
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Memo"
                                    variant="outlined"
                                    className="w-full"
                                    disabled={disabledState}
                                    value={form?.discountMemo}
                                    name="discountMemo"
                                    onChange={handleChange}
                                  />
                                  <FormControl
                                    disabled={true}
                                    className="w-1/2"
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
                              <div className="insurance-amount-1 flex flex-row justify-between items-end">
                                <FormControl style={{ minWidth: 225 }}>
                                  <InputLabel id="demo-simple-select-label">
                                    Insurance Coverage 1
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={form?.insuranceId ?? ''}
                                    name="insuranceId"
                                    disabled={disabledState}
                                    onChange={handleChange}>
                                    {insurances.map((row) => (
                                      <MenuItem value={row?.insuranceId}>
                                        {row?.insuranceCompany}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                                <div className="flex gap-10 w-1/2">
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Memo"
                                    variant="outlined"
                                    className="w-full"
                                    disabled={disabledState}
                                    value={form?.insuranceOneMemo ?? ''}
                                    name="insuranceOneMemo"
                                    onChange={handleChange}
                                  />
                                  <FormControl
                                    className="w-1/2"
                                    disabled={disabledState}
                                    fullWidth
                                    variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                      Amount
                                    </InputLabel>
                                    <OutlinedInput
                                      id="outlined-adornment-amount"
                                      value={form?.insuranceCostOne ?? ''}
                                      name={'insuranceCostOne'}
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
                              <div className="insurance-amount-2 flex flex-row justify-between items-end">
                                <FormControl style={{ minWidth: 225 }}>
                                  <InputLabel id="demo-simple-select-label">
                                    Insurance Coverage 2
                                  </InputLabel>
                                  <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={form?.insuranceId2 ?? ''}
                                    name="insuranceId2"
                                    disabled={disabledState}
                                    onChange={handleChange}>
                                    {insurances?.length > 0 &&
                                      insurances.map((row) => (
                                        <MenuItem value={row?.insuranceId}>
                                          {row?.insuranceCompany}
                                        </MenuItem>
                                      ))}
                                  </Select>
                                </FormControl>
                                <div className="flex gap-10 w-1/2">
                                  <TextField
                                    id="outlined-multiline-static"
                                    label="Memo"
                                    variant="outlined"
                                    className="w-full"
                                    disabled={disabledState}
                                    value={form?.insuranceTwoMemo ?? ''}
                                    name="insuranceTwoMemo"
                                    onChange={handleChange}
                                  />
                                  <FormControl
                                    className="w-1/2"
                                    disabled={disabledState}
                                    fullWidth
                                    variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-amount">
                                      Amount
                                    </InputLabel>
                                    <OutlinedInput
                                      id="outlined-adornment-amount"
                                      value={form?.insuranceCostTwo ?? ''}
                                      name={'insuranceCostTwo'}
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
                              <div className="insurance-total flex flex-row justify-between pt-20 pb-10">
                                <h3 className="font-700">Insurance Total</h3>
                                <h3 className="font-700">
                                  {`$${(form?.insuranceCostOne
                                    ? +form?.insuranceCostOne
                                    : 0) +
                                    (form?.insuranceCostTwo
                                      ? +form?.insuranceCostTwo
                                      : 0)
                                    }`}
                                </h3>
                              </div>

                              <div className="balance-due flex flex-row justify-between mt-96">
                                <h3
                                  className="font-700"
                                  style={{ color: '#f15a25' }}>
                                  Balance
                                </h3>
                                <h3
                                  className="font-700"
                                  style={{ color: '#f15a25' }}>
                                  {`$${handleBalance().toLocaleString()}`}
                                </h3>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </FuseAnimate>
                  </div>

                  {routeParams?.orderId && (
                    <div className="payment-history flex flex-col p-16 sm:px-24">
                      <FuseAnimate
                        animation="transition.slideRightIn"
                        delay={500}>
                        <div className="py-8 border-1 border-black border-solid rounded-6">
                          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                            <h1
                              className="font-700"
                              style={{ color: '#f15a25' }}>
                              PAYMENT HISTORY
                            </h1>
                          </div>
                          <ReceiveOrderPayment
                            handleClose={handleClose}
                            open={open}
                            calculateBalance={handleBalance}
                            payments={payments}
                            setPayments={setPayments}
                            editablePayment={editablePayment}
                            setEditablePayment={setEditablePayment}
                            orderId={routeParams?.orderId}
                          />
                          {routeParams?.orderId && (
                            <div className="p-10">
                              <Button
                                className={classes.button}
                                disabled={!disabledState}
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                  setOpen(true);
                                }}
                                aria-label="add">
                                Receive Payment
                              </Button>
                            </div>
                          )}
                          <div className="flex flex-col h-200">
                            <TableContainer
                              component={Paper}
                              className="flex flex-col w-full overflow-scroll">
                              <Table stickyHeader aria-label="customized table">
                                <TableHead>
                                  <TableRow>
                                    <StyledTableCell>DATE</StyledTableCell>
                                    <StyledTableCell>METHOD</StyledTableCell>
                                    <StyledTableCell>MEMO</StyledTableCell>
                                    <StyledTableCell>AMOUNT</StyledTableCell>
                                    <StyledTableCell>OPTIONS</StyledTableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody>
                                  {payments
                                    .sort((a, b) =>
                                      a.orderPaymentId > b.orderPaymentId
                                        ? -1
                                        : 1
                                    )
                                    .map((hit, index) => (
                                      <StyledTableRow key={hit.orderPaymentId}>
                                        <StyledTableCell>
                                          {moment(
                                            hit?.paymentDate.toDate()
                                          ).format('MM/DD/YYYY')}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {hit?.paymentMode}
                                        </StyledTableCell>
                                        <StyledTableCell>
                                          {hit?.extraNotes}
                                        </StyledTableCell>
                                        <StyledTableCell className="whitespace-no-wrap">{`$ ${Number(
                                          hit?.amount
                                        ).toLocaleString()}`}</StyledTableCell>
                                        <StyledTableCell>
                                          <IconButton
                                            onClick={() => {
                                              setEditablePayment({ ...hit, index });
                                              setOpen(true);
                                            }}
                                            aria-label="edit">
                                            <EditIcon fontSize="small" />
                                          </IconButton>
                                        </StyledTableCell>
                                      </StyledTableRow>
                                    ))}
                                </TableBody>
                              </Table>
                            </TableContainer>
                          </div>
                          {routeParams?.orderId && (
                            <div>
                              <OrderReceipt
                                mainForm={form}
                                open={openOrderReceipt}
                                handleClose={
                                  handleOrderReceiptClose
                                }
                                eyeglasses={eyeglasses}
                                contactLenses={contactLenses}
                                medication={medication}
                                otherProductInfo={otherProductInfo}
                                payments={payments}
                                handleTotal={handleTotal}
                                handleBalance={handleBalance}
                              />
                              <ThermalReceipt
                                mainForm={form}
                                open={openThermalReceipt}
                                handleClose={
                                  handleThermalReceiptClose
                                }
                                eyeglasses={eyeglasses}
                                contactLenses={contactLenses}
                                medication={medication}
                                otherProductInfo={otherProductInfo}
                                payments={payments}
                                handleTotal={handleTotal}
                                handleBalance={handleBalance}
                              />
                              <OrderTicket
                                mainForm={form}
                                customer={customer}
                                open={openOrderTicket}
                                handleClose={
                                  handleOrderTicketClose
                                }
                                eyeglasses={eyeglasses}
                                contactLenses={contactLenses}
                              />
                            </div>
                          )}
                        </div>
                      </FuseAnimate>
                    </div>
                  )}
                  {disabledState === false && (
                    <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (form?.locationName) { onSubmit() }
                      else {
                        toast.error(
                          'Showroom is mandatory.',
                          {
                            position: 'top-center',
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
                    aria-label="add">
                    {routeParams?.customerId === 'new'
                      ? 'Submit Order'
                      : 'SAVE'}
                  </Button>
                  )}
                  {disabledState === true && (
                    <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.ordersEdit) {
                        setDisabledState(false)
                      }else {
                        toast.error('You are not authorized', {
                          position: 'top-center',
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
                    aria-label="add">
                    EDIT
                  </Button>
                  )}

                  {routeParams?.orderId && (
                    <>
                      <ConfirmDelete
                        open={openDelete}
                        handleClose={handleDeleteClose}
                        form={form}
                        propssent={props}
                      />
                      <Button
                        style={{
                          backgroundColor: 'transparent',
                          color: '#f47b51',
                          width: 'unset'
                        }}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          if (userData.userRole === 'admin' || userData?.ordersDelete) {
                            if (routeParams.customerId === 'new') {
                              alert('No Data to delete');
                            } else {
                              setOpenDelete(true);
                            }
                          }else {
                            toast.error('You are not authorized', {
                              position: 'top-center',
                              autoClose: 5000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              pauseOnHover: true,
                              draggable: true,
                              progress: undefined,
                              transition: Zoom
                            });
                          }
                          
                        }}>
                        delete
                      </Button>
                    </>
                  )}
                </>
              )}
            </div>
          )
        }
        innerScroll
      />
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(AddOrder);
