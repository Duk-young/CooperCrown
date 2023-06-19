import '../Search.css';
import 'react-toastify/dist/ReactToastify.css';
import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { useTheme } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import CustomAlert from '../../ReusableComponents/CustomAlert';
import firebaseService from 'app/services/firebaseService';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import React, { useState, useEffect } from 'react';
import reducer from '../../store/reducers';
import Typography from '@material-ui/core/Typography';
import UpdateCustomerForm from './UpdateCustomerForm';
import withReducer from 'app/store/withReducer';

function UpdateCustomer(props) {
  const [error] = useState(null);
  // const [errors, setErrors] = useState({});
  const [familyMembers, setFamilyMembers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [openAlertOnBack, setOpenAlertOnBack] = useState(false);
  const [openAlertOnSave, setOpenAlertOnSave] = useState(false);
  const [templates, setTemplates] = useState({});
  const { form, handleChange, setForm } = useForm(null);
  const dispatch = useDispatch();
  const routeParams = useParams();
  const theme = useTheme();

  useEffect(() => {
    const id = routeParams.customerId;
    const fetchCustomer = async () => {
      const query = await firestore()
        .collection('customers')
        .where('customerId', '==', Number(id))
        .limit(1)
        .get();

      let result = query.docs[0].data();
      result.dob = result.dob && result.dob.toDate();
      result.id = query.docs[0].id;
      setForm(result);

      const queryFamilyMembers = await firestore()
        .collection('customers')
        .where('family', '==', result?.family)
        .get();
      let resultFamilyMembers = [];
      queryFamilyMembers.forEach((doc) => {
        resultFamilyMembers.push(doc.data());
      });
      setFamilyMembers(resultFamilyMembers);

      const queryCustomers = await firestore().collection('customers').get();
      let resultCustomers = [];
      queryCustomers.forEach((doc) => {
        resultCustomers.push(doc.data());
      });
      setCustomers(resultCustomers);

      setisLoading(false);
    };

    const fetchDetails = async () => {
      const queryCustomers = await firestore().collection('customers').get();
      let resultCustomers = [];
      queryCustomers.forEach((doc) => {
        resultCustomers.push(doc.data());
      });
      setCustomers(resultCustomers);

      const queryTemplates = (
        await firestore()
          .collection('emailTemplates')
          .doc('emailTemplates')
          .get()
      ).data();
      setTemplates(queryTemplates?.templates);
    };

    if (id) fetchCustomer();
    else {
      setForm({});
      fetchDetails();
      setisLoading(false);
    }
  }, [routeParams.customerId, setForm]);

  // const validate = () => {
  //   const result = Joi.validate(form, schema);

  // toast.error('Please Fill Required Fields!', {
  //   position: 'top-center',
  //   autoClose: 5000,
  //   hideProgressBar: false,
  //   closeOnClick: true,
  //   pauseOnHover: true,
  //   draggable: true,
  //   progress: undefined,
  //   transition: Zoom
  // });
  //   if (result?.error?.details) {
  //     setError({
  //       [result?.error?.details[0]?.context?.label]: true
  //     });
  //     return false;
  //   }
  //   return true;
  // };

  if (isLoading) {
    return <FuseLoading />;
  }

  //   const isFormValid = () => {
  //  const errs = {};

  //   };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const errs = isFormValid();
  //   setErrors(errs);

  //   if (Object.entries(errs).some((err) => err !== '')) {
  //     return;
  //   }

  //   console.log('submitting!!!');
  // };

  const onSubmit = async () => {
    // if (!validate()) return;
    if (form.customerId) {
      setisLoading(true);
      try {
        const ref = firestore().collection('customers').doc(form?.id);

        let data = {
          ...form,
          dob: firestore.Timestamp.fromDate(form?.dob),
          dobString: moment(form?.dob).format('MM/DD/YYYY'),
          editDate: firestore.Timestamp.fromDate(new Date())
        };
        delete data.id;
        await ref.set(data);

        dispatch(
          MessageActions.showMessage({
            message: 'Customer updated successfully'
          })
        );

        props.history.push('/apps/e-commerce/customers');
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    } else {
      setisLoading(true);

      try {
        const customerNo = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        const dateOfBirth = firestore.Timestamp.fromDate(form?.dob);

        await firestore()
          .collection('customers')
          .add({
            ...form,
            family: form?.family ? form?.family : customerNo?.customerId + 1,
            dob: dateOfBirth,
            dobString: moment(form?.dob).format('MM/DD/YYYY'),
            customerId: customerNo?.customerId + 1,
            recentUpdated: customerNo?.recentUpdated + 1,
            creationDate: firestore.Timestamp.fromDate(new Date()),
            editDate: firestore.Timestamp.fromDate(new Date())
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({
            customerId: customerNo?.customerId + 1,
            recentUpdated: customerNo?.recentUpdated + 1
          });
        dispatch(
          MessageActions.showMessage({
            message: 'User data saved to firebase'
          })
        );

        if (!firebaseService.auth) {
            console.warn(
                "Firebase Service didn't initialize, check your configuration"
            );

            return () => false;
        }
        try {
            const sendEmail = firebaseService.functions.httpsCallable('sendEmail');
            const res = await sendEmail({ customers:[{email:form?.email, firstName: form?.firstName, lastName: form?.lastName}], message: templates?.newCustomer })

            console.log('Result from sendEmail is', res)
            dispatch(MessageActions.showMessage({ message: 'Welcome email sent successfully' }));

        } catch (error) {
            dispatch(MessageActions.showMessage({ message: error.message }));
            console.log('Error while sending welcome email is:', error)
        }

        props.history.push(
          `/apps/e-commerce/customers/profile/${customerNo?.customerId + 1}`
        );
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  return (
    form &&
    customers && (
      <FusePageCarded
        header={
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full w-full relative">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <IconButton
                  className="absolute"
                  onClick={() => {
                    if (
                      Object.keys(form).length === 0 &&
                      form.constructor === Object
                    ) {
                      props.history.push('/apps/e-commerce/customers');
                    } else {
                      setOpenAlertOnBack(true);
                    }
                  }}>
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4 text-12">Customers</span>
                </IconButton>
              </FuseAnimate>
              <CustomAlert
                open={openAlertOnBack}
                setOpen={setOpenAlertOnBack}
                text1="Discard Changes?"
                text2="All the changes will be lost. Are you sure?"
                customFunction={() => {
                  props.history.push('/apps/e-commerce/customers');
                }}
              />

              <div className="flex items-center max-w-full w-full text-center justify-center">
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form?.customerId ? 'Update ' : 'New '}
                      Customer
                    </Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>

            <CustomAlert
              open={openAlertOnSave}
              setOpen={setOpenAlertOnSave}
              text1="Save Changes?"
              text2="Are you sure?"
              customFunction={onSubmit}
            />
          </div>
        }
        content={
          <UpdateCustomerForm
            form={form}
            handleChange={handleChange}
            error={error}
            setForm={setForm}
            familyMembers={familyMembers}
            setFamilyMembers={setFamilyMembers}
            customers={customers}
            setOpenAlertOnSave={setOpenAlertOnSave}
          />
        }
        innerScroll
      />
    )
  );
}

export default withReducer('eCommerceApp', reducer)(withRouter(UpdateCustomer));

// const schema = {
//   firstName: Joi.string().alphanum().min(3).max(30).required(),
//   lastName: Joi.string().alphanum().min(3).max(30).required(),
//   dob: Joi.required(),
//   gender: Joi.string().required(),
//   ethnicity: Joi.required(),
//   state: Joi.required(),
//   address: Joi.string().min(8).max(200).required(),
//   city: Joi.string().min(3).max(50).required(),
//   zipCode: Joi.number().required(),
//   phone1: Joi.string().required(),
//   phone2: Joi.string().required(),
//   email: Joi.string().email().required(),
//   other: Joi.string().required(),
//   family: Joi.required()
// };
