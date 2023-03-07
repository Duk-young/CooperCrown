import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DoctorSignature from './DoctorSignature';
import CustomerInfo from './CustomerInfo';
import MedicalOcularHistory from './MedicalOcularHistory';
import ChiefComplaints from './ChiefComplaints';
import GlassesDetails from './GlassesDetails';
import LensDetails from './LensDetails';
import VisualAcuity from './VisualAcuity';
import PupilsDetails from './PupilsDetails';
import SlitLampExam from './SlitLampExam';
import FundusExam from './FundusExam';
import DilationDetails from './DilationDetails';
import PeripheralRetina from './PeripheralRetina';
import Assessment from './Assessment';
import TextField from '@material-ui/core/TextField';


const AddExam = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [disabledState, setDisabledState] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [showRooms, setShowRooms] = useState();
  const dispatch = useDispatch();
  const routeParams = useParams();

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

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
        setisLoading(false);
      };

      fetchExam();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    setisLoading(true);

    try {
      const dbConfig = (
        await firestore().collection('dbConfig').doc('dbConfig').get()
      ).data();

      await firestore()
        .collection('exams')
        .add({
          ...form,
          examTime: firestore.Timestamp.fromDate(form?.examTime),
          bpTime: firestore.Timestamp.fromDate(form?.bpTime),
          examId: dbConfig?.examId + 1,
          customerId: customer.customerId,
          email: customer?.email ? customer?.email : '',
          lastName: customer?.lastName ? customer?.lastName : ''
        });

      await firestore()
        .collection('customers')
        .doc(customer.id)
        .update({
          lastExam: firestore.Timestamp.fromDate(form?.examTime),
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
          prescriptionDate: firestore.Timestamp.fromDate(new Date())
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
          prescriptionDate: firestore.Timestamp.fromDate(new Date())
        });

      await firestore()
        .collection('dbConfig')
        .doc('dbConfig')
        .update({ prescriptionId: dbConfig?.prescriptionId + 2 });

      dispatch(
        MessageActions.showMessage({
          message: 'Exam Details saved to firebase'
        })
      );

      props.history.push('/apps/e-commerce/customers');
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  return !customer ? (
    <></>
  ) : (

    <div className="flex flex-col w-full">
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
              <DoctorSignature form={form} setForm={setForm} handleChange={handleChange} />
            </div>
          </div>
        <div className="p-8 w-full h-auto">
          <div className="flex justify-center">
            <Button
              variant="contained"
              onClick={!form ? undefined : onSubmit}
              disabled={!!form?.examId}
              color="secondary"
              size="large"
              startIcon={<SaveIcon />}
            >
              Save Exam
            </Button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default withRouter(AddExam);
