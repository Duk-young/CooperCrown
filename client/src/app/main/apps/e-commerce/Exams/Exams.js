import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Assessment from './Assessment';
import Button from '@material-ui/core/Button';
import ChiefComplaints from './ChiefComplaints';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import CustomerInfo from './CustomerInfo';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DilationDetails from './DilationDetails';
import DoctorSignature from './DoctorSignature';
import EditIcon from '@material-ui/icons/Edit';
import FundusExam from './FundusExam';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import GlassesDetails from './GlassesDetails';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LensDetails from './LensDetails';
import MedicalOcularHistory from './MedicalOcularHistory';
import PeripheralRetina from './PeripheralRetina';
import PupilsDetails from './PupilsDetails';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import SaveIcon from '@material-ui/icons/Save';
import SlitLampExam from './SlitLampExam';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import VisualAcuity from './VisualAcuity';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));

function Exams(props) {
  const routeParams = useParams();
  const [openAlert, setOpenAlert] = React.useState(false);
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [disabledState, setDisabledState] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [showRooms, setShowRooms] = useState();
  const [doctors, setDoctors] = useState();
  const dispatch = useDispatch();
  const classes = useStyles();
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    setisLoading(true);
    if (routeParams.customerId) {
      const id = routeParams.customerId;
      const fetchCustomer = async () => {
        const query = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(id))
          .limit(1)
          .get();

        let result = query.docs[0].data();
        result.dob = result.dob && result.dob.toDate();
        result.id = query.docs[0].id;
        setCustomer(result);

        const queryShowroom = await firestore().collection('showRooms').get();
        let showroomdata = [];
        queryShowroom.forEach((doc) => {
          showroomdata.push(doc.data());
        });
        setShowRooms(showroomdata);

        const queryDoctors = await firestore().collection('doctors').get();
        let doctorsData = [];
        queryDoctors.forEach((doc) => {
          doctorsData.push(doc.data());
        });
        setDoctors(doctorsData);

        setisLoading(false);
      };
      fetchCustomer();
    } else {
      const examId = routeParams.examId;
      setDisabledState(true);
      const fetchExam = async () => {
        const query1 = await firestore()
          .collection('exams')
          .where('examId', '==', Number(examId))
          .limit(1)
          .get();

        let result1 = query1.docs[0].data();
        result1.examTime = result1.examTime && result1.examTime.toDate();
        result1.bpTime = result1.bpTime && result1.bpTime.toDate();
        result1.id = query1.docs[0].id;

        setForm(result1);
        const query = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(result1.customerId))
          .limit(1)
          .get();

        let result = query.docs[0].data();
        result.dob = result.dob && result.dob.toDate();
        result.id = query.docs[0].id;
        setCustomer(result);

        let showroomdata = [];
        const queryShowroom = await firestore().collection('showRooms').get();

        queryShowroom.forEach((doc) => {
          showroomdata.push(doc.data());
        });
        setShowRooms(showroomdata);

        const queryDoctors = await firestore().collection('doctors').get();
        let doctorsData = [];
        queryDoctors.forEach((doc) => {
          doctorsData.push(doc.data());
        });
        setDoctors(doctorsData);

        setisLoading(false);
      };

      fetchExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    if (!form?.locationName || !form?.fullName) {
      toast.error('Showroom and Doctor is mandatory', {
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
      if (form?.id) {
        await firestore()
          .collection('exams').doc(form?.id)
          .set({
            ...form,
            examTime: form?.examTime ? firestore.Timestamp.fromDate(form?.examTime) : firestore.Timestamp.fromDate(new Date()),
            bpTime: form?.bpTime ? firestore.Timestamp.fromDate(form?.bpTime) : firestore.Timestamp.fromDate(new Date()),
            customerId: customer.customerId,
            email: customer?.email ? customer?.email : '',
            lastName: customer?.lastName ? customer?.lastName : '',
            showRoomId: checkShowroomId(form?.locationName),
            doctorId: checkDoctorId(form?.fullName)
          });
        await checkAndUpdatePrescriptions()

        dispatch(
          MessageActions.showMessage({
            message: 'Exam Details updated successfully'
          })
        );
      } else {
        const dbConfig = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        await firestore()
          .collection('exams')
          .add({
            ...form,
            examTime: form?.examTime ? firestore.Timestamp.fromDate(form?.examTime) : firestore.Timestamp.fromDate(new Date()),
            bpTime: form?.bpTime ? firestore.Timestamp.fromDate(form?.bpTime) : firestore.Timestamp.fromDate(new Date()),
            examId: dbConfig?.examId + 1,
            customerId: customer.customerId,
            email: customer?.email ? customer?.email : '',
            lastName: customer?.lastName ? customer?.lastName : '',
            showRoomId: checkShowroomId(form?.locationName),
            doctorId: checkDoctorId(form?.fullName)
          });

        await firestore()
          .collection('customers')
          .doc(customer.id)
          .update({
            lastExam: firestore.Timestamp.fromDate(form?.examTime || new Date()),
            medicalHistory: customer?.medicalHistory
              ? customer?.medicalHistory
              : '',
            recentUpdated: dbConfig?.recentUpdated + 1
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({
            examId: dbConfig?.examId + 1,
            recentUpdated: dbConfig?.recentUpdated + 1
          });

        await firestore()
          .collection('prescriptions')
          .add({
            prescriptionType: 'eyeglassesRx',
            eyeglassesSphereOd: form?.egRxOdSphere ? form?.egRxOdSphere : '',
            eyeglassesCylinderOd: form?.egRxOdCylinder
              ? form?.egRxOdCylinder
              : '',
            eyeglassesAxisOd: form?.egRxOdAxis ? form?.egRxOdAxis : '',
            eyeglassesAddOd: form?.egRxOdAdd ? form?.egRxOdAdd : '',
            eyeglassesPrismOd: form?.egRxOdPrismBase ? form?.egRxOdPrismBase : '',
            eyeglassesVaOd: form?.egRxOdVa1 ? form?.egRxOdVa1 : '',
            eyeglassesSphereOs: form?.egRxOsSphere ? form?.egRxOsSphere : '',
            eyeglassesCylinderOs: form?.egRxOsCylinder
              ? form?.egRxOsCylinder
              : '',
            eyeglassesAxisOs: form?.egRxOsAxis ? form?.egRxOsAxis : '',
            eyeglassesAddOs: form?.egRxOsAdd ? form?.egRxOsAdd : '',
            eyeglassesPrismOs: form?.egRxOsPrismBase ? form?.egRxOsPrismBase : '',
            eyeglassesVaOs: form?.egRxOsVa1 ? form?.egRxOsVa1 : '',
            prescriptionId: dbConfig?.prescriptionId + 1,
            customerId: customer.customerId,
            prescriptionDate: firestore.Timestamp.fromDate(new Date()),
            fromExamId: dbConfig?.examId + 1
          });

        await firestore()
          .collection('prescriptions')
          .add({
            prescriptionType: 'contactLensRx',
            contactLensSphereOd: form?.clrxOdSphere ? form?.clrxOdSphere : '',
            contactLensCylinderOd: form?.clrxOdCylinder
              ? form?.clrxOdCylinder
              : '',
            contactLensAxisOd: form?.clrxOdAxis ? form?.clrxOdAxis : '',
            contactLensDiaOd: form?.clrxOdDia ? form?.clrxOdDia : '',
            contactLensBcOd: form?.clrxOdBc ? form?.clrxOdBc : '',
            contactLensSphereOs: form?.clrxOsSphere ? form?.clrxOsSphere : '',
            contactLensCylinderOs: form?.clrxOsCylinder
              ? form?.clrxOsCylinder
              : '',
            contactLensAxisOs: form?.clrxOsAxis ? form?.clrxOsAxis : '',
            contactLensDiaOs: form?.clrxOsDia ? form?.clrxOsDia : '',
            contactLensBcOs: form?.clrxOsBc ? form?.clrxOsBc : '',
            contactLensModel: form?.clrxOdBrand ? form?.clrxOdBrand : '',
            prescriptionId: dbConfig?.prescriptionId + 2,
            customerId: customer.customerId,
            prescriptionDate: firestore.Timestamp.fromDate(new Date()),
            fromExamId: dbConfig?.examId + 1
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ prescriptionId: dbConfig?.prescriptionId + 2 });

        dispatch(
          MessageActions.showMessage({
            message: 'Exam Details saved successfully'
          })
        );

      }
      props.history.push(`/apps/e-commerce/customers/profile/${customer?.customerId}`);
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  const checkAndUpdatePrescriptions = async () => {
    const queryEgPrescription = await firestore()
      .collection('prescriptions').where('fromExamId', '==', Number(routeParams?.examId))
      .where('prescriptionType', '==', 'eyeglassesRx').limit(1).get();

    if (!queryEgPrescription.empty) {
      const egPrescriptionId = queryEgPrescription.docs[0].id
      firestore().collection('prescriptions').doc(egPrescriptionId).update({
        eyeglassesSphereOd: form?.egRxOdSphere ? form?.egRxOdSphere : '',
        eyeglassesCylinderOd: form?.egRxOdCylinder ? form?.egRxOdCylinder : '',
        eyeglassesAxisOd: form?.egRxOdAxis ? form?.egRxOdAxis : '',
        eyeglassesAddOd: form?.egRxOdAdd ? form?.egRxOdAdd : '',
        eyeglassesPrismOd: form?.egRxOdPrismBase ? form?.egRxOdPrismBase : '',
        eyeglassesVaOd: form?.egRxOdVa1 ? form?.egRxOdVa1 : '',
        eyeglassesSphereOs: form?.egRxOsSphere ? form?.egRxOsSphere : '',
        eyeglassesCylinderOs: form?.egRxOsCylinder ? form?.egRxOsCylinder : '',
        eyeglassesAxisOs: form?.egRxOsAxis ? form?.egRxOsAxis : '',
        eyeglassesAddOs: form?.egRxOsAdd ? form?.egRxOsAdd : '',
        eyeglassesPrismOs: form?.egRxOsPrismBase ? form?.egRxOsPrismBase : '',
        eyeglassesVaOs: form?.egRxOsVa1 ? form?.egRxOsVa1 : '',
        prescriptionDate: firestore.Timestamp.fromDate(new Date())
      })
    }

    const queryClPrescription = await firestore()
      .collection('prescriptions').where('fromExamId', '==', Number(routeParams?.examId))
      .where('prescriptionType', '==', 'contactLensRx').limit(1).get();

    if (!queryClPrescription.empty) {
      const clPrescriptionId = queryClPrescription.docs[0].id
      firestore().collection('prescriptions').doc(clPrescriptionId).update({
        contactLensSphereOd: form?.clrxOdSphere ? form?.clrxOdSphere : '',
        contactLensCylinderOd: form?.clrxOdCylinder ? form?.clrxOdCylinder : '',
        contactLensAxisOd: form?.clrxOdAxis ? form?.clrxOdAxis : '',
        contactLensDiaOd: form?.clrxOdDia ? form?.clrxOdDia : '',
        contactLensBcOd: form?.clrxOdBc ? form?.clrxOdBc : '',
        contactLensSphereOs: form?.clrxOsSphere ? form?.clrxOsSphere : '',
        contactLensCylinderOs: form?.clrxOsCylinder ? form?.clrxOsCylinder : '',
        contactLensAxisOs: form?.clrxOsAxis ? form?.clrxOsAxis : '',
        contactLensDiaOs: form?.clrxOsDia ? form?.clrxOsDia : '',
        contactLensBcOs: form?.clrxOsBc ? form?.clrxOsBc : '',
        contactLensModel: form?.clrxOdBrand ? form?.clrxOdBrand : '',
        prescriptionDate: firestore.Timestamp.fromDate(new Date())
      })
    }
    return true

  }

  const checkShowroomId = (value) => {
    const room = showRooms?.find((room) => room?.locationName === value);
    if (room) {
      return room?.showRoomId
    }
  };

  const checkDoctorId = (value) => {
    const doctor = doctors?.find((doc) => doc?.fullName === value);
    if (doctor) {
      return doctor?.doctorId
    }
  };


  return (
    <FusePageCarded
      header={
        <div className='flex flex-row w-full'>
          <div className='w-1/2'>
            <IconButton
              onClick={() => {
                if ((!form && !disabledState) || (disabledState)) {
                  props.history.push(`/apps/e-commerce/customers/profile/${customer?.customerId}`);
                } else {
                  setOpenAlert(true);
                }
              }}>
              <Icon className="text-20">arrow_back</Icon>
              <span className="mx-4 text-12">Customer's Profile</span>
            </IconButton>

            <div className="flex flex-row">
              <Icon className="text-20 mt-4">listalt</Icon>
              <Typography className="text-16 pl-16 sm:text-20 truncate">
                Exam's Details
              </Typography>
            </div>

            <div>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={openAlert}
                onClose={handleCloseAlert}
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
                  <Button onClick={handleCloseAlert} color="secondary">
                    Disagree
                  </Button>
                  <Button
                    onClick={() => {
                      handleCloseAlert();
                      props.history.push(`/apps/e-commerce/customers/profile/${customer?.customerId}`);
                    }}
                    color="secondary"
                    autoFocus>
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div className='flex flex-row w-1/2 justify-end pr-8'>
            <div className='flex flex-col self-center'>
              {!disabledState &&
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={onSubmit}
                  color="secondary"
                  size="small"
                  startIcon={<SaveIcon />}
                >
                  Save Exam
                </Button>}
              {disabledState &&
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={() => {
                    if (userData.userRole === 'admin' || userData?.examsEdit) {
                      setDisabledState(false)
                    } else {
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
                  color="secondary"
                  size="small"
                  startIcon={<EditIcon />}
                >
                  Edit Exam
                </Button>}
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className='flex flex-row px-16 py-6 w-full'>
            <div className='flex flex-col w-1/2'>
              <CustomAutocomplete
                list={showRooms}
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                id="locationName"
                freeSolo={false}
                label="Select Showroom"
                disabled={disabledState}
              />
            </div>
            <div className='flex flex-col w-1/2 ml-10'>
              <CustomAutocomplete
                list={doctors}
                form={form}
                setForm={setForm}
                handleChange={handleChange}
                id="fullName"
                freeSolo={false}
                label="Select Doctor"
                disabled={disabledState}
              />
            </div>

          </div>
          <CustomerInfo form={form} handleChange={handleChange} customer={customer} formatPhoneNumber={formatPhoneNumber}
            disabledState={disabledState} setCustomer={setCustomer} />
          <MedicalOcularHistory form={form} handleChange={handleChange} disabledState={disabledState} />
          <ChiefComplaints form={form} handleChange={handleChange} disabledState={disabledState} />
          <GlassesDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <LensDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <VisualAcuity form={form} handleChange={handleChange} disabledState={disabledState} />
          <PupilsDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <SlitLampExam form={form} handleChange={handleChange} disabledState={disabledState} setForm={setForm} />
          <FundusExam form={form} handleChange={handleChange} disabledState={disabledState} setForm={setForm} />
          <DilationDetails form={form} handleChange={handleChange} disabledState={disabledState} />
          <PeripheralRetina form={form} handleChange={handleChange} disabledState={disabledState} setForm={setForm} />
          <Assessment form={form} handleChange={handleChange} disabledState={disabledState} />


          <div className="flex flex-col h-260 px-16 py-6">
            <div className="flex flex-col h-260 py-6">
              <div className="flex flex-col h-full py-4 border border-black rounded-6">
                <div className="flex justify-center border-b border-black">
                  <h1 className="font-bold" style={{ color: '#f15a25' }}>
                    PROGNOSIS
                  </h1>
                </div>
                <div className="flex flex-row p-10">
                  <TextField
                    fullWidth
                    InputProps={{ style: { fontSize: 14 } }}
                    id="outlined-multiline-static"
                    multiline
                    disabled={disabledState}
                    minRows={4}
                    value={form?.examPrognosis}
                    onChange={handleChange}
                    name={'examPrognosis'}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col h-full py-5 border border-black rounded-6">
              <div className="flex justify-center border-b border-black">
                <h1 className="font-bold" style={{ color: '#f15a25' }}>
                  DOCTOR SIGNATURE
                </h1>
              </div>
              <div className="flex justify-center p-16 sm:p-24 w-full min-w-800">
                <DoctorSignature form={form} setForm={setForm} handleChange={handleChange} disabledState={disabledState} />
              </div>
            </div>
          </div>
        </div >
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Exams);
