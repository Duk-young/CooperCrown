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
    contactLenses,
    medication,
    payments
  } = props;
  const dispatch = useDispatch();
  const [hits, setHits] = useState([]);
  const [selectedInsurances, setSelectedInsurances] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);
  const [templates, setTemplates] = useState([]);

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

  useEffect(() => {
    const fetchDetails = async () => {
      const queryTemplates = (
        await firestore()
          .collection('emailTemplates')
          .doc('emailTemplates')
          .get()
      ).data();
      const terms = queryTemplates?.templates?.terms
        ? queryTemplates?.templates?.terms.split('<br>')
        : '';
      setTemplates(terms.length ? terms : []);
    };
    fetchDetails();
  }, []);

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleOrderReceiptClose}
      aria-labelledby="simple-dialog-title"
      open={openOrderReceipt}>
      <div>
        <div ref={componentRef}>
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
                  <div className="page-header flex flex-row w-full border-b-1 border-black">
                    <div className="w-1/3  ">
                      {' '}
                      <h2>{new Date().toDateString()}</h2>{' '}
                    </div>
                    <div className="flex flex-row justify-center pt-2 w-1/3  ">
                      <div className="w-128">
                        <img src={logo} alt="" />
                      </div>
                    </div>
                    <div className="flex flex-col w-1/3  ">
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
                                {(+row?.frameRate + +row?.lensRate).toFixed(2)}
                              </h2>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div>
                      {contactLenses?.map((row) => (
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
                    <div>
                      {medication?.map((row) => (
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
                            <h3 className=" font-700 text-right">Subtotal:</h3>
                          </div>
                          <div className="flex flex-row w-1/2">
                            <h3 className="font-700 text-right">
                              ${' '}
                              {(
                                eyeglasses.reduce(
                                  (a, b) => +a + +b.lensRate,
                                  0
                                ) +
                                eyeglasses.reduce(
                                  (a, b) => +a + +b.frameRate,
                                  0
                                ) +
                                medication.reduce((a, b) => +a + +b.price, 0) +
                                contactLenses.reduce(
                                  (a, b) => +a + +b.contactLensRate,
                                  0
                                )
                              ).toLocaleString()}
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
                              {(
                                eyeglasses.reduce(
                                  (a, b) => +a + +b.lensRate,
                                  0
                                ) +
                                eyeglasses.reduce(
                                  (a, b) => +a + +b.frameRate,
                                  0
                                ) +
                                medication.reduce((a, b) => +a + +b.price, 0) +
                                contactLenses.reduce(
                                  (a, b) => +a + +b.contactLensRate,
                                  0
                                ) +
                                (mainForm?.additionalCost
                                  ? +mainForm?.additionalCost
                                  : 0) -
                                (mainForm?.discount ? +mainForm?.discount : 0) -
                                (mainForm?.insuranceCost
                                  ? +mainForm?.insuranceCost
                                  : 0)
                              ).toLocaleString()}
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
                              {(
                                eyeglasses.reduce(
                                  (a, b) => +a + +b.lensRate,
                                  0
                                ) +
                                eyeglasses.reduce(
                                  (a, b) => +a + +b.frameRate,
                                  0
                                ) +
                                medication.reduce((a, b) => +a + +b.price, 0) +
                                contactLenses.reduce(
                                  (a, b) => +a + +b.contactLensRate,
                                  0
                                ) +
                                (mainForm?.additionalCost
                                  ? +mainForm?.additionalCost
                                  : 0) -
                                (mainForm?.discount ? +mainForm?.discount : 0) -
                                (mainForm?.insuranceCost
                                  ? +mainForm?.insuranceCost
                                  : 0) -
                                payments.reduce((a, b) => +a + +b.amount, 0)
                              ).toLocaleString()}
                            </h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {mainForm?.prescriptionType === 'contactLensRx' && (
                    <div>
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

                  <div className="flex flex-row footercopy">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit, sed do eiusmod tempor incididunt ut labore et dolore
                    magna aliqua.
                  </div>
                  <h2 className=" ml-10 underline font-700">
                    Terms & Conditions
                  </h2>
                  {templates.map((row) => (
                    <div className="ml-20">{row}</div>
                  ))}
                  {/* <div>{message}</div> */}
                </td>
              </tr>
            </tbody>

            {/* <tfoot>
              <tr>
                <td> */}
            {/* <!--place holder for the fixed-position footer--> */}
            {/* <div className="page-footer-space"></div>
                </td>
              </tr>
            </tfoot> */}
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
