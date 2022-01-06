import firebaseService from 'app/services/firebaseService';

export const GET_DISCOUNTS = '[E-COMMERCE APP] GET DISCOUNTS';
export const SET_DISCOUNTS_SEARCH_TEXT =
  '[E-COMMERCE APP] SET SERVICES SEARCH TEXT';

export const getDiscounts = () => async (dispatch) => {
  try {
    const querySnapshot = await firebaseService.firestoreDb
      .collection('discounts')
      .get();
    const discounts = [];
    querySnapshot.forEach((doc) => {
      discounts.push({ id: doc.id, ...doc.data() });
    });
    dispatch({
      type: GET_DISCOUNTS,
      payload: discounts
    });
  } catch (error) {
    console.log(error);
  }
};
export function setDiscountsSearchText(event) {
  return {
    type: SET_DISCOUNTS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
