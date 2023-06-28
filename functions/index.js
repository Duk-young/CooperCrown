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
exports.deleteUser = functions.https.onCall((data, context) => {
  return admin
    .auth()
    .deleteUser(data)
    .then((res) => {
      return res
    })
    .catch((err) => {
      return err;
    });
});
exports.updateUserEmailPassword = functions.https.onCall((data, context) => {
  if (data?.email) {
    return admin.auth().updateUser(data?.uid, { email: data.email })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err;
      });
  } else if (data?.password) {
    return admin.auth().updateUser(data?.uid, { password: data.password })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err;
      });
  }
});
exports.sendEmail = functions.https.onCall((data, context) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    if (data?.customers?.length > 0) {
      data?.customers.map((customer) => {
        const mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: customer?.email,
          subject: data?.subject ?? 'New Message From Cooper Crown',
          html: `<h2>Hi ${customer?.firstName} ${customer?.lastName}, </h2>
    <p>${data?.message} </p>
     <h3>Best Wishes</h3> 
     <h3>Cooper Crown</h3>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
          }
        });
      })
    }

    return "Emails sent successfully."

  } catch (error) {
    return error
  }
});
exports.sendEventEmail = functions.https.onCall((data, context) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });


    const mailOptions = {
      from: process.env.NODEMAILER_EMAIL,
      to: data?.allEmails,
      subject: data?.subject ?? "New Message from Cooper Crown",
      html: `<h2>Dear Customer, </h2>
    <p>${data?.message} </p>
     <h3>Best Wishes</h3> 
     <h3>Cooper Crown</h3>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
    });


    return "Emails sent successfully."

  } catch (error) {
    return error
  }
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
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: row?.email,
          subject: templatesresult?.templates?.birthdaySubject ?? "New Message from Cooper Crown",
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
  .schedule("0 7 * * *")
  .timeZone("America/New_York") // Users can choose timezone - default is America/Los_Angeles
  .onRun(async () => {
    const queryTemplates = await admin
      .firestore()
      .collection("emailTemplates")
      .doc("emailTemplates")
      .get();
    let templatesresult = queryTemplates.data();

    let resultExams = [];
    const queryExams = await admin.firestore().collection("exams").get();
    for (let doc of queryExams.docs) {
      resultExams.push(doc.data());
    }

    let today = new Date();
    resultExams.map((row) => {
      if (
        row?.email &&
        row?.examTime.toDate().getDate() === today.getDate() &&
        (row?.examTime.toDate().getMonth() + 11 >= 12
          ? row?.examTime.toDate().getMonth() - 1
          : row?.examTime.toDate().getMonth() + 11) === today.getMonth() &&
        (row?.examTime.toDate().getYear() === today.getYear() ||
          row?.examTime.toDate().getYear() + 1 === today.getYear())
      ) {
        let transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PASSWORD,
          },
        });

        const mailOptions = {
          from: process.env.NODEMAILER_EMAIL,
          to: row?.email,
          subject: templatesresult?.templates?.examExpiry ?? "New Message from Cooper Crown",
          html: `<h2>Hi Mr. ${row?.lastName} , </h2>
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
