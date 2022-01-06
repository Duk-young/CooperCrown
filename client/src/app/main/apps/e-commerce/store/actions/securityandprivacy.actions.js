import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';
import firebaseService from 'app/services/firebaseService';
import * as authActions from 'app/auth/store/actions';
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
    console.log(error);
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
