import { firestore } from 'firebase';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useHistory } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import * as Actions from '../store/actions';
import Button from '@material-ui/core/Button';
import ConfirmDoctorDelete from './ConfirmDoctorDelete';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
import Select from '@material-ui/core/Select';
import SimpleAccordion from './SimpleAccordion';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

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
  const theme = useTheme();
  const classes = useStyles();
  const history = useHistory();
  const [tabValue] = useState(0);
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [showRooms, setShowRooms] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [disabledState, setDisabledState] = useState(false);
  const [selectedShowroom, setSelectedShowroom] = useState(null);

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
        setDisabledState(true)
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

    if (!form?.showrooms) {
      errs.showroom = 'Please select atleast one showroom'
      toast.error('Please select atleast one showroom', {
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

  if (isLoading) return <FuseLoading />;

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
                            disabled={disabledState}
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
                            disabled={disabledState}
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
                            disabled={disabledState}
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
                            disabled={disabledState}
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
                                disabled={disabledState}
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
                            disabled={disabledState}
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <FormControl className="w-1/2">
                            <FormHelperText>Gender</FormHelperText>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              id="user-Gender"
                              value={form?.Gender ?? ''}
                              name="Gender"
                              onChange={handleChange}
                              error={errors.gender}
                              helperText={errors.gender}
                              disabled={disabledState}
                              autoWidth>
                              <MenuItem value={'Male'}>Male</MenuItem>
                              <MenuItem value={'Female'}>Female</MenuItem>
                              <MenuItem value={'Other'}>Other</MenuItem>
                            </Select>
                          </FormControl>
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
                            disabled={disabledState}
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
                            disabled={disabledState}
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
                            disabled={disabledState}
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
                            disabled={disabledState}
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
                            disabled={disabledState}
                          />
                        </div>
                        <div className="flex flex-row p-6 mb-16 gap-10">
                          <TextField
                            className="w-1/2"
                            label="LIC #"
                            id="licNo"
                            name="licNo"
                            type="text"
                            value={form?.licNo}
                            onChange={handleChange}
                            variant="outlined"
                            disabled={disabledState}
                          />
                          <TextField
                            className="w-1/2"
                            label="NPI #"
                            id="npiNo"
                            name="npiNo"
                            type="text"
                            value={form?.npiNo}
                            onChange={handleChange}
                            variant="outlined"
                            disabled={disabledState}
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
                      <SimpleAccordion showrooms={form?.showrooms} form={form} setForm={setForm} disabled={disabledState} />
                      <div className='flex flex-row justify-around w-full'>
                        <div className='flex flex-col p-10 w-full'>
                          <FormControl>
                            <Select
                              labelId="demo-simple-select-autowidth-label"
                              onChange={(e) => setSelectedShowroom(e.target.value)}
                              disabled={disabledState}
                              autoWidth>
                              {showRooms.map((row) => (
                                <MenuItem value={row?.showRoomId}>
                                  {row?.locationName}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>Select Showroom</FormHelperText>
                          </FormControl>
                        </div>
                        <div className='flex flex-col p-10 w-full'>
                          <Button
                            style={{ padding: '10px 32px' }}
                            variant="contained"
                            disabled={!selectedShowroom}
                            color="primary"
                            onClick={() => {
                              if (form?.showrooms?.length < 3 || !form?.showrooms) {
                                let already = form?.showrooms && form?.showrooms.filter((showroom) => showroom.showRoomId === selectedShowroom)
                                if (already?.length > 0) {
                                  toast.error('Selected showroom already exists', {
                                    position: 'top-center',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    transition: Zoom
                                  });
                                } else {
                                  setForm({ ...form, showrooms: [...(form?.showrooms || []), ...showRooms.filter((location) => location.showRoomId === selectedShowroom)] });
                                }
                              } else {
                                toast.error('You can only add upto 3 locations.', {
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
                            Add Showroom
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
              <div className="flex flex-col" >
                {!disabledState && (
                  <Button
                    style={{ padding: '10px 32px' }}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleSubmit}>
                    Save
                  </Button>
                )}
                {disabledState && (
                  <Button
                    style={{ padding: '10px 32px' }}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => setDisabledState(false)}>
                    Edit
                  </Button>
                )}
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
