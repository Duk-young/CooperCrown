import { DateTimePicker } from '@material-ui/pickers';
import { firestore } from 'firebase';
import { toast, Zoom } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useHistory } from 'react-router-dom';
import * as Actions from './store/actions';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import FuseUtils from '@fuse/utils/FuseUtils';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import React, { useCallback, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const defaultFormState = {
  id: FuseUtils.generateGUID(),
  title: '',
  allDay: true,
  start: moment(new Date(), 'MM/DD/YYYY'),
  end: moment(new Date(), 'MM/DD/YYYY'),
  desc: ''
};

function EventDialog(props) {
  const history = useHistory()
  const dispatch = useDispatch();
  const eventDialog = useSelector(({ calendarApp }) => calendarApp.events.eventDialog);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  const { form, setForm } = useForm(defaultFormState);
  const start = moment(form.start, 'MM/DD/YYYY');
  const end = moment(form.end, 'MM/DD/YYYY');

  const initDialog = useCallback(() => {
    /**
     * Dialog type: 'edit'
     */
    if (eventDialog.type === 'edit' && eventDialog.data) {
      setForm({ ...eventDialog.data });
    }

    /**
     * Dialog type: 'new'
     */
    if (eventDialog.type === 'new') {
      setForm({
        ...defaultFormState,
        ...eventDialog.data,
        id: FuseUtils.generateGUID()
      });
    }
  }, [eventDialog.data, eventDialog.type, setForm]);

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
    /**
     * After Dialog Open
     */
    if (eventDialog.props.open) {
      initDialog();
    }
  }, [eventDialog.props.open, initDialog]);

  function closeComposeDialog() {
    return eventDialog.type === 'edit'
      ? dispatch(Actions.closeEditEventDialog())
      : dispatch(Actions.closeNewEventDialog());
  }

  function canBeSubmitted() {
    return form.title.length > 0;
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (eventDialog.type === 'new') {
      dispatch(Actions.addEvent(form));
    } else {
      dispatch(Actions.updateEvent(form));
    }
    closeComposeDialog();
  }

  const handleRemove = async () => {
    try {
      const query = await firestore()
        .collection('appointments')
        .where('appointmentId', '==', Number(form.appointmentId))
        .limit(1)
        .get();

      let result = query.docs[0].data();
      result.id = query.docs[0].id;
      await firestore().collection('appointments').doc(result.id).delete();
      dispatch(Actions.getEvents());
    } catch (error) {
      console.log(error);
    }
    closeComposeDialog();
  };

  return (
    <Dialog
      {...eventDialog.props}
      onClose={closeComposeDialog}
      fullWidth
      maxWidth="xs"
      component="form">
      <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {eventDialog.type === 'new' ? 'New Event' : 'Event Details'}
          </Typography>
        </Toolbar>
      </AppBar>

      <form noValidate onSubmit={handleSubmit}>
        <DialogContent classes={{ root: 'p-16 pb-0 sm:p-24 sm:pb-0' }}>
          <TextField
            id="title"
            label="Title"
            className=" mb-16"
            InputLabelProps={{
              shrink: true
            }}
            name="title"
            value={form?.title}
            disabled
            variant="outlined"
            autoFocus
            required
            fullWidth
          />

          <DateTimePicker
            label="Appointment Time"
            inputVariant="outlined"
            value={start}
            disabled
            className=" mb-16 w-full"
            maxDate={end}
          />

          <TextField
            label="Phone 1"
            className=" mb-16"
            InputLabelProps={{
              shrink: true
            }}
            name="phone1"
            value={formatPhoneNumber(form?.phone1)}
            disabled
            variant="outlined"
            autoFocus
            required
            fullWidth
          />

          <TextField
            label="Phone 2"
            className=" mb-16"
            InputLabelProps={{
              shrink: true
            }}
            name="phone2"
            value={formatPhoneNumber(form?.phone2)}
            disabled
            variant="outlined"
            autoFocus
            required
            fullWidth
          />

          <TextField
            label="Email"
            className=" mb-16"
            InputLabelProps={{
              shrink: true
            }}
            name="email"
            value={form?.email}
            disabled
            variant="outlined"
            autoFocus
            required
            fullWidth
          />

          <TextField
            className=" mb-16"
            id="medicalHistory"
            label="Medical History"
            type="text"
            name="medicalHistory"
            value={form?.medicalHistory}
            disabled
            multiline
            rows={5}
            variant="outlined"
            fullWidth
          />
        </DialogContent>

        {eventDialog.type === 'new' ? (
          <DialogActions className="justify-between px-8 sm:px-16">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={!canBeSubmitted()}>
              Add
            </Button>
          </DialogActions>
        ) : (
          <DialogActions className="justify-between px-8 sm:px-16">
            <div className='flex flex-row w-full justify-between'>
              <IconButton onClick={() => {
                if (userData.userRole === 'admin' || userData?.appointmentsDelete) {
                  handleRemove()
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
              }}>
                <Icon>delete</Icon>
              </IconButton>
              <IconButton onClick={() => {
                if (userData.userRole === 'admin' || userData?.appointmentsEdit) {
                  history.push(`/apps/e-commerce/customers/editAppointment/${form?.firebaseId}`)
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
              }}>
                <Icon>edit</Icon>
              </IconButton>
            </div>
          </DialogActions>
        )}
      </form>
    </Dialog>
  );
}

export default EventDialog;
