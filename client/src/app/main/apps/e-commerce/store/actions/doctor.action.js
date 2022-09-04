// import FuseUtils from '@fuse/utils';
// import { showMessage } from 'app/store/actions/fuse';
// import * as Actions from './index';
// import firebaseService from 'app/services/firebaseService';

// // import * as Actions from './index';

// import firebaseService from 'app/services/firebaseService';
// export const GET_DOCTOR = '[E-COMMERCE APP] GET DOCTOR';
// export const SAVE_DOCTOR = '[E-COMMERCE APP] SAVE DOCTOR';

// export const getDoctor = (params) => async (dispatch) => {
//   try {
//     const response = await firebaseService.firestoreDb
//       .collection('doctors')
//       .doc(params)
//       .get();
//     const doctor = { id: response.id, ...response.data() };
//     dispatch({
//       type: GET_DOCTOR,
//       payload: doctor
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const saveDoctor = (data) => async (dispatch) => {
//     delete data.uid;
//     try {
//       await firebaseService.firestoreDb.collection('doctor').add(data);
//       dispatch(Actions.getDoctors());
//       dispatch(showMessage({ message: 'Doctor Saved' }));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// export const updateDoctor = (data) => async (dispatch) => {
//   const uuid = data.id;
//   delete data.id;
//   try {
//     await firebaseService.firestoreDb
//       .collection('doctors')
//       .doc(uuid)
//       .update(data);
//       dispatch(Actions.getDoctors());
//     dispatch(showMessage({ message: 'Doctor Update Successfully' }));
//   } catch (error) {
//     console.log(error);
//   }
// };

// export function newDoctor() {
//   const data = {
//     uid: FuseUtils.generateGUID(),
//     date: '',
//     doctorname: '',
//     location1: '',
//     location2: '',
//     location3: ''
//   };

//   return {
//     type: GET_DOCTOR,
//     payload: data
//   };
// }
