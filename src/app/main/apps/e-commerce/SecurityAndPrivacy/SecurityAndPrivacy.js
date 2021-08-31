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
import * as Actions from '../store/actions';
import reducer from '../store/reducers';

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

function SecurityAndPrivacy(props) {
  const dispatch = useDispatch();
  const { account, currentEmail, mainId } = useSelector(
    ({ eCommerceApp, auth }) => ({
      account: eCommerceApp.account,
      currentEmail: auth.user.data.email,
      mainId: auth.user.uid
    })
  );

  const theme = useTheme();

  const classes = useStyles(props);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);
      debugger;
      await dispatch(await Actions.changeEmailForm());
      await dispatch(await Actions.changePasswordForm());
      setisLoading(true);
    };

    updateProductState();
  }, [dispatch, routeParams]);
  useEffect(() => {
    if (
      (account.email && !form) ||
      (account.email && form && account.email.id !== form.id)
    ) {
      if (tabValue === 0) {
        setForm(account.email);
      } else {
        setForm(account.password);
      }
    }
  }, [form, account.password, account.email, setForm, tabValue]);
  function handleChangeTab(event, value) {
    setTabValue(value);
  }

  function canBeSubmitted() {
    if (tabValue === 0) {
      return (
        form.newEmail &&
        form.confrimEmail &&
        form.newEmail.length > 0 &&
        form.confrimEmail.length &&
        form.newEmail === form.confrimEmail
      );
    }
  }

  if (!isLoading) {
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
                  to="/"
                  color="inherit">
                  <Icon className="text-20">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  <span className="mx-4">Home</span>
                </Typography>
              </FuseAnimate>

              <div className="flex items-center max-w-full">
                <FuseAnimate animation="transition.expandIn" delay={300}>
                  <img
                    className="w-32 sm:w-48 rounded"
                    src="assets/images/ecommerce/product-image-placeholder.png"
                    alt="privacy"
                  />
                </FuseAnimate>
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      Security and Privacy
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography variant="caption">
                      Security And Privacy
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
                  await dispatch(
                    await Actions.changeEmail({
                      email: form.newEmail,
                      id: mainId
                    })
                  );
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
          <Tab className="h-64 normal-case" label="Email Change" />
          <Tab className="h-64 normal-case" label="Password Change" />
        </Tabs>
      }
      content={
        form && (
          <div className="p-16 sm:p-24 max-w-2xl">
            {tabValue === 0 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  id="email"
                  name="email"
                  onChange={handleChange}
                  label="Email"
                  type="text"
                  disabled={true}
                  value={currentEmail}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  required
                  label="New Email"
                  type="text"
                  id="newEmail"
                  name="newEmail"
                  value={form.newEmail}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Confrim Email"
                  id="confrimEmail"
                  type="text"
                  name="confrimEmail"
                  value={form.confrimEmail}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            )}
            {tabValue === 1 && (
              <div>
                <TextField
                  className="mt-8 mb-16"
                  id="password"
                  name="password"
                  onChange={handleChange}
                  label="Old Password"
                  type="text"
                  value={form.password}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  required
                  label="New Password"
                  type="text"
                  id="newPassword"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  className="mt-8 mb-16"
                  required
                  label="Confrim Password"
                  id="confrimPassword"
                  type="text"
                  name="confrimPassword"
                  value={form.confrimPassword}
                  onChange={handleChange}
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

export default withReducer('eCommerceApp', reducer)(SecurityAndPrivacy);
