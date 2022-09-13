import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import ConfirmDoctorDelete from './ConfirmDoctorDelete';
import Icon from '@material-ui/core/Icon';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import FormControl from '@material-ui/core/FormControl';

import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import {makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { firestore } from 'firebase';
    
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
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.doctor);
  const theme = useTheme();
  const [showRooms, setShowRooms] = useState([]);

  const history = useHistory();
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [open, setOpen] = useState(false);

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { doctorId } = routeParams;
console.log(doctorId)
      if (doctorId === 'new') {
        dispatch(Actions.newDoctor());
        setisLoading(true);
      } else {
        console.log(doctorId)
        await dispatch(await Actions.getDoctor(doctorId));
        setisLoading(true);
      }
    };

    updateProductState();
  }, [dispatch, routeParams]);

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    if (
      (product.data && !form) ||
      (product.data && form && product.data.id !== form.id)
    ) {
      setForm(product.data);
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
      fetchlocation();
  }, [form, product.data, setForm]);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  function canBeSubmitted() {
    return (
      form.docname.length > 0 &&
      form.locationAddress.length > 0 &&
      form.State.length > 0 &&
      form.City.length > 0 &&
      form.zipCode.length > 0
    );
  }

  if (
    (!product.data ||
      (product.data && routeParams.doctorId !== product.data.id)) &&
    routeParams.doctorId !== 'new' &&
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
                    alt={form.docname}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.docname ? form.docname : 'New Doctor'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">Doctor Detail</Typography>
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
                  if (routeParams.doctorId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveShowRoom(form));
                    setisLoading(true);
                    props.history.push(`/apps/e-commerce/showRooms`);
                  } else {
                    setisLoading(false);
                    await dispatch(await Actions.updateShowRoom(form));
                    setisLoading(true);
                    props.history.push(`/apps/e-commerce/showRooms`);
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
          <Tab className="h-64 normal-case" label="New Doctor" />
        </Tabs>
        
      }
      content={
        form && (
            <div className="p-16 sm:p-24">
            <div className="flex flex-col h-260  px-16 py-6">
            {tabValue === 0 && (
              <>
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                      <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                        <h1 className="font-700" style={{ color: '#f15a25' }}>
                          USER INFO
                        </h1>
                      </div>


                      <div>
                        <div className="flex flex-row justify-center p-16 sm:p-24 ">
                          <div className="flex flex-col w-1/2 p-6">
                           
                            <TextField
                              className="mt-8 mb-16"
                             //error={form.fname === ''}
                              required
                              label="First Name"
                              autoFocus
                              id="doctor-fname"
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
                              id="doctor-lname"
                              name="lname"
                              type="text"
                              value={form.lname}
                              onChange={handleChange}
                              variant="outlined"
                              fullwidth
                            />
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
                            <TextField
                              className="mt-8 mb-16"
                              id="doctor-address"
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
                              id="doctor-city"
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
                              id="doctor-State"
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
                              id="doctor-zipcode"
                              name="zipcode"
                              type="Number"
                              value={form.zipcode}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <TextField
                              className="mt-8 mb-16"
                             //error={form.doctoremail === ''}
                              required
                              label="Email"
                              autoFocus
                              id="doctor-doctoremail"
                              name="doctoremail"
                              type="email"
                              value={form.doctoremail}
                              onChange={handleChange}
                              variant="outlined"
                            />
                            <TextField
                              className="mt-8 mb-16"
                             //error={form.other === ''}
                              label="Other"
                              autoFocus
                              id="doctor-other"
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
                        SERVICE LOCATION
                        </h1>
                      </div>
                      <div className="flex flex-col justify-center p-16 sm:p-24 ">
                      <FormControl>
                              <Select
                                labelId="demo-simple-select-autowidth-label"

                                id="showRoomId1"
                                defaultValue={form?.showRoomId}
                                value={form?.showRoomId1}
                                name="showRoomId1"
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
                                defaultValue={form?.showRoomId}
                                value={form?.showRoomId2}
                                name="showRoomId2"
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
                                defaultValue={form?.showRoomId}
                                value={form?.showRoomId3}
                                name="showRoomId3"
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
          
            <br></br> 
          </div>
          <div className="flex flex-col p-12 " >              
              {/* <Button 
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={async () => {
                if (routeParams.doctorId === 'new') {
                  setisLoading(false);
                  await dispatch(await Actions.saveShowRoom(form));
                  setisLoading(true);
                  props.history.push(`/apps/e-commerce/showRooms`);
                } else {
                  setisLoading(false);
                  await dispatch(await Actions.updateShowRoom(form));
                  setisLoading(true);
                  props.history.push(`/apps/e-commerce/showRooms`);
                }
              }}>
                 
                Save
              </Button> */}
           </div>
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
                  if (routeParams.doctorId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveDoctor(form));
                    props.history.push('/apps/e-commerce/doctors');
                    setisLoading(true);
                  } else {
                    setisLoading(false);
                    await dispatch(await Actions.updateDoctor(form));
                    props.history.push('/apps/e-commerce/doctors');
                    setisLoading(true);
                  }
                }}>

                Save
              </Button>
            </div>
            <div className="flex flex-col p-12">
              <ConfirmDoctorDelete open={open} handleClose={handleClose} form={form} propssent={props} />

              <Button
                style={{
                  color: 'red'
                }}
                variant="outlined"
                // onClick={() => setShowModal(true)}
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
          </div>

         
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Doctor);
