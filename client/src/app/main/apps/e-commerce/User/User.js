import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import { firestore } from 'firebase';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import { useHistory } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';


// const useStyles = makeStyles((theme) => ({
//   productImageFeaturedStar: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     color: orange[400],
//     opacity: 0
//   },
//   productImageUpload: {
//     transitionProperty: 'box-shadow',
//     transitionDuration: theme.transitions.duration.short,
//     transitionTimingFunction: theme.transitions.easing.easeInOut
//   },
//   productImageItem: {
//     transitionProperty: 'box-shadow',
//     transitionDuration: theme.transitions.duration.short,
//     transitionTimingFunction: theme.transitions.easing.easeInOut,
//     '&:hover': {
//       '& $productImageFeaturedStar': {
//         opacity: 0.8
//       }
//     },
//     '&.featured': {
//       pointerEvents: 'none',
//       boxShadow: theme.shadows[3],
//       '& $productImageFeaturedStar': {
//         opacity: 1
//       },
//       '&:hover $productImageFeaturedStar': {
//         opacity: 1
//       }
//     }
//   }
// }));
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
function NewShowRoom(props) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const classes = useStyles();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.user);
  const theme = useTheme();
  const [showRooms, setShowRooms] = useState([]);

  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { userId } = routeParams;
      console.log(userId)
      if (userId === 'new') {
        dispatch(Actions.newUser());
        setisLoading(true);
      } else {

        await dispatch(await Actions.getUser(userId));
        setisLoading(true);
      }
    };
    updateProductState();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if (
      (product.data && !form) ||
      (product.data && form && product.data.id !== form.id)
    ) {
      setForm(product.data);
    }
    const fetchlocation = async () => {
      const d1 = new Date().toDateString();
      console.log(d1);
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
    fetchlocation();
  }, [form, product.data, setForm]);
  const handleDelete = async () => {
    try {

      const queryuser = await firestore()
        .collection('users')
        .where('userId', '==', Number(form.userId))
        .limit(1)
        .get();

      let result = queryuser.docs[0].data();
      result.id = queryuser.docs[0].id;
      await firestore().collection('users').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'User deleted successfully'
        })
      );
      props.history.push(
        props.history.push(`/apps/e-commerce/users`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  function canBeSubmitted() {
    return (
      form.username.length > 0 &&
      form.password.length > 0 &&
      form.confirmPassword.length > 0 &&
      form.password === form.confirmPassword
    );
  }

  if (
    (!product.data ||
      (product.data && routeParams.userId !== product.data.id)) &&
    routeParams.userId !== 'new' &&
    !isLoading
  ) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/apps/e-commerce/users"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Users</span>
                </Typography>
              </FuseAnimate>
              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt={form.username}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.username ? form.username : 'New User'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">User Detail</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
            {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
                disabled={!canBeSubmitted()}
                onClick={async () => {
                  if (routeParams.userId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveUser(form));
                    props.history.push('/apps/e-commerce/users');
                    setisLoading(true);
                  }
                }}>
                Save
              </Button>
            </FuseAnimate> */}
          </div>
        )
      }
      contentToolbar={
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}>
          <Tab className="h-64 normal-case" label="Register User" />
          {console.log({ tabValue })}
        </Tabs>
      }
      content={
        form && (
          <>
            <div className="p-16 sm:p-24">
              <div className="flex flex-col h-260  px-16 py-6">
                {tabValue === 0 && (
                  <div>
                    <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                      <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                        <h1 className="font-700" style={{ color: '#f15a25' }}>
                          USER INFO
                        </h1>
                      </div>


                      <div>
                        <div className="flex flex-row justify-center p-16 sm:p-24 ">
                          <div className="flex flex-col w-1/2 p-6">
                            <FormControl>
                              <Select
                                labelId="demo-simple-select-autowidth-label"

                                id="showRoomId"
                                defaultValue={form?.showRoomId}
                                value={form?.showRoomId}
                                name="showRoomId"
                                onChange={handleChange}
                                autoWidth>
                                {showRooms.map((row) => (
                                  <MenuItem value={row?.showRoomId}>
                                    {row?.locationName}
                                  </MenuItem>
                                ))}
                              </Select>
                              <FormHelperText>Select Showroom from the list</FormHelperText>
                            </FormControl>
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.fname === ''}
                              required
                              label="First Name"
                              autoFocus
                              id="user-fname"
                              name="fname"
                              type="text"
                              value={form.fname}
                              onChange={handleChange}
                              variant="outlined"
                              fullwidth
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.lname === ''}
                              required
                              label="Last Name"
                              autoFocus
                              id="user-lname"
                              name="lname"
                              type="text"
                              value={form.lname}
                              onChange={handleChange}
                              variant="outlined"
                              fullwidth
                            />
                           <div className="flex flex-row flex-wrap">
                            <div classname="flex">
                             
                              <Typography
                                className="username text-16 whitespace-no-wrap self-center mb-20"
                                color="inherit">
                                Date if Birth
                              </Typography>
                              
                             </div>
                             <div classname="flex">
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <Grid container justifyContent="start">
                                  <KeyboardDatePicker
                                    className="ml-0 0 mt-0"
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
                                </Grid>
                              </MuiPickersUtilsProvider>
                              
                            </div>
                            </div>
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.Gender === ''}
                              required
                              label="Gender"
                              autoFocus
                              id="user-Gender"
                              name="Gender"
                              type="text"
                              value={form.Gender}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.phone1 === ''}
                              required
                              label="Phone 1"
                              autoFocus
                              id="user-phone1"
                              name="phone1"
                              type="phone"
                              value={form.phone1}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.phone2 === ''}
                              label="Phone 2"
                              autoFocus
                              id="user-phone2"
                              name="phone2"
                              type="phone"
                              value={form.phone2}
                              onChange={handleChange}
                              variant="outlined"
                            />
                          </div>
                          <div className="flex flex-col w-1/2 p-6">
                          <div className="flex-1 pl-30">
              <h3 className="ml-40 hidden font-700 ">Hidden</h3>
            </div>
                            <TextField
                              className="mt-20 mb-16"
                              id="user-address"
                              name="address"
                              onChange={handleChange}
                              label="Address"
                              type="address"
                              value={form.address}
                              variant="outlined"
                              fullwidth
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.city === ''}
                              required
                              label="City"
                              autoFocus
                              id="user-city"
                              name="city"
                              type="text"
                              value={form.city}
                              onChange={handleChange}
                              variant="outlined"
                              fullwidth
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.State === ''}
                              label="State"
                              autoFocus
                              id="user-State"
                              name="State"
                              type="text"
                              value={form.State}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.zipcode === ''}
                              label="Zip Code"
                              autoFocus
                              id="user-zipcode"
                              name="zipcode"
                              type="Number"
                              value={form.zipcode}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.useremail === ''}
                              required
                              label="Email"
                              autoFocus
                              id="email"
                              name="email"
                              type="email"
                              value={form.email}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <TextField
                              className="mt-8 mb-16"
                              //error={form.other === ''}
                              label="Other"
                              autoFocus
                              id="user-other"
                              name="other"
                              type="text"
                              value={form.other}
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
                          Login Info
                        </h1>
                      </div>
                      <div className="flex flex-col justify-center p-16 sm:p-24 ">
                        <TextField
                          className="mt-8 mb-16"
                          //error={form.email === ''}
                          required
                          label="Username"
                          autoFocus
                          id="user-username"
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          className="mt-8 mb-16"
                          id="user-password"
                          name="password"
                          onChange={handleChange}
                          label="Password"
                          type="password"
                          value={form.password}
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          className="mt-8 mb-16"
                          id="user-password-confirm"
                          name="confirmPassword"
                          onChange={handleChange}
                          label="Confirm Password"
                          type="password"
                          value={form.confirmPassword}
                          variant="outlined"
                          fullWidth
                        />
                      </div>
                    </div>
                  </div>
                )}

                <br></br>

                <div className="flex flex-col p-12 " >
                  <Button
                    style={{
                      maxHeight: '70px',
                      minHeight: '70px'
                    }}
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={async () => {
                      if (routeParams.userId === 'new') {
                        setisLoading(false);
                        await dispatch(await Actions.saveUser(form));
                        props.history.push('/apps/e-commerce/users');
                        setisLoading(true);
                      } else {
                        console.log(form)
                        setisLoading(false);
                        await dispatch(await Actions.updateUser(form));

                        props.history.push(`/apps/e-commerce/users`);
                        setisLoading(true);
                      }
                    }}>
                    Save
                  </Button>

                </div>
              </div>
              <div className="flex flex-col p-12">
                <Button
                  style={{
                    color: 'red'
                  }}
                  variant="outlined"
                  onClick={() => setShowModal(true)}
                >
                  <Icon>delete</Icon>
                  DELETE
                </Button>
                {showModal ? (
                  <>
                    <div
                      className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                          <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">

                            <button
                              className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                              onClick={() => setShowModal(false)}
                            >
                              <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                ×
                              </span>
                            </button>
                          </div>

                          <div className="relative p-6 flex-auto">
                            <h3 className="text-3xl font-semibold">
                              Are you sure you want to delete?
                            </h3>
                          </div>

                          <div className="flex items-center justify-center p-6 border-t border-solid border-slate-200 rounded-b">

                            <Button
                              className={classes.button}
                              variant="contained"
                              color="secondary"
                              onClick={handleDelete}
                            >
                              Confirm
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}



              </div>
            </div>
          </>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(NewShowRoom);
