import './Themes.css';
import { blue } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useReactToPrint } from 'react-to-print';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import logo from './images/logo.JPG';
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { useState, useRef, useEffect } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Mailer } from 'nodemailer-react';
// const nodemailer = window.require('nodemailer');

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  table: {
    minWidth: 700
  }
});

export default function PrescriptionReceipt(props) {
  const {
    mainForm,
    openPrescriptionReceipt,
    handlePrescriptionReceiptClose,
    customer
  } = props;

  useEffect(() => {}, [mainForm]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  const transport = {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'ali43093@gmail.com',
      pass: 'prckrpcolhrxldek'
    }
  };

  const defaults = {
    from: 'ali43093@gmail.com'
  };

  const WelcomeEmail = () => ({
    subject: `👋 Abbas`,
    body: (
      <div>
        <p>Hello Abbas!</p>
        <p>Hope you'll enjoy the package!</p>
      </div>
    )
  });

  const PasswordEmail = '';
  const ReminderEmail = '';

  const mailer = Mailer(
    { transport, defaults },
    { WelcomeEmail, PasswordEmail, ReminderEmail }
  );

  // const handleEmail = () => {
  //   let transporter = Mailer.createTransport({
  //     host: 'smtp.gmail.com',
  //     port: 465,
  //     secure: true,
  //     auth: {
  //       user: 'ali43093@gmail.com',
  //       pass: 'prckrpcolhrxldek'
  //     }
  //   });

  //   const mailOptions = {
  //     from: `ali43093@gmail.com`,
  //     to: customer?.email,
  //     subject: 'New Message from Cooper Crown',
  //     html: `<h2>Hi ${customer?.lastName} , </h2>
  //   <p>Below is your prescription details: </p>
  //   {mainForm?.prescriptionType === 'eyeglassesRx' && (
  //     <div className="p-16 sm:p-24 w-full">
  //       <h1 className="underline p-10">Eyeglasses Rx</h1>
  //       <div className="flex flex-row px-20">
  //         <div className="p-8 h-auto flex-1">
  //           <h3 className="text-center font-700"></h3>
  //         </div>
  //         <div className="p-8 h-auto flex-1">
  //           <h3 className="text-center font-700">Sphere</h3>
  //         </div>
  //         <div className="p-8 h-auto flex-1">
  //           <h3 className="text-center font-700">Cylinder</h3>
  //         </div>
  //         <div className="p-8 h-auto flex-1">
  //           <h3 className="text-center font-700">Axis</h3>
  //         </div>
  //         <div className="p-8 h-auto flex-1">
  //           <h3 className="text-center font-700">Add</h3>
  //         </div>
  //         <div className="p-8 h-auto flex-1">
  //           <h3 className="text-center font-700">Prism</h3>
  //         </div>
  //         <div className="p-8 h-auto flex-1">
  //           <h3 className="text-center font-700">VA</h3>
  //         </div>
  //       </div>
  //       <div className="flex flex-row px-20">
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center font-700">OD</h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesSphereOd}
  //           </h3>{' '}
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesCylinderOd}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesAxisOd}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesAddOd}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesPrismOd}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesVaOd}
  //           </h3>
  //         </div>
  //       </div>

  //       <div className="flex flex-row px-20">
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center font-700">OS</h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesSphereOs}
  //           </h3>{' '}
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesCylinderOs}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesAxisOs}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesAddOs}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesPrismOs}
  //           </h3>
  //         </div>
  //         <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
  //           <h3 className="text-center">
  //             {mainForm?.eyeglassesVaOs}
  //           </h3>
  //         </div>
  //       </div>
  //     </div>
  //   )}
  //    <h3>Best Wishes</h3>
  //    <h3>Cooper Crown</h3>`
  //   };
  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.log(error);
  //     }
  //   });
  // };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handlePrescriptionReceiptClose}
      aria-labelledby="simple-dialog-title"
      open={openPrescriptionReceipt}>
      <div>
        <div ref={componentRef}>
          <div className="page-footer flex-col p-20">
            <p>
              In the State of New Jersey contact Lens prescriptions expire after
              one year. By signing below you agree that we are not responsible
              for errors when prescriptions are filled elsewhere and or after
              the expiration date. Theft, unauthorized possession, including the
              alteration or forgery of this form, are crimes punishable by law.
              <br />
              Some prescriptions may expire sooner than one year depending on
              the medical judgement of the examining optomestrist.
            </p>
            <div className="flex flex-row justify-end pr-10">
              <div className="flex flex-row border-b-2 border-black w-136">
                X
              </div>
            </div>
            <div className="flex flex-row justify-end pr-10">
              <div className="flex flex-row border-b-2 border-white w-128 pt-10">
                Dr.
              </div>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <td>
                  {/* <!--place holder for the fixed-position header--> */}
                  <div className="page-header-space"></div>
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>
                  {/* <!--*** CONTENT GOES HERE ***--> */}
                  <div className="page-header flex flex-row w-full">
                    <div className="w-1/3 border-b-1 border-black ">
                      {' '}
                      <h2>{new Date().toDateString()}</h2>{' '}
                    </div>
                    <div className="flex flex-row justify-center pt-2 w-1/3 border-b-1 border-black ">
                      <div className="w-128 h-w-128">
                        <img src={logo} alt="" />
                      </div>
                    </div>
                    <div className="flex flex-col w-1/3 border-b-1 border-black ">
                      <h2 className=" text-right">225 Broad Ave. Ste 206</h2>
                      <h2 className=" text-right">Palisades Park NJ 07650</h2>
                      <h2 className=" text-right">Phone: 201-585-1337</h2>
                      <h3 className=" text-right">
                        Email: coopercrwnnj@gmail.com
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col w-full px-20 pb-10">
                    {/* <h2>{`Customer ID: ${customer?.customerId} `}</h2> */}
                    <h2>{`${customer?.firstName} ${customer?.lastName} `}</h2>
                    <h2>{customer?.address}</h2>
                    <h2>{`${customer?.state} ${customer?.zipCode} `}</h2>
                    {/* <h2>{`Phone 1: ${formatPhoneNumber(
                      customer?.phone1
                    )} `}</h2> */}
                    {/* <h2>{`Phone 2: ${formatPhoneNumber(
                      customer?.phone2
                    )} `}</h2> */}
                    {/* <h2>{`Email: ${customer?.email} `}</h2> */}
                    <h2>
                      {`Prescription Date: ${
                        mainForm?.prescriptionDate
                          ? moment(mainForm?.prescriptionDate.toDate()).format(
                              'MM/DD/YYYY'
                            )
                          : ''
                      }`}{' '}
                    </h2>
                  </div>

                  {mainForm?.prescriptionType === 'eyeglassesRx' && (
                    <div className="p-16 sm:p-24 w-full">
                      <h1 className="underline p-10">Eyeglasses Rx</h1>
                      <div className="flex flex-row px-20">
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700"></h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Sphere</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Cylinder</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Axis</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Add</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Prism</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">VA</h3>
                        </div>
                      </div>
                      <div className="flex flex-row px-20">
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">OD</h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesSphereOd}
                          </h3>{' '}
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesCylinderOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesAxisOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesAddOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesPrismOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesVaOd}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-row px-20">
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">OS</h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesSphereOs}
                          </h3>{' '}
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesCylinderOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesAxisOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesAddOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesPrismOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.eyeglassesVaOs}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}

                  {mainForm?.prescriptionType === 'contactLensRx' && (
                    <div className="p-16 sm:p-24 w-full">
                      <h1 className="underline p-10">Contact Lens Rx</h1>
                      <div className="flex flex-row px-20">
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700"></h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Sphere</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Cylinder</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Axis</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">Add</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">DIA</h3>
                        </div>
                        <div className="p-8 h-auto flex-1">
                          <h3 className="text-center font-700">BC</h3>
                        </div>
                      </div>
                      <div className="flex flex-row px-20">
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">OD</h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensSphereOd}
                          </h3>{' '}
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensCylinderOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensAxisOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensAddOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensDiaOd}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensBcOd}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-row px-20">
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">OS</h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensSphereOs}
                          </h3>{' '}
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensCylinderOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensAxisOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensAddOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensDiaOs}
                          </h3>
                        </div>
                        <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center">
                            {mainForm?.contactLensBcOs}
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-row px-20 justify-around mt-10">
                        <div>
                          <span className="underline font-700">Company:</span>
                          <span className="ml-10">
                            {mainForm?.contactLensCompany}
                          </span>
                        </div>
                        <div>
                          <span className="underline font-700">Model:</span>
                          <span className="ml-10">
                            {mainForm?.contactLensModel}
                          </span>
                        </div>
                        <div>
                          <span className="underline font-700">Modality:</span>
                          <span className="ml-10">
                            {mainForm?.contactLensModality}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-row justify-end p-44">
                    <h3 className="underline font-700">Expiration Date:</h3>

                    <h3 className="underline font-700 ml-6">
                      {mainForm?.prescriptionDate
                        ? moment(
                            mainForm?.prescriptionDate
                              .toDate()
                              .setFullYear(
                                mainForm?.prescriptionDate
                                  .toDate()
                                  .getFullYear() + 1
                              )
                          ).format('MM/DD/YYYY')
                        : ''}
                    </h3>
                  </div>

                  <div className="footercopy">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr>
                <td>
                  {/* <!--place holder for the fixed-position footer--> */}
                  <div className="page-footer-space"></div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="flex flex-row justify-center">
          <Fab
            onClick={handlePrint}
            variant="extended"
            color="primary"
            aria-label="add">
            <AddIcon />
            Print
          </Fab>
          <Fab
            onClick={() => {
              mailer.send('WelcomeEmail', {
                to: `${customer?.email}`
              });
            }}
            variant="extended"
            color="primary"
            aria-label="add">
            <AddIcon />
            Send Email
          </Fab>
        </div>
      </div>
    </Dialog>
  );
}

PrescriptionReceipt.propTypes = {
  open: PropTypes.bool.isRequired
};
