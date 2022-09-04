// import firebaseService from 'app/services/firebaseService';

// export const GET_DOCTORS = '[E-COMMERCE APP] GET DOCTORS';
// export const SET_DOCTORS_SEARCH_TEXT =
//   '[E-COMMERCE APP] SET SERVICES SEARCH TEXT';

// export const getDoctors = () => async (dispatch) => {
//   try {
//     const querySnapshot = await firebaseService.firestoreDb
//       .collection('doctors')
//       .get();
//     const doctors = [];
//     querySnapshot.forEach((doc) => {
//       doctors.push({ id: doc.id, ...doc.data() });
//     });
//     dispatch({
//       type: GET_DOCTORS,
//       payload: doctors
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };
// export function setDoctorsSearchText(event) {
//   return {
//     type: SET_DOCTORS_SEARCH_TEXT,
//     searchText: event.target.value
//   };
// }
