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
    const queryloc1 = await firestore()
      .collection('showRooms')
      .where('showRoomId', '==', Number(data.showRoomId1))
      .limit(1)
      .get();
    let result1 = queryloc1.docs[0].data();

    const queryloc2 = await firestore()
      .collection('showRooms')
      .where('showRoomId', '==', Number(data.showRoomId2))
      .limit(1)
      .get();
    let result2 = queryloc2.docs[0].data();

    const queryloc3 = await firestore()
      .collection('showRooms')
      .where('showRoomId', '==', Number(data.showRoomId3))
      .limit(1)
      .get();
    let result3 = queryloc3.docs[0].data();

    await firebaseService.firestoreDb
      .collection('doctors')
      .add({
        ...data, date: today, location1: result1.locationName, location3: result3.locationName, 
        location2: result2.locationName, dob: firestore.Timestamp.fromDate(data?.dob),
        dobString: moment(data?.dob).format('MM/DD/YYYY'), doctorId: dbConfig?.doctorId + 1
      });
    await firebaseService.firestoreDb
      .collection('dbCo nfig')
      .doc('dbConfig')
      .update({
        doctorId: dbConfig?.doctorId + 1
      });
    // await firebaseService.firestoreDb.collection('doctors').add(data);
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
    location1: '',
    location2: '',
    location3: '',
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
