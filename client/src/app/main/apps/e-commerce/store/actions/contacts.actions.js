import firebaseService from 'app/services/firebaseService';

export const GET_CONTACTS = '[E-COMMERCE APP] GET CONTACTS';
export const SET_CONTACTS_SEARCH_TEXT =
  '[E-COMMERCE APP] SET CONTACTS SEARCH TEXT';

export const getContacts = () => async (dispatch) => {
  try {
    const querySnapshot = await firebaseService.firestoreDb
      .collection('contacts')
      .get();
    const contacts = [];
    querySnapshot.forEach((doc) => {
      contacts.push({ id: doc.id, ...doc.data() });
    });
    dispatch({
      type: GET_CONTACTS,
      payload: contacts
    });
  } catch (error) {
    console.log(error);
  }
};

export function setContactsSearchText(event) {
  return {
    type: SET_CONTACTS_SEARCH_TEXT,
    searchText: event.target.value
  };
}
