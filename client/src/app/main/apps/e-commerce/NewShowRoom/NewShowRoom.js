import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { firestore, storage } from 'firebase';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import ConfirmShowroomDelete from './ConfirmShowroomDelete';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import { states } from 'app/main/apps/e-commerce/Emails/helper.js';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';


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
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({})
  const { form, handleChange, setForm } = useForm(null);
  const [state, setState] = useState(form?.state);

  const routeParams = useParams();

  const defaultStates = {
    options: states,
    getOptionLabel: (option) => option.name || option
  };

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { showRoomtId } = routeParams;

      if (showRoomtId === 'new') {
        dispatch(Actions.newShowRoom());
        setisLoading(true);
      } else {
        await dispatch(await Actions.getProduct(showRoomtId));
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
  }, [form, product.data, setForm]);

  useEffect(() => {
      if(routeParams.showRoomtId === 'new') {
      setForm(null)
    }
  }, []);

  function handleChangeTab(event, value) {
    setTabValue(value);
  }
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = async () => {
    try {

      const queryshowRoom = await firestore()
        .collection('showRooms')
        .where('showRoomId', '==', Number(form.showRoomId))
        .limit(1)
        .get();

      let result = queryshowRoom.docs[0].data();
      result.id = queryshowRoom.docs[0].id;
      await firestore().collection('showRooms').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'showRoom deleted successfully'
        })
      );
      props.history.push(
        props.history.push(`/apps/e-commerce/showRooms`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const isFormValid = () => {
    const errs = {};

    if (!form.locationName) {
      errs.locationName = 'Please enter location name'
    }

    if (!form.locationAddress) {
      errs.locationAddress = 'Please enter location address'
    }

    if (!form.City) {
      errs.city = 'Please enter city'
    }

    if (!form.State) {
      errs.state = 'Please enter state'
    }

    if (!form.phoneNo) {
      errs.phoneNo = 'Please enter phone number'
    }

    if (!form.email) {
      errs.email = 'Please enter email address'
    }

    if (!form.zipCode) {
      errs.zipCode = 'Please enter valid zip code'
    }

    return errs;
  }

  const submitForm = async () => {
    if (routeParams.showRoomtId === 'new') {
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
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = isFormValid();
    setErrors(errs);

    if (Object.values(errs).some((err) => err !== "")) {
      return;
    }

    submitForm();
  }


  // const submit = () => {

  //   confirmAlert({
  //     title: 'Confirm to submit',
  //     message: 'Are you sure to do this.',
  //     buttons: [
  //       {
  //         label: 'Yes',
  //         onClick: () => handleDelete()
  //       },
  //       {
  //         label: 'No',
  //         //onClick: () => alert('Click No')
  //       }
  //     ]
  //   });
  // }

  function canBeSubmitted() {
    return (
      form.locationName.length > 0 &&
      form.locationAddress.length > 0 &&
      form.State.length > 0 &&
      form.City.length > 0 &&
      form.zipCode.length > 0
    );
  }

  if (
    (!product.data ||
      (product.data && routeParams.showRoomtId !== product.data.id)) &&
    routeParams.showRoomtId !== 'new' &&
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
                  to="/apps/e-commerce/showRooms"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Showrooms</span>
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt={form.locationName}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.locationName ? form.locationName : 'New Showroom'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">Showroom Detail</Typography>
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
          onChange={handleChangeTab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          classes={{ root: 'w-full h-64' }}>
          <Tab className="h-64 normal-case" label={`${routeParams.showRoomtId !== 'new' ? 'Edit' : 'New'} Showroom`} />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24">
            <div className="flex flex-col h-260  px-16 py-6">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h1 className="font-700" style={{ color: '#f15a25' }}>
                    LOCATION INFO
                  </h1>
                </div>
                <div className="p-16 sm:p-24  ">
                  {tabValue === 0 && (
                    <div>
                      <TextField
                        className="mt-8 "
                        required
                        label="Location Name"
                        autoFocus
                        id="locationName"
                        name="locationName"
                        value={form.locationName}
                        onChange={handleChange}
                        variant="outlined"
                        error={errors.locationName}
                        helperText={errors.locationName}
                        fullWidth
                      />

                      <TextField
                        className="mt-8 "
                        required
                        id="locationAddress"
                        name="locationAddress"
                        onChange={handleChange}
                        label="Location Address"
                        type="text"
                        value={form.locationAddress}
                        multiline
                        rows={5}
                        variant="outlined"
                        error={errors.locationAddress}
                        helperText={errors.locationAddress}
                        fullWidth
                      />
                      <TextField
                        className="mt-8 "
                        required
                        label="City"
                        type="text"
                        id="City"
                        name="City"
                        value={form.City}
                        onChange={handleChange}
                        variant="outlined"
                        error={errors.city}
                        helperText={errors.city}
                        fullWidth
                      />
                      <Autocomplete
                    {...defaultStates}
                    id="stateId"
                    value={form?.State}
                    fullWidth
                    getOptionSelected={(option, value) => option.name === value}
                    inputValue={state}
                    onInputChange={(e, value) => setState(value)}
                    name="state"
                    onChange={(_, value) =>
                      handleChange({
                        target: { value: value?.name, name: 'State' }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} label="State" margin="normal" variant='outlined'/>
                    )}
                  />
                      <TextField
                        className="mt-8  pr-4"
                        required
                        label="Phone No.1"
                        id="phoneNo"
                        name="phoneNo"
                        value={form.phoneNo}
                        onChange={handleChange}
                        variant="outlined"
                        error={errors.phoneNo}
                        helperText={errors.phoneNo}
                        fullWidth
                      />
                      <TextField
                        className="mt-8  pr-4"
                        // required
                        label="Phone No.2"
                        id="phoneNo1"
                        name="phoneNo2"
                        value={form.phoneNo2}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      {/* <TextField
                    className="mt-8 "
                   
                    required
                    label="Fax No."
                    id="faxNo"
                    name="faxNo"
                    value={form.faxNo}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  /> */}
                      {/* </div> */}
                      <TextField
                        className="mt-8 "
                        required
                        label="Email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        variant="outlined"
                        error={errors.email}
                        helperText={errors.email}
                        fullWidth
                      />
                      <TextField
                        className="mt-8 "
                        required
                        label="Zip Code"
                        id="zipCode"
                        type="number"
                        name="zipCode"
                        value={form.zipCode}
                        onChange={handleChange}
                        variant="outlined"
                        error={errors.zipCode}
                        helperText={errors.zipCode}
                        fullWidth
                      />
                      <TextField
                        className="mt-8 "
                        label="Other "
                        id="other1"
                        name="other1"
                        value={form.other1}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />

                    </div>
                  )}
                </div>
                <br></br>
              </div>
              <div className="flex flex-col py-12 " >
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
                routeParams.showRoomtId !== 'new' && (
                  <div className="flex flex-col pb-12">
                    <ConfirmShowroomDelete open={open} handleClose={handleClose} form={form} propssent={props} />

                    <Button
                      style={{
                        color: 'red',
                        padding: '10px 32px'
                      }}
                      variant="outlined"
                      // onClick={() => setShowModal(true)}
                      onClick={() => {
                        if (routeParams.showRoomtId === 'new') {
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

export default withReducer('eCommerceApp', reducer)(NewShowRoom);
