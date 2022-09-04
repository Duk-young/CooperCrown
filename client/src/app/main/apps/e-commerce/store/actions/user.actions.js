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
// export const saveUser = (user) => async (dispatch) => {
//   try {
//     const createUser = firebaseService.functions.httpsCallable('createUser');
//     const newUser = await createUser(user);

//     const addStaffRole =
//       firebaseService.functions.httpsCallable('addStaffRole');
//     await addStaffRole({ email: user.email });
//     await firebaseService.firestoreDb
//       .collection('users')
//       .doc(newUser.data.user.uid)
//       .set({
//         Role: 'Staff',
//         email: user.email,
//         location: user.showRoomId,
//         username: user.email.split('@')[0],
//         CompanyId: newUser.data.user.uid
//       });
//     dispatch(Actions.getUsers());
//     dispatch(showMessage({ message: 'User Successfully Created' }));
//   } catch (error) {
//     console.log(error);
//   }
// };
export const saveUser = (data) => async (dispatch) => {
  delete data.uid;
  try {
    const dbConfig = (
      await firebaseService.firestoreDb
        .collection('dbConfig')
        .doc('dbConfig')
        .get()
    ).data();
    await firebaseService.firestoreDb
      .collection('users')
      // .set({
      //           Role: 'Staff',
      //           email: user.email,
      //           location: user.showRoomId,
      //           username: user.email.split('@')[0],
      //           CompanyId: newUser.data.user.uid
      //         });
      .add({ ...data,  Role: 'Staff', userId: dbConfig?.userId + 1 });

    await firebaseService.firestoreDb
      .collection('dbConfig')
      .doc('dbConfig')
      .update({
        userId: dbConfig?.userId + 1
      });
    dispatch(Actions.getUsers());
    dispatch(showMessage({ message: 'User Saved' }));
  } catch (error) {
    console.log(error);
  }
};
export const updateUser = (data) => async (dispatch) => {
  const uuid = data.id;
  delete data.id;
  try {
    await firebaseService.firestoreDb
      .collection('users')
      .doc(uuid)
      .update(data);
    dispatch(Actions.getUsers());
    dispatch(showMessage({ message: 'User Updated' }));
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

