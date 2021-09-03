import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseChipSelect from '@fuse/core/FuseChipSelect';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import FuseUtils from '@fuse/utils';
import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { orange } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import TableGrid from './TableGrid';

const useStyles = makeStyles((theme) => ({
  productImageFeaturedStar: {
    position: 'absolute',
    top: 0,
    right: 0,
    color: orange[400],
    opacity: 0
  },
  productImageUpload: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut
  },
  productImageItem: {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
    '&:hover': {
      '& $productImageFeaturedStar': {
        opacity: 0.8
      }
    },
    '&.featured': {
      pointerEvents: 'none',
      boxShadow: theme.shadows[3],
      '& $productImageFeaturedStar': {
        opacity: 1
      },
      '&:hover $productImageFeaturedStar': {
        opacity: 1
      }
    }
  }
}));

function LensPrice(props) {
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
  const theme = useTheme();

  const [lensType, setLensType] = useState('');

  const classes = useStyles(props);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

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

  function handleChangeTab(event, value) {
    setTabValue(value);
  }

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
    // <div>HellO</div>
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Typography
                  className="normal-case flex items-center sm:mb-12"
                  component={Link}
                  role="button"
                  to="/apps/e-commerce/showRooms"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Lens Type</span>
                </Typography>
              </FuseAnimate> */}

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
                      {/* {form.locationName ? form.locationName : 'Lens Price'} */}
                      Lens Price
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
                  if (routeParams.showRoomtId === 'new') {
                    setisLoading(false);
                    await dispatch(await Actions.saveShowRoom(form));
                    setisLoading(true);
                  } else {
                    setisLoading(false);
                    await dispatch(await Actions.updateShowRoom(form));
                    setisLoading(true);
                  }
                }}>
                Save
              </Button>
            </FuseAnimate>
          </div>
        )
      }
      content={
        <div className="p-16 sm:p-24 max-w-2xl">
          <Grid container>
            <Grid item xs={12} md={4}>
              <TextField
                className="mt-8 mb-16"
                required
                label="Lens Type"
                placeholder="Enter Lens Type"
                autoFocus
                value={lensType}
                onChange={(e) => setLensType(e.target.value)}
                variant="standard"
                fullWidth
              />
            </Grid>
            <Grid xs={12}>
              <TableGrid />
            </Grid>
          </Grid>
        </div>

        // form && (
        //   <div className="p-16 sm:p-24 max-w-2xl">
        //     {tabValue === 0 && (
        //       <div>
        //         <TextField
        //           className="mt-8 mb-16"
        //           error={form.locationName === ''}
        //           required
        //           label="Location Name"
        //           autoFocus
        //           id="locationName"
        //           name="locationName"
        //           value={form.locationName}
        //           onChange={handleChange}
        //           variant="outlined"
        //           fullWidth
        //         />

        //         <TextField
        //           className="mt-8 mb-16"
        //           id="locationAddress"
        //           name="locationAddress"
        //           onChange={handleChange}
        //           label="Location Address"
        //           type="text"
        //           value={form.locationAddress}
        //           multiline
        //           rows={5}
        //           variant="outlined"
        //           fullWidth
        //         />
        //         <TextField
        //           className="mt-8 mb-16"
        //           required
        //           label="City"
        //           type="text"
        //           id="City"
        //           name="City"
        //           value={form.City}
        //           onChange={handleChange}
        //           variant="outlined"
        //           fullWidth
        //         />
        //         <TextField
        //           className="mt-8 mb-16"
        //           required
        //           label="State"
        //           id="State"
        //           type="text"
        //           name="State"
        //           value={form.State}
        //           onChange={handleChange}
        //           variant="outlined"
        //           fullWidth
        //         />
        //         <TextField
        //           className="mt-8 mb-16"
        //           required
        //           label="Zip Code"
        //           id="zipCode"
        //           type="number"
        //           name="zipCode"
        //           value={form.zipCode}
        //           onChange={handleChange}
        //           variant="outlined"
        //           fullWidth
        //         />
        //         {/*  */}
        //       </div>
        //     )}
        //   </div>
        // )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(LensPrice);
