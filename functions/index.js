const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        Admin: true
      });
    })
    .then(() => {
      return {
        message: 'Successfully Added User As Admin'
      };
    })
    .catch((err) => {
      return err;
    });
});
exports.createUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .createUser({
      email: data.email,
      emailVerified: true,
      password: data.password,
      displayName: data.email.split('@')[0],
      photoURL: 'http://www.example.com/12345678/photo.png',
      disabled: false
    })
    .then((user) => {
      return {
        user
      };
    })
    .catch((err) => {
      return err;
    });
});
exports.addStaffRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        Staff: true
      });
    })
    .then(() => {
      return {
        message: 'Successfully Added User As Staff'
      };
    })
    .catch((err) => {
      return err;
    });
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
