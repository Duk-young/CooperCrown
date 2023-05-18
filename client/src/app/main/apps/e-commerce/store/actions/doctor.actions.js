import FuseUtils from '@fuse/utils';
import { showMessage } from 'app/store/actions/fuse';
import * as Actions from './index';
import firebaseService from 'app/services/firebaseService';
import { firestore } from 'firebase';
import moment from 'moment';

// import * as Actions from './index';

// import firebaseService from 'app/services/firebaseService';
export const GET_DOCTOR = '[E-COMMERCE APP] GET DOCTOR';
export const SAVE_DOCTOR = '[E-COMMERCE APP] SAVE DOCTOR';

export const getDoctor = (params) => async (dispatch) => {
  try {
    const response = await firebaseService.firestoreDb
      .collection('doctors')
      .doc(params)
      .get();
    const doctor = { id: response.id, ...response.data() };
    dispatch({
      type: GET_DOCTOR,
      payload: doctor
    });
  } catch (error) {
    console.log(error);
  }
};
export const saveDoctor = (data) => async (dispatch) => {
  delete data.uid;
  try {
    let today = firestore.Timestamp.fromDate(new Date())
    const dbConfig = (
      await firebaseService.firestoreDb
        .collection('dbConfig')
        .doc('dbConfig')
        .get()
    ).data();

    await firebaseService.firestoreDb
      .collection('doctors')
      .add({
        ...data, date: today, dob: firestore.Timestamp.fromDate(data?.dob),
        dobString: moment(data?.dob).format('MM/DD/YYYY'), doctorId: dbConfig?.doctorId + 1,
        fullName: `${data?.fname} ${data?.lname}`
      });
    await firebaseService.firestoreDb
      .collection('dbConfig')
      .doc('dbConfig')
      .update({ doctorId: dbConfig?.doctorId + 1 });

    dispatch(Actions.getDoctors());
    dispatch(showMessage({ message: 'Doctor Saved' }));
  } catch (error) {
    console.log(error);
  }
};
export const updateDoctor = (data) => async (dispatch) => {
  const uuid = data.id;
  let updatedData = data
  updatedData.dob = data?.dob && firestore.Timestamp.fromDate(data?.dob)
  updatedData.fullName = `${data?.fname} ${data?.lname}`

  try {
    await firebaseService.firestoreDb
      .collection('doctors')
      .doc(uuid)
      .update(updatedData);
    dispatch(Actions.getDoctors());
    dispatch(showMessage({ message: 'Doctor Update Successfully' }));
  } catch (error) {
    console.log(error);
  }
};

export function newDoctor() {

  const data = {
    uid: FuseUtils.generateGUID(),
    date: '',
    doctorname: '',
    dob: '',
    dobstring: '',
    fname: '',
    lname: '',
    Gender: '',
    phone1: '',
    phone2: '',
    address: '',
    city: '',
    State: '',
    zipcode: '',
    doctoremail: '',
    other: '',

  };
  return {
    type: GET_DOCTOR,
    payload: data
  };

}
