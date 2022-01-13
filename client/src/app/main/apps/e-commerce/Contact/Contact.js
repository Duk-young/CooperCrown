import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
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

function NewShowRoom(props) {
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.contact);
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);
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

  function canBeSubmitted() {
    return form.type.length > 0 && form.price.length > 0;
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
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
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
            </FuseAnimate>
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
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  error={form.type === ''}
                  required
                  label="Contact Lens Type"
                  autoFocus
                  id="contact-type"
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  id="contacdt-price"
                  name="price"
                  onChange={handleChange}
                  label="Contact Lens Price"
                  type="price"
                  value={form.price}
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(NewShowRoom);
