import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';

import firebaseService from 'app/services/firebaseService';
export const GET_SERVICE = '[E-COMMERCE APP] GET SERVICE';
export const SAVE_SERVICE = '[E-COMMERCE APP] SAVE SERVICE';

export const getService = (params) => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb.collection('services').where('serviceId', '==', Number(params)).limit(1).get();

    const service = { id: response.docs[0].id, ...response.docs[0].data() };
    dispatch({
      type: GET_SERVICE,
      payload: service
    });
  } catch (error) {
    console.log(error);
  }
};
export const saveService = (data) => async (dispatch) => {
  delete data.uid;
  try {
    const dbConfig = (
      await firebaseService.firestoreDb
        .collection('dbConfig')
        .doc('dbConfig')
        .get()
    ).data();
    await firebaseService.firestoreDb
      .collection('services')
      .add({ ...data, serviceId: dbConfig?.serviceId + 1 });
    await firebaseService.firestoreDb
      .collection('dbConfig')
      .doc('dbConfig')
      .update({
        serviceId: dbConfig?.serviceId + 1
      });
    // await firebaseService.firestoreDb.collection('services').add(data);
    dispatch(Actions.getServices());
    dispatch(showMessage({ message: 'Service Saved' }));
  } catch (error) {
    console.log(error);
  }
};
export const deleteService = (data) => async (dispatch) => {
  delete data.uid;
  delete data.name;
  delete data.description;
  delete data.price;
  try {
    await firebaseService.firestoreDb.collection('services').doc(data.id).delete()
    dispatch(Actions.getServices());
    dispatch(showMessage({ message: 'Service deleted' }));
  } catch (error) {
    console.log(error);
  }
};
export const updateService = (data) => async (dispatch) => {
  const uuid = data.id;
  delete data.id;
  try {
    await firebaseService.firestoreDb
      .collection('services')
      .doc(uuid)
      .update(data);
    dispatch(Actions.getShowRooms());
    dispatch(showMessage({ message: 'Service Updated' }));
  } catch (error) {
    console.log(error);
  }
};
export function newService() {
  const data = {
    uid: FuseUtils.generateGUID(),
    name: '',
    description: '',
    price: ''
  };
  return {
    type: GET_SERVICE,
    payload: data
  };
}
