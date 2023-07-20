import { firestore } from 'firebase';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useTheme } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import ChangeEmailPasswordDialog from './ChangeEmailPasswordDialog';
import Checkbox from '@material-ui/core/Checkbox';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import firebaseService from 'app/services/firebaseService';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { sortAlphabetically } from '../ReusableComponents/HelperFunctions';

const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    marginLeft: '4px',
    marginRight: '4px',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});
function NewShowRoom(props) {
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const theme = useTheme();
  const [showRooms, setShowRooms] = useState([]);
  const [errors, setErrors] = useState({});
  const [isLoading, setisLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [changeType, setChangeType] = useState(null);
  const { form, handleChange, setForm } = useForm(null);
  const routeParams = useParams()


  useEffect(() => {
    const fetchDetails = async () => {
      setisLoading(true)
      let showroomdata = [];
      const queryShowrooms = await firestore()
        .collection('showRooms')
        .get();

      queryShowrooms.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(sortAlphabetically(showroomdata, 'locationName'));

      if (routeParams?.userId !== 'new') {

        let queryUser = (await firestore()
          .collection('users').doc(routeParams?.userId)
          .get()).data();

        setForm(queryUser);
      }
      setisLoading(false);
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleClose = () => setOpen(false)


  const isFormValid = () => {
    const errs = {};

    if (!form.showRoomId) {
      errs.showRoomId = 'Please select a showroom'
    }

    if (!form.fname) {
      errs.fname = 'Please enter first name'
    }

    if (!form.lname) {
      errs.lname = 'Please enter last name'
    }

    if (!form.Gender) {
      errs.gender = 'Please enter gender'
    }

    if (!form.address) {
      errs.address = 'Please enter address'
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

    if (!form.dob) {
      errs.dob = 'Please enter date of birth'
    }

    if (!form.zipcode) {
      errs.zipcode = 'Please enter zipcode'
    }

    if (!form.email) {
      errs.email = 'Please enter email address'
    }

    if (!form.password && routeParams?.userId === 'new') {
      errs.password = 'Please enter password'
    }

    if (form.password && form.confirmPassword !== form.password && routeParams?.userId === 'new') {
      errs.confirmPassword = "password does not match new password";
    }

    return errs
  }

  const submitForm = async () => {
    if (routeParams.userId === 'new') {
      setisLoading(true)
      if (!firebaseService.auth) {
        console.warn(
          "Firebase Service didn't initialize, check your configuration"
        );

        return () => false;
      }

      try {
        const createUser = firebaseService.functions.httpsCallable(
          'createUser'
        );
        const userRecord = await createUser(form)
        const addStaffRole = firebaseService.functions.httpsCallable(
          'addStaffRole'
        );
        await addStaffRole({ email: form?.email })
        await firebaseService.firestoreDb
          .collection('users')
          .doc(userRecord.data.user.uid)
          .set({
            ...form,
            password: '',
            confirmPassword: '', 
            Role: 'Staff',
            CompanyId: userRecord.data.user.uid,
            dateCreated: firestore.Timestamp.fromDate(new Date()),
            locationName: showRooms?.find((room) => room?.showRoomId === form?.showRoomId)?.locationName
          })

        dispatch(MessageActions.showMessage({ message: 'User created successfully' }));
        setisLoading(false)
        props.history.push('/apps/e-commerce/users');

      } catch (error) {
        dispatch(MessageActions.showMessage({ message: error.message }));
        console.log('Error while creating a user is:', error)
      }
    } else {
      setisLoading(true)
      await firebaseService.firestoreDb
        .collection('users')
        .doc(routeParams?.userId)
        .set({...form, locationName: showRooms?.find((room) => room?.showRoomId === form?.showRoomId)?.locationName})

      dispatch(MessageActions.showMessage({ message: 'User updated successfully' }));
      setisLoading(false)
      props.history.push('/apps/e-commerce/users');

    }
  }

  const handleDelete = async () => {
    setisLoading(true)
    if (!firebaseService.auth) {
      console.warn(
        "Firebase Service didn't initialize, check your configuration"
      );

      return () => false;
    }
    try {
      const deleteUser = firebaseService.functions.httpsCallable('deleteUser');
      await deleteUser(routeParams?.userId)

      await firestore().collection('users').doc(routeParams?.userId).delete()

      dispatch(MessageActions.showMessage({ message: 'User deleted successfully' }));
      setisLoading(false)
      props.history.push('/apps/e-commerce/users');

    } catch (error) {
      dispatch(MessageActions.showMessage({ message: error.message }));
      console.log('Error while deleting a user is:', error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = isFormValid();
    setErrors(errs)

    if (Object.entries(errs).some((err) => err !== '')) {
      return;
    }

    submitForm();
  }

  if (isLoading) return <FuseLoading />

  return (
    <FusePageCarded
      header={(
        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-center w-full h-full'>
            <div className='flex flex-row justify-start w-1/3'>
              <Typography
                className="normal-case flex sm:mb-12"
                component={Link}
                role="button"
                to="/apps/e-commerce/users"
                color="inherit">
                <Icon className="text-20">
                  {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                </Icon>
                <span className="mx-4">Users</span>
              </Typography>
            </div>
            <div className='flex flex-row justify-center w-1/3'>
              <Typography
                className="flex mx-0 sm:mx-12 uppercase"
                style={{ fontSize: '2.5rem', fontWeight: 600 }}
                variant="h6">
                {form?.fname && form?.lname ? `${form?.fname} ${form?.lname}` : 'New User'}
              </Typography>
            </div>
            <div className='flex lg:flex-row lg:items-center flex-col w-1/3 items-center gap-4'>
              {routeParams?.userId !== 'new' && (
                <>
                  <Button
                    style={{ width: '180px', height: '35px' }}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setChangeType('email')
                      setOpen(true)
                    }}>
                    Change Email
                  </Button>
                  <Button
                    style={{ width: '180px', height: '35px' }}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      setChangeType('password')
                      setOpen(true)
                    }}>
                    Change Password
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      content={
        <>
          <div className="p-16 sm:p-24">
            <div className="flex flex-col h-260  px-16 py-6">
              <div className="flex flex-col gap-20">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      USER INFO
                    </h1>
                  </div>
                  <div>
                    <div className="flex flex-col justify-center p-16 sm:p-24 ">
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <div className="w-1/2">
                          <ChangeEmailPasswordDialog open={open} handleClose={handleClose} changeType={changeType}
                            uid={routeParams?.userId} setisLoading={setisLoading} mainForm={form} setMainForm={setForm} />
                          <FormControl variant='outlined' className='w-full' error={errors.showRoomId}>
                            <InputLabel id="demo-simple-select-outlined-label">Showroom</InputLabel>
                            <Select
                              labelId="demo-simple-select-outlined-label"
                              id="showRoomId"
                              label="Showroom"
                              defaultValue={form?.showRoomId}
                              value={form?.showRoomId ?? ''}
                              name="showRoomId"
                              onChange={handleChange}
                            >
                              {showRooms.map((row) => (
                                <MenuItem key={row?.showRoomId} value={row?.showRoomId}>
                                  {row?.locationName}
                                </MenuItem>
                              ))}
                            </Select>
                            {errors.showRoomId && (
                              <FormHelperText>Select Showroom from the list</FormHelperText>
                            )}
                          </FormControl>
                        </div>
                        <TextField
                          className="w-1/2"
                          required
                          label="State"
                          id="user-State"
                          name="State"
                          type="text"
                          value={form?.State ?? ''}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'State',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          error={errors.State}
                          helperText={errors.State}
                          variant="outlined"
                        />
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          required
                          label="First Name"
                          id="user-fname"
                          name="fname"
                          type="text"
                          value={form?.fname ?? ''}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'fname',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          variant="outlined"
                          error={errors.fname}
                          helperText={errors.fname}
                          fullwidth
                        />
                        <TextField
                          className="w-1/2"
                          required
                          label="Last Name"
                          id="user-lname"
                          name="lname"
                          type="text"
                          value={form?.lname ?? ''}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'lname',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          variant="outlined"
                          error={errors.lname}
                          helperText={errors.lname}
                          fullwidth
                        />
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          required
                          id="user-address"
                          name="address"
                          onChange={(e) => handleChange({
                            target: {
                              name: 'address',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          label="Address"
                          type="address"
                          value={form?.address ?? ''}
                          variant="outlined"
                          error={errors.address}
                          helperText={errors.address}
                          fullwidth
                        />
                        <TextField
                          className="w-1/2"
                          required
                          label="City"
                          id="user-city"
                          name="city"
                          type="text"
                          value={form?.city ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                          error={errors.city}
                          helperText={errors.city}
                          fullwidth
                        />
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <div className="flex flex-row flex-wrap w-1/2">
                          <TextField
                            id="date"
                            required
                            label="Date Of Birth"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={form?.dob ?? ''}
                            variant='outlined'
                            fullWidth
                            error={errors.dob}
                            helperText={errors.dob}
                            onChange={(e) => {
                              handleChange({
                                target: {
                                  name: 'dob',
                                  value: e.target.value
                                }
                              });
                            }}
                          />
                        </div>
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
                            autoWidth>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          required
                          label="Phone 1"
                          id="user-phone1"
                          name="phone1"
                          type="phone"
                          value={form?.phone1 ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                          error={errors.phone1}
                          helperText={errors.phone1}
                        />
                        <TextField
                          className="w-1/2"
                          required
                          label="Zip Code"
                          id="user-zipcode"
                          name="zipcode"
                          type="Number"
                          value={form?.zipcode ?? ''}
                          onChange={handleChange}
                          error={errors.zipcode}
                          helperText={errors.zipcode}
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
                          value={form?.phone2 ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                        />
                        <TextField
                          className="w-1/2"
                          label="Other"
                          id="user-other"
                          name="other"
                          type="text"
                          value={form?.other ?? ''}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'other',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          variant="outlined"
                        />
                      </div>
                      <div className='flex flex-row justify-center w-full'>
                        <FormControl component="fieldset">
                          <RadioGroup
                            row
                            aria-label="user-role"
                            name="userRole"
                            value={form?.userRole}
                            onChange={handleChange}>
                            <FormControlLabel
                              value="admin"
                              control={<Radio />}
                              label="Admin"
                            />
                            <FormControlLabel
                              value="staff"
                              control={<Radio />}
                              label="Staff"
                            />
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                  </div>
                </div>
                {routeParams?.userId === 'new' && (
                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700 uppercase" style={{ color: '#f15a25' }}>
                        Login Info
                      </h1>
                    </div>
                    <div className="flex flex-col justify-center p-16 sm:p-24 ">
                      <TextField
                        className="mt-8 mb-16"
                        required
                        label="Email"
                        id="email"
                        name="email"
                        type="email"
                        value={form?.email ?? ''}
                        onChange={handleChange}
                        variant="outlined"
                        error={errors.email}
                        helperText={errors.email}
                      />
                      <TextField
                        className="mt-8 mb-16"
                        id="user-password"
                        name="password"
                        onChange={handleChange}
                        label="Password"
                        type="password"
                        value={form?.password ?? ''}
                        variant="outlined"
                        error={errors.password}
                        helperText={errors.password}
                        fullWidth
                      />
                      <TextField
                        className="mt-8 mb-16"
                        id="user-password-confirm"
                        name="confirmPassword"
                        onChange={handleChange}
                        label="Confirm Password"
                        type="password"
                        value={form?.confirmPassword ?? ''}
                        variant="outlined"
                        error={errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        fullWidth
                      />
                    </div>
                  </div>
                )}
                {form?.userRole === 'staff' && (
                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700" style={{ color: '#f15a25' }}>
                        Priviliges
                      </h1>
                    </div>
                    <div className='flex flex-col lg:flex-row w-full'>
                      <div className='flex flex-row w-full lg:w-1/2 justify-evenly items-center'>
                        <div className='flex flex-col w-1/5'><h3 className='font-700 pl-4'>Orders</h3></div>
                        <div className='flex flex-row w-4/5 justify-evenly'>
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.ordersView ?? ''}
                                onChange={handleChange}
                                name="ordersView"
                              />
                            }
                            label="View"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.ordersCreate ?? ''}
                                onChange={handleChange}
                                name="ordersCreate"
                              />
                            }
                            label="Create"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.ordersEdit ?? ''}
                                onChange={handleChange}
                                name="ordersEdit"
                              />
                            }
                            label="Edit"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.ordersDelete ?? ''}
                                onChange={handleChange}
                                name="ordersDelete"
                              />
                            }
                            label="Delete"
                          />
                        </div>
                      </div>
                      <div className='flex flex-row w-full lg:w-1/2 justify-evenly items-center'>
                        <div className='flex flex-col w-1/5'><h3 className='font-700 pl-4'>Customers</h3></div>
                        <div className='flex flex-row w-4/5 justify-evenly'>
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.customersView ?? ''}
                                onChange={handleChange}
                                name="customersView"
                              />
                            }
                            label="View"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.customersCreate ?? ''}
                                onChange={handleChange}
                                name="customersCreate"
                              />
                            }
                            label="Create"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.customersEdit ?? ''}
                                onChange={handleChange}
                                name="customersEdit"
                              />
                            }
                            label="Edit"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.customersDelete ?? ''}
                                onChange={handleChange}
                                name="customersDelete"
                              />
                            }
                            label="Delete"
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col lg:flex-row w-full'>
                      <div className='flex flex-row w-full lg:w-1/2 justify-evenly items-center'>
                        <div className='flex flex-col w-1/5'><h3 className='font-700 pl-4'>Inventory</h3></div>
                        <div className='flex flex-row w-4/5 justify-evenly'>
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.inventoryView ?? ''}
                                onChange={handleChange}
                                name="inventoryView"
                              />
                            }
                            label="View"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.inventoryCreate ?? ''}
                                onChange={handleChange}
                                name="inventoryCreate"
                              />
                            }
                            label="Create"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.inventoryEdit ?? ''}
                                onChange={handleChange}
                                name="inventoryEdit"
                              />
                            }
                            label="Edit"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.inventoryDelete ?? ''}
                                onChange={handleChange}
                                name="inventoryDelete"
                              />
                            }
                            label="Delete"
                          />
                        </div>
                      </div>
                      <div className='flex flex-row w-full lg:w-1/2 justify-evenly items-center'>
                        <div className='flex flex-col w-1/5'><h3 className='font-700 pl-4'>Insurance</h3></div>
                        <div className='flex flex-row w-4/5 justify-evenly'>
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.insuranceView ?? ''}
                                onChange={handleChange}
                                name="insuranceView"
                              />
                            }
                            label="View"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.insuranceCreate ?? ''}
                                onChange={handleChange}
                                name="insuranceCreate"
                              />
                            }
                            label="Create"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.insuranceEdit ?? ''}
                                onChange={handleChange}
                                name="insuranceEdit"
                              />
                            }
                            label="Edit"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.insuranceDelete ?? ''}
                                onChange={handleChange}
                                name="insuranceDelete"
                              />
                            }
                            label="Delete"
                          />
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col lg:flex-row w-full'>
                      <div className='flex flex-row w-full lg:w-1/2 justify-evenly items-center'>
                        <div className='flex flex-col w-1/5'><h3 className='font-700 pl-4'>Appointments</h3></div>
                        <div className='flex flex-row w-4/5 justify-evenly'>
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.appointmentsView ?? ''}
                                onChange={handleChange}
                                name="appointmentsView"
                              />
                            }
                            label="View"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.appointmentsCreate ?? ''}
                                onChange={handleChange}
                                name="appointmentsCreate"
                              />
                            }
                            label="Create"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.appointmentsEdit ?? ''}
                                onChange={handleChange}
                                name="appointmentsEdit"
                              />
                            }
                            label="Edit"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.appointmentsDelete ?? ''}
                                onChange={handleChange}
                                name="appointmentsDelete"
                              />
                            }
                            label="Delete"
                          />
                        </div>
                      </div>
                      <div className='flex flex-row w-full lg:w-1/2 justify-evenly items-center'>
                        <div className='flex flex-col w-1/5'><h3 className='font-700 pl-4'>Exams</h3></div>
                        <div className='flex flex-row w-4/5 justify-evenly'>
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.examsView ?? ''}
                                onChange={handleChange}
                                name="examsView"
                              />
                            }
                            label="View"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.examsCreate ?? ''}
                                onChange={handleChange}
                                name="examsCreate"
                              />
                            }
                            label="Create"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.examsEdit ?? ''}
                                onChange={handleChange}
                                name="examsEdit"
                              />
                            }
                            label="Edit"
                          />
                          <FormControlLabel
                            className="m-0"
                            control={
                              <Checkbox
                                checked={form?.examsDelete ?? ''}
                                onChange={handleChange}
                                name="examsDelete"
                              />
                            }
                            label="Delete"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <br></br>

              <div className="flex flex-col py-12" >
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
                routeParams.userId !== "new" ? (
                  <div className="flex flex-col">
                    <Button
                      style={{
                        color: 'red',
                        padding: '10px 32px'
                      }}
                      variant="outlined"
                      onClick={() => setShowModal(true)}
                    >
                      <Icon>delete</Icon>
                      DELETE
                    </Button>
                    {showModal ? (
                      <>
                        <Dialog
                          maxWidth="xs"
                          fullWidth
                          onClose={() => setShowModal(false)}
                          aria-labelledby="simple-dialog-title"
                          open={showModal}>


                          <div className="flex flex-col p-20 w-full item-center">
                            <IconButton aria-label="close" onClick={() => setShowModal(false)} style={{ alignSelf: 'end', padding: 0 }}>
                              <CloseIcon />
                            </IconButton>
                            <div className="flex flex-col h-full py-4 mb-20">
                              <div className="flex flex-row justify-center">
                                <h1 className="font-700" style={{ color: '#f15a25' }}>
                                  Are you sure you want to delete?
                                </h1>
                              </div>
                            </div>
                            <Button
                              style={{
                                backgroundColor: '#f15a25',
                                alignSelf: 'center',
                                marginBottom: '1rem',
                                color: '#fff',
                                '&:hover': {
                                  backgroundColor: '#f47b51',
                                  color: '#fff'
                                }
                              }}
                              variant="contained"
                              color="secondary"
                              onClick={handleDelete}
                            >
                              Confirm
                            </Button>
                          </div>
                        </Dialog>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}



                  </div>
                ) : null
              }

            </div>
          </div>
        </>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(NewShowRoom);
