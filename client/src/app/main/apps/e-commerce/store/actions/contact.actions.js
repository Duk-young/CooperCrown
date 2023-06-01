import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';
import firebaseService from 'app/services/firebaseService';
export const GET_CONTACT = '[E-COMMERCE APP] GET CONTACT';
export const SAVE_CONTACT = '[E-COMMERCE APP] SAVE CONTACT';

export const getContact = (params) => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb
      .collection('contacts')
      .doc(params)
      .get();
    const contact = { id: response.id, ...response.data() };
    dispatch({
      type: GET_CONTACT,
      payload: contact
    });
  } catch (error) {
    console.log(error);
  }
};
export const saveContact = (data) => async (dispatch) => {
  delete data.uid;
  try {
    const dbConfig = (
      await firebaseService.firestoreDb
        .collection('dbConfig')
        .doc('dbConfig')
        .get()
    ).data();
    await firebaseService.firestoreDb
      .collection('contacts')
      .add({ ...data, contactId: dbConfig?.contactId + 1 });
    await firebaseService.firestoreDb
      .collection('dbConfig')
      .doc('dbConfig')
      .update({
        contactId: dbConfig?.contactId + 1
      });
    // await firebaseService.firestoreDb.collection('contacts').add(data);
    dispatch(Actions.getContacts());
    dispatch(showMessage({ message: 'Contact Saved' }));
  } catch (error) {
    console.log(error);
  }
};
export const updateContact = (data) => async (dispatch) => {

  const uuid = data.id;
  delete data.id;
  try {
    await firebaseService.firestoreDb
      .collection('contacts')
      .doc(uuid)
      .update(data);
    dispatch(Actions.getShowRooms());
    dispatch(showMessage({ message: 'Show Room Update' }));
  } catch (error) {
    console.log(error);
  }
};

export function newContact() {
  const data = {
    uid: FuseUtils.generateGUID(),
    type: '',
    style:'',
    brand:'',
    model:'',
    basecurve:'',
    price: ''
    
  };

  return {
    type: GET_CONTACT,
    payload: data
  };
}
