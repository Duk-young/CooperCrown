import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';
import firebaseService from 'app/services/firebaseService';
import * as admin from 'firebase-admin';
admin.initializeApp();

export const GET_USER = '[E-COMMERCE APP] GET USER';
export const SAVE_USER = '[E-COMMERCE APP] SAVE USER';
export const getUser = (params) => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb
      .collection('users')
      .doc(params)
      .get();
    const showRoom = { id: response.id, ...response.data() };
    dispatch({
      type: GET_USER,
      payload: showRoom
    });
  } catch (error) {
    console.log(error);
  }
};
export const saveUser = (user) => async (dispatch) => {
  try {
    const createUser = firebaseService.functions.httpsCallable('createUser');
    const newUser = await createUser(user);
    console.log(newUser);
    const addStaffRole = firebaseService.functions.httpsCallable(
      'addStaffRole'
    );
    await addStaffRole({ email: user.email });
    await firebaseService.firestoreDb
      .collection('users')
      .doc(newUser.data.user.uid)
      .set({
        Role: 'Staff',
        email: user.email,
        username: user.email.split('@')[0],
        CompanyId: newUser.data.user.uid
      });
    dispatch(Actions.getUsers());
    dispatch(showMessage({ message: 'User Successfully Created' }));
  } catch (error) {
    console.log(error);
  }
};
export function newUser() {
  const data = {
    uid: FuseUtils.generateGUID(),
    email: '',
    password: '',
    confirmPassword: ''
  };
  return {
    type: GET_USER,
    payload: data
  };
}
