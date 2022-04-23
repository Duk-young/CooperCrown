import { blue } from '@material-ui/core/colors';
import { firestore } from 'firebase';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useReactToPrint } from 'react-to-print';
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import logo from './images/logo.JPG';
import '../Customers/Themes.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  table: {
    minWidth: 700
  }
});

export default function OrderReceipt(props) {
  const classes = useStyles();
  const {
    mainForm,
    openOrderReceipt,
    handleOrderReceiptClose,
    customer,
    eyeglasses,
    payments
  } = props;
  const dispatch = useDispatch();
  const [hits, setHits] = useState([]);
  const [selectedInsurances, setSelectedInsurances] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  //   const onSubmitInsurance = async () => {
  //     try {
  //       if (form?.orderId) {
  //         setDisabledState(true);
  //         const queryExisting = await firestore()
  //           .collection('insuranceClaims')
  //           .where('orderId', '==', Number(form?.orderId))
  //           .get();
  //         queryExisting.forEach((doc) => {
  //           doc.ref.delete();
  //         });

  //         for (let i = 0; i < selectedInsurances?.length; i++) {
  //           const dbConfigLoop = (
  //             await firestore().collection('dbConfig').doc('dbConfig').get()
  //           ).data();

  //           await firestore()
  //             .collection('insuranceClaims')
  //             .add({
  //               orderDate: firestore.Timestamp.fromDate(new Date()),
  //               insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1,
  //               orderId: form?.orderId,
  //               customerId: customer?.customerId,
  //               firstName: customer?.firstName,
  //               lastName: customer?.lastName,
  //               insuranceCompany: selectedInsurances[i]?.insuranceCompany,
  //               policyNo: selectedInsurances[i]?.policyNo,
  //               insuranceCost: form?.insuranceCost,
  //               claimStatus: 'Unclaimed'
  //             });

  //           await firestore()
  //             .collection('dbConfig')
  //             .doc('dbConfig')
  //             .update({ insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1 });
  //         }
  //         dispatch(
  //           MessageActions.showMessage({
  //             message: 'Insurance Claim Saved Successfully...'
  //           })
  //         );
  //       } else {
  //         setDisabledState(true);
  //         const dbConfig = (
  //           await firestore().collection('dbConfig').doc('dbConfig').get()
  //         ).data();
  //         let newOrderId = dbConfig?.orderId + 1;

  //         const queryExisting = await firestore()
  //           .collection('insuranceClaims')
  //           .where('orderId', '==', Number(newOrderId))
  //           .get();
  //         queryExisting.forEach((doc) => {
  //           doc.ref.delete();
  //         });

  //         for (let i = 0; i < selectedInsurances?.length; i++) {
  //           const dbConfigLoop = (
  //             await firestore().collection('dbConfig').doc('dbConfig').get()
  //           ).data();

  //           await firestore()
  //             .collection('insuranceClaims')
  //             .add({
  //               orderDate: firestore.Timestamp.fromDate(new Date()),
  //               insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1,
  //               orderId: newOrderId,
  //               customerId: customer?.customerId,
  //               firstName: customer?.firstName,
  //               lastName: customer?.lastName,
  //               insuranceCompany: selectedInsurances[i]?.insuranceCompany,
  //               policyNo: selectedInsurances[i]?.policyNo,
  //               insuranceCost: form?.insuranceCost,
  //               claimStatus: 'Unclaimed'
  //             });

  //           await firestore()
  //             .collection('dbConfig')
  //             .doc('dbConfig')
  //             .update({ insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1 });
  //         }
  //         dispatch(
  //           MessageActions.showMessage({
  //             message: 'Insurance Claim Saved Successfully...'
  //           })
  //         );
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       let test = [];
  //       let queryInsurance = await firestore()
  //         .collection('insurances')
  //         .where('customerId', '==', Number(customer?.customerId))
  //         .get();
  //       queryInsurance.forEach((doc) => {
  //         test.push(doc.data());
  //       });

  //       setHits(test);
  //     };
  //     fetchData();
  //   }, []);

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleOrderReceiptClose}
      aria-labelledby="simple-dialog-title"
      open={openOrderReceipt}>
      <div>
        <div ref={componentRef} className="p-20">
          {/* style="text-align: center" */}
          {/* <div className="page-header">
            I'm The Header
            <br />
            <button
              type="button"
              onClick="window.print()"
              // style="background: pink"
            >
              PRINT ME!
            </button>
          </div> */}

          <div className="page-footer">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Felis
            eget velit aliquet sagittis id consectetur purus. Imperdiet dui
            accumsan sit amet nulla. Pulvinar elementum integer enim neque
            volutpat ac tincidunt vitae semper. Sed velit dignissim sodales ut
            eu sem integer vitae justo. Nisl suscipit adipiscing bibendum est
            ultricies integer quis auctor elit. Risus nec feugiat in fermentum
            posuere urna nec tincidunt. Nunc consequat interdum varius sit amet
            mattis vulputate enim. In pellentesque massa placerat duis ultricies
            lacus sed turpis tincidunt. Vitae semper quis lectus nulla at
            volutpat diam ut venenatis. Urna condimentum mattis pellentesque id.
            Mauris a diam maecenas sed enim ut sem. Cras sed felis eget velit
            aliquet sagittis id. Viverra maecenas accumsan lacus vel facilisis.
            Turpis egestas maecenas pharetra convallis posuere morbi leo urna.
            Feugiat in fermentum posuere urna. Imperdiet dui accumsan sit amet
            nulla facilisi morbi. Cursus risus at ultrices mi tempus imperdiet
            nulla.
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
                      <h2 className="font-serif text-right">
                        225 Broad Ave. Ste 206
                      </h2>
                      <h2 className="font-serif text-right">
                        Palisades Park NJ 07650
                      </h2>
                      <h2 className="font-serif text-right">
                        Phone: 201-585-1337
                      </h2>
                      <h3 className="font-serif text-right">
                        Email: coopercrwnnj@gmail.com
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col w-full px-20 pb-10">
                    <h2 className="font-serif">{`Customer ID: ${customer?.customerId} `}</h2>
                    <h2 className="font-serif">{`${customer?.firstName} ${customer?.lastName} `}</h2>
                    <h2 className="font-serif">{customer?.address}</h2>
                    <h2 className="font-serif">{`${customer?.state} ${customer?.zipCode} `}</h2>
                    <h2 className="font-serif">{`Phone 1: ${formatPhoneNumber(
                      customer?.phone1
                    )} `}</h2>
                    <h2 className="font-serif">{`Phone 2: ${formatPhoneNumber(
                      customer?.phone2
                    )} `}</h2>
                    <h2 className="font-serif">{`Email: ${customer?.email} `}</h2>
                  </div>
                  <div className="flex w-full px-20 ">
                    <div className="flex flex-row w-1/2 border-1 border-black  justify-center">
                      <h2>DESCRIPTION</h2>
                    </div>
                    <div className="flex flex-row w-1/2">
                      <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                        <h2>ORDER</h2>
                      </div>
                      <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                        <h2>UNIT COST</h2>
                      </div>
                      <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                        <h2>TOTAL</h2>
                      </div>
                    </div>
                  </div>

                  {mainForm?.prescriptionType === 'eyeglassesRx' && (
                    <div>
                      <div>
                        {eyeglasses?.map((row) => (
                          <div className="flex w-full px-20 ">
                            <div className="flex flex-col w-1/2 border-1 border-black ">
                              <h2>{`Type: Eyeglasses`}</h2>
                              <h2>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Frame: ${row?.frameBrand}`}</h2>
                              <h2>{`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Lens: ${row?.lensType}`}</h2>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                                <h2>{mainForm?.orderId}</h2>
                              </div>
                              <div className="flex flex-col w-1/3 border-1 border-black justify-end">
                                <h2 className="footercopy">a</h2>
                                <h2>$ {Number(row?.frameRate).toFixed(2)}</h2>
                                <h2>$ {Number(row?.lensRate).toFixed(2)}</h2>
                              </div>
                              <div className="flex flex-row w-1/3 border-1 border-black justify-center">
                                <h2>
                                  ${' '}
                                  {(+row?.frameRate + +row?.lensRate).toFixed(
                                    2
                                  )}
                                </h2>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-row w-full mt-8 px-20">
                        <div className="w-2/3">
                          <div className="flex flex-col">
                            <h1 className="font-500 underline">PAYMENTS:</h1>
                          </div>
                          <div className="flex flex-col">
                            {payments.map((row) => (
                              <div className="flex flex-row w-full">
                                <div className="flex flex-row w-1/3">
                                  <h3>{row?.paymentMode}</h3>
                                </div>
                                <div className="flex flex-row w-1/3">
                                  <h3>
                                    {row?.paymentDate.toDate().toDateString()}
                                  </h3>
                                </div>
                                <div className="flex flex-row justify-center w-1/3">
                                  <h3>$ {row?.amount}</h3>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className=" font-700 text-right">
                                Subtotal:
                              </h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b.frameRate,
                                  0
                                ) +
                                  eyeglasses.reduce(
                                    (a, b) => +a + +b.lensRate,
                                    0
                                  )}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Additional Cost:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">
                                ${' '}
                                {mainForm?.additionalCost
                                  ? mainForm?.additionalCost
                                  : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Discount: -</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">
                                $ {mainForm?.discount ? mainForm?.discount : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Insurance Cost:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-center">
                                ${' '}
                                {mainForm?.insuranceCost
                                  ? mainForm?.insuranceCost
                                  : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">
                                Grand Total:{' '}
                              </h3>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <h3 className="font-700 text-black ">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b.frameRate,
                                  0
                                ) +
                                  eyeglasses.reduce(
                                    (a, b) => +a + +b.lensRate,
                                    0
                                  ) +
                                  (mainForm?.additionalCost
                                    ? +mainForm?.additionalCost
                                    : 0) -
                                  (mainForm?.discount
                                    ? +mainForm?.discount
                                    : 0) -
                                  (mainForm?.insuranceCost
                                    ? +mainForm?.insuranceCost
                                    : 0)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Paid:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-center">
                                $ {payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">Balance: </h3>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <h3 className="font-700 text-black ">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b.frameRate,
                                  0
                                ) +
                                  eyeglasses.reduce(
                                    (a, b) => +a + +b.lensRate,
                                    0
                                  ) +
                                  (mainForm?.additionalCost
                                    ? +mainForm?.additionalCost
                                    : 0) -
                                  (mainForm?.discount
                                    ? +mainForm?.discount
                                    : 0) -
                                  (mainForm?.insuranceCost
                                    ? +mainForm?.insuranceCost
                                    : 0) -
                                  payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {mainForm?.prescriptionType === 'contactLensRx' && (
                    <div>
                      <div>
                        {eyeglasses?.map((row) => (
                          <div className="flex w-full px-20 ">
                            <div className="flex flex-col w-1/2 border-1 border-black ">
                              <h2>{`Type: Contact Lens`}</h2>
                              <h2>{`${row?.contactLensName} ${row?.contactLensStyle}`}</h2>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                                <h2>{mainForm?.orderId}</h2>
                              </div>
                              <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                                <h2>
                                  $ {Number(row?.contactLensRate).toFixed(2)}
                                </h2>
                              </div>
                              <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                                <h2>
                                  $ {Number(row?.contactLensRate).toFixed(2)}
                                </h2>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-row w-full mt-8 px-20">
                        <div className="w-2/3">
                          <div className="flex flex-col">
                            <h1 className="font-500 underline">PAYMENTS:</h1>
                          </div>
                          <div className="flex flex-col">
                            {payments.map((row) => (
                              <div className="flex flex-row w-full">
                                <div className="flex flex-row w-1/3">
                                  <h3>{row?.paymentMode}</h3>
                                </div>
                                <div className="flex flex-row w-1/3">
                                  <h3>
                                    {row?.paymentDate.toDate().toDateString()}
                                  </h3>
                                </div>
                                <div className="flex flex-row justify-center w-1/3">
                                  <h3>$ {row?.amount}</h3>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className=" font-700 text-right">
                                Subtotal:
                              </h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b.contactLensRate,
                                  0
                                )}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Additional Cost:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">
                                ${' '}
                                {mainForm?.additionalCost
                                  ? mainForm?.additionalCost
                                  : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Discount: -</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">
                                $ {mainForm?.discount ? mainForm?.discount : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Insurance Cost:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-center">
                                ${' '}
                                {mainForm?.insuranceCost
                                  ? mainForm?.insuranceCost
                                  : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">
                                Grand Total:{' '}
                              </h3>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <h3 className="font-700 text-black ">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b.contactLensRate,
                                  0
                                ) +
                                  (mainForm?.additionalCost
                                    ? +mainForm?.additionalCost
                                    : 0) -
                                  (mainForm?.discount
                                    ? +mainForm?.discount
                                    : 0) -
                                  (mainForm?.insuranceCost
                                    ? +mainForm?.insuranceCost
                                    : 0)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Paid:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-center">
                                $ {payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">Balance: </h3>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <h3 className="font-700 text-black ">
                                ${' '}
                                {eyeglasses.reduce(
                                  (a, b) => +a + +b.contactLensRate,
                                  0
                                ) +
                                  (mainForm?.additionalCost
                                    ? +mainForm?.additionalCost
                                    : 0) -
                                  (mainForm?.discount
                                    ? +mainForm?.discount
                                    : 0) -
                                  (mainForm?.insuranceCost
                                    ? +mainForm?.insuranceCost
                                    : 0) -
                                  payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {mainForm?.prescriptionType === 'medicationRx' && (
                    <div>
                      <div>
                        {eyeglasses?.map((row) => (
                          <div className="flex w-full px-20 ">
                            <div className="flex flex-row w-1/2 border-1 border-black ">
                              <h2>{`Type: ${row?.name}`}</h2>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                                <h2>{mainForm?.orderId}</h2>
                              </div>
                              <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                                <h2>$ {Number(row?.price).toFixed(2)}</h2>
                              </div>
                              <div className="flex flex-row w-1/3 border-1 border-black  justify-center">
                                <h2>$ {Number(row?.price).toFixed(2)}</h2>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-row w-full mt-8 px-20">
                        <div className="w-2/3">
                          <div className="flex flex-col">
                            <h1 className="font-500 underline">PAYMENTS:</h1>
                          </div>
                          <div className="flex flex-col">
                            {payments.map((row) => (
                              <div className="flex flex-row w-full">
                                <div className="flex flex-row w-1/3">
                                  <h3>{row?.paymentMode}</h3>
                                </div>
                                <div className="flex flex-row w-1/3">
                                  <h3>
                                    {row?.paymentDate.toDate().toDateString()}
                                  </h3>
                                </div>
                                <div className="flex flex-row justify-center w-1/3">
                                  <h3>$ {row?.amount}</h3>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="w-1/3">
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className=" font-700 text-right">
                                Subtotal:
                              </h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">
                                ${' '}
                                {eyeglasses.reduce((a, b) => +a + +b.price, 0)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Additional Cost:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">
                                ${' '}
                                {mainForm?.additionalCost
                                  ? mainForm?.additionalCost
                                  : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Discount: -</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">
                                $ {mainForm?.discount ? mainForm?.discount : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Insurance Cost:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-center">
                                ${' '}
                                {mainForm?.insuranceCost
                                  ? mainForm?.insuranceCost
                                  : 0}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">
                                Grand Total:{' '}
                              </h3>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <h3 className="font-700 text-black ">
                                ${' '}
                                {eyeglasses.reduce((a, b) => +a + +b.price, 0) +
                                  (mainForm?.additionalCost
                                    ? +mainForm?.additionalCost
                                    : 0) -
                                  (mainForm?.discount
                                    ? +mainForm?.discount
                                    : 0) -
                                  (mainForm?.insuranceCost
                                    ? +mainForm?.insuranceCost
                                    : 0)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-right">Paid:</h3>
                            </div>
                            <div className="flex flex-row w-1/2">
                              <h3 className="text-center">
                                $ {payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-row w-1/2">
                              <h3 className="font-700 text-right">Balance: </h3>
                            </div>
                            <div className="flex flex-col w-1/2">
                              <h3 className="font-700 text-black ">
                                ${' '}
                                {eyeglasses.reduce((a, b) => +a + +b.price, 0) +
                                  (mainForm?.additionalCost
                                    ? +mainForm?.additionalCost
                                    : 0) -
                                  (mainForm?.discount
                                    ? +mainForm?.discount
                                    : 0) -
                                  (mainForm?.insuranceCost
                                    ? +mainForm?.insuranceCost
                                    : 0) -
                                  payments.reduce((a, b) => +a + +b.amount, 0)}
                              </h3>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

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
        <Fab
          onClick={handlePrint}
          variant="extended"
          color="primary"
          aria-label="add">
          <AddIcon />
          Print
        </Fab>
      </div>
    </Dialog>
  );
}

OrderReceipt.propTypes = {
  open: PropTypes.bool.isRequired
};
