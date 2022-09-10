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
      header={
        form && (
          <div className="flex flex-1 w-full items-center justify-between">
            <div className="flex flex-col items-start max-w-full">
              <div className="flex items-center max-w-full">
                <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                  <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                    <Typography className="text-16 sm:text-20 truncate">
                      Security and Privacy
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
                  await dispatch(
                    await Actions.changeEmail({
                      email: form.newEmail,
                      id: mainId
                    })
                  );
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
          <Tab className="h-64 normal-case" label="Email Change" />
          <Tab className="h-64 normal-case" label="Password Change" />
        </Tabs>
      }
      content={
        form && (

          <div className="p-16 sm:p-24 ">
            {tabValue === 0 && (
              <div className="flex flex-col h-260  px-16 py-6">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      CHANGE EMAIL {currentEmail}
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
                </div>
              </div>
            )}

            {tabValue === 1 && (
              <div className="flex flex-col h-260  px-16 py-6">

                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      CHANGE PASSWORD {currentEmail}
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
                </div>
              </div>
            )}



            <div className="flex flex-col p-12 " >
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
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
            </div>
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(SecurityAndPrivacy);
