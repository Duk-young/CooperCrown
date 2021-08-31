import firebaseService from 'app/services/firebaseService';

export const GET_SERVICES = '[E-COMMERCE APP] GET SERVICES';
export const SET_SERVICES_SEARCH_TEXT =
  '[E-COMMERCE APP] SET SERVICES SEARCH TEXT';

export const getServices = () => async (dispatch) => {
  try {
    const querySnapshot = await firebaseService.firestoreDb
      .collection('services')
      .get();
    const services = [];
    querySnapshot.forEach((doc) => {
      services.push({ id: doc.id, ...doc.data() });
    });
    dispatch({
      type: GET_SERVICES,
      payload: services
    });
  } catch (error) {
    console.log(error);
  }
};

export function setServicesSearchText(event) {
  return {
    type: SET_SERVICES_SEARCH_TEXT,
    searchText: event.target.value
  };
}
