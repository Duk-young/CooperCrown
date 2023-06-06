import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
// import * as Actions from './index';
import firebaseService from 'app/services/firebaseService';
import * as authActions from 'app/auth/store/actions';
import { toast, Zoom } from 'react-toastify';
import firebase from 'firebase/app';
export const GET_ACCOUNT = '[E-COMMERCE APP] GET ACCOUNT';
export const SAVE_ACCOUNT = '[E-COMMERCE APP] SAVE ACCOUNT';
export const SET_CHANGE_EMAIL = '[E-COMMERCE APP] SET CHANGE EMAIL';
export const SET_CHANGE_PASSWORD = '[E-COMMERCE APP] SET CHANGE PASSWORD';

export const changeEmail = (form) => async (dispatch) => {
  try {
    await firebaseService.auth.currentUser.updateEmail(form.email);
    await firebaseService.firestoreDb
      .collection('users')
      .doc(form.id)
      .update({ email: form.email });
    dispatch(showMessage({ message: 'Email Successfully Changes' }));
    dispatch(authActions.logoutUser());
  } catch (error) {
    if (error?.code === 'auth/requires-recent-login') {
      toast.error('Recent signin required for this operation. Please signin again.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
    }
    if (error?.code === 'auth/invalid-email') {
      toast.error('Please enter a valid email address.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
    }
    console.log({ error });
  }
};

export const changePassword = (currentPassword, newPassword) => async (dispatch) => {
  try {

    const user = firebaseService.auth.currentUser;
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword); 
    await user.reauthenticateWithCredential(credential)
    await user.updatePassword(newPassword);

    dispatch(showMessage({ message: 'Password successfully Changed. Please login again.' }));
    dispatch(authActions.logoutUser());
  } catch (error) {
    if (error?.code === 'auth/wrong-password') {
      toast.error('Old password is incorrect.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
    }
    if (error?.code === 'auth/weak-password') {
      toast.error('Password should be at least 6 characters.', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
    }
    console.log({ error });
  }
};
export const updateAccount = (data) => async (dispatch) => {
  const uuid = data.id;
  delete data.id;
  try {
    await firebaseService.firestoreDb
      .collection('users')
      .doc(uuid)
      .update(data);
    dispatch(showMessage({ message: 'Account Update Successfully' }));
  } catch (error) {
    console.log(error);
  }
};

export const changeEmailForm = () => async (dispatch) => {
  const data = {
    uid: FuseUtils.generateGUID(),
    email: '',
    changeEmail: '',
    confrimEmail: ''
  };
  dispatch({ type: SET_CHANGE_EMAIL, payload: data });
};

export const changePasswordForm = () => async (dispatch) => {
  const data = {
    uid: FuseUtils.generateGUID(),
    password: '',
    changePassword: '',
    confrimPassword: ''
  };
  dispatch({ type: SET_CHANGE_PASSWORD, payload: data });
};

