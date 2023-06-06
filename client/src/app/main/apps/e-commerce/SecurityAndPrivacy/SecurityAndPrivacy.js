import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as Actions from '../store/actions';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FusePageSimple from '@fuse/core/FusePageSimple';
import React, { useState } from 'react';
import reducer from '../store/reducers';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles((theme) => ({
  tabHeader: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark,
    padding: '10px 0',
    width: '100%'
  }
}));

function SecurityAndPrivacy() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(0);
  const [emailErrors, setEmailErrors] = useState({});
  const { form, handleChange } = useForm(null);
  const [passwordErrors, setPasswordErrors] = useState({});

  const { currentEmail, mainId } = useSelector(
    ({ auth }) => ({
      currentEmail: auth.user.data.email,
      mainId: auth.user.uid
    })
  );

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  const handleEmailUpdate = (e) => {
    e.preventDefault();

    const emailErrs = isFormValid();
    setEmailErrors(emailErrs);

    if (Object.values(emailErrs).some((err) => err !== "")) {
      return;
    }

    dispatch(Actions.changeEmail({ email: form.newEmail, id: mainId }));

  }

  const handlePasswordUpdate = (e) => {
    e.preventDefault();

    const passwordErrs = isFormValid();
    setPasswordErrors(passwordErrs);

    if (Object.values(passwordErrs).some((err) => err !== "")) {
      return;
    }
    console.log('formmmm', form?.password, form?.newPassword)
    dispatch(Actions.changePassword(form?.password, form?.newPassword));
  }

  function isFormValid() {
    if (selectedTab === 0) {
      const emailErrs = {};

      if (!form?.newEmail) {
        emailErrs.newEmail = "Please enter new email";
      }

      if (form?.confrimEmail !== form?.newEmail) {
        emailErrs.confrimEmail = "Email does not match new email address";
      }

      return emailErrs;
    }

    if (selectedTab === 1) {
      const passwordErrs = {};

      if (!form?.password) {
        passwordErrs.oldPassword = "Please enter old password";
      }

      if (!form?.newPassword) {
        passwordErrs.newPassword = "Please enter new password";
      }

      if (form?.newPassword && form?.newPassword === form?.password) {
        passwordErrs.newPassword = "old password cannot be used as new password";
      }

      if (form?.confrimPassword !== form?.newPassword) {
        passwordErrs.confirmPassword = "password does not match new password";
      }

      return passwordErrs;
    }
  };

  return (
    <FusePageSimple
      content={
        <div>
          <div className={clsx(classes.tabHeader)}>
            <div className="flex flex-row w-full items-center justify-center mb-32">
              <Typography style={{ fontSize: '3rem', fontWeight: 600 }} variant="h4">SECURITY AND PRIVACY</Typography>
            </div>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="white"
              variant="fullwidth"
              scrollButtons="off"
              centered>
              <Tab className="h-64" label="Update Email" />
              <Tab className="h-64" label="Update Password" />
            </Tabs>
          </div>
          <div>
            {selectedTab === 0 && (
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
                        label="Email"
                        type="text"
                        disabled={true}
                        value={currentEmail ?? ''}
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
                        value={form?.newEmail ?? ''}
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
                        value={form?.confrimEmail ?? ''}
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
            {selectedTab === 1 && (
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
                        type="password"
                        value={form?.password ?? ''}
                        variant="outlined"
                        error={passwordErrors.oldPassword}
                        helperText={passwordErrors.oldPassword}
                        fullWidth
                      />
                      <TextField
                        className="mt-8 mb-16"
                        required
                        label="New Password"
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={form?.newPassword ?? ''}
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
                        type="password"
                        name="confrimPassword"
                        value={form?.confrimPassword ?? ''}
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
        </div>

      }
    />
  );
}

export default withReducer('eCommerceApp', reducer)(SecurityAndPrivacy);
