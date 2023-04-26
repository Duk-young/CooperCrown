import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import ConfirmDoctorDelete from './ConfirmDoctorDelete';
import { firestore } from 'firebase';
import Icon from '@material-ui/core/Icon';
import DateFnsUtils from '@date-io/date-fns';
import { toast, Zoom } from 'react-toastify';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import * as Actions from '../store/actions';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import reducer from '../store/reducers';

const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});
function Doctor(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const theme = useTheme();
  const [showRooms, setShowRooms] = useState([]);

  const history = useHistory();
  const [tabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});

  const routeParams = useParams();

 

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    setisLoading(true);
    const fetchDetails = async () => {
      if (routeParams?.doctorId === 'new') {
        setForm(null)
      } else if (routeParams?.doctorId) {
        setForm(null)
        const query = await firestore()
          .collection('doctors')
          .doc(routeParams?.doctorId)
          .get();
        let doctor = query.data();
        doctor.dob = doctor?.dob && doctor.dob.toDate();
        doctor.id = query?.id
        setForm(doctor)
      }
    }

    const fetchlocation = async () => {
      let showroomdata = [];
      const queryShowrooms = await firestore()
        .collection('showRooms')
        .get();

      queryShowrooms.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(showroomdata);

      if (history?.location?.state?.start !== undefined) {
        setForm({
          start: history.location.state.start,
          showRoomId: history.location.state.showRoomId,
        });
      }

      setisLoading(false);
    };
    fetchDetails();
    fetchlocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const isFormValid = () => {
    const errs = {};

    if (!form.fname) {
      errs.fname = 'Please enter first name'
    }

    if (!form.lname) {
      errs.lname = 'Please enter last name'
    }

    if (!form.address) {
      errs.address = 'Please enter address'
    }

    if (!form.dob) {
      errs.dob = 'Please enter date of birth'
    }

    if (!form.Gender) {
      errs.gender = 'Please enter gender'
    }

    if (!form.phone1) {
      errs.phone1 = 'Please enter phone number'
    }

    if (!form.city) {
      errs.city = 'Please enter city'
    }

    if (!form.State) {
      errs.State = 'Please enter state'
    }

    if (!form.zipcode) {
      errs.zipcode = 'Please enter zipcode'
    }

    if (!form.doctoremail) {
      errs.doctoremail = 'Please enter email address'
    }

    if (form?.showRoomId1 === form?.showRoomId2 || form?.showRoomId1 === form?.showRoomId3 || form?.showRoomId2 === form?.showRoomId3) {
      errs.showroom = 'Duplicate values found'
      toast.error('Please select different showrooms in each field', {
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

    return errs;
  }

  const submitForm = async () => {
    if (routeParams.doctorId === 'new') {
      setisLoading(true);
      await dispatch(await Actions.saveDoctor(form));
      props.history.push('/apps/e-commerce/doctors');
      setisLoading(false);
    } else {
      setisLoading(true);
      await dispatch(await Actions.updateDoctor(form));
      props.history.push('/apps/e-commerce/doctors');
      setisLoading(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = isFormValid();
    setErrors(errs);

    if (Object.entries(errs).some((err) => err !== '')) {
      return
    }

    submitForm();
  }



  if (
    isLoading
  ) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      header={
        (

          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/apps/e-commerce/doctors"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Doctor</span>
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt={`${form?.fname} ${form?.lname}`}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {(form?.fname && form?.lname) ? `${form.fname} ${form.lname}` : 'New Doctor'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">Doctor Detail</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
          </div>
        )
      }
      contentToolbar={

        <Tabs
          value={tabValue}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}>
          <Tab className="h-64 normal-case" label={routeParams.doctorId !== 'new' ? 'Edit Doctor Details' : "New Doctor"} />
        </Tabs>

      }
      content={
        (
          <div className="p-16 sm:p-24">
            <div className="flex flex-col h-260  px-16 py-6 gap-20">
              {tabValue === 0 && (
                <>
                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700" style={{ color: '#f15a25' }}>
                        DOCTOR INFO
                      </h1>
                    </div>


                    <div>
                      <div className="flex flex-col justify-center p-16 sm:p-24 ">
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="First Name"
                            autoFocus
                            id="doctor-fname"
                            name="fname"
                            type="text"
                            value={form?.fname}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.fname}
                            helperText={errors.fname}
                            fullwidth
                          />
                          <TextField
                            className="w-1/2"
                            required
                            id="doctor-address"
                            name="address"
                            onChange={handleChange}
                            label="Address"
                            type="address"
                            value={form?.address}
                            variant="outlined"
                            error={errors.address}
                            helperText={errors.address}
                            fullwidth
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="Last Name"
                            id="doctor-lname"
                            name="lname"
                            type="text"
                            value={form?.lname}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.lname}
                            helperText={errors.lname}
                            fullwidth
                          />
                          <TextField
                            className="w-1/2"
                            required
                            label="City"
                            id="doctor-city"
                            name="city"
                            type="text"
                            value={form?.city}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.city}
                            helperText={errors.city}
                            fullwidth
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <div className="flex flex-row flex-wrap gap-4 w-1/2">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                inputVariant="outlined"
                                className='m-0 p-0'
                                fullWidth
                                label="Date of birth"
                                margin="normal"
                                id="date-picker-dialog"
                                format="MM/dd/yyyy"
                                value={form?.dob}
                                onChange={(date) => {
                                  handleChange({
                                    target: { name: 'dob', value: date }
                                  });
                                }}
                                KeyboardButtonProps={{
                                  'aria-label': 'change date'
                                }}
                              />

                            </MuiPickersUtilsProvider>
                          </div>
                          <TextField
                            className="w-1/2"
                            required
                            label="State"
                            id="doctor-State"
                            name="State"
                            type="text"
                            value={form?.State}
                            error={errors.State}
                            helperText={errors.State}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="Gender"
                            id="user-Gender"
                            name="Gender"
                            type="text"
                            value={form?.Gender}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.gender}
                            helperText={errors.gender}
                          />
                          <TextField
                            className="w-1/2"
                            required
                            label="Zip Code"
                            id="doctor-zipcode"
                            name="zipcode"
                            type="Number"
                            value={form?.zipcode}
                            onChange={handleChange}
                            error={errors.zipcode}
                            helperText={errors.zipcode}
                            variant="outlined"
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            required
                            label="Phone 1"
                            id="user-phone1"
                            name="phone1"
                            type="phone"
                            value={form?.phone1}
                            onChange={handleChange}
                            variant="outlined"
                            error={errors.phone1}
                            helperText={errors.phone1}
                          />
                          <TextField
                            className="w-1/2"
                            required
                            label="Email"
                            id="doctor-doctoremail"
                            name="doctoremail"
                            type="email"
                            value={form?.doctoremail}
                            onChange={handleChange}
                            error={errors.doctoremail}
                            helperText={errors.doctoremail}
                            variant="outlined"
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            label="Phone 2"
                            id="user-phone2"
                            name="phone2"
                            type="phone"
                            value={form?.phone2}
                            onChange={handleChange}
                            variant="outlined"
                          />
                          <TextField
                            className="w-1/2"
                            label="Other"
                            id="doctor-other"
                            name="other"
                            type="text"
                            value={form?.other}
                            onChange={handleChange}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700" style={{ color: '#f15a25' }}>
                        SERVICE LOCATION
                      </h1>
                    </div>
                    <div className="flex flex-col justify-center p-16 sm:p-24 ">
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="showRoomId1"
                          value={form?.showRoomId1}
                          name="showRoomId1"
                          error={errors.showroom}
                          onChange={handleChange}
                          autoWidth>
                          {showRooms.map((row) => (
                            <MenuItem value={row?.showRoomId}>
                              {row?.locationName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Location 1</FormHelperText>
                      </FormControl>
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-autowidth-label"
                          id="showRoomId2"
                          value={form?.showRoomId2}
                          name="showRoomId2"
                          error={errors.showroom}
                          onChange={handleChange}
                          autoWidth>
                          {showRooms.map((row) => (
                            <MenuItem value={row?.showRoomId}>
                              {row?.locationName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Location 2</FormHelperText>
                      </FormControl>
                      <FormControl>
                        <Select
                          labelId="demo-simple-select-autowidth-label"

                          id="showRoomId3"
                          value={form?.showRoomId3}
                          name="showRoomId3"
                          error={errors.showroom}
                          onChange={handleChange}
                          autoWidth>
                          {showRooms.map((row) => (
                            <MenuItem value={row?.showRoomId}>
                              {row?.locationName}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>Location 3</FormHelperText>
                      </FormControl>
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-col" >
                <Button
                  style={{
                    padding: '10px 32px'
                  }}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleSubmit}>
                  Save
                </Button>
              </div>
              {
                routeParams.doctorId !== 'new' && (
                  <div className="flex flex-col">
                    <ConfirmDoctorDelete open={open} handleClose={handleClose} form={form} propssent={props} />

                    <Button
                      style={{
                        color: 'red',
                        padding: '10px 32px'
                      }}
                      variant="outlined"
                      onClick={() => {
                        if (routeParams.doctorId === 'new') {
                          alert('No Data to delete')
                        }
                        else {
                          setOpen(true);
                        }

                      }}
                    >
                      <Icon>delete</Icon>
                      DELETE
                    </Button>

                  </div>
                )
              }
            </div>
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Doctor);
