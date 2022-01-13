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

function Service(props) {
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.service);
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
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
    return form.name.length > 0 && form.price.length > 0;
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
                  to="/apps/e-commerce/service"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Services</span>
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt={form.name}
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      {form.name ? form.name : 'New Service'}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">Show-Room Detail</Typography>
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
          <Tab className="h-64 normal-case" label="New Service" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  error={form.name === ''}
                  required
                  label="Service Name"
                  autoFocus
                  id="service-name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  id="service-price"
                  name="price"
                  onChange={handleChange}
                  label="Service Price"
                  type="Number"
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

export default withReducer('eCommerceApp', reducer)(Service);
