import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import { useForm } from '@fuse/hooks';
import DateFnsUtils from '@date-io/date-fns';
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';

const AddAppointments = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const { form, handleChange } = useForm(null);
  const routeParams = useParams();
  const dispatch = useDispatch();

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
      setisLoading(false);
    };
    fetchCustomer();
  }, [routeParams.customerId]);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    setisLoading(true);

    try {
      const appointmentId = (
        await firestore().collection('dbConfig').doc('dbConfig').get()
      ).data();

      await firestore()
        .collection('appointments')
        .add({
          ...form,
          start: firestore.Timestamp.fromDate(form?.start),
          end: firestore.Timestamp.fromDate(form?.start),
          appointmentId: appointmentId?.appointmentId + 1,
          id: appointmentId?.appointmentId + 1,
          allDay: false,
          title: `${customer.firstName} ${customer.lastName}`,
          customerId: customer.customerId
        });

      await firestore()
        .collection('dbConfig')
        .doc('dbConfig')
        .update({ appointmentId: appointmentId?.appointmentId + 1 });

      await firestore()
        .collection('customers')
        .doc(customer?.id)
        .update({ medicalHistory: customer?.medicalHistory });
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
          <h1>Patient Details</h1>
          <h2>{`Name: ${customer.firstName} ${customer.lastName} Customer Id: ${customer.customerId}`}</h2>
          <h2>{`Address: ${customer.address}, ${customer.state}, ${customer.zipCode}`}</h2>
          <h2>{`Phone: ${customer.phone1}`}</h2>
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
                label="Date picker dialog"
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
                label="Time picker"
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
          onClick={!form ? undefined : onSubmit}>
          Save Details
        </Button>
      </FuseAnimate>
    </div>
  );
};

export default withRouter(AddAppointments);
