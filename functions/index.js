const nodemailer = require("nodemailer");
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");

const app = express();
const root = require("path").join(__dirname, "build");

app.use(express.static(root));

exports.addAdminRole = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then((user) => {
      return admin.auth().setCustomUserClaims(user.uid, {
        Admin: true,
      });
    })
    .then(() => {
      return {
        message: "Successfully Added User As Admin",
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
      displayName: data.email.split("@")[0],
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false,
    })
    .then((user) => {
      return {
        user,
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
        Staff: true,
      });
    })
    .then(() => {
      return {
        message: "Successfully Added User As Staff",
      };
    })
    .catch((err) => {
      return err;
    });
});

exports.birthdayMessageFunction = functions.pubsub
  .schedule("0 15 * * *")
  .timeZone("America/New_York") // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const queryTemplates = await admin
      .firestore()
      .collection("emailTemplates")
      .doc("emailTemplates")
      .get();
    let templatesresult = queryTemplates.data();

    let resultCustomers = [];
    const queryCustomers = await admin
      .firestore()
      .collection("customers")
      .get();
    for (let doc of queryCustomers.docs) {
      resultCustomers.push(doc.data());
    }

    let today = new Date();
    resultCustomers.map((row) => {
      if (
        row?.email &&
        row?.dob &&
        row?.dob.toDate().getDate() === today.getDate() &&
        row?.dob.toDate().getMonth() === today.getMonth()
      ) {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "ali43093@gmail.com",
            pass: "prckrpcolhrxldek",
          },
        });

        const mailOptions = {
          from: `ali43093@gmail.com`,
          to: row?.email,
          subject: "New Message from Cooper Crown",
          html: `<h2>Hi ${row?.firstName} ${row?.lastName}, </h2>
          <p>${templatesresult?.templates?.birthday} </p>
           <h3>Best Wishes</h3> 
           <h3>Cooper Crown</h3>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  });

exports.examExpiry = functions.pubsub
  .schedule("0 16 * * *")
  .timeZone("America/New_York") // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const queryTemplates = await admin
      .firestore()
      .collection("emailTemplates")
      .doc("emailTemplates")
      .get();
    let templatesresult = queryTemplates.data();

    let resultappointments = [];
    const queryAppointments = await admin
      .firestore()
      .collection("appointments")
      .get();
    for (let doc of queryAppointments.docs) {
      resultappointments.push(doc.data());
    }

    let today = new Date();
    resultappointments.map((row) => {
      if (
        row?.email &&
        row?.start.toDate().getDate() - 1 === today.getDate() &&
        row?.start.toDate().getMonth() === today.getMonth() &&
        row?.start.toDate().getYear() === today.getYear()
      ) {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: "ali43093@gmail.com",
            pass: "prckrpcolhrxldek",
          },
        });

        const mailOptions = {
          from: `ali43093@gmail.com`,
          to: row?.email,
          subject: "New Message from Cooper Crown",
          html: `<h2>Hi ${row?.title} , </h2>
          <p>${templatesresult?.templates?.examExpiry} </p>
           <h3>Best Wishes</h3> 
           <h3>Cooper Crown</h3>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
        });
      }
    });
  });

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

exports.app = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
