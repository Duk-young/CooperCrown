import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import { useTheme } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import Button from '@material-ui/core/Button';
import ConfirmDiscountDelete from './ConfirmDiscountDelete';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
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
function Discount(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.discount);
  const theme = useTheme();
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [errors, setErrors] = useState({});

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { discountId } = routeParams;

      if (discountId === 'new') {
        dispatch(Actions.newDiscount());
        setisLoading(true);
      } else {

        await dispatch(await Actions.getDiscount(discountId));
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


  const handleClose = () => {
    setOpen(false);
  };

  const isFormValid = () => {
    const errs = {};

    if (!form.code) {
      errs.code = 'Please enter discount code'
    }

    if (!form.amount) {
      errs.amount = 'Please enter discount amount'
    }

    return errs;
  }

  const submitForm = async () => {
    if (routeParams.discountId === 'new') {
      setisLoading(false);
      await dispatch(await Actions.saveDiscount(form));
      props.history.push('/apps/e-commerce/discounts');
      setisLoading(true);
    } else {
      setisLoading(false);
      await dispatch(await Actions.updateDiscount(form));
      props.history.push('/apps/e-commerce/discounts');
      setisLoading(true);
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
      (product.data && routeParams.discountId !== product.data.id)) &&
    routeParams.discountId !== 'new' &&
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
                to="/apps/e-commerce/discounts"
                color="inherit">
                <Icon className="text-20">
                  {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                </Icon>
                <span className="mx-4">Discount</span>
              </Typography>
            </div>
            <div className='flex flex-row justify-center w-1/3'>
              <Typography
                className="flex mx-0 sm:mx-12 uppercase"
                style={{ fontSize: '3rem', fontWeight: 600 }}
                variant="h6">
                {form.code ? form.code : 'New Discount'}
              </Typography>
            </div>
            <div className='flex flex-row justify-start w-1/3'></div>
          </div>
        )
      }
      content={
        form && (
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
                    label="Name"
                    id="discount-code"
                    name="code"
                    value={form.code}
                    onChange={handleChange}
                    variant="outlined"
                    error={errors.code}
                    helperText={errors.code}
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    label="Description"
                    id="discount-description"
                    name="description"
                    type="text"
                    value={form.description}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    required
                    id="discount-amount"
                    name="amount"
                    onChange={handleChange}
                    label="Price"
                    type="Number"
                    value={form.amount}
                    variant="outlined"
                    error={errors.amount}
                    helperText={errors.amount}
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
            {routeParams.discountId !== 'new' && (
              <div className="flex flex-row">
                <ConfirmDiscountDelete open={open} handleClose={handleClose} form={form} propssent={props} />

                <Button
                  style={{
                    color: 'red',
                    padding: '10px 32px'
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
            )}
          </div>

        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Discount);
