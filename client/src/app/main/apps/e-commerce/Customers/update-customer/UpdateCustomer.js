import React, { useRef, useState, useEffect } from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm } from '@fuse/hooks';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Joi from 'joi-browser';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import withReducer from 'app/store/withReducer';
import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import reducer from '../../store/reducers';
import UpdateCustomerForm from './UpdateCustomerForm';
import { withRouter } from 'react-router';
import * as MessageActions from 'app/store/actions/fuse/message.actions';

function UpdateCustomer(props) {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

  useEffect(() => {
    const fetchCustomer = async () => {
      const id = routeParams.customerId;
      const query = await firestore()
        .collection('customers')
        .where('customerId', '==', Number(id))
        .limit(1)
        .get();

      let result = query.docs[0].data();
      result.dob = result.dob && result.dob.toDate();
      setForm(result);
    };

    fetchCustomer();
  }, []);

  const validate = () => {
    const result = Joi.validate(form, schema);
    console.log(result);
    toast.error('Please Fill Required Fields!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      transition: Zoom
    });
    if (result?.error?.details) {
      setError({
        [result?.error?.details[0]?.context?.label]: true
      });
      return false;
    }
    return true;
  };

  if (isLoading) {
    return <FuseLoading />;
  }

  const onSubmit = async () => {
    if (!validate()) return;

    setisLoading(true);

    try {
      const customerNo = (
        await firestore().collection('dbConfig').doc('dbConfig').get()
      ).data();

      await firestore()
        .collection('customers')
        .add({
          ...form,
          dob: firestore.Timestamp.fromDate(form?.dob),
          customerId: customerNo?.customerId + 1
        });

      await firestore()
        .collection('dbConfig')
        .doc('dbConfig')
        .set({ customerId: customerNo?.customerId + 1 });
      dispatch(
        MessageActions.showMessage({
          message: 'User data saved to firebase'
        })
      );

      props.history.push('/apps/e-commerce/customers');
    } catch (error) {
      console.log(error);
    }
    setisLoading(false);
  };

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full">
            <ToastContainer />
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Typography
                className="normal-case flex items-center sm:mb-12"
                component={Link}
                role="button"
                to="/apps/e-commerce/customers"
                color="inherit">
                <Icon className="text-20">
                  {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                </Icon>
                <span className="mx-4">Customers</span>
              </Typography>
            </FuseAnimate>

            <div className="flex items-center max-w-full">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <img
                  className="w-32 sm:w-48 rounded"
                  src="assets/images/ecommerce/product-image-placeholder.png"
                  alt={form?.code}
                />
              </FuseAnimate>
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    Update Customer
                  </Typography>
                </FuseAnimate>
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography variant="caption">Customer Detail</Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
              className="whitespace-no-wrap normal-case"
              variant="contained"
              color="secondary"
              onClick={!form ? undefined : onSubmit}>
              Update Customer
            </Button>
          </FuseAnimate>
        </div>
      }
      content={
        !form ? (
          <FuseLoading />
        ) : (
          <UpdateCustomerForm
            form={form}
            handleChange={handleChange}
            error={error}
          />
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(withRouter(UpdateCustomer));

const schema = {
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  dob: Joi.required(),
  gender: Joi.string().required(),
  ethnicity: Joi.required(),
  state: Joi.required(),
  address: Joi.string().min(8).max(200).required(),
  city: Joi.string().min(3).max(50).required(),
  zipCode: Joi.number().required(),
  phone1: Joi.string().required(),
  phone2: Joi.string().required(),
  email: Joi.string().email().required(),
  other: Joi.string().required(),
  family: Joi.required()
};
