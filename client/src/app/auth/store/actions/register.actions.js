import firebaseService from 'app/services/firebaseService';
import jwtService from 'app/services/jwtService';
import * as Actions from 'app/store/actions';
import * as UserActions from './user.actions';
import { authRoles } from 'app/auth';

export const REGISTER_ERROR = 'REGISTER_ERROR';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

export function submitRegister({ displayName, password, email }) {
  return (dispatch) =>
    jwtService
      .createUser({
        displayName,
        password,
        email
      })
      .then((user) => {
        dispatch(UserActions.setUserData(user));
        return dispatch({
          type: REGISTER_SUCCESS
        });
      })
      .catch((error) => {
        return dispatch({
          type: REGISTER_ERROR,
          payload: error
        });
      });
}

export function registerWithFirebase(model) {
  if (!firebaseService.auth) {
    console.warn(
      "Firebase Service didn't initialize, check your configuration"
    );

    return () => false;
  }

  const { email, password, displayName } = model;
  return (dispatch) =>
    firebaseService.auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const addAdminRole = firebaseService.functions.httpsCallable(
          'addAdminRole'
        );
        addAdminRole({ email: email })
          .then((res) => {
            console.log(res);
            firebaseService.firestoreDb
              .collection('users')
              .doc(response.user.uid)
              .set({
                Role: 'Admin',
                email: email,
                CompanyId: response.user.uid
              })
              .then(() => {
                dispatch(
                  UserActions.createUserSettingsFirebase({
                    ...response.user,
                    displayName,
                    email
                  })
                );
                dispatch(
                  Actions.updateNavigationItem('Account-Setting', {
                    title: 'Account Setting',
                    type: 'item',
                    auth: authRoles.staff,
                    url: `/apps/AccountSetting/${response.user.uid}`,
                    exact: true
                  })
                );
                dispatch(
                  Actions.updateNavigationItem('Security-And-Privacy', {
                    title: 'Security And Privacy',
                    type: 'item',
                    auth: authRoles.staff,
                    url: `/apps/SecurityAndPrivacy/${response.user.uid}`,
                    exact: true
                  })
                );
                return dispatch({
                  type: REGISTER_SUCCESS
                });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((error) => {
        const usernameErrorCodes = [
          'auth/operation-not-allowed',
          'auth/user-not-found',
          'auth/user-disabled'
        ];

        const emailErrorCodes = [
          'auth/email-already-in-use',
          'auth/invalid-email'
        ];

        const passwordErrorCodes = [
          'auth/weak-password',
          'auth/wrong-password'
        ];

        const response = {
          email: emailErrorCodes.includes(error.code) ? error.message : null,
          displayName: usernameErrorCodes.includes(error.code)
            ? error.message
            : null,
          password: passwordErrorCodes.includes(error.code)
            ? error.message
            : null
        };

        if (error.code === 'auth/invalid-api-key') {
          dispatch(Actions.showMessage({ message: error.message }));
        }

        return dispatch({
          type: REGISTER_ERROR,
          payload: response
        });
      });
}
