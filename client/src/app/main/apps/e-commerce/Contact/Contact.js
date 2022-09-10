import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import ConfirmContactDelete from './ConfirmContactDelete';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import { firestore, storage } from 'firebase';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
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
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.contact);
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const [tabValue, setTabValue] = useState(0);
   const [showModal, setShowModal] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      const { contactId } = routeParams;
      if (contactId === 'new') {
        dispatch(Actions.newContact());
        setisLoading(true);
      } else {
        await dispatch(await Actions.getContact(contactId));
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

  function handleChangeTab(event, value) {
    setTabValue(value);
  }
  const handleDelete = async () => {
    try {
      const querycontacts = await firestore()
        .collection('contacts')
        .where('contactId', '==', Number(form.contactId))
        .limit(1)
        .get();

      let result = querycontacts.docs[0].data();
      result.id = querycontacts.docs[0].id;
      await firestore().collection('contacts').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'Contact deleted successfully'
        })
      );
      props.history.push(
        props.history.push(`/apps/e-commerce/contacts`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  function canBeSubmitted() {
    return form.type.length > 0 && form.style.length > 0 && form.brand.length > 0 && form.model.length > 0 && form.basecurve.length > 0 && form.price.length > 0;
  }

  if (
    (!product.data ||
      (product.data && routeParams.contactId !== product.data.id)) &&
    routeParams.contactId !== 'new' &&
    !isLoading
  ) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/apps/e-commerce/contacts"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Contacts</span>
                </Typography>
              </FuseAnimate>
              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt={form.type}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.type ? form.type : 'New Contact Lens'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">
                      Contact Lens Detail
                    </Typography>
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
                  if (routeParams.contactId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveContact(form));
                    props.history.push('/apps/e-commerce/contacts');
                    setisLoading(true);
                  } else {
                    setisLoading(false);
                    await dispatch(await Actions.updateContact(form));
                    props.history.push('/apps/e-commerce/contacts');
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
          <Tab className="h-64 normal-case" label="Contact Lens" />
        </Tabs>
      }
      content={
        form && (
        <div className="flex flex-col h-260  px-16 py-6">
          <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                Detail
              </h1>
            </div>
            <div className="justify-center p-16 sm:p-24 ">
              {tabValue === 0 && (
                <div>
                  <TextField
                    className="mt-8 mb-16"
                    ////error={form.type === ''}
                    required
                    label="Contact Lens Type"
                    
                    id="contact-type"
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    // error={form.style === ''}
                    id="contact-style"
                    name="style"
                    onChange={handleChange}
                    label="Style"
                    type="style"
                    value={form.style}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    //error={form.brand === ''}
                    id="contact-brand"
                    name="brand"
                    onChange={handleChange}
                    label="Brand"
                    type="brand"
                    value={form.brand}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                   //error={form.model === ''}
                    id="contact-model"
                    name="model"
                    onChange={handleChange}
                    label="Model"
                    type="model"
                    value={form.model}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                   //error={form.basecurve === ''}
                    id="contact-basecurve"
                    name="basecurve"
                    onChange={handleChange}
                    label="Base Curve"
                    type="basecurve"
                    value={form.basecurve}
                    variant="outlined"
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    id="contacdt-price"
                    name="price"
                    onChange={handleChange}
                    label="Price"
                    type="price"
                    value={form.price}
                    variant="outlined"
                    fullWidth
                  />
                </div>
              )}
            </div>
            <br></br>

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
                if (routeParams.contactId === 'new') {
                  setisLoading(false);
                  await dispatch(await Actions.saveContact(form));
                  props.history.push('/apps/e-commerce/contacts');
                  setisLoading(true);
                } else {
                  setisLoading(false);
                  await dispatch(await Actions.updateContact(form));
                  props.history.push('/apps/e-commerce/contacts');
                  setisLoading(true);
                }
              }}>

              Save
            </Button>
          </div>
          <div className="flex flex-col p-12">
          <ConfirmContactDelete open={open} handleClose={handleClose} form={form} propssent={props} />

<Button
  style={{
    color: 'red'
  }}
  variant="outlined"
  // onClick={() => setShowModal(true)}
  onClick={() => {
    if (routeParams.contactId === 'new') {
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

export default withReducer('eCommerceApp', reducer)(NewShowRoom);
