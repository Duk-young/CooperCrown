import firebaseService from 'app/services/firebaseService';
export const GET_USERS = '[E-COMMERCE APP] GET USERS';
export const SET_USERS_SEARCH_TEXT = '[E-COMMERCE APP] SET USERS SEARCH TEXT';
export const getUsers = () => async (dispatch) => {
  try {
    const querySnapshot = await firebaseService.firestoreDb
      .collection('users')
      .get();
    const users = [];
    querySnapshot.forEach((doc) => {
      users.push({ id: doc.id, ...doc.data() });
    });
    dispatch({
      type: GET_USERS,
      payload: users
    });
  } catch (error) {
    console.log(error);
  }
};
export function setUsersSearchText(event) {
  return {
    type: SET_USERS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
