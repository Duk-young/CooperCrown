import { firestore } from 'firebase';
import { green } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseLoading from '@fuse/core/FuseLoading';
import Grid from '@material-ui/core/Grid';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect, useState } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import Sketch from './Sketch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from '@material-ui/pickers';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

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
      <div className="flex p-16 flex-row w-full">
        <div className=" w-1/2 h-auto">
          <div className="py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CUSTOMER INFO
              </h1>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-t-1 border-b-1 border-r-1">
                <h3 className="pl-6 font-700 ">Customer Id</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-t-1 border-b-1">
                <h3 className="pl-6 ">{customer.customerId}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">First Name</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.firstName}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Last Name</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer.lastName}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 bg-grey-200 font-700">
                  Date of Birth
                </h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">
                  {customer?.dob.toDateString()}
                </h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Gender:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.gender}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Ethnicity:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.ethnicity}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Address:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.address}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">City:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.city}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">State:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.state}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Zip-Code:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.zipCode}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Phone 1:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">
                  {formatPhoneNumber(customer?.phone1)}
                </h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Phone 2:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">
                  {formatPhoneNumber(customer?.phone2)}
                </h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Email:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.email}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Other:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.other}</h3>
              </div>
            </div>
            <br></br>
            <div className="flex flex-row justify-around">


            </div>
          </div>


          <div className="p-8 py-6 my-10 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                Occupation
              </h1>
            </div>
            <br></br>
            <TextField
              className="mx-10"
              fullWidth
              disabled={disabledState}
              id="outlined-multiline-static"
              // label="Occupation"
              value={form?.occupation}
              onChange={handleChange}
              name={'occupation'}
            // variant="outlined"
            />
            <br></br>
          </div>
        </div>

        <div className="ml-10 w-1/2 h-auto  ">
          <div className="w-full">
            <div className="flex flex-col h-260 px-16">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h1 className="font-700" style={{ color: '#f15a25' }}>
                    Note
                  </h1>
                </div>

                <TextField
                  className="mx-10 "
                  fullWidth
                  disabled={disabledState}
                  id="outlined-multiline-static"

                  multiline
                  rows={29}
                  value={customer?.medicalHistory}
                  onChange={(e) => {
                    setCustomer({
                      ...customer,
                      medicalHistory: e.target.value
                    });
                  }}
                  name={'medicalHistory'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-260  px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              MEDICAL AND OCULAR HISTORY
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
              <h3> ( Patient ) </h3>
            </div>
              <div className="flex-1 flex-row justify-center">
                <h3> ( Blood Relatives )</h3>
              </div>
             
          </div>
          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
              <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0High Blood Pressure`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patienthighbp}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patienthighbp"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativehighbp}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativehighbp"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Diabetes`}</h3>
            </div>
            <div className="flex-1">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.dmi}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="dmi"
                      />
                    }
                  label="DM I"
                  />
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.dmii}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="dmii"
                      />
                    }
                  label="DM II"
                  /> 	
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientdiabetes}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientdiabetes"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativediabetes}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativediabetes"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>
          
          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Cholestrol`}</h3>

            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientcholestrol}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientcholestrol"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativecholestrol}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativecholestrol"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Heart Problems`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientHeartProblems}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientHeartProblems"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeHeartProblems}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeHeartProblems"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Asthma`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientAsthma}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientAsthma"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeAsthma}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeAsthma"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Cataracts`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientCataracts}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientCataracts"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeCataracts}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeCataracts"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Retincal Detachment`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientRetincalDetachment}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientRetincalDetachment"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeRetincalDetachment}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeRetincalDetachment"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Blindness`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientBlindness}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientBlindness"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeBlindness}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeBlindness"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Lazy or Crossed Eyes`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientLazyorCrossedEyes}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientLazyorCrossedEyes"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeLazyorCrossedEyes}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeLazyorCrossedEyes"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Glaucoma`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientGlaucoma}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientGlaucoma"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeGlaucoma}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeGlaucoma"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11"> 
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Macular Degeneration`}</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row justify-center">
            <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.patientMacularDegeneration}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="patientMacularDegeneration"
                      />
                    }                
                  />
            </div>
              <div className="flex-1 flex-row justify-center">
              <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.relativeMacularDegeneration}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="relativeMacularDegeneration"
                      />
                    }
                  />
              </div>
             
          </div>
          </div>
          <br></br>
          <div className="flex flex-row justify-center ">
          <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Other Ocular ( eye ) Problems: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>

              <TextField
                className="mx-10"
                fullWidth
                multiline
                rows={4}
                id="outlined-multiline-static"
                disabled={disabledState}
                value={form?.otherocular}
                onChange={handleChange}
                name={'otherocular'}
                variant="outlined"
              />
             

            </div>
            <br></br>
            <div className="flex flex-row justify-center ">
            
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Other General Health Problems: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>

              <TextField
                className="mx-10"
                fullWidth
                multiline
                rows={4}
                id="outlined-multiline-static"
                
                disabled={disabledState}
                value={form?.otherhealth}
                onChange={handleChange}
                name={'otherhealth'}
                variant="outlined"
              />
              

            </div>
            <br></br>
            <div className="justify-center ">
            <h3 className=" font-700  ">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0List of medications currently taking ( Including Aspirin, Birth Control, and OTC medications ):`}</h3>

            <TextField
             
              fullWidth
              multiline
              rows={4}
              disabled={disabledState}
              id="outlined-multiline-static"
              value={form?.currentmedication}
              onChange={handleChange}
              name={'currentmedication'}
              variant="outlined"
            />       

            </div> 
            <br></br><br></br>           
        </div>        
      </div>
      
      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            CHIEF COMPLAINTS
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.headaches}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="headaches"
                  />
                }
                label="Headaches"
              />

            </div>
            <div className="flex-1 flex flex-row  ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.burn}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="burn"
                  />
                }
                label="Burn"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.tearWater}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="tearWater"
                  />
                }
                label="Tear-Water"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.itch}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="itch"
                  />
                }
                label="Itch"
              />

            </div>

          </div>

          <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.dry}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="dry"
                  />
                }
                label="Dry"
              />

            </div>
            <div className="flex-1 flex flex-row  ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.floaters}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="floaters"
                  />
                }
                label="Floaters"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.flashes}
                    onChange={handleChange}
                    name="flashes"
                    disabled={disabledState}
                  />
                }
                label="Flashes"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <TextField
                className="ml-12"
                size="small"
                id="outlined-multiline-static"
                label="Other"
                disabled={disabledState}
                value={form?.otherReason}
                onChange={handleChange}
                name={'otherReason'}
                variant="outlined"
              />
              <br></br>

            </div>

          </div>
        </div>
      </div>
      <div className="flex flex-col h-225 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            GLASSES CONDITION 
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.lost}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="lost"
                  />
                }
                label="Lost"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.broken}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="broken"
                  />
                }
                label="Broken"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.tooWeak}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="tooWeak"
                  />
                }
                label="Too Weak"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.tooStrong}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="tooStrong"
                  />
                }
                label="Too Strong"
              />

            </div>

            <div className="flex-1 flex flex-row justify-center ">
              <TextField
                className="ml-12"
                size="small"
                id="outlined-multiline-static"
                label="Other"
                disabled={disabledState}
                value={form?.otherCondition}
                onChange={handleChange}
                name={'otherCondition'}
                variant="outlined"
              />
              <br></br>

            </div>
            <br></br><br></br>
          </div>

        </div>
      </div>

      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            PURPOSE OF GLASSES
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.distancePurpose}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="distancePurpose"
                  />
                }
                label="Distance (TV, Driving...etc)"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.closePurpose}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="closePurpose"
                  />
                }
                label="Reading / Close-work (Reading,Sewing...etc)"
              />
              <br></br>

            </div>
          </div>

        </div>
      </div>


      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            LENS TYPE
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center ">

            <div className="ml-24">
              <FormControl component="fieldset">
                <RadioGroup
                  className="ml-60"
                  row
                  aria-label="lensType"
                  name="lensType"
                  value={form?.lensType}
                  onChange={handleChange}>
                  <FormControlLabel
                    disabled={disabledState}
                    value="sv"
                    control={<Radio />}
                    label="SV"
                  />
                  <FormControlLabel
                    value="bifocal"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Bifocal"
                  />
                  <FormControlLabel
                    value="trifocal"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Trifocal"
                  />
                  <FormControlLabel
                    value="progressive"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Progressive"
                  />
                </RadioGroup>
              </FormControl>
              <br></br>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            CONTACT LENS
            </h1>
          </div>
          <br></br>

          <div className="flex flex-row justify-center ">

            <div className="ml-24">
              <FormControl component="fieldset">

                <RadioGroup
                  className="ml-28"
                  row
                  aria-label="contactLens"
                  name="contactLens"
                  value={form?.contactLens}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="currentlyWearing"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Currently Wearing"
                  />
                  {form?.contactLens === 'currentlyWearing' && (
                    <TextField
                      className="ml-12 mr-10"
                      size="small"
                      disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Currently Wearing"
                      value={form?.currentlyWearingLens}
                      onChange={handleChange}
                      name={'currentlyWearingLens'}
                      variant="outlined"
                    />
                  )}
                  <FormControlLabel
                    value="usedToWear"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Used To Wear"
                  />
                  <FormControlLabel
                    value="neverTried"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Never Tried"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    disabled={disabledState}
                  />
                </RadioGroup>
              </FormControl>
              {form?.contactLens === 'other' && (
                <TextField
                  className="ml-12"
                  size="small"
                  disabled={disabledState}
                  id="outlined-multiline-static"
                  label="Other"
                  value={form?.otherContactLens}
                  onChange={handleChange}
                  name={'otherContactLens'}
                  variant="outlined"
                />
              )}
              <br></br>
            </div>
          </div>

        </div>
      </div>


      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            VISUAL FIELD
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row justify-center">
              <h3 className="font-700 text-center">Oculus </h3>
              <TextField

                size="small"
                id="outlined-multiline-static"

                disabled={disabledState}
                value={form?.oculus}
                onChange={handleChange}
                name={'oculus'}
              />

            </div>
            <div className="flex-1 flex flex-row justify-center">

              <h3 className="ml-35 px-15 font-700 text-center">Confrontation </h3>

              <TextField

                disabled={disabledState}
                size="small"
                id="outlined-multiline-static"

                value={form?.confrontation}
                onChange={handleChange}
                name={'confrontation'}

              />              
            </div>
          </div>
          <br></br><br></br>
        </div>        
      </div>
      
      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              VISUAL ACUITY
            </h1>
          </div>
          <br></br>
          <div className=" border-b-1 border-black border-solid px-11"> 

          <div className="flex flex-row justify-center w-full">
            <div className="flex flex-col h-260 py-6">
                <div className="justify-around py-30">
                  <div className="flex flex-row justify-around px-60">

                    <h3 className="font-700">Far</h3>

                    <h3 className="font-700">Near</h3>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="px-36 py-12 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-row justify-around">
                        <h3>Unaided</h3>
                        <h3>Aided</h3>
                      </div>
                      <div className="flex w-1/2 flex-row">
                        <h3 className="font-700">{`OD\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          disabled={disabledState}
                          value={form?.farOd}
                          onChange={handleChange}
                          name={'farOd'}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-row">
                        <h3 className="font-700">{`OS\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          disabled={disabledState}
                          value={form?.farOs}
                          onChange={handleChange}
                          name={'farOs'}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-row">
                        <h3 className="font-700">{`OU\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          disabled={disabledState}
                          value={form?.farOu}
                          onChange={handleChange}
                          name={'farOu'}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="px-36 py-12 w-1/2 h-auto border-grey-400 border-solid border-1 justify-between">
                      <div className="flex flex-row justify-around">
                        <h3>Unaided</h3>
                        <h3>Aided</h3>
                      </div>
                      <div className="flex w-1/2 flex-row">
                        <h3 className="font-700">{`OD\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          disabled={disabledState}
                          value={form?.nearOd}
                          onChange={handleChange}
                          name={'nearOd'}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-row">
                        <h3 className="font-700">{`OS\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          value={form?.nearOs}
                          disabled={disabledState}
                          onChange={handleChange}
                          name={'nearOs'}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                      </div>
                      <div className="flex flex-row">
                        <h3 className="font-700">{`OU\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A020\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0/\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          value={form?.nearOu}
                          disabled={disabledState}
                          onChange={handleChange}
                          name={'nearOu'}
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
                  <div className="flex flex-row px-16  sm:px-18 w-full">
                    <div className="px-36 py-12 w-1/2 h-auto justify-between">
                      <div className="flex flex-row justify-center">
                      {/* <h3 className="font-700">{`IOP:\u00A0\u00A0NCT\u00A0\u00A0\u00A0GAT`}</h3> */}
                      <h3 className="font-700"> {`IOP:`}</h3>
                      <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-10"
                    row
                    aria-label="IOP"
                    name="IOP"
                    value={form?.IOP}
                    onChange={handleChange}>
                    <FormControlLabel
                      value="NCT"
                      control={<Radio />}
                      disabled={disabledState}
                      label="NCT"
                    />
                    <FormControlLabel
                      value="GAT"
                      disabled={disabledState}
                      control={<Radio />}
                      label="GAT"
                    />
                  </RadioGroup>
                </FormControl>

                      </div>



                      <div className="flex flex-row">
                        <h3 className="pt-4 font-700">Time:</h3>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container>
                            <KeyboardTimePicker
                              className="m-0 px-24"
                              margin="normal"
                              disabled={disabledState}
                              id="time-picker"
                              value={form?.examTime}
                              onChange={(date) => {
                                handleChange({
                                  target: { name: 'examTime', value: date }
                                });
                              }}
                              KeyboardButtonProps={{
                                'aria-label': 'change time'
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </div>
                     <br></br>
                    </div>
                    <div className="px-36 py-12 w-1/2 h-auto justify-between">
                      <div className="flex flex-row">
                        <h3 className="font-700">OD:</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          disabled={disabledState}
                          value={form?.odmmhg}
                          onChange={handleChange}
                          name={'odmmhg'}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                        <h3 className="font-700">mm/Hg</h3>
                      </div>
                      <div className="flex flex-row">
                        <h3 className="font-700">OS:</h3>
                        <TextField
                          size="small"
                          id="standard-basic"
                          disabled={disabledState}
                          value={form?.osmmhg}
                          onChange={handleChange}
                          name={'osmmhg'}
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                        <h3 className="font-700">mm/Hg</h3>
                      </div>
                    </div>
                  </div>

                  
                  <div className="flex flex-row px-60">
                    <h3 className="font-700">{`Color Vision/Ishihara:\u00A0\u00A0\u00A0\u00A0 OD:`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 50 }}
                      id="standard-basic"
                      value={form?.odVision}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'odVision '}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <h3 className="font-700">{`/ 7\u00A0\u00A0\u00A0\u00A0 OS:`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 50 }}
                      id="standard-basic"
                      value={form?.osVision}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'osVision '}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <h3 className="font-700">/ 7</h3>
                    <br></br>
                  </div>
                  <div className="flex flex-row px-60">
                    <br></br>
                    <h3 className="font-700">{`Stereopsis:\u00A0\u00A0\u00A0\u00A0`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 50 }}
                      id="standard-basic"
                      value={form?.Stereopsistime}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'Stereopsistime '}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <h3 className="font-700">{`sec\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
                                              \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
                                              \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Binoular:\u00A0\u00A0`}</h3>

                    
                    <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-10"
                    row
                    aria-label="binouler"
                    name="binouler"
                    value={form?.binouler}
                    onChange={handleChange}>
                    <FormControlLabel
                      value="Yes"
                      control={<Radio />}
                      disabled={disabledState}
                      label="Yes"
                    />
                    <FormControlLabel
                      value="No"
                      disabled={disabledState}
                      control={<Radio />}
                      label="No"
                    />
                  </RadioGroup>
                </FormControl>
                <br></br>
                  </div>
                  <div className="flex flex-row px-60">
                    <h3 className="font-700">{`Phoria:\u00A0(H)\u00A0\u00A0`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 50 }}
                      id="standard-basic"
                      value={form?.Phoriah}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'Phoriah '}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    
                    
                    <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-10"
                    row
                    aria-label="Phoriah"
                    name="Phoriah"
                    value={form?.Phoriah}
                    onChange={handleChange}>
                    <FormControlLabel
                      value="XP"
                      control={<Radio />}
                      disabled={disabledState}
                      label="XP"
                    />
                    <h3 className="font-700">{`\u00A0/\u00A0\u00A0`}</h3>

                    <FormControlLabel
                      value="EP"
                      disabled={disabledState}
                      control={<Radio />}
                      label="EP"
                    />
                  </RadioGroup>
                </FormControl>

                    <h3 className="font-700">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
                                              \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0
                                               ( V ):\u00A0\u00A0`}</h3>

<TextField
                      size="small"
                      style={{ width: 50 }}
                      id="standard-basic"
                      value={form?.Phoriav}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'Phoriav '}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-10"
                    row
                    aria-label="Phoriav"
                    name="Phoriav"
                    value={form?.Phoriav}
                    onChange={handleChange}>
                    <FormControlLabel
                      value="RH"
                      control={<Radio />}
                      disabled={disabledState}
                      label="RH"
                    />
                    <h3 className="font-700">{`\u00A0/\u00A0\u00A0`}</h3>
                    <FormControlLabel
                      value="LH"
                      disabled={disabledState}
                      control={<Radio />}
                      label="LH"
                    />
                  </RadioGroup>
                </FormControl>
                <br></br>
                  </div>
                  
                  <div className="flex flex-row px-60">
                    <h3 className="font-700">{`Blood Pressure: \u00A0`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 50 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.bpUp}
                      onChange={handleChange}
                      name={'bpUp'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <h3 className="font-700 pt-10">/</h3>
                    <TextField
                      size="small"
                      style={{ width: 50 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.bpDown}
                      onChange={handleChange}
                      name={'bpDown'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <h3 className="font-700 ml-10">@ Time</h3>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container>
                        <KeyboardTimePicker
                          className="m-0 px-24"
                          margin="normal"
                          disabled={disabledState}
                          id="time-picker"
                          value={form?.bpTime}
                          onChange={(date) => {
                            handleChange({ target: { name: 'bpTime', value: date } });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change time'
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                  </div>
                  <div className="flex flex-row px-60">
                    <div className="p-2 w-1/5 h-auto ">
                      <h4 className="text-center">EG Rx</h4>
                    </div>
                    <div className="p-2 w-1/5 h-auto ">
                      <h4 className="text-center">Sphere</h4>
                    </div>
                    <div className="p-2 w-1/5 h-auto ">
                      <h4 className="text-center">Cylinder</h4>
                    </div>
                    <div className="p-2 w-1/5 h-auto ">
                      <h4 className="text-center">Axis</h4>
                    </div>
                    <div className="p-2 w-1/5 h-auto ">
                      <h4 className="text-center">ADD</h4>
                    </div>
                  </div>
                  <div className="flex flex-row px-60">
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <h4 className="text-center font-700">OD</h4>
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        disabled={disabledState}
                        id="standard-basic"
                        value={form?.odSphere}
                        onChange={handleChange}
                        name={'odSphere'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.odCylinder}
                        onChange={handleChange}
                        name={'odCylinder'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.odAxis}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'odAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.odAdd}
                        onChange={handleChange}
                        disabled={disabledState}
                        name={'odAdd'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row px-60">
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <h4 className="text-center font-700">OS</h4>
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        disabled={disabledState}
                        id="standard-basic"
                        value={form?.osSphere}
                        onChange={handleChange}
                        name={'osSphere'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        disabled={disabledState}
                        id="standard-basic"
                        value={form?.osCylinder}
                        onChange={handleChange}
                        name={'osCylinder'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.osAxis}
                        onChange={handleChange}
                        name={'osAxis'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                    <div className="p-8 w-1/5 h-auto border-grey-400 border-solid border-1">
                      <TextField
                        size="small"
                        fullWidth
                        id="standard-basic"
                        value={form?.osAdd}
                        disabled={disabledState}
                        onChange={handleChange}
                        name={'osAdd'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                      <br></br><br></br>
                    </div>
                  </div>
                </div>
                {/* <div className="p-8 ">
              <div className="flex flex-row px-60">
                <h3 className="font-700 pt-10">{`Amsler Grid:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 OD \u00A0\u00A0`}</h3>
                <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-10"
                    row
                    aria-label="amslerGridOd"
                    name="amslerGridOd"
                    value={form?.amslerGridOd}
                    onChange={handleChange}>
                    <FormControlLabel
                      value="odNeg"
                      control={<Radio />}
                      disabled={disabledState}
                      label="Neg"
                    />
                    <FormControlLabel
                      value="odPos"
                      disabled={disabledState}
                      control={<Radio />}
                      label="Pos"
                    />
                  </RadioGroup>
                </FormControl>
                <h3 className="font-700 pt-10">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 OS \u00A0\u00A0`}</h3>
                <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-10"
                    row
                    aria-label="amslerGridOs"
                    name="amslerGridOs"
                    value={form?.amslerGridOs}
                    onChange={handleChange}>
                    <FormControlLabel
                      value="osNeg"
                      disabled={disabledState}
                      control={<Radio />}
                      label="Neg"
                    />
                    <FormControlLabel
                      value="osPos"
                      disabled={disabledState}
                      control={<Radio />}
                      label="Pos"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="flex flex-row px-60">
                <h3 className="font-700 pt-10">FDT: </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      className="ml-24"
                      checked={form?.fdtDeclined}
                      disabled={disabledState}
                      onChange={handleChange}
                      name="fdtDeclined"
                    />
                  }
                  label="Patient Declined"
                />
              </div>
              <div className="flex flex-row px-60">
                <h3 className="font-700 pt-10">RCI: </h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      className="ml-24"
                      checked={form?.rciDeclined}
                      disabled={disabledState}
                      onChange={handleChange}
                      name="rciDeclined"
                    />
                  }
                  label="Patient Declined"
                />
              </div>
              <div className="flex flex-row px-60">
                <h3 className="font-700 pt-10">OD:</h3>
                <div className="ml-24">
                  <FormControl component="fieldset">
                    <RadioGroup
                      className="ml-28"
                      row
                      aria-label="amslerOd"
                      name="amslerOd"
                      value={form?.amslerOd}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="noDefect"
                        control={<Radio />}
                        disabled={disabledState}
                        label="No Defect"
                      />
                      <FormControlLabel
                        value="other"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  {form?.amslerOd === 'other' && (
                    <TextField
                      className="ml-12"
                      size="small"
                      id="outlined-multiline-static"
                      label="Other"
                      value={form?.otherOdDefect}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'otherOdDefect'}
                      variant="outlined"
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row px-60">
                <h3 className="font-700 pt-10">OS:</h3>
                <div className="ml-24">
                  <FormControl component="fieldset">
                    <RadioGroup
                      className="ml-28"
                      row
                      aria-label="amslerOs"
                      name="amslerOs"
                      value={form?.amslerOs}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="noDefect"
                        disabled={disabledState}
                        control={<Radio />}
                        label="No Defect"
                      />
                      <FormControlLabel
                        value="other"
                        control={<Radio />}
                        disabled={disabledState}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  {form?.amslerOs === 'other' && (
                    <TextField
                      className="ml-12"
                      size="small"
                      id="outlined-multiline-static"
                      label="Other"
                      disabled={disabledState}
                      value={form?.otherOsDefect}
                      onChange={handleChange}
                      name={'otherOsDefect'}
                      variant="outlined"
                    />
                  )}
                </div>
              </div>
              
            </div> */}
              </div>
            </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11"> 

          <div className="flex flex-row w-full">

              <div className=" w-full h-auto justify-between">
                <div className="flex flex-row justify-around">
                <div className="flex-1 w-1/5 flex flex-row ">
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.diagnosticLenses}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="diagnosticLenses"
                      />
                    }
                    label="Diagnostic Lenses"
                  />
                </div>
                <div className="flex-1 w-1/5 flex flex-row ">
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.seeAtDispense}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="seeAtDispense"
                      />
                    }
                    label="See At Dispense"
                  />
                </div>
                <div className="flex-1 w-1/5 flex flex-row ">
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.finalRx}
                        disabled={disabledState}
                        onChange={handleChange}
                        name="finalRx"
                      />
                    }
                    label="Final Rx"
                  />
                </div>
                <div className="flex-1 w-1/5 flex flex-row ">
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.followUpRequired}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="followUpRequired"
                      />
                    }
                    label="Follow-Up Required"
                  />
                </div>
                <div className="flex-1 w-1/5 flex flex-row ">
                <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.R1}
                        disabled={disabledState}
                        onChange={handleChange}
                        name="R1"
                      />
                    }
                    label={`1 \u00A0\u00A0& \u00A0\u00A0R`}
                  />
                </div>
                </div>
                <div className="flex flex-row px-25">
                  <div className="p-2 w-1/7  h-auto flex-1">
                    <h3 className="text-center font-700">CL RX</h3>
                  </div>
                  <div className="p-2 w-1/7  h-auto flex-1">
                    <h3 className="text-center font-700">Sphere</h3>
                  </div>
                  <div className="p-2 w-1/7  h-auto flex-1">
                    <h3 className="text-center font-700">Cylinder</h3>
                  </div>
                  <div className="p-2 w-1/7  h-auto flex-1">
                    <h3 className="text-center font-700">Axis</h3>
                  </div>
                  <div className="p-2 w-1/7  h-auto flex-1">
                    <h3 className="text-center font-700">BC</h3>
                  </div>
                  <div className="p-2 w-1/7  h-auto flex-1">
                    <h3 className="text-center font-700">DIA</h3>
                  </div>
                  <div className="p-2 w-1/7  h-auto flex-1">
                    <h3 className="text-center font-700">Brand</h3>
                  </div>
                </div>
                <div className="flex flex-row px-60">
                  <div className="p-8 flex-1 w-1/7  h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OD</h3>
                  </div>
                  <div className="p-8 flex-1 w-1/7   h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOdSphere}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'clrxOdSphere'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOdCylinder}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'clrxOdCylinder'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  lex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOdAxis}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'clrxOdAxis'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOdBc}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'clrxOdBc'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOdDia}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'clrxOdDia'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOdBrand}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'clrxOdBrand'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-row px-60">
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OS</h3>
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOsSphere}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'clrxOsSphere'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOsCylinder}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'clrxOsCylinder'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOsAxis}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'clrxOsAxis'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOsBc}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'clrxOsBc'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOsDia}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'clrxOsDia'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7  flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.clrxOsBrand}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'clrxOsBrand'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row px-25">
                  <div className="p-1 w-1/8  h-auto flex-1">
                    <h3 className="text-center font-700">SUBJ RX</h3>
                  </div>
                  <div className="p-1 w-1/8 h-auto flex-1">
                    <h3 className="text-center font-700">Sphere</h3>
                  </div>
                  <div className="p-1 w-1/8 h-auto flex-1">
                    <h3 className="text-center font-700">Cylinder</h3>
                  </div>
                  <div className="p-1 w-1/8 h-auto flex-1">
                    <h3 className="text-center font-700">Axis</h3>
                  </div>
                  <div className="p-1 w-1/8 h-auto flex-1">
                    <h3 className="text-center font-700">Prism/Base</h3>
                  </div>
                  <div className="p-1 w-1/8 h-auto flex-1">
                    <h3 className="text-center font-700">VA</h3>
                  </div>
                  <div className="p-1 w-1/8 h-auto flex-1">
                    <h3 className="text-center font-700">Add</h3>
                  </div>
                  <div className="p-1 w-1/8 h-auto flex-1">
                    <h3 className="text-center font-700">VA</h3>
                  </div>
                </div>
                <div className="flex flex-row px-60">
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OD</h3>
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.subjRxOdSphere}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'subjRxOdSphere'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.subjRxOdCylinder}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'subjRxOdCylinder'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.subjRxOdAxis}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'subjRxOdAxis'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.subjRxOdPrismBase}
                      onChange={handleChange}
                      name={'subjRxOdPrismBase'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <div className="flex flex-row justify-center">
                      <h3 className="text-center font-700">20/</h3>
                      <TextField
                        size="small"
                        style={{ width: 50 }}
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.subjRxOdVa1}
                        onChange={handleChange}
                        name={'subjRxOdVa1'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.subjRxOdAdd}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'subjRxOdAdd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <div className="flex flex-row justify-center">
                      <h3 className="text-center font-700">20/</h3>
                      <TextField
                        size="small"
                        style={{ width: 50 }}
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.subjRxOdVa2}
                        onChange={handleChange}
                        name={'subjRxOdVa2'}
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

                <div className="flex flex-row px-60">
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OS</h3>
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.subjRxOsSphere}
                      onChange={handleChange}
                      name={'subjRxOsSphere'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.subjRxOsCylinder}
                      onChange={handleChange}
                      name={'subjRxOsCylinder'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.subjRxOsAxis}
                      onChange={handleChange}
                      name={'subjRxOsAxis'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      disabled={disabledState}
                      id="standard-basic"
                      value={form?.subjRxOsPrismBase}
                      onChange={handleChange}
                      name={'subjRxOsPrismBase'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <div className="flex flex-row justify-center">
                      <h3 className="text-center font-700">20/</h3>
                      <TextField
                        size="small"
                        style={{ width: 50 }}
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.subjRxOsVa1}
                        onChange={handleChange}
                        name={'subjRxOsVa1'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.subjRxOsAdd}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'subjRxOsAdd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <div className="flex flex-row justify-center">
                      <h3 className="text-center font-700">20/</h3>
                      <TextField
                        size="small"
                        style={{ width: 50 }}
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.subjRxOsVa2}
                        onChange={handleChange}
                        name={'subjRxOsVa2'}
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

                <div className="flex flex-row px-px-60">
                  <div className="p-2  w-1/7 h-auto flex-1">
                    <h3 className="text-center font-700">EG RX</h3>
                  </div>
                  <div className="p-2 w-1/7 h-auto flex-1">
                    <h3 className="text-center font-700">Sphere</h3>
                  </div>
                  <div className="p-2 w-1/7 h-auto flex-1">
                    <h3 className="text-center font-700">Cylinder</h3>
                  </div>
                  <div className="p-2 w-1/7 h-auto flex-1">
                    <h3 className="text-center font-700">Axis</h3>
                  </div>
                  <div className="p-2 w-1/7 h-auto flex-1">
                    <h3 className="text-center font-700">Prism/Base</h3>
                  </div>
                  <div className="p-2 w-1/7 h-auto flex-1">
                    <h3 className="text-center font-700">VA</h3>
                  </div>
                  <div className="p-2 w-1/7 h-auto flex-1">
                    <h3 className="text-center font-700">Add</h3>
                  </div>
                </div>
                <div className="flex flex-row px-60">
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OD</h3>
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.egRxOdSphere}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'egRxOdSphere'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.egRxOdCylinder}
                      onChange={handleChange}
                      disabled={disabledState}
                      name={'egRxOdCylinder'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={form?.egRxOdAxis}
                      disabled={disabledState}
                      onChange={handleChange}
                      name={'egRxOdAxis'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8  w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.egRxOdPrismBase}
                      onChange={handleChange}
                      name={'egRxOdPrismBase'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <div className="flex flex-row justify-center">
                      <h3 className="text-center font-700">20/</h3>
                      <TextField
                        size="small"
                        style={{ width: 50 }}
                        id="standard-basic"
                        disabled={disabledState}
                        value={form?.egRxOdVa1}
                        onChange={handleChange}
                        name={'egRxOdVa1'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.egRxOdAdd}
                      onChange={handleChange}
                      name={'egRxOdAdd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                </div>

                <div className="flex flex-row px-60">
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OS</h3>
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.egRxOsSphere}
                      onChange={handleChange}
                      name={'egRxOsSphere'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.egRxOsCylinder}
                      onChange={handleChange}
                      name={'egRxOsCylinder'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.egRxOsAxis}
                      onChange={handleChange}
                      name={'egRxOsAxis'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.egRxOsPrismBase}
                      onChange={handleChange}
                      name={'egRxOsPrismBase'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <div className="flex flex-row justify-center">
                      <h3 className="text-center font-700">20/</h3>
                      <TextField
                        size="small"
                        style={{ width: 50 }}
                        disabled={disabledState}
                        id="standard-basic"
                        value={form?.egRxOsVa1}
                        onChange={handleChange}
                        name={'egRxOsVa1'}
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                        type="number"
                      />
                    </div>
                  </div>
                  <div className="p-8 w-1/7 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      disabled={disabledState}
                      id="standard-basic"
                      value={form?.egRxOsAdd}
                      onChange={handleChange}
                      name={'egRxOsAdd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                  </div>
                </div>
                <div className="flex flex-row px-60">
                  <TextField
                    className="mt-12"
                    size="medium"
                    disabled={disabledState}
                    id="outlined-multiline-static"
                    label="NRA/PRA"
                    value={form?.nraPra}
                    onChange={handleChange}
                    name={'nraPra'}
                    variant="outlined"
                  />
                  <TextField
                    className="ml-12 mt-12"
                    size="medium"
                    disabled={disabledState}
                    id="outlined-multiline-static"
                    label="BCC"
                    value={form?.bcc}
                    onChange={handleChange}
                    name={'bcc'}
                    variant="outlined"
                  />
                </div>
                <div className="flex flex-row px-60">
                  <TextField
                    className="mt-10 "
                    fullWidth
                    InputProps={{ style: { fontSize: 20 } }}
                    disabled={disabledState}
                    InputLabelProps={{ style: { fontSize: 20 } }}
                    id="outlined-multiline-static"
                    label="Additional Testing"
                    multiline
                    rows={3}
                    value={form?.additionalTesting}
                    onChange={handleChange}
                    name={'additionalTesting'}
                    variant="outlined"
                  />

                  <br></br>
                </div>
                <br></br><br></br>
              </div>
            </div>
            <br></br>
          </div>
          <br></br>
          <div className="flex flex-row justify-center ">
            <div className="  h-auto justify-center">
              <div className="flex flex-row">
                <br></br><br></br>
                <div className="flex-1 w-1/3 flex flex-row ">
                <h3 className="font-700 " >{`CT: UCT `}</h3>
                <TextField
                  size="small"
                  id="outlined-multiline-static"
                  style={{ width: 100 }}
                  disabled={disabledState}
                  value={form?.ctUct}
                  onChange={handleChange}
                  name={'ctUct'}
                  
                />
                </div>
                <div className="flex-1 w-1/3 flex flex-row ">
                <h3 className="font-700 pl-6 pt-6">CF: OD</h3>
                <TextField 
                  size="small"
                  id="outlined-multiline-static"
                  style={{ width: 100 }}
                  disabled={disabledState}
                  value={form?.cfod}
                  onChange={handleChange}
                  name={'cfod'}
                  
                />
                </div>
                <div className="flex-1 w-1/3 flex flex-row ">
                 
                
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="cfOd"
                      name="cfOd"
                      value={form?.cfOd}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="ftfc"
                        disabled={disabledState}
                        control={<Radio />}
                        label="FTFC"
                      />
                      <FormControlLabel
                        value="other"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  {form?.cfOd === 'other' && (
                    <TextField
                      className="ml-8"
                      style={{ width: 100 }}
                      size="small"
                      disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Other"
                      value={form?.otherCfod}
                      onChange={handleChange}
                      name={'otherCfod'}
                      variant="outlined"
                    />
                  )}
                
                </div>
                
                {/* <h3 className="font-700 pl-6 pt-6">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>

                <h3 className="font-700 pl-6 pt-6">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 CF:\u00A0\u00A0\u00A0OD\u00A0\u00A0\u00A0`}</h3>
                */}
                 {/* <h3 className="font-700 pl-6 pt-6">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3> */}

              </div>

              <div className="flex flex-row justify-center">
              <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="act"
                      name="act"
                      value={form?.act}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="C"
                        disabled={disabledState}
                        control={<Radio />}
                        label="C"
                      />
                       <h3 className="font-700 pl-6 pt-6">{`\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>

                      <FormControlLabel
                        value="SC"
                        disabled={disabledState}
                        control={<Radio />}
                        label="SC"
                      />
                    </RadioGroup>
                  </FormControl>
                  

                <h3 className="font-700 p-6">{`\u00A0\u00A0\u00A0\u00A0\u00A0ACT\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
                <TextField
                  size="small"
                  id="outlined-multiline-static"
                  style={{ width: 100 }}
                  disabled={disabledState}
                  value={form?.cscAct}
                  onChange={handleChange}
                  name={'cscAct'}
                  
                />
                <h3 className="font-700 pl-6 pt-6">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 CF:\u00A0\u00A0\u00A0OS\u00A0\u00A0\u00A0`}</h3>
                <TextField
                  size="small"
                  id="outlined-multiline-static"
                  style={{ width: 100 }}
                  disabled={disabledState}
                  value={form?.cfos}
                  onChange={handleChange}
                  name={'cfos'}
                  
                />
                 <h3 className="font-700 pl-6 pt-6">{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>

                <div className="ml-10">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="cfOs"
                      name="cfOs"
                      value={form?.cfOs}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="ftfc"
                        disabled={disabledState}
                        control={<Radio />}
                        label="FTFC"
                      />
                      <FormControlLabel
                        value="other"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  {form?.cfOs === 'other' && (
                    <TextField
                      className="ml-8"
                      style={{ width: 100 }}
                      size="small"
                      disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Other"
                      value={form?.otherCfos}
                      onChange={handleChange}
                      name={'otherCfos'}
                     
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row justify-center">
              <h3 className="font-700 pl-6 pt-6">{`EOM'S OD\u00A0\u00A0\u00A0\u00A0`}</h3>
                    
                <div className="ml-10">
                  <FormControl component="fieldset">
                    <RadioGroup
                      row
                      aria-label="eodod"
                      name="eodod"
                      value={form?.eodod}
                      onChange={handleChange}>
                      <FormControlLabel
                        value="From"
                        disabled={disabledState}
                        control={<Radio />}
                        label="From"
                      />
                      <FormControlLabel
                        value="other"
                        disabled={disabledState}
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                  </FormControl>
                  {form?.eodod === 'other' && (
                    <TextField
                      className="ml-8"
                      style={{ width: 100 }}
                      size="small"
                      disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Other"
                      value={form?.eomOdFromOther1}
                      onChange={handleChange}
                      name={'eomOdFromOther1'}
                     
                    />
                  )}
                </div>
               
              </div>
              <div className="flex flex-row justify-center">
              <h3 className="font-700 pl-6 pt-6">{`EOM'S OS\u00A0\u00A0\u00A0\u00A0`}</h3>
                    
                    <div className="ml-10">
                      <FormControl component="fieldset">
                        <RadioGroup
                          row
                          aria-label="eodos"
                          name="eodos"
                          value={form?.eodos}
                          onChange={handleChange}>
                          <FormControlLabel
                            value="From"
                            disabled={disabledState}
                            control={<Radio />}
                            label="From"
                          />
                          <FormControlLabel
                            value="other"
                            disabled={disabledState}
                            control={<Radio />}
                            label="Other"
                          />
                        </RadioGroup>
                      </FormControl>
                      {form?.eodos === 'other' && (
                        <TextField
                          className="ml-8"
                          style={{ width: 100 }}
                          size="small"
                          disabled={disabledState}
                          id="outlined-multiline-static"
                          label="Other"
                          value={form?.eomOsFromOther}
                          onChange={handleChange}
                          name={'eomOsFromOther'}
                         
                        />
                      )}
                      <br></br><br></br>
                    </div>
               
                
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              Purpose for Eyeglasses
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row">
            <div className="flex-1">
              <h3 className="font-700 text-center">OD</h3>
            </div>
            <div className="flex-1">
              <h3 className="font-700 text-center">OS</h3>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="odComfort"
                  name="odComfort"
                  value={form?.odComfort}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="good"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Good"
                  />
                  <FormControlLabel
                    value="poor"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Poor"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex-1">
              <h3 className="font-700 text-center pt-8">Comfort</h3>
            </div>
            <div className="flex-1">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="osComfort"
                  name="osComfort"
                  value={form?.osComfort}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="good"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Good"
                  />
                  <FormControlLabel
                    value="poor"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Poor"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="flex-1">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="odMovement"
                  name="odMovement"
                  value={form?.odMovement}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="good"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Good"
                  />
                  <FormControlLabel
                    value="poor"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Poor"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="flex-1">
              <h3 className="font-700 text-center pt-8">Movement</h3>
            </div>
            <div className="flex-1">
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="osMovement"
                  name="osMovement"
                  value={form?.osMovement}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="good"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Good"
                  />
                  <FormControlLabel
                    value="poor"
                    control={<Radio />}
                    disabled={disabledState}
                    label="Poor"
                  />
                </RadioGroup>
              </FormControl>
            </div>
          </div>

          <div className="flex flex-row justify-around">
            <div className="flex-1 ">
              <div className="flex flex-row justify-center">
                <h3 className="font-700 text-center pt-8">20/</h3>
                <TextField
                  size="small"
                  style={{ width: 50 }}
                  id="standard-basic"
                  value={form?.odRotation}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'odRotation'}
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
          <div className="flex-1 ">
            <div className="flex flex-row justify-center">
              <h3 className="font-700 text-center pt-8">20/</h3>
              <TextField
                size="small"
                style={{ width: 50 }}
                id="standard-basic"
                value={form?.osRotation}
                disabled={disabledState}
                onChange={handleChange}
                name={'osRotation'}
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
      </div> */}
  <div className="flex flex-col h-260 py-6">
          <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
              PUPILS
              </h1>
            </div>
            <br></br>
            <div className="flex flex-row justify-center">
            <h3 className="font-700">{`Dim \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
            <h3 className="font-700">{`Light \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
            <h3 className="font-700">{`Reaction`}</h3>

<br></br>
            </div>
            <div className="flex flex-row justify-center">
                    <h3 className="font-700">{`OD: \u00A0`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 80 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.oddim}
                      onChange={handleChange}
                      name={'oddim'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <h3 className="font-700 pt-10">{`\u00A0-\u00A0`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 80 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.odlight}
                      onChange={handleChange}
                      name={'odlight'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                   <h3 className="font-700 pt-10">{`\u00A0PERRLA\u00A0`}</h3>
                   <TextField
                      size="small"
                      style={{ width: 80 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.odreaction}
                      onChange={handleChange}
                      name={'odreaction'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />

                  </div>
                  
            <div className="flex flex-row justify-center">
                    <h3 className="font-700">{`OS: \u00A0`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 80 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.osdim}
                      onChange={handleChange}
                      name={'osdim'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                    <h3 className="font-700 pt-10">{`\u00A0-\u00A0`}</h3>
                    <TextField
                      size="small"
                      style={{ width: 80 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.oslight}
                      onChange={handleChange}
                      name={'oslight'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
                   <h3 className="font-700 pt-10">{`\u00A0PERRLA\u00A0`}</h3>
                   <TextField
                      size="small"
                      style={{ width: 80 }}
                      id="standard-basic"
                      disabled={disabledState}
                      value={form?.osreaction}
                      onChange={handleChange}
                      name={'osreaction'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                      type="number"
                    />
<br></br>
                  </div>
                  <div className="flex flex-row justify-center">
				

        <div className="flex-1 flex flex-row ">
         <h3 className=" font-700 text-center"> {`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0RAPD\u00A0\u00A0\u00A0\u00A0`}</h3>
         <FormControl component="fieldset">
                  <RadioGroup
                    className="ml-10"
                    row
                    aria-label="RAPD"
                    name="RAPD"
                    value={form?.RAPD}
                    onChange={handleChange}>
                    <FormControlLabel
                      value="POS"
                      control={<Radio />}
                      disabled={disabledState}
                      label="POS"
                    />
                    <FormControlLabel
                      value="NEG"
                      disabled={disabledState}
                      control={<Radio />}
                      label="NEG"
                    />
                  </RadioGroup>
                </FormControl>
        </div>
        <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>

<div className="flex-1 flex flex-row justify-center ">
          <FormControlLabel
            control={
              <Checkbox
                checked={form?.pupilod}
                onChange={handleChange}
                disabled={disabledState}
                name="pupilod"
              />
            }
           label="OD"
          />
                   <h3 >{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
           <FormControlLabel
            control={
              <Checkbox
                checked={form?.pupiloos}
                onChange={handleChange}
                disabled={disabledState}
                name="pupilos"
              />
            }
           label="OS"
          />
                             <h3 >{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>

           <FormControlLabel
            control={
              <Checkbox
                checked={form?.pupilou}
                onChange={handleChange}
                disabled={disabledState}
                name="pupilou"
              />
            }
           label="OU"
          />
  
        </div>

        
      </div>

                  

          </div>
        </div>

        <div className="flex flex-col h-260 py-6">
          <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
              SLIT LAMP EXAMINATION
              </h1>
            </div>
            <br></br>
            <div className="flex flex-row justify-center">
              <div className=" flex  flex-1 justify-around">
                <h3 className="font-700 text-center pt-8">OD</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.slitOdNormal}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.checked) {
                          setForm({
                            ...form,
                            odTears: 'Normal',
                            odLashes: 'Normal',
                            odCornea: 'Normal',
                            odPalConj: 'Normal',
                            odBulConj: 'Normal',
                            odAntChamber: 'Normal',
                            odIris: 'Normal',
                            odLens: 'Normal',
                            odAntVit: 'Normal'
                          });
                        } else {
                          setForm({
                            ...form,
                            odTears: '',
                            odLashes: '',
                            odCornea: '',
                            odPalConj: '',
                            odBulConj: '',
                            odAntChamber: '',
                            odIris: '',
                            odLens: '',
                            odAntVit: ''
                          });
                        }
                      }}
                      disabled={disabledState}
                      name="slitOdNormal"
                    />
                  }
                  label="None"
                />
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className=" flex  flex-1 justify-around">
                <h3 className="font-700 text-center pt-8">OS</h3>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.slitOsNormal}
                      onChange={(e) => {
                        handleChange(e);
                        if (e.target.checked) {
                          setForm({
                            ...form,
                            osTears: 'Normal',
                            osLashes: 'Normal',
                            osCornea: 'Normal',
                            osPalConj: 'Normal',
                            osBulConj: 'Normal',
                            osAntChamber: 'Normal',
                            osIris: 'Normal',
                            osLens: 'Normal',
                            osAntVit: 'Normal'
                          });
                        } else {
                          setForm({
                            ...form,
                            osTears: '',
                            osLashes: '',
                            osCornea: '',
                            osPalConj: '',
                            osBulConj: '',
                            osAntChamber: '',
                            osIris: '',
                            osLens: '',
                            osAntVit: ''
                          });
                        }
                      }}
                      disabled={disabledState}
                      name="slitOsNormal"
                    />
                  }
                  label="None"
                />
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="flex-1">
                <h3 className="font-700 text-center">Other</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1">
                <h3 className="font-700 text-center">Other</h3>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center ">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  disabled={disabledState}
                  value={form?.odTears}
                  onChange={handleChange}
                  name={'odTears'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Tears</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  disabled={disabledState}
                  value={form?.osTears}
                  onChange={handleChange}
                  name={'osTears'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.odLashes}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'odLashes'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Lids/Lashes</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.osLashes}
                  onChange={handleChange}
                  disabled={disabledState}
                  name={'osLashes'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.odCornea}
                  onChange={handleChange}
                  disabled={disabledState}
                  name={'odCornea'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Cornea</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.osCornea}
                  onChange={handleChange}
                  disabled={disabledState}
                  name={'osCornea'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Q </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.odPalConj}
                  onChange={handleChange}
                  disabled={disabledState}
                  name={'odPalConj'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Pal Conj</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Q </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.osPalConj}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'osPalConj'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Q </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.odBulConj}
                  onChange={handleChange}
                  disabled={disabledState}
                  name={'odBulConj'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Bul Conj</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Q </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.osBulConj}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'osBulConj'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">D/Q </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.odAntChamber}
                  onChange={handleChange}
                  disabled={disabledState}
                  name={'odAntChamber'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Ant Chamber</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">D/Q </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  disabled={disabledState}
                  value={form?.osAntChamber}
                  onChange={handleChange}
                  name={'osAntChamber'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Flat </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  disabled={disabledState}
                  value={form?.odIris}
                  onChange={handleChange}
                  name={'odIris'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Iris</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Flat </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.osIris}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'osIris'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.odLens}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'odLens'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Lens</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  disabled={disabledState}
                  value={form?.osLens}
                  onChange={handleChange}
                  name={'osLens'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
            </div>

            <div className="flex flex-row ">
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.odAntVit}
                  disabled={disabledState}
                  onChange={handleChange}
                  name={'odAntVit'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">Ant Vit</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <h3 className="font-700 text-center">CL </h3>
                <TextField
                  size="small"
                  id="standard-basic"
                  value={form?.osAntVit}
                  onChange={handleChange}
                  disabled={disabledState}
                  name={'osAntVit'}
                  InputProps={{
                    inputProps: {
                      style: { textAlign: 'center' }
                    }
                  }}
                />
              </div>


            </div>
          </div>


          <div className="flex flex-col h-260 py-6">
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                FUNDUS EXAMINATION
                </h1>
              </div>
              <br></br>
              <div className="flex flex-row justify-center">
                <div className=" flex flex-row flex-1 justify-around">
                  <h3 className="font-700 text-center pt-8">OD</h3>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.fundusOdNormal}
                        onChange={(e) => {
                          handleChange(e);
                          if (e.target.checked) {
                            setForm({
                              ...form,
                              odVessels: 'Normal',
                              odAV: 'Normal',
                              odMedia: 'Normal',
                              odMacula: 'Normal',
                              odPostPole: 'Normal',
                              odVitreous: 'Normal',
                              odDiscMargins: 'Normal'
                            });
                          } else {
                            setForm({
                              ...form,
                              odVessels: '',
                              odAV: '',
                              odMedia: '',
                              odMacula: '',
                              odPostPole: '',
                              odVitreous: '',
                              odDiscMargins: ''
                            });
                          }
                        }}
                        disabled={disabledState}
                        name="fundusOdNormal"
                      />
                    }
                    label="None"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="hidden font-700 text-center">Hidden</h3>
                </div>
                <div className=" flex flex-row flex-1 justify-around">
                  <h3 className="font-700 text-center pt-8">OS</h3>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.fundusOsNormal}
                        onChange={(e) => {
                          handleChange(e);
                          if (e.target.checked) {
                            setForm({
                              ...form,
                              osVessels: 'Normal',
                              osAV: 'Normal',
                              osMedia: 'Normal',
                              osMacula: 'Normal',
                              osPostPole: 'Normal',
                              osVitreous: 'Normal',
                              osDiscMargins: 'Normal'
                            });
                          } else {
                            setForm({
                              ...form,
                              osVessels: '',
                              osAV: '',
                              osMedia: '',
                              osMacula: '',
                              osPostPole: '',
                              osVitreous: '',
                              osDiscMargins: ''
                            });
                          }
                        }}
                        disabled={disabledState}
                        name="fundusOsNormal"
                      />
                    }
                    label="None"
                  />
                </div>
              </div>
              {/* <div className="flex flex-row justify-center">
                <div className="flex-1">
                  <h3 className="font-700 text-center">Other</h3>
                </div>
                <div className="flex-1">
                  <h3 className="hidden font-700 text-center">hidden</h3>
                </div>
                <div className="flex-1">
                  <h3 className="font-700 text-center">Other</h3>
                </div>
              </div> */}
              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-center">
                  <h4 className="font-700 text-center whitespace-no-wrap">
                    Norm Caliber{' '}
                  </h4>
                  <TextField
                    size="small"
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.odVessels}
                    onChange={handleChange}
                    name={'odVessels'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">Vessels</h3>
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h4 className="font-700 text-center whitespace-no-wrap">
                    Norm Caliber{' '}
                  </h4>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.osVessels}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'osVessels'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">2/3 </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.odAV}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'odAV'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">A / V</h3>
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">2/3 </h3>
                  <TextField
                    size="small"
                    disabled={disabledState}
                    id="standard-basic"
                    value={form?.osAV}
                    onChange={handleChange}
                    name={'osAV'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">CL </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.odMedia}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'odMedia'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">Media</h3>
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">CL </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.osMedia}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'osMedia'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">CL </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.odMacula}
                    onChange={handleChange}
                    name={'odMacula'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">Macula</h3>
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">CL </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.osMacula}
                    onChange={handleChange}
                    disabled={disabledState}
                    name={'osMacula'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center whitespace-no-wrap">
                    Flat Norm{' '}
                  </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.odPostPole}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'odPostPole'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center whitespace-no-wrap">
                    Post Pole
                  </h3>
                </div>
                <div className="flex-1 flex flex-row justify-center ">
                  <h3 className="font-700 text-center whitespace-no-wrap">
                    Flat Norm{' '}
                  </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.osPostPole}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'osPostPole'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center ">
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">CL </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.odVitreous}
                    onChange={handleChange}
                    disabled={disabledState}
                    name={'odVitreous'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">Vitreous</h3>
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">CL </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.osVitreous}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'osVitreous'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">Distinct </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.odDiscMargins}
                    onChange={handleChange}
                    name={'odDiscMargins'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">Disc Margins</h3>
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">Distinct </h3>
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.osDiscMargins}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'osDiscMargins'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-around">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.fovealLightReflexOd}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="fovealLightReflexOd"
                      />
                    }
                    label="Yes"
                  />
                  <h3 className="font-700 text-center pt-10">
                    Foveal Light Reflex{' '}
                  </h3>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.fovealLightReflexOs}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="fovealLightReflexOs"
                      />
                    }
                    label="Yes"
                  />
                </div>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row justify-center">
                  <TextField
                    size="small"
                    id="standard-basic"
                    value={form?.odCDRatio}
                    disabled={disabledState}
                    onChange={handleChange}
                    name={'odCDRatio'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <h3 className="font-700 text-center">C/D Ratio</h3>
                </div>
                <div className="flex-1 flex flex-row justify-center">
                  <TextField
                    size="small"
                    id="standard-basic"
                    disabled={disabledState}
                    value={form?.osCDRatio}
                    onChange={handleChange}
                    name={'osCDRatio'}
                    InputProps={{
                      inputProps: {
                        style: { textAlign: 'center' }
                      }
                    }}
                    type="number"
                  />
                  <br></br><br></br>
                </div>
              </div>

            </div>
          </div>

          <div className="flex flex-col h-260 py-6">
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                DILATION
                </h1>
              </div>
              <br></br>
              <div className="flex flex-row justify-center">
                <h3>@</h3>
                <TextField
                  size="small"
                  id="outlined-multiline-static"
                  disabled={disabledState}
                  value={form?.dilation}
                  onChange={handleChange}
                  name={'dilation'}

                />
                <FormControlLabel
                  control={
                    <Checkbox
                      className="pl-12"
                      checked={form?.dilationRefused}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="dilationRefused"
                    />
                  }
                  label="Patient Refused"
                />
              </div>
              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row ">

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.proparacaine}
                        disabled={disabledState}
                        onChange={handleChange}
                        name="proparacaine"
                      />
                    }
                    label=".5% Proparacaine"
                  />
                </div>
                <div className="flex-1 flex flex-row ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.tropicamide}
                        disabled={disabledState}
                        onChange={handleChange}
                        name="tropicamide"
                      />
                    }
                    label="1% Tropicamide"
                  />

                </div>
                <div className="flex-1 flex flex-row ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.paramyd}
                        disabled={disabledState}
                        onChange={handleChange}
                        name="paramyd"
                      />
                    }
                    label="Paramyd"
                  />

                </div>

              </div>
              <div className="flex flex-row justify-center">
                <div className="flex-1 flex flex-row ">

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.phenylephrine}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="phenylephrine"
                      />
                    }
                    label="2.5% Phenylephrine"
                  />
                </div>
                <div className="flex-1 flex flex-row ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.cyclopentolate}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="cyclopentolate"
                      />
                    }
                    label="1% Cyclopentolate"
                  />
                </div>
                <div className="flex-1 flex flex-row ">


                </div>

              </div>

              <div className="flex flex-row">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.otherDilation}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="otherDilation"
                    />
                  }
                  label="Other"
                />


                <TextField
                  className="mt-10 "
                  fullWidth
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  id="outlined-multiline-static"

                  disabled={disabledState}
                  multiline
                  rows={1}
                  value={form?.otherDilation}
                  onChange={handleChange}
                  name={'otherDilation'}

                />
              </div>
              <div className="flex flex-row">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientRS}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="Patient R/S"
                    />
                  }
                  label="Patient R/S"
                />
                <TextField
                  className="mt-10 "
                  fullWidth
                  InputProps={{ style: { fontSize: 20 } }}
                  InputLabelProps={{ style: { fontSize: 20 } }}
                  id="outlined-multiline-static"

                  disabled={disabledState}
                  multiline
                  rows={1}
                  value={form?.patientRS}
                  onChange={handleChange}
                  name={'patientRS'}

                />
                <br></br><br></br><br></br>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col h-260 py-6">
          <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
              PERIPHERAL RETINA
              </h1>
            </div>

            <br></br>
            <div className="flex flex-row justify-center min-w-800">
              <Sketch form={form} setForm={setForm} handleChange={handleChange} />
            </div>
            <br></br>
            <div className="flex flex-row justify-center">
				

        
<div className="flex-1 flex flex-row justify-center ">
          <FormControlLabel
            control={
              <Checkbox
                checked={form?.flatattach}
                onChange={handleChange}
                disabled={disabledState}
                name="flatattach"
              />
            }
          label="FLAT ATTACHED"
          />
  
        </div>
        <div className="flex-1 flex flex-row justify-center ">
          <FormControlLabel
            control={
              <Checkbox
                checked={form?.flatattach1}
                onChange={handleChange}
                disabled={disabledState}
                name="flatattach1"
              />
            }
          label="FLAT ATTACHED"
          />
  
        </div>

        
      </div>
      <br></br>
      <div className="flex flex-row justify-center">
        <div className="flex-1 flex flex-row justify-center ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.rcnull}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="rcnull"
                      />
                    }
                  label="RC Images N / A"
                  />
          
                </div>
                <div className="flex-1 flex flex-row justify-center ">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={form?.rcreviewed}
                        onChange={handleChange}
                        disabled={disabledState}
                        name="rcreviewed"
                      />
                    }
                  label="RC Images Reviewed
                  "
                  />
          <br></br><br></br>
                </div>
        
                <br></br>
              </div>

          </div>
        </div>
        <div className="flex flex-col h-260 py-6">
          <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
              ASSESSMENT
              </h1>
            </div>
            <br></br>

            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.hyperopia}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="hyperopia"
                    />
                  }
                  label="Hyperopia (H52.03)"
                />
              </div>

              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.myopia}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="myopia"
                    />
                  }
                  label="Myopia (H52.13)"
                />
              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.astigmatism}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="astigmatism"
                    />
                  }
                  label="Astigmatism (H52.209)"
                />

              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.presbyopia}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="presbyopia"
                    />
                  }
                  label="Presbyopia (H52.4)"
                />
              </div>

            </div>

            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.acuteConj}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="acuteConj"
                    />
                  }
                  label="Acute Conj. (H10.9)"
                />

              </div>
              <div className="flex-1 flex flex-row">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.blepharitis}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="blepharitis"
                    />
                  }
                  label="Blepharitis (H01.009)"
                />
              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.cataractUnspecified}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="cataractUnspecified"
                    />
                  }
                  label="Cataract Unspecified (H26.9)"
                />
              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.chalazion}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="chalazion"
                    />
                  }
                  label="Chalazion (H00.19)"
                />
              </div>
            </div>

            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.cornealUlcer}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="cornealUlcer"
                    />
                  }
                  label="Corneal Ulcer (H16.009)"
                />

              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.diabetesWoComp}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="diabetesWoComp"
                    />
                  }
                  label="Diabetes w/o Comp. (E11.319)"
                />
              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.diabeticRet}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="diabeticRet"
                    />
                  }
                  label="Diabetic Ret. (E11.319)"
                />
              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.glaucomaSuspect}
                      onChange={handleChange}
                      name="glaucomaSuspect"
                      disabled={disabledState}
                    />
                  }
                  label="Glaucoma Suspect (H40.0)"
                />
              </div>
            </div>

            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.glaucomaUnspecified}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="glaucomaUnspecified"
                    />
                  }
                  label="Glaucoma Unspecified (H40.9)"
                />

              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.gpc}
                      disabled={disabledState}
                      onChange={handleChange}
                      name="gpc"
                    />
                  }
                  label="GPC (H10.419)"
                />
              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.hypertensiveRet}
                      disabled={disabledState}
                      onChange={handleChange}
                      name="hypertensiveRet"
                    />
                  }
                  label="Hypertensive Ret. (L35.039)"
                />
              </div>
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.macDeg}
                      disabled={disabledState}
                      onChange={handleChange}
                      name="macDeg"
                    />
                  }
                  label="Mac Deg (H35.30)"
                />
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.spk}
                      disabled={disabledState}
                      onChange={handleChange}
                      name="spk"
                    />
                  }
                  label="SPK (H16.149)"
                />

              </div>

            </div>
            <div className="flex flex-row ">
              <TextField
                className="mt-10 "
                fullWidth
                InputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                id="outlined-multiline-static"
                label="Additional Diagnosis"
                multiline
                disabled={disabledState}
                rows={4}
                value={form?.additionalDiagnosis}
                onChange={handleChange}
                name={'additionalDiagnosis'}
                variant="outlined"
              /><br></br><br></br>
              <br></br>
            </div>


          </div>
        </div>
        <div className="flex flex-col h-260 py-6">
          <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                PROGNOSIS
              </h1>
            </div>
            <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

          </div>
        </div>
        <div className="flex flex-col h-460  py-6">
          <div className="flex flex-col h-full py-5 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                DOCTOR SIGNATURE
              </h1>
            </div>
            <br></br> <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>

          </div>
        </div>
        {/* <div className="flex flex-row px-16  sm:px-24 w-full">
        <div className="p-8 w-1/3 min-w-400 h-auto border-grey-400 border-solid border-1 justify-between">
          // {/* <div className="flex flex-row justify-center min-w-400">
          //   <Sketch form={form} setForm={setForm} handleChange={handleChange} />
          // </div> */}
        {/* </div>
        <div className="p-8 w-2/3 h-auto border-grey-400 border-solid border-1 justify-between">

        </div>
      </div> */}

        {/* <div className="flex flex-row px-16  sm:px-24 w-full">
        <div className="p-8 w-1/2 h-auto border-grey-400 border-solid border-1 justify-between">
          <div className="flex flex-row">
            <h2 className="p-6 font-700">Discussed:</h2>
          </div>

          <div className="flex flex-row justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.astigVa}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="astigVa"
                />
              }
              label="Astig & VA"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.tories}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="tories"
                />
              }
              label="Tories"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.poorCand}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="poorCand"
                />
              }
              label="Poor Cand"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.rgp}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="rgp"
                />
              }
              label="RGP's"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.presbiopiaDiscussed}
                  onChange={handleChange}
                  disabled={disabledState}
                  name="presbiopiaDiscussed"
                />
              }
              label="Presbiopia"
            />
          </div>

          <div className="flex flex-row justify-between">
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.dwOnly}
                  disabled={disabledState}
                  onChange={handleChange}
                  name="dwOnly"
                />
              }
              label="DW Only"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.referMd}
                  disabled={disabledState}
                  onChange={handleChange}
                  name="referMd"
                />
              }
              label="Refer MD"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.decreaseWt}
                  disabled={disabledState}
                  onChange={handleChange}
                  name="decreaseWt"
                />
              }
              label="Decrease WT"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.recBuEg}
                  disabled={disabledState}
                  onChange={handleChange}
                  name="recBuEg"
                />
              }
              label="Rec. B/U EG"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.mwt2Wks}
                  disabled={disabledState}
                  onChange={handleChange}
                  name="mwt2Wks"
                />
              }
              label="MWT 2wks"
            />
          </div>
          <div className="flex flex-row">
            <h2 className="p-6 font-700">Return to Clinic:</h2>
          </div>

          <FormControl className="justify-around" component="fieldset">
            <RadioGroup
              row
              aria-label="returnToClinic"
              name="returnToClinic"
              value={form?.returnToClinic}
              onChange={handleChange}>
              <div className="flex flex-row">
                <FormControlLabel
                  value="day"
                  control={<Radio />}
                  disabled={disabledState}
                  label="1 Day"
                />
                <FormControlLabel
                  value="day2"
                  control={<Radio />}
                  disabled={disabledState}
                  label="2 Days"
                />
                <FormControlLabel
                  value="week"
                  control={<Radio />}
                  disabled={disabledState}
                  label="1 Week"
                />
                <FormControlLabel
                  value="week2"
                  control={<Radio />}
                  disabled={disabledState}
                  label="2 Weeks"
                />
                <FormControlLabel
                  value="month"
                  control={<Radio />}
                  disabled={disabledState}
                  label="1 Month"
                />
              </div>
              <div className="flex flex-row">
                <FormControlLabel
                  value="month2"
                  control={<Radio />}
                  disabled={disabledState}
                  label="2 Months"
                />
                <FormControlLabel
                  value="month3"
                  control={<Radio />}
                  disabled={disabledState}
                  label="3 Months"
                />
                <FormControlLabel
                  value="month6"
                  control={<Radio />}
                  disabled={disabledState}
                  label="6 Months"
                />
                <FormControlLabel
                  value="year"
                  control={<Radio />}
                  disabled={disabledState}
                  label="1 Year"
                />
                <FormControlLabel
                  value="year2"
                  control={<Radio />}
                  disabled={disabledState}
                  label="2 Years"
                />
              </div>
            </RadioGroup>
          </FormControl>
            </div>*/}
        {/* <div className="p-8 w-1/2 h-auto border-grey-400 border-solid border-1 justify-between">
          <div className="flex flex-row justify-center">
            <Button
              variant="contained"
              onClick={!form ? undefined : onSubmit}
              disabled={form?.examId ? true : false}
              color="secondary"
              size="large"
              startIcon={<SaveIcon />}>
              Save Exam
            </Button>
          </div>
        </div> */}
      </div>
     </div >
  );
};

export default withRouter(AddExam);
