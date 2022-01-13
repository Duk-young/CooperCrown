import firebaseService from 'app/services/firebaseService';

export const GET_PRODUCTS = '[E-COMMERCE APP] GET PRODUCTS';
export const SET_PRODUCTS_SEARCH_TEXT =
  '[E-COMMERCE APP] SET PRODUCTS SEARCH TEXT';

export const getShowRooms = () => async (dispatch) => {
  try {
    const querySnapshot = await firebaseService.firestoreDb
      .collection('showRooms')
      .get();

    const showRooms = [];
    querySnapshot.forEach((doc) => {
      showRooms.push({ id: doc.id, ...doc.data() });
    });
    dispatch({
      type: GET_PRODUCTS,
      payload: showRooms
    });
  } catch (error) {
    console.log(error);
  }
};

export function setProductsSearchText(event) {
  return {
    type: SET_PRODUCTS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
