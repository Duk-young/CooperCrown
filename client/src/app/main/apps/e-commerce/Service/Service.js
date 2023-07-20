import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import ConfirmServiceDelete from './ConfirmServiceDelete';


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
function Service(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.service);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { serviceId } = routeParams;
      if (serviceId === 'new') {
        dispatch(Actions.newService());
        setisLoading(true);
      } else {
        await dispatch(await Actions.getService(serviceId));
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
  }, [form, product.data, setForm]);

  const isFormValid = () => {
    const errs = {};

    if (!form.name) {
      errs.name = 'Please enter exam / service name'
    }

    if (!form.price) {
      errs.price = 'Please enter service price'
    }

    return errs;
  }

  const submitForm = async () => {
    if (routeParams.serviceId === 'new') {
      setisLoading(false);
      await dispatch(await Actions.saveService(form));
      setisLoading(true);
      props.history.push('/apps/e-commerce/services');
    } else {
      setisLoading(false);
      await dispatch(await Actions.updateService(form));
      setisLoading(true);
      props.history.push('/apps/e-commerce/services');
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
    (!product.data ||
      (product.data && routeParams.serviceId !== product.data.id)) &&
    routeParams.serviceId !== 'new' &&
    !isLoading
  ) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      header={
        form && (
          <div className='flex flex-row justify-center w-full'>
            <div className='flex flex-row justify-start w-1/3'>
              <Typography
                className="normal-case flex sm:mb-12"
                component={Link}
                role="button"
                to="/apps/e-commerce/services"
                color="inherit">
                <Icon className="text-20">
                  {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                </Icon>
                <span className="mx-4">Services</span>
              </Typography>
            </div>
            <div className='flex flex-row justify-center w-1/3'>
              <Typography
                className="flex mx-0 sm:mx-12 uppercase"
                style={{ fontSize: '3rem', fontWeight: 600 }}
                variant="h6">
                {form?.name ? form?.name : 'New Service'}
              </Typography>
            </div>
            <div className='flex flex-row justify-start w-1/3'></div>
          </div>
        )
      }
      content={
        form && (
          <>
            <div className="flex flex-col h-260  px-16 py-6 gap-20">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h1 className="font-700" style={{ color: '#f15a25' }}>
                    DETAIL
                  </h1>
                </div>
                <div className="p-16 sm:p-24 ">
                  <div>
                    <TextField
                      className="mt-8 mb-16"
                      required
                      label="Exam / Service Name"
                      autoFocus
                      id="service-name"
                      name="name"
                      value={form.name}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'name',
                          value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                        }
                      })}
                      variant="outlined"
                      error={errors.name}
                      helperText={errors.name}
                      fullWidth
                    />
                    <TextField
                      className="mt-8 mb-16"
                      label="Description"
                      id="service-description"
                      name="description"
                      value={form.description}
                      onChange={(e) => handleChange({
                        target: {
                          name: 'description',
                          value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                        }
                      })}
                      variant="outlined"
                      fullWidth
                    />
                    <TextField
                      className="mt-8 mb-16"
                      required
                      id="service-price"
                      name="price"
                      onChange={handleChange}
                      label="Service Price"
                      type="Number"
                      value={form.price}
                      variant="outlined"
                      error={errors.price}
                      helperText={errors.price}
                      fullWidth
                    />
                  </div>
                </div>
                <br></br>
              </div>
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
              {routeParams.serviceId !== 'new' && (
                <div className="flex flex-col">
                  <ConfirmServiceDelete open={open} handleClose={handleClose} form={form} propssent={props} />

                  <Button
                    style={{
                      color: 'red',
                      padding: '10px 32px'
                    }}
                    variant="outlined"
                    // onClick={() => setShowModal(true)}
                    onClick={() => {
                      if (routeParams.serviceId === 'new') {
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
              )}

            </div>
          </>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Service);
