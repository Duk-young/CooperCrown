import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';
import { firestore } from 'firebase';
import moment from 'moment';
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
    const user = { id: response.id, myloc: response.location, ...response.data() };
    dispatch({
      type: GET_USER,
      payload: user
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
    let today = new Date().toLocaleDateString()
    const dbConfig = (
      await firebaseService.firestoreDb
        .collection('dbConfig')
        .doc('dbConfig')
        .get()
    ).data();
    const queryuser = await firestore()
      .collection('showRooms')
      .where('showRoomId', '==', Number(data.showRoomId))
      .limit(1)
      .get();
    let result = queryuser.docs[0].data();

    await firebaseService.firestoreDb
      .collection('users')
      .add({
        ...data, date: today,
        // dob: firestore.Timestamp.fromDate(data?.dob),
        dob: moment(data?.dob).format('MM/DD/YYYY'),
        dobString: firestore.Timestamp.fromDate(data?.dob),
        Role: 'Staff', location: result.locationName, userId: dbConfig?.userId + 1
      });

    await firebaseService.firestoreDb
      .collection('dbConfig')
      .doc('dbConfig')
      .update({
        userId: dbConfig?.userId + 1
      });
    // console.log({userId})
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
    username: '',
    password: '',
    confirmPassword: '',
    dob: '',
    fname: '',
    lname: '',
    Gender: '',
    phone1: '',
    phone2: '',
    address: '',
    city: '',
    State: '',
    email: '',
    other: '',
  };
  return {
    type: GET_USER,
    payload: data
  };
}

