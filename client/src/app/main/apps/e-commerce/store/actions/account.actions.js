import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
// import * as Actions from './index';

import firebaseService from 'app/services/firebaseService';
export const GET_ACCOUNT = '[E-COMMERCE APP] GET ACCOUNT';
export const SAVE_ACCOUNT = '[E-COMMERCE APP] SAVE ACCOUNT';

export const getAccount = (params) => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb
      .collection('users')
      .doc(params)
      .get();
    const showRoom = { id: response.id, ...response.data() };
    dispatch({
      type: GET_ACCOUNT,
      payload: showRoom
    });
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

export function newShowRoom() {
  const data = {
    uid: FuseUtils.generateGUID(),
    username: '',
    email: '',
    language: '',
    timeZone: '',
    other: ''
  };

  return {
    type: GET_ACCOUNT,
    payload: data
  };
}
