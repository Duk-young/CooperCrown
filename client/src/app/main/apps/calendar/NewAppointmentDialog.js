import '../e-commerce/Customers/App.mobile.css';
import '../e-commerce/Customers/Search.css';
import '../e-commerce/Customers/Themes.css';
import { connectHits } from 'react-instantsearch-dom';
import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { getNextCustomerId, sortAlphabetically } from '../e-commerce/ReusableComponents/HelperFunctions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useHistory } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import {MuiPickersUtilsProvider,KeyboardTimePicker,KeyboardDatePicker} from '@material-ui/pickers';
import * as Actions from './store/actions';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import algoliasearch from 'algoliasearch/lite';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  orangeButton: {
      backgroundColor: '#f15a25',
      color: '#fff',
      '&:hover': {
          backgroundColor: '#f47b51',
          color: '#fff'
      }
  }
});

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY);

const CustomHits = connectHits(({ hits, form, closeComposeDialog }) => {
  const history = useHistory();
  return (
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>First Name</StyledTableCell>
          <StyledTableCell>Last Name</StyledTableCell>
          <StyledTableCell>D.O.B</StyledTableCell>
          <StyledTableCell>Gender</StyledTableCell>
          <StyledTableCell>Options</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.map((hit) => (
          <StyledTableRow key={hit.objectID}>
            <StyledTableCell>{hit.firstName}</StyledTableCell>
            <StyledTableCell>{hit.lastName}</StyledTableCell>
            <StyledTableCell>
              {moment(hit.dob).format('MM/DD/YYYY')}
            </StyledTableCell>
            <StyledTableCell>{hit.gender}</StyledTableCell>
            <StyledTableCell>
              <Button
                className="whitespace-no-wrap normal-case ml-24"
                onClick={() => {
                  closeComposeDialog();
                  history.push(
                    `/apps/e-commerce/customers/addAppointment/${hit?.customerId}`,
                    {
                      start: form?.start,
                      showRoomId: form?.showRoomId
                    }
                  );
                }}
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddToQueueIcon />}>
                Select
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
});

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
    }
  }
}))(TableRow);

export default function NewAppointmentDialog() {
  const classes = useStyles();
  const { form, handleChange, setForm } = useForm(null);
  const [error, setError] = useState();
  const [appointments, setAppointments] = useState([]);
  const [showRooms, setShowRooms] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  const newAppointmentDialog = useSelector(
    ({ calendarApp }) => calendarApp.events.newAppointmentDialog
  );

  function closeComposeDialog() {
    return dispatch(Actions.closeNewEventDialog());
  }

  useEffect(() => {
    const fetchDetails = async () => {
      if (newAppointmentDialog.props.open) {
        setForm({
          ...newAppointmentDialog.data,
          dob: new Date(),
          showRoomId: newAppointmentDialog.data.showRoomId,
          start: moment(
            newAppointmentDialog.data.start,
            'MM/DD/YYYY, h:mm:ss a'
          ).toDate(),
          duration: 30
        });
      }

      const queryAppointments = await firestore()
        .collection('appointments')
        .get();

      let resultAppointments = [];
      queryAppointments.forEach((doc) => {
        resultAppointments.push(doc.data());
      });

      setAppointments(resultAppointments);

      let showroomdata = [];
      const queryShowrooms = await firestore().collection('showRooms').get();

      queryShowrooms.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(sortAlphabetically(showroomdata, 'locationName'));

      let doctorsData = [];
      const queryDoctors = await firestore().collection('doctors').get();

      queryDoctors.forEach((doc) => {
        doctorsData.push(doc.data());
      });
      doctorsData = sortAlphabetically(doctorsData, 'fullName')
      if (newAppointmentDialog?.data?.showRoomId && doctorsData?.length > 0) {
        setDoctors(doctorsData.filter((obj) => {
          return obj.showrooms?.some((showroom) => showroom.showRoomId === newAppointmentDialog?.data?.showRoomId);
        }))
      } else { setDoctors(doctorsData); }

      setError('');
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAppointmentDialog.props.open]);

  const onSubmit = async () => {
    try {
      setDisabledState(true)
      const dbConfig = (
        await firestore().collection('dbConfig').doc('dbConfig').get()
      ).data();

      await firestore()
        .collection('customers')
        .add({
          firstName: form?.firstName ? form?.firstName : '',
          lastName: form?.lastName ? form?.lastName : '',
          phone1: form?.phone1 ? form?.phone1 : '',
          email: form?.email ? form?.email : '',
          family: form?.family ? form?.family : dbConfig?.customerId + 1,
          dob: form?.dob ? firestore.Timestamp.fromDate(form?.dob) : '',
          medicalHistory: form?.medicalHistory ? form?.medicalHistory : '',
          customerId: dbConfig?.customerId + 1,
          recentUpdated: dbConfig?.recentUpdated + 1,
          creationDate: firestore.Timestamp.fromDate(new Date()),
          customCustomerId: dbConfig?.customCustomerId
        });

      await firestore()
        .collection('appointments')
        .add({
          start: firestore.Timestamp.fromDate(form?.start),
          end: firestore.Timestamp.fromDate(
            moment(form?.start).add(form?.duration, 'm').toDate()
          ),
          appointmentId: dbConfig?.appointmentId + 1,
          doctor: form?.doctorId ? doctors.filter((doc) => doc?.doctorId === form?.doctorId)?.[0]?.fullName : '',
          doctorId: form?.doctorId ? form?.doctorId : '',
          id: dbConfig?.appointmentId + 1,
          allDay: false,
          title: `${form.firstName} ${form.lastName}`,
          customerId: dbConfig?.customerId + 1,
          medicalHistory: form?.medicalHistory ? form?.medicalHistory : '',
          email: form?.email ? form?.email : '',
          phone1: form?.phone1 ? form?.phone1 : '',
          showRoomId: form?.showRoomId
        });

      await firestore()
        .collection('dbConfig')
        .doc('dbConfig')
        .update({
          customerId: dbConfig?.customerId + 1,
          recentUpdated: dbConfig?.recentUpdated + 1,
          appointmentId: dbConfig?.appointmentId + 1,
          customCustomerId: getNextCustomerId(dbConfig?.customCustomerId)
        });

      closeComposeDialog();
      dispatch(Actions.getEvents());

      dispatch(
        MessageActions.showMessage({
          message: 'Appointment Saved Successfully!'
        })
      );
      setDisabledState(false)
    } catch (error) {
      console.log(error);
    }
  };

  return !form ? (
    <></>
  ) : (
    <Dialog
      maxWidth={form?.appointmentType === 'existing' ? 'md' : 'xs'}
      fullWidth
      {...newAppointmentDialog.props}
      onClose={closeComposeDialog}
      aria-labelledby="simple-dialog-title">
      <AppBar position="static">
        <Toolbar className="flex w-full justify-center">
          <Typography variant="subtitle1" color="inherit" align='center'>
            {form?.appointmentType === 'new' && 'NEW'} {form?.appointmentType === 'existing' && 'EXISTING'} CUSTOMER APPOINTMENT
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="p-8 w-full h-auto relative">
        <FormControl component="fieldset" className='w-full'>
          <RadioGroup
            className="flex flex-row justify-center gap-20 w-full"
            row
            aria-label="appointmentType"
            name="appointmentType"
            value={form?.appointmentType}
            onChange={handleChange}>
            <FormControlLabel
              value="new"
              control={<Radio />}
              label="New Customer"
            />
            <FormControlLabel
              value="existing"
              control={<Radio />}
              label="Existing Customer"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {form?.appointmentType === 'new' && (
        <div className="p-2">
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
                keyboardIcon={<QueryBuilderIcon />}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
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
          <div className="flex flex-row w-full p-6">
            <div className="flex flex-col w-1/2">
              <FormControl>
                <FormHelperText>Select doctor from the list</FormHelperText>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="doctorId"
                  value={form?.doctorId}
                  name="doctorId"
                  onChange={handleChange}
                  autoWidth>
                  {doctors.map((row) => (
                    <MenuItem value={row?.doctorId}>
                      {row?.fullName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className="flex flex-col w-1/2 pl-2">
              <FormControl>
                <FormHelperText>Select Showroom from the list</FormHelperText>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="showRoomId"
                  value={form?.showRoomId}
                  disabled
                  name="showRoomId"
                  onChange={handleChange}
                  autoWidth>
                  {showRooms.map((row) => (
                    <MenuItem value={row?.showRoomId}>
                      {row?.locationName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="flex flex-row w-full p-6">
            <div className="flex flex-col w-1/2">
              <TextField
                className="content-center"
                id="outlined-multiline-static"
                fullWidth
                label="First Name"
                value={form?.firstName}
                onChange={handleChange}
                name={'firstName'}
                variant="outlined"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <TextField
                className="pl-2 content-center"
                id="outlined-multiline-static"
                fullWidth
                label="Last Name"
                value={form?.lastName}
                onChange={handleChange}
                name={'lastName'}
                variant="outlined"
              />
            </div>
          </div>
          <div className="flex flex-row w-full p-6">
            <div className="flex flex-col w-1/2">
              <TextField
                className="content-center"
                id="outlined-multiline-static"
                fullWidth
                label="Phone"
                value={form?.phone1}
                onChange={handleChange}
                name={'phone1'}
                variant="outlined"
              />
            </div>
            <div className="flex flex-col w-1/2">
              <TextField
                className="pl-2 content-center"
                id="outlined-multiline-static"
                fullWidth
                label="Email"
                value={form?.email}
                onChange={handleChange}
                name={'email'}
                variant="outlined"
              />
            </div>
          </div>
          <div className="flex">
            <Typography
              className="username text-16 whitespace-no-wrap self-center"
              color="inherit">
              Date of Birth
            </Typography>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Grid container justifyContent="start">
                <KeyboardDatePicker
                  className="ml-24"
                  margin="normal"
                  id="date-picker-dialog"
                  defaultValue={new Date('2014-08-18T21:11:54')}
                  format="MM/dd/yyyy"
                  value={form?.dob}
                  onChange={(date) => {
                    handleChange({ target: { name: 'dob', value: date } });
                  }}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </div>
          <TextField
            className="my-10 px-4"
            fullWidth
            id="outlined-multiline-static"
            label="Medical History"
            multiline
            rows={8}
            value={form?.medicalHistory}
            onChange={handleChange}
            name={'medicalHistory'}
            variant="outlined"
          />

          <div className="flex flex-col p-10 w-full ">
            <Button
              className={classes.orangeButton}
              variant="contained"
              color="secondary"
              disabled={disabledState}
              onClick={() => {
                if (form?.firstName && form?.lastName && form?.showRoomId && form?.duration) {
                  let start = firestore.Timestamp.fromDate(form?.start);
                  let end = firestore.Timestamp.fromDate(
                    moment(form?.start).add(form?.duration, 'm').toDate()
                  );
                  let count = 0;
                  appointments
                    .filter((word) => word.showRoomId === form?.showRoomId)
                    .map((row) => {
                      if (
                        (start >= row?.start && start < row?.end) ||
                        (end > row?.start && end <= row?.end) ||
                        (row?.start >= start && row?.start < end) ||
                        (row?.end > start && row?.end <= end)
                      ) {
                        count++;
                      }
                      return null;
                    });
                  if (count > 0) {
                    setError('Selected Slot is unavailable!');
                  } else {
                    onSubmit();
                  }
                } else {
                  setError('Name, showroom or duration cannot be Empty!');
                }
              }}
            >
              Save Details
            </Button>
          </div>
          <h3 className="text-red-900">{error ? error : ''}</h3>
        </div>
      )}
      {form?.appointmentType === 'existing' && (
        <div className="flex w-full ">
          <TableContainer
            component={Paper}
            className="flex flex-col w-full p-20 rounded-32 shadow-20">
            <InstantSearch searchClient={searchClient} indexName="customers">
              <div className="flex flex-row">
                <div className="flex flex-col flex-1 mb-10 shadow-10 rounded-12 inventorySearch">
                  <SearchBox
                    translations={{
                      placeholder: 'Searh for customers...'
                    }}
                    submit={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 18 18">
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.67"
                          transform="translate(1 1)">
                          <circle cx="7.11" cy="7.11" r="7.11" />
                          <path d="M16 16l-3.87-3.87" />
                        </g>
                      </svg>
                    }
                  />
                </div>
              </div>
              <CustomHits form={form} closeComposeDialog={closeComposeDialog} />
            </InstantSearch>
          </TableContainer>
        </div>
      )}
    </Dialog>
  );
}

NewAppointmentDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
