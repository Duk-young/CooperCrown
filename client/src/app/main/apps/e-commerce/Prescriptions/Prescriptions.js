import { customValuesArrayGenerator, sortAlphabetically, visualAquityDropDownValues } from '../ReusableComponents/HelperFunctions';
import { firestore, storage } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { red } from '@material-ui/core/colors';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAlert from '../ReusableComponents/CustomAlert';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ImageSlider from '../ReusableComponents/ImageSlider';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  buttonBlack: {
    backgroundColor: '#000000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#fff'
    }
  }
});

function Prescriptions(props) {

  const classes = useStyles();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [images, setImages] = useState([])
  const [customer, setCustomer] = useState({});
  const [fetchedId, setFetchedId] = useState(0);
  const [imageIndex, setImageIndex] = useState(0)
  const [isLoading, setisLoading] = useState(true);
  const [contactLens, setContactLens] = useState([])
  const [prescription, setPrescription] = useState([]);
  const { form, handleChange, setForm } = useForm(null);
  const [changeOccured, setChangeOccured] = useState(false);
  const [openImageSlider, setOpenImageSlider] = useState(false)
  const [openAlertOnSave, setOpenAlertOnSave] = useState(false);
  const [openAlertOnBack, setOpenAlertOnBack] = useState(false);
  const [filteredPrescription, setFilteredPrescription] = useState([]);
  const [filteredContactLensOd, setFilteredContactLensOd] = useState(contactLens)
  const [filteredContactLensOs, setFilteredContactLensOs] = useState(contactLens)

  const filterOdContacts = (value, attribute) => {
    let newContacts = filteredContactLensOd.filter((contact) => contact?.[attribute] === value)
    setFilteredContactLensOd(newContacts)
  }
  const filterOsContacts = (value, attribute) => {
    let newContacts2 = filteredContactLensOs.filter((contact) => contact?.[attribute] === value)
    setFilteredContactLensOs(newContacts2)
  }

  useEffect(() => {
    if (routeParams.prescriptionId) {
      setisLoading(true);
      setChangeOccured(true);
      const prescriptionId = routeParams.prescriptionId;
      const fetchDetails = async () => {
        const queryEditPrescription = await firestore()
          .collection('prescriptions')
          .where('prescriptionId', '==', Number(prescriptionId))
          .limit(1)
          .get();

        let resultEditPrescription = queryEditPrescription.docs[0].data();
        resultEditPrescription.prescriptionDate =
          resultEditPrescription.prescriptionDate &&
          resultEditPrescription.prescriptionDate.toDate();
        resultEditPrescription.id = queryEditPrescription.docs[0].id;
        setForm(resultEditPrescription);
        setImages(resultEditPrescription?.images)

        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(resultEditPrescription.customerId))
          .limit(1)
          .get();

        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);

        const queryPrescription = await firestore()
          .collection('prescriptions').limit(100)
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        setFilteredPrescription(resultPrescription);
        let rX = resultPrescription.filter(
          (word) =>
            word.prescriptionType === resultEditPrescription.prescriptionType
        );

        setPrescription(rX);

        const queryContactLens = await firestore().collection('contacts').get();

        let resultContacts = [];
        queryContactLens.forEach((doc) => {
          resultContacts.push(doc.data());
        });
        setContactLens(resultContacts);
        setFilteredContactLensOd(resultContacts);
        setFilteredContactLensOs(resultContacts);

        setisLoading(false);
      };
      fetchDetails();
    } else {
      setisLoading(true);

      const id = routeParams.customerId;
      const fetchDetails = async () => {
        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(id))
          .limit(1)
          .get();

        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);

        const queryPrescription = await firestore()
          .collection('prescriptions').limit(100)
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        setFilteredPrescription(resultPrescription);

        const queryContactLens = await firestore().collection('contacts').get();

        let resultContacts = [];
        queryContactLens.forEach((doc) => {
          resultContacts.push(doc.data());
        });
        setContactLens(resultContacts);
        setFilteredContactLensOd(resultContacts);
        setFilteredContactLensOs(resultContacts);

        setisLoading(false);
      };
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams.customerId]);

  const onSubmit = async () => {
    if (form.prescriptionId) {
      if (form?.fromExamId) {
        toast.error('This Rx is linked to exam. Please update from Exam.', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom
        });
        return true
      }
      setisLoading(true);

      try {
        const ref = firestore().collection('prescriptions').doc(form?.id);

        let uploadedImageUrls = [];
        for (let img of images) {
          if (img.file) {
            await storage().ref(`images/${img.id}`).put(img.file);

            const url = await storage()
              .ref('images')
              .child(img.id)
              .getDownloadURL();
            uploadedImageUrls.push({ url, name: img.name });

            continue;
          }
          uploadedImageUrls.push({ url: img.url, name: img.name });
        }

        let data = {
          ...form,
          prescriptionDate: firestore.Timestamp.fromDate(form?.prescriptionDate),
          images: uploadedImageUrls
        };
        delete data.id;
        await ref.set(data);

        dispatch(
          MessageActions.showMessage({
            message: 'Prescription updated successfully'
          })
        );
        props.history.push(
          `/apps/e-commerce/customers/profile/${form?.customerId}`
        );
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    } else {
      setisLoading(true);

      try {
        const dbConfig = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        let uploadedImageUrls = [];
        for (let img of images) {
          await storage().ref(`images/${img.id}`).put(img.file);

          const url = await storage()
            .ref('images')
            .child(img.id)
            .getDownloadURL();
          uploadedImageUrls.push({ url, name: img.name });
        }

        await firestore()
          .collection('prescriptions')
          .add({
            ...form,
            prescriptionId: dbConfig?.prescriptionId + 1,
            customerId: customer.customerId,
            prescriptionDate: form?.prescriptionDate ? firestore.Timestamp.fromDate(form?.prescriptionDate) : firestore.Timestamp.fromDate(new Date()),
            images: uploadedImageUrls
          });

        await firestore()
          .collection('customers')
          .doc(customer?.id)
          .update({ recentUpdated: dbConfig?.recentUpdated + 1 });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({
            prescriptionId: dbConfig?.prescriptionId + 1,
            recentUpdated: dbConfig?.recentUpdated + 1
          });
        dispatch(
          MessageActions.showMessage({
            message: 'Prescription Saved Successfully'
          })
        );

        props.history.push(`/apps/e-commerce/customers/profile/${routeParams?.customerId}`);
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  const handleDelete = async () => {
    if (form?.fromExamId) {
      toast.error('This Rx is linked to exam. Please delete the Exam.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
      return true
    }
    try {
      const queryPrescription = await firestore()
        .collection('prescriptions')
        .where('prescriptionId', '==', Number(form.prescriptionId))
        .limit(1)
        .get();

      let result = queryPrescription.docs[0].data();
      result.id = queryPrescription.docs[0].id;
      await firestore().collection('prescriptions').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'Prescription deleted successfully'
        })
      );
      props.history.push(
        `/apps/e-commerce/customers/profile/${form?.customerId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (routeParams.prescriptionId) {
      const prescriptionId = routeParams.prescriptionId;
      const fetchDetails = async () => {
        const queryEditPrescription = await firestore()
          .collection('prescriptions')
          .where('prescriptionId', '==', Number(prescriptionId))
          .limit(1)
          .get();

        let resultEditPrescription = queryEditPrescription.docs[0].data();
        setFetchedId(resultEditPrescription?.customerId);
      };
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams.customerId]);

  if (isLoading) return <FuseLoading />;

  return !customer || !filteredPrescription || !prescription ? (
    <></>
  ) : (
    <FusePageCarded
      header={
        <div className='flex flex-row justify-center w-full'>
          <div className='flex flex-row justify-start w-1/5'>
            <IconButton
              onClick={() => {
                if (changeOccured) {
                  setOpenAlertOnBack(true);
                } else if (routeParams.customerId) {
                  props.history.push(
                    `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                  );
                } else {
                  props.history.push(
                    `/apps/e-commerce/customers/profile/${fetchedId}`
                  );
                }
              }}>
              <Icon className="text-20">arrow_back</Icon>
              <span className="mx-4 text-12">Customer's Profile</span>
            </IconButton>
          </div>
          <div className='flex flex-row justify-center w-3/5'>
            <Typography
              className="flex mx-0 sm:mx-12 uppercase"
              style={{ fontSize: '2rem', fontWeight: 600 }}
              variant="h6">
              {`${routeParams?.customerId ? 'NEW' : 'EDIT'} RX (${customer?.firstName
                } ${customer.lastName})`}
            </Typography>
          </div>
          <div className='flex flex-row justify-start w-1/5'></div>
          <CustomAlert
            open={openAlertOnBack}
            setOpen={setOpenAlertOnBack}
            text1="Discard Changes?"
            text2="All the changes will be lost. Are you sure?"
            customFunction={() => {
              if (routeParams.customerId) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                );
              } else {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${fetchedId}`
                );
              }
            }}
          />
        </div>
      }
      content={(
        <div className="p-10">
          <div className="py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>RX TYPE</h1>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row p-16 sm:p-24 w-full">
                <div className="flex flex-col md:p-8 px-72 w-full md:w-2/5 h-auto justify-around">
                  <FormControl component="fieldset">
                    <RadioGroup
                      className="ml-6 justify-around"
                      row
                      aria-label="prescriptionType"
                      name="prescriptionType"
                      value={form?.prescriptionType}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="eyeglassesRx"
                        onClick={() => {
                          let eyeglassesRx = filteredPrescription.filter(
                            (word) => word.prescriptionType === 'eyeglassesRx'
                          );

                          setPrescription(eyeglassesRx);
                          setChangeOccured(true);
                        }}
                        control={<Radio />}
                        label="Eyeglasses Rx"
                        disabled={routeParams?.prescriptionId}
                      />
                      <FormControlLabel
                        onClick={() => {
                          let contactLensRx = filteredPrescription.filter(
                            (word) => word.prescriptionType === 'contactLensRx'
                          );

                          setPrescription(contactLensRx);
                          setChangeOccured(true);
                        }}
                        value="contactLensRx"
                        control={<Radio />}
                        label="Contact Lens Rx"
                        disabled={routeParams?.prescriptionId}
                      />
                      <FormControlLabel
                        onClick={() => {
                          setChangeOccured(true);
                        }}
                        value="medicationRx"
                        control={<Radio />}
                        label="Medication Rx"
                        disabled={routeParams?.prescriptionId}
                      />
                    </RadioGroup>
                  </FormControl>
                  <br></br>
                  <div className="flex flex-row w-full justify-between">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <KeyboardDatePicker
                        // className="ml-24"
                        margin="normal"
                        id="date-picker-dialog"
                        format="MM/dd/yyyy"
                        label="Prescription Date"
                        value={form?.prescriptionDate}
                        onChange={(date) => {
                          handleChange({
                            target: { name: 'prescriptionDate', value: date }
                          });
                        }}
                        KeyboardButtonProps={{
                          'aria-label': 'change date'
                        }}
                      />
                    </MuiPickersUtilsProvider>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={form?.onRx}
                          onChange={handleChange}
                          name="onRx"
                        />
                      }
                      label="Outside Rx"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                {form?.prescriptionType === 'eyeglassesRx' && (
                  <FuseAnimate animation="transition.slideRightIn" delay={500}>
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row w-full">
                        <div className="flex flex-col w-full">
                          <div className="flex flex-row">
                            <div className=" h-auto w-44"></div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">Sphere</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">Cylinder</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">Axis</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">Add</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">Prism</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">VA</h3>
                            </div>
                          </div>
                          <div className="flex flex-row">
                            <div className=" w-44 h-auto border-black border-solid border-1 justify-between">
                              <h3 className="mt-20 text-center font-700">OD</h3>
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesSphereOd ?? 0}
                                name="eyeglassesSphereOd"
                                onChange={handleChange}
                              >
                                {customValuesArrayGenerator(-30, 30, 0.25).map((row) => (
                                  <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                                ))}
                              </Select>
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesCylinderOd ?? ''}
                                name="eyeglassesCylinderOd"
                                onChange={handleChange}
                              >
                                {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                                  <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                                ))}
                              </Select>
                            </div>
                            <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                              <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesAxisOd" freeSolo={true} variant='standard' />
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesAddOd ?? ''}
                                name="eyeglassesAddOd"
                                onChange={handleChange}
                              >
                                {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                                  <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                                ))}
                              </Select>
                            </div>
                            <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                              <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesPrismOd" freeSolo={true} variant='standard' />
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesVaOd ?? ''}
                                name="eyeglassesVaOd"
                                onChange={handleChange}
                              >
                                {visualAquityDropDownValues.map((row) => (
                                  <MenuItem key={row} value={row}>{row}</MenuItem>
                                ))}
                              </Select>
                            </div>
                          </div>

                          <div className="flex flex-row">
                            <div className=" w-44 h-auto border-black border-solid border-1 justify-between">
                              <h3 className="mt-20 text-center font-700">OS</h3>
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesSphereOs ?? 0}
                                name="eyeglassesSphereOs"
                                onChange={handleChange}
                              >
                                {customValuesArrayGenerator(-30, 30, 0.25).map((row) => (
                                  <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                                ))}
                              </Select>
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesCylinderOs ?? ''}
                                name="eyeglassesCylinderOs"
                                onChange={handleChange}
                              >
                                {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                                  <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                                ))}
                              </Select>
                            </div>
                            <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                              <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesAxisOs" freeSolo={true} variant='standard' />
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesAddOs ?? ''}
                                name="eyeglassesAddOs"
                                onChange={handleChange}
                              >
                                {customValuesArrayGenerator(0.25, 5, 0.25).map((row) => (
                                  <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                                ))}
                              </Select>
                            </div>
                            <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                              <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="eyeglassesPrismOs" freeSolo={true} variant='standard' />
                            </div>
                            <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                              <Select
                                value={form?.eyeglassesVaOs ?? ''}
                                name="eyeglassesVaOs"
                                onChange={handleChange}
                              >
                                {visualAquityDropDownValues.map((row) => (
                                  <MenuItem key={row} value={row}>{row}</MenuItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col pl-8 mt-0 w-2/5">
                          <div className="flex flex-row ">
                            <div className=" h-auto w-72">
                              <h3 className="text-center font-700">PD</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">OU</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">OD</h3>
                            </div>
                            <div className=" h-auto flex-1">
                              <h3 className="text-center font-700">OS</h3>
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="py-16 w-72 h-auto border-black border-solid border-1 justify-between">
                              <h3 className="text-center font-700">Distance</h3>
                            </div>
                            <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                              <TextField
                                fullWidth
                                id="standard-basic"
                                value={form?.pdOuDistance}
                                onChange={handleChange}
                                // disabled={disabledState}
                                name={'pdOuDistance'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>
                            <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                              <TextField
                                fullWidth
                                id="standard-basic"
                                value={form?.pdOdDistance}
                                onChange={handleChange}
                                // disabled={disabledState}
                                name={'pdOdDistance'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>
                            <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                              <TextField
                                fullWidth
                                id="standard-basic"
                                value={form?.pdOsDistance}
                                // disabled={disabledState}
                                onChange={handleChange}
                                name={'pdOsDistance'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>
                          </div>
                          <div className="flex flex-row ">
                            <div className="py-16 w-72 h-auto border-black border-solid border-1 justify-between">
                              <h3 className="text-center font-700">Near</h3>
                            </div>
                            <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                              <TextField
                                fullWidth
                                id="standard-basic"
                                value={form?.pdOuNear}
                                onChange={handleChange}
                                name={'pdOuNear'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>
                            <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                              <TextField
                                fullWidth
                                id="standard-basic"
                                value={form?.pdOdNear}
                                onChange={handleChange}
                                name={'pdOdNear'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>
                            <div className="pt-16 flex-1 h-auto border-black border-solid border-1 justify-between">
                              <TextField
                                fullWidth
                                id="standard-basic"
                                value={form?.pdOsNear}
                                onChange={handleChange}
                                name={'pdOsNear'}
                                InputProps={{
                                  inputProps: {
                                    style: { textAlign: 'center' }
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-col justify-around my-16 w-full px-60'>
                        <TextField
                          size="medium"
                          id="outlined-multiline-static"
                          label="Memo"
                          value={form?.eyeglassesmemo}
                          onChange={handleChange}
                          name={'eyeglassesmemo'}
                          variant="outlined"
                        />
                      </div>
                      <div className="flex flex-col p-6 mv-16">
                        <Button
                          className={classes.button}
                          style={{
                            maxHeight: '40px',
                            minHeight: '40px'
                          }}
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            if (form) {
                              setOpenAlertOnSave(true);
                            }
                          }}>
                          Save Eyeglasses Rx
                        </Button>

                        <CustomAlert
                          open={openAlertOnSave}
                          setOpen={setOpenAlertOnSave}
                          text1="Save Changes?"
                          text2="Are you sure?"
                          customFunction={onSubmit}
                        />
                      </div>
                      {routeParams?.prescriptionId && (
                        <div className="flex flex-row p-6 md:w-1/3">
                          <Button
                            style={{
                              maxHeight: '40px',
                              minHeight: '40px',
                              color: 'red'
                            }}
                            variant="outlined"
                            onClick={handleDelete}>
                            <Icon>delete</Icon>
                            DELETE RX
                          </Button>
                        </div>
                      )}
                    </div>
                  </FuseAnimate>
                )}

                {form?.prescriptionType === 'contactLensRx' && (
                  <FuseAnimate animation="transition.slideLeftIn" delay={500}>
                    <div className="p-16 sm:p-2 w-full">
                      <div className="flex flex-row">
                        <div className=" h-auto flex-1">
                          <h3 className="hidden text-center font-700">Hi</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Sphere</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Cylinder</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">Axis</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">ADD</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">BC</h3>
                        </div>
                        <div className=" h-auto flex-1">
                          <h3 className="text-center font-700">DIA</h3>
                        </div>
                      </div>
                      <div className="flex flex-row">
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <h3 className="mt-20 text-center font-700">OD</h3>
                        </div>
                        <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                          <Select
                            value={form?.contactLensSphereOd ?? ''}
                            name="contactLensSphereOd"
                            onChange={handleChange}
                          >
                            {customValuesArrayGenerator(-30, 30, 0.25).map((row) => (
                              <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                          <Select
                            value={form?.contactLensCylinderOd ?? ''}
                            name="contactLensCylinderOd"
                            onChange={handleChange}
                          >
                            {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                              <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAxisOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAddOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensBcOd" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensDiaOd" freeSolo={true} variant='standard' />
                        </div>
                      </div>

                      <div className="flex flex-row">
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <h3 className="mt-20 text-center font-700">OS</h3>
                        </div>
                        <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                          <Select
                            value={form?.contactLensSphereOs ?? ''}
                            name="contactLensSphereOs"
                            onChange={handleChange}
                          >
                            {customValuesArrayGenerator(-30, 30, 0.25).map((row) => (
                              <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className="flex-1 h-auto border-black border-solid border-1 justify-between flex flex-col pt-16">
                          <Select
                            value={form?.contactLensCylinderOs ?? ''}
                            name="contactLensCylinderOs"
                            onChange={handleChange}
                          >
                            {customValuesArrayGenerator(-10, -0.25, 0.25).map((row) => (
                              <MenuItem key={row.value} value={row?.value}>{row?.label}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAxisOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensAddOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensBcOs" freeSolo={true} variant='standard' />
                        </div>
                        <div className=" flex-1 h-auto border-black border-solid border-1 justify-between">
                          <CustomAutocomplete list={prescription} form={form} setForm={setForm} handleChange={handleChange} id="contactLensDiaOs" freeSolo={true} variant='standard' />
                        </div>
                      </div>
                      <div className='flex flex-col w-full lg:flex-row'>
                        <div className='flex flex-row w-full p-8 gap-10 lg:gap-16 mt-16 lg:w-1/2 items-end'>
                          <div className='flex flex-col w-1/3 lg:w-1/2'>
                            <FormControl>
                              <FormHelperText>Brand OD</FormHelperText>
                              <Select
                                className='truncate'
                                value={form?.contactLensBrandOd ?? ''}
                                name="contactLensBrandOd"
                                onChange={(e) => {
                                  handleChange(e)
                                  filterOdContacts(e.target.value, 'brand')
                                }}>
                                {[...new Set(sortAlphabetically(filteredContactLensOd, 'brand')?.map((item) => (item?.brand ?? '')))].map((row) => (
                                  <MenuItem value={row}>
                                    {row}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className='flex flex-col w-2/3 lg:w-1/2'>
                            <FormControl>
                              <FormHelperText>Model OD</FormHelperText>
                              <Select
                                className='truncate'
                                value={form?.contactLensModelOd ?? ''}
                                name="contactLensModelOd"
                                onChange={(e) => {
                                  handleChange(e)
                                  filterOdContacts(e.target.value, 'model')
                                }}>
                                {[...new Set(sortAlphabetically(filteredContactLensOd, 'model')?.map((item) => (item?.model ?? '')))].map((row) => (<MenuItem value={row}>{row}</MenuItem>))}
                              </Select>
                            </FormControl>
                          </div>
                          <IconButton onClick={() => {
                            setFilteredContactLensOd(contactLens)
                            setForm({ ...form, contactLensBrandOd: undefined, contactLensModelOd: undefined })
                          }}>
                            <Icon>delete</Icon>
                          </IconButton>
                        </div>
                        <div className='flex flex-row w-full p-8 gap-10 lg:gap-16 mt-16 lg:w-1/2 items-end'>
                          <div className='flex flex-col w-1/3 lg:w-1/2'>
                            <FormControl>
                              <FormHelperText>Brand OS</FormHelperText>
                              <Select
                                className='truncate'
                                value={form?.contactLensBrandOs ?? ''}
                                name="contactLensBrandOs"
                                onChange={(e) => {
                                  handleChange(e)
                                  filterOsContacts(e.target.value, 'brand')
                                }}>
                                {[...new Set(sortAlphabetically(filteredContactLensOs, 'brand')?.map((item) => (item?.brand ?? '')))].map((row) => (
                                  <MenuItem value={row}>
                                    {row}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </div>
                          <div className='flex flex-col w-2/3 lg:w-1/2'>
                            <FormControl>
                              <FormHelperText>Model OS</FormHelperText>
                              <Select
                                className='truncate'
                                value={form?.contactLensModelOs ?? ''}
                                name="contactLensModelOs"
                                onChange={(e) => {
                                  handleChange(e)
                                  filterOsContacts(e.target.value, 'model')
                                }}>
                                {[...new Set(sortAlphabetically(filteredContactLensOs, 'model')?.map((item) => (item?.model ?? '')))].map((row) => (<MenuItem value={row}>{row}</MenuItem>))}
                              </Select>
                            </FormControl>
                          </div>
                          <IconButton onClick={() => {
                            setFilteredContactLensOs(contactLens)
                            setForm({ ...form, contactLensBrandOs: undefined, contactLensModelOs: undefined })
                          }}>
                            <Icon>delete</Icon>
                          </IconButton>
                        </div>
                      </div>
                      <div className='flex flex-col justify-around my-16 w-full px-60'>
                        <TextField
                          size="medium"
                          id="outlined-multiline-static"
                          label="Memo"
                          value={form?.contactLensMemo}
                          onChange={handleChange}
                          name={'contactLensMemo'}
                          variant="outlined"
                        />
                      </div>
                      <div className="flex flex-col p-6">
                        <Button
                          className={classes.button}
                          style={{
                            maxHeight: '40px',
                            minHeight: '40px'
                          }}
                          variant="contained"
                          onClick={() => {
                            if (form) {
                              setOpenAlertOnSave(true);
                            }
                          }}>
                          Save Contact Lens Rx
                        </Button>
                        <CustomAlert
                          open={openAlertOnSave}
                          setOpen={setOpenAlertOnSave}
                          text1="Save Changes?"
                          text2="Are you sure?"
                          customFunction={onSubmit}
                        />
                      </div>
                      {routeParams?.prescriptionId && (
                        <div className="flex flex-row p-6 md:w-1/3">
                          <Button
                            style={{
                              maxHeight: '40px',
                              minHeight: '40px',
                              color: 'red'
                            }}
                            variant="outlined"
                            onClick={handleDelete}>
                            <Icon>delete</Icon>
                            DELETE RX
                          </Button>
                        </div>
                      )}
                    </div>
                  </FuseAnimate>
                )}

                {form?.prescriptionType === 'medicationRx' && (
                  <FuseAnimate animation="transition.slideLeftIn" delay={500}>
                    <div className="p-2 w-full ">
                      <TextField
                        className="mt-10 "
                        fullWidth
                        InputProps={{ style: { fontSize: 20 } }}
                        InputLabelProps={{ style: { fontSize: 20 } }}
                        id="outlined-multiline-static"
                        label="Comments"
                        multiline
                        rows={4}
                        value={form?.medicationComments}
                        onChange={handleChange}
                        name={'medicationComments'}
                        variant="outlined"
                      />
                      <div className="flex flex-col p-6">
                        <Button
                          className={classes.button}
                          style={{
                            maxHeight: '40px',
                            minHeight: '40px'
                          }}
                          variant="contained"
                          color="secondary"
                          onClick={() => {
                            if (form) {
                              setOpenAlertOnSave(true);
                            }
                          }}>
                          Save Medication Rx
                        </Button>
                        <CustomAlert
                          open={openAlertOnSave}
                          setOpen={setOpenAlertOnSave}
                          text1="Save Changes?"
                          text2="Are you sure?"
                          customFunction={onSubmit}
                        />
                      </div>
                      {routeParams?.prescriptionId && (
                        <div className="flex flex-row p-6 md:w-1/3">
                          <Button
                            style={{
                              maxHeight: '40px',
                              minHeight: '40px',
                              color: 'red'
                            }}
                            variant="outlined"
                            onClick={handleDelete}>
                            <Icon>delete</Icon>
                            DELETE RX
                          </Button>
                        </div>
                      )}
                    </div>
                  </FuseAnimate>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col py-6">
            <div className="flex flex-col h-full border border-black rounded-6 py-6">
              <div className="flex justify-center border-b border-black">
                <h1 className="font-bold" style={{ color: '#f15a25' }}>
                  ADDITIONAL PICTURES
                </h1>
              </div>
              <div className="flex flex-col w-full">
                <ImageSlider open={openImageSlider} handleClose={() => setOpenImageSlider(false)} images={images?.length > 0 ? images.map((img) => img.url) : []} imageIndex={imageIndex} />
                <div className="flex flex-row w-full overflow-scroll flex-wrap p-16">
                  {images?.length > 0 && images.map((img, index) => (
                    <div className="mb-8 w-224 mr-6 object-contain">
                      <img
                        className="w-224 h-128 shadow-1 rounded-4"
                        onClick={() => {
                          setImageIndex(index)
                          setOpenImageSlider(true)
                        }}
                        src={img.url}
                        key={img.name}
                        alt={''}
                      />
                      <div className="flex flex-row justify-between items-center">
                        <div className="truncate">
                          <TextField
                            className="mt-12 "
                            fullWidth
                            id="outlined-multiline-static"
                            value={images[index].name.split('.', 1)}
                            onChange={(e) => {
                              let newImages = images;
                              newImages[index].name = e.target.value;
                              setImages([...newImages]);
                            }}
                            variant="outlined"
                          />
                        </div>

                        <IconButton
                          onClick={() => {
                            let newImages = images;
                            newImages.splice(index, 1);
                            setImages([...newImages]);
                          }}
                          aria-label="delete"
                          className={classes.margin}>
                          <DeleteIcon
                            style={{ color: red[500] }}
                            fontSize="small"
                          />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
                <label htmlFor="upload-photo1">
                  <input
                    style={{ display: 'none' }}
                    id="upload-photo1"
                    type="file"
                    accept="image/*"
                    onClick={(event) => {
                      event.target.value = '';
                    }}
                    onChange={(e) =>
                      setImages([
                        ...images,
                        {
                          name: e.target.files[0].name,
                          id: uuidv4(),
                          url: URL.createObjectURL(e.target.files[0]),
                          file: e.target.files[0]
                        }
                      ])
                    }
                  />
                  <div className="flex flex-col p-12 w-full">
                    <Button
                      className={classes.buttonBlack}
                      style={{
                        maxHeight: '50px',
                        minHeight: '50px',
                      }}
                      variant="contained"
                      component="span"
                      color="secondary">
                      <AddIcon /> UPLOAD PHOTO
                    </Button>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </div>
      )}
      innerScroll
    />
  )

}

export default withReducer('eCommerceApp', reducer)(Prescriptions);
