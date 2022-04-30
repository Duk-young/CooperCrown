import { firestore } from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { ToastContainer, toast, Zoom } from 'react-toastify';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useHistory } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

const AddAppointments = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [appointments, setAppointments] = useState([]);
  const { form, handleChange, setForm } = useForm(null);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

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

      const queryAppointments = await firestore()
        .collection('appointments')
        .get();

      let resultAppointments = [];
      queryAppointments.forEach((doc) => {
        resultAppointments.push(doc.data());
      });

      setAppointments(resultAppointments);

      if (history?.location?.state?.start != undefined) {
        setForm({ start: history.location.state.start });
      }
      setisLoading(false);
    };
    fetchCustomer();
  }, [routeParams.customerId]);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    setisLoading(true);

    try {
      const dbConfig = (
        await firestore().collection('dbConfig').doc('dbConfig').get()
      ).data();

      await firestore()
        .collection('appointments')
        .add({
          ...form,
          start: firestore.Timestamp.fromDate(form?.start),
          end: firestore.Timestamp.fromDate(
            moment(form?.start).add(form?.duration, 'm').toDate()
          ),
          appointmentId: dbConfig?.appointmentId + 1,
          id: dbConfig?.appointmentId + 1,
          allDay: false,
          title: `${customer.firstName} ${customer.lastName}`,
          customerId: customer.customerId,
          medicalHistory: customer?.medicalHistory,
          email: customer?.email ? customer?.email : ''
        });

      await firestore()
        .collection('customers')
        .doc(customer?.id)
        .update({
          medicalHistory: customer?.medicalHistory,
          recentUpdated: dbConfig?.recentUpdated + 1
        });

      await firestore()
        .collection('dbConfig')
        .doc('dbConfig')
        .update({
          appointmentId: dbConfig?.appointmentId + 1,
          recentUpdated: dbConfig?.recentUpdated + 1
        });

      dispatch(
        MessageActions.showMessage({
          message: 'Appointment Saved Successfully'
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
      <div className="flex flex-row p-16 sm:p-24 w-full">
        <div className="p-8 w-1/3 h-auto border-grey-400 border-solid border-1">
          <ToastContainer />
          <h1 className="underline font-700">Patient Details</h1>
          <h2>{`Customer Id: ${customer.customerId}`}</h2>
          <h2>{`Name: ${customer?.firstName} ${customer.lastName} `}</h2>
          <h2>{`Address: ${customer.address}, ${customer.state}, ${customer.zipCode}`}</h2>
          <h2>{`Phone: ${formatPhoneNumber(customer.phone1)}`}</h2>
          <h2>{`Email: ${customer.email}`}</h2>
          <h2>{`DOB: ${customer.dob.toDateString()}`}</h2>
          <h2>{`Sex: ${customer.gender}`}</h2>
        </div>
        <div className="p-8 w-2/3 h-auto relative">
          <h1>Appointment Details</h1>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="space-around">
              <KeyboardDatePicker
                margin="none"
                id="date-picker-dialog"
                label="Select Date"
                format="MM/dd/yyyy"
                value={form?.start}
                onChange={(date) => {
                  handleChange({
                    target: { name: 'start', value: date }
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
              <KeyboardTimePicker
                margin="none"
                id="time-picker"
                label="Select Start Time"
                minutesStep={15}
                value={form?.start}
                onChange={(date) => {
                  handleChange({
                    target: { name: 'start', value: date }
                  });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
              <TextField
                className="ml-10 content-center"
                id="outlined-multiline-static"
                label="Doctor"
                value={form?.doctor}
                onChange={handleChange}
                name={'doctor'}
                variant="outlined"
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <div className="flex flex-row justify-center">
            <Typography
              className="username text-16 whitespace-no-wrap self-center font-700 underline"
              color="inherit">
              Appointment Duration
            </Typography>
            <FormControl className="ml-32 ">
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="ethnicityId"
                defaultValue={form?.duration}
                value={form?.duration}
                name="duration"
                onChange={handleChange}
                autoWidth>
                <MenuItem value={15}>15 Minutes</MenuItem>
                <MenuItem value={30}>30 Minutes</MenuItem>
                <MenuItem value={45}>45 Minutes</MenuItem>
                <MenuItem value={60}>One Hour</MenuItem>
              </Select>
              <FormHelperText>Select duration from the list</FormHelperText>
            </FormControl>
          </div>
        </div>
      </div>
      <div className="flex flex-row  w-full">
        <div className="p-8 w-full h-auto relative">
          <TextField
            className="p-10"
            fullWidth
            id="outlined-multiline-static"
            label="Medical History"
            multiline
            rows={15}
            value={customer?.medicalHistory}
            onChange={(e) => {
              setCustomer({
                ...customer,
                medicalHistory: e.target.value
              });
            }}
            name={'medicalHistory'}
            variant="outlined"
          />
        </div>
      </div>
      <FuseAnimate animation="transition.slideRightIn" delay={300}>
        <Button
          className="whitespace-no-wrap normal-case"
          variant="contained"
          color="secondary"
          onClick={() => {
            if (form) {
              let start = firestore.Timestamp.fromDate(form?.start);
              let end = firestore.Timestamp.fromDate(
                moment(form?.start).add(form?.duration, 'm').toDate()
              );
              let count = 0;
              appointments.map((row) => {
                if (
                  (start >= row?.start && start < row?.end) ||
                  (end > row?.start && end <= row?.end) ||
                  (row?.start >= start && row?.start < end) ||
                  (row?.end > start && row?.end <= end)
                ) {
                  count++;
                }
              });
              if (count > 0) {
                toast.error('Selected time slot is unavailable!', {
                  position: 'bottom-right',
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  transition: Zoom
                });
              } else {
                onSubmit();
              }
            } else {
              toast.error('Please fill required fields...', {
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
          }}>
          Save Details
        </Button>
      </FuseAnimate>
    </div>
  );
};

export default withRouter(AddAppointments);
