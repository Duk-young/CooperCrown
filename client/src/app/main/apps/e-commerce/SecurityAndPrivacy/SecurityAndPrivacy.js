import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
// import _ from '@lodash';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
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
    padding: '10px 16px',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});
function SecurityAndPrivacy(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { account, currentEmail, mainId } = useSelector(
    ({ eCommerceApp, auth }) => ({
      account: eCommerceApp.account,
      currentEmail: auth.user.data.email,
      mainId: auth.user.uid
    })
  );

  // const classes = useStyles(props);
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setisLoading] = useState(false);
  const [emailErrors, setEmailErrors] = useState({});
  const [passwordErrors, setPasswordErrors] = useState({});

  const { form, handleChange, setForm } = useForm(null);

  const routeParams = useParams();

  useDeepCompareEffect(() => {
    const updateProductState = async () => {
      setisLoading(false);

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

  const updateEmail = async () => {
    await dispatch(
      await Actions.changeEmail({
        email: form.newEmail,
        id: mainId
      })
    );
  }

  const updatePassword = async () => {
    await dispatch(
      await Actions.changePassword({
        password: form.newPassword,
        id: mainId
      })
    );
  }


  function isFormValid() {
    if (tabValue === 0) {
      const emailErrs = {};

      if (!form.newEmail) {
        emailErrs.newEmail = "Please enter new email";
      }

      if (form.confrimEmail !== form.newEmail) {
        emailErrs.confrimEmail = "Email does not match new email address";
      }

      return emailErrs;
    }

    if (tabValue === 1) {
      const passwordErrs = {};

      if (!form.password) {
        passwordErrs.oldPassword = "Please enter old password";
      }

      if (!form.newPassword) {
        passwordErrs.newPassword = "Please enter new password";
      }

      if (form.newPassword && form.newPassword === form.password) {
        passwordErrs.newPassword = "old password cannot be used as new password";
      }

      if (form.confrimPassword !== form.newPassword) {
        passwordErrs.confirmPassword = "password does not match new password";
      }

      return passwordErrs;
    }
  };


  const handleEmailUpdate = (e) => {
    e.preventDefault();

    const emailErrs = isFormValid();
    setEmailErrors(emailErrs);

    if (Object.values(emailErrs).some((err) => err !== "")) {
      return;
    }

    updateEmail();

  }


  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    const passwordErrs = isFormValid();
    setPasswordErrors(passwordErrs);

    if (Object.values(passwordErrs).some((err) => err !== "")) {
      return;
    }

    updatePassword();
  }

  if (!isLoading) {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      header={
        form && (
          <div className="flex flex-col w-full items-center justify-center">
            <div className="flex items-center">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="hidden sm:flex mx-0 sm:mx-12 font-500" variant="h4">
                  SECURITY AND PRIVACY
                </Typography>
              </FuseAnimate>


            </div>
            <div className="flex flex-1 items-center justify-center ">

            </div>
            <div className="flex-1 items-center">
              <h3 className=" hidden font-700 ">H</h3>
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
          <Tab className="h-64 normal-case" label="Email Change" />
          <Tab className="h-64 normal-case" label="Password Change" />
        </Tabs>
      }
      content={
        form && (

          <div className="p-16 sm:p-24 ">
            {tabValue === 0 && (
              <>
                <div className="flex flex-col h-260  px-16 py-6">
                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700" style={{ color: '#f15a25' }}>
                        CHANGE EMAIL
                      </h1>
                    </div>
                    <div className="justify-center p-16 sm:p-24 ">
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
                        error={emailErrors.newEmail}
                        helperText={emailErrors.newEmail}
                        fullWidth
                      />
                      <TextField
                        className="mt-8 mb-16"
                        required
                        label="Confirm Email"
                        id="confrimEmail"
                        type="text"
                        name="confrimEmail"
                        value={form.confrimEmail}
                        onChange={handleChange}
                        variant="outlined"
                        error={emailErrors.confrimEmail}
                        helperText={emailErrors.confrimEmail}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-12" >
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handleEmailUpdate}>
                    Save
                  </Button>
                </div>
              </>
            )}

            {tabValue === 1 && (
              <>
                <div className="flex flex-col h-260  px-16 py-6">

                  <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                      <h1 className="font-700" style={{ color: '#f15a25' }}>
                        CHANGE PASSWORD
                      </h1>
                    </div >
                    <div className="justify-center p-16 sm:p-24 ">
                      <TextField
                        className="mt-8 mb-16"
                        required
                        id="password"
                        name="password"
                        onChange={handleChange}
                        label="Old Password"
                        type="text"
                        value={form.password}
                        variant="outlined"
                        error={passwordErrors.oldPassword}
                        helperText={passwordErrors.oldPassword}
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
                        error={passwordErrors.newPassword}
                        helperText={passwordErrors.newPassword}
                        fullWidth
                      />
                      <TextField
                        className="mt-8 mb-16"
                        required
                        label="Confirm Password"
                        id="confrimPassword"
                        type="text"
                        name="confrimPassword"
                        value={form.confrimPassword}
                        onChange={handleChange}
                        variant="outlined"
                        error={passwordErrors.confirmPassword}
                        helperText={passwordErrors.confirmPassword}
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col p-12" >
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={handlePasswordUpdate}>
                    Save
                  </Button>
                </div>
              </>
            )}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(SecurityAndPrivacy);
