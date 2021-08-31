import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';
import firebaseService from 'app/services/firebaseService';
export const GET_DISCOUNT = '[E-COMMERCE APP] GET DISCOUNT';
export const SAVE_DISCOUNT = '[E-COMMERCE APP] SAVE DISCOUNT';

export const getDiscount = (params) => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb
      .collection('discounts')
      .doc(params)
      .get();
    const discount = { id: response.id, ...response.data() };
    dispatch({
      type: GET_DISCOUNT,
      payload: discount
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveDiscount = (data) => async (dispatch) => {
  delete data.uid;
  try {
    await firebaseService.firestoreDb.collection('discounts').add(data);
    dispatch(Actions.getDiscounts());
    dispatch(showMessage({ message: 'Discount Saved' }));
  } catch (error) {
    console.log(error);
  }
};
export const updateDiscount = (data) => async (dispatch) => {
  debugger;
  const uuid = data.id;
  delete data.id;
  try {
    await firebaseService.firestoreDb
      .collection('discounts')
      .doc(uuid)
      .update(data);
    dispatch(Actions.getDiscounts());
    dispatch(showMessage({ message: 'Discount Update' }));
  } catch (error) {
    console.log(error);
  }
};

export function newDiscount() {
  const data = {
    uid: FuseUtils.generateGUID(),
    code: '',
    amount: ''
  };
  return {
    type: GET_DISCOUNT,
    payload: data
  };
}
