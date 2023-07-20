import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import CustomAlert from '../ReusableComponents/CustomAlert';
import EditIcon from '@material-ui/icons/Edit';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import ReceiveInsurancePayment from './ReceiveInsurancePayment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 12,
    textAlign: 'center',
    padding: 0
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
  table: {
    minWidth: 450
  },
  statusButton: {
    color: 'white',
    fontSize: '16px',
    fontWeight: 'bold'
  },
  orangeButton: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});

const InsuranceClaim = (props) => {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const [beingChangedStatus, setBeingChangedStatus] = useState('');
  const [beingDeletedPayment, setBeingDeletedPayment] = useState(false);
  const [openStatusChangeAlert, setOpenStatusChangeAlert] = useState(false);
  const [openPaymentDeleteAlert, setOpenPaymentDeleteAlert] = useState(false);
  const { form, setForm } = useForm({});
  const [editablePayment, setEditablePayment] = useState({});
  const [insuranceCompany, setInsuranceCompany] = useState({});
  const [images, setImages] = useState([]);
  const routeParams = useParams();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = async (status) => {
    const ref = firestore().collection('insuranceClaims').doc(form?.id);
    let data = {
      ...form,
      claimStatus: status
    };

    await ref.set(data);

    dispatch(
      MessageActions.showMessage({
        message: 'Status changed Successfully'
      })
    );
  };

  const handlePaymentDelete = async (payment) => {
    try {
      const queryPayment = await firestore()
        .collection('insurancePayments')
        .where('insurancePaymentId', '==', Number(payment?.insurancePaymentId))
        .limit(1)
        .get();

      let result = queryPayment.docs[0].data();
      result.id = queryPayment.docs[0].id;
      await firestore().collection('insurancePayments').doc(result.id).delete();
      const queryPayments = await firestore()
        .collection('insurancePayments')
        .where('insuranceClaimId', '==', Number(routeParams.insuranceClaimId))
        .get();
      let resultPayments = [];
      queryPayments.forEach((doc) => {
        resultPayments.push(doc.data());
      });
      setPayments(resultPayments);
      dispatch(
        MessageActions.showMessage({
          message: 'Payment deleted successfully'
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setisLoading(true);
    const id = routeParams.insuranceClaimId;
    const fetchData = async () => {
      const queryClaim = await firestore()
        .collection('insuranceClaims')
        .where('insuranceClaimId', '==', Number(id))
        .limit(1)
        .get();
      let resultClaim = queryClaim.docs[0].data();
      resultClaim.orderDate =
        resultClaim?.orderDate && resultClaim.orderDate.toDate();
      resultClaim.id = queryClaim.docs[0].id;
      setForm(resultClaim);

      const queryPayments = await firestore()
        .collection('insurancePayments')
        .where('insuranceClaimId', '==', Number(id))
        .get();
      let resultPayments = [];
      queryPayments.forEach((doc) => {
        resultPayments.push(doc.data());
      });
      setPayments(resultPayments);

      if (resultClaim?.insuranceId) {
        const queryInsuranceCompany = await firestore()
          .collection('insurances')
          .where('insuranceId', '==', Number(resultClaim?.insuranceId))
          .limit(1)
          .get();
        let resultInsuranceCompany = queryInsuranceCompany.docs[0].data();
        resultInsuranceCompany.id = queryInsuranceCompany.docs[0].id;
        setInsuranceCompany(resultInsuranceCompany);
        setImages(resultInsuranceCompany.images.urls);
      }
      setisLoading(false);
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) return <FuseLoading />;
  return !form || !payments ? (
    <></>
  ) : (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className='flex flex-row justify-center w-full'>
          <div className='flex flex-row justify-start w-1/5'>
            <Typography
              className="normal-case flex sm:mb-12"
              component={Link}
              role="button"
              to="/apps/e-commerce/insurance"
              color="inherit">
              <Icon className="text-20">
                arrow_back
              </Icon>
              <span className="mx-4">Insurances</span>
            </Typography>
          </div>
          <div className='flex flex-row justify-center w-3/5'>
            <Typography
              className="flex mx-0 sm:mx-12 uppercase"
              style={{ fontSize: '3rem', fontWeight: 600 }}
              variant="h6">
              {`Insurance: ${insuranceCompany?.primaryHolder}`}
            </Typography>
          </div>
          <div className='flex flex-row justify-start w-1/5'></div>
        </div>
      }
      content={
        <div className="flex flex-col w-full p-16">
          <div className="py-4 border-1 border-black border-solid rounded-6 w-full">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CLAIM STATUS
              </h1>
              <CustomAlert
                open={openStatusChangeAlert}
                setOpen={setOpenStatusChangeAlert}
                text1="Change Claim Status?"
                text2={`The status will be changed to ${beingChangedStatus}`}
                customFunction={() => {
                  handleStatusChange(beingChangedStatus);
                  setForm({ ...form, claimStatus: beingChangedStatus });
                }}
              />
            </div>
            <div className="flex flex-row p-12 justify-around w-full">
              <Button
                className={classes.statusButton}
                color={
                  form?.claimStatus === 'Unclaimed' ? 'secondary' : 'custom'
                }
                variant="contained"
                onClick={() => {
                  if (form?.claimStatus !== 'Unclaimed') {
                    setBeingChangedStatus('Unclaimed');
                    setOpenStatusChangeAlert(true);
                  }
                }}
                style={{
                  maxHeight: '75px',
                  minHeight: '75px',
                  minWidth: '125px',
                  maxWidth: '125px'
                }}>
                UNCLAIMED
              </Button>
              <Button
                className={classes.statusButton}
                color={form?.claimStatus === 'Claimed' ? 'secondary' : 'custom'}
                variant="contained"
                onClick={() => {
                  if (form?.claimStatus !== 'Claimed') {
                    setBeingChangedStatus('Claimed');
                    setOpenStatusChangeAlert(true);
                  }
                }}
                style={{
                  maxHeight: '75px',
                  minHeight: '75px',
                  minWidth: '125px',
                  maxWidth: '125px'
                }}>
                CLAIMED
              </Button>
              <Button
                className={classes.statusButton}
                color={
                  form?.claimStatus === 'Received Partial'
                    ? 'secondary'
                    : 'custom'
                }
                variant="contained"
                onClick={() => {
                  if (form?.claimStatus !== 'Received Partial') {
                    setBeingChangedStatus('Received Partial');
                    setOpenStatusChangeAlert(true);
                  }
                }}
                style={{
                  maxHeight: '75px',
                  minHeight: '75px',
                  minWidth: '125px',
                  maxWidth: '125px'
                }}>
                RECEIVED PARTIAL
              </Button>
              <Button
                className={classes.statusButton}
                color={
                  form?.claimStatus === 'Received Full' ? 'secondary' : 'custom'
                }
                variant="contained"
                onClick={() => {
                  if (form?.claimStatus !== 'Received Full') {
                    setBeingChangedStatus('Received Full');
                    setOpenStatusChangeAlert(true);
                  }
                }}
                style={{
                  maxHeight: '75px',
                  minHeight: '75px',
                  minWidth: '125px',
                  maxWidth: '125px'
                }}>
                RECEIVED FULL
              </Button>
              <Button
                className={classes.statusButton}
                color={
                  form?.claimStatus === 'Disputed' ? 'secondary' : 'custom'
                }
                variant="contained"
                onClick={() => {
                  if (form?.claimStatus !== 'Disputed') {
                    setBeingChangedStatus('Disputed');
                    setOpenStatusChangeAlert(true);
                  }
                }}
                style={{
                  maxHeight: '75px',
                  minHeight: '75px',
                  minWidth: '125px',
                  maxWidth: '125px'
                }}>
                DISPUTED
              </Button>
            </div>
          </div>
          <div className="my-6 border-1 border-black border-solid rounded-6 w-full">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                PAYMENT HISTORY
              </h1>
            </div>
            <div className="flex flex-row p-12 justify-end">
              <Button
                className={classes.orangeButton}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpen(true);
                }}>
                ADD NEW
              </Button>
              <ReceiveInsurancePayment
                handleClose={handleClose}
                open={open}
                claim={form}
                payments={payments}
                setPayments={setPayments}
                editablePayment={editablePayment}
                setEditablePayment={setEditablePayment}
              />
            </div>
            <div className="flex flex-col w-full h-320 overflow-scroll">
              <TableContainer
                component={Paper}
                className="flex flex-col w-full">
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell className='w-96 lg:w-192 '>PAYMENT DATE</StyledTableCell>
                      <StyledTableCell className='w-96 lg:w-192 '>PAYMENT METHOD</StyledTableCell>
                      <StyledTableCell className='w-96 lg:w-192 '>AMOUNT</StyledTableCell>
                      <StyledTableCell>MEMO</StyledTableCell>
                      <StyledTableCell className='w-96 lg:w-192 '>OPTIONS</StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {payments
                      .sort((a, b) =>
                        a.insurancePaymentId > b.insurancePaymentId ? -1 : 1
                      )
                      .map((hit, index) => (
                        <StyledTableRow key={hit.insurancePaymentId}>
                          <StyledTableCell>
                            {moment(hit?.paymentDate.toDate()).format(
                              'MM/DD/YYYY'
                            )}
                          </StyledTableCell>
                          <StyledTableCell>{hit?.paymentMode}</StyledTableCell>
                          <StyledTableCell>{`$ ${Number(
                            hit?.amount
                          ).toLocaleString()}`}</StyledTableCell>
                          <StyledTableCell>{hit?.extraNotes}</StyledTableCell>
                          <StyledTableCell>
                            <IconButton
                              onClick={() => {
                                setEditablePayment({ ...hit, index });
                                setOpen(true);
                              }}
                              aria-label="edit">
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setBeingDeletedPayment(hit);
                                setOpenPaymentDeleteAlert(true);
                              }}
                              aria-label="delete">
                              <Icon>delete</Icon>
                            </IconButton>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <CustomAlert
                open={openPaymentDeleteAlert}
                setOpen={setOpenPaymentDeleteAlert}
                text1="Are you sure?"
                text2="The selected payment will be deleted!"
                customFunction={() => {
                  handlePaymentDelete(beingDeletedPayment);
                }}
              />
            </div>
          </div>
          <div className="my-6 border-1 border-black border-solid rounded-6 w-full">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }} onClick={() => props.history.push(`/apps/e-commerce/orders/vieworder/${form?.orderId}`)}>
                ORDER INFO
              </h1>
            </div>
            <div className="flex flex-col w-1/2 md:w-1/3 p-6">
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Order Date"
                value={moment(form?.orderDate).format('MM/DD/YYYY')}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Order Location"
                value={form?.locationName}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="ID"
                value={form?.customerId}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Order No"
                value={form?.orderId}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Claim Amount"
                value={form?.insuranceCost}
                variant="outlined"
              />
            </div>
          </div>
          <div className="my-6 border-1 border-black border-solid rounded-6 w-full">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                {`INSURANCE (${form?.firstName} ${form?.lastName})`}
              </h1>
            </div>
            <div className="flex flex-col w-1/2 md:w-1/3 p-6">
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Company"
                value={insuranceCompany?.insuranceCompany ?? ''}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Primary Holder"
                value={insuranceCompany?.primaryHolder ?? ''}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Policy No"
                value={insuranceCompany?.policyNo ?? ''}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="SSN"
                value={insuranceCompany?.ssn ?? ''}
                variant="outlined"
              />
              <TextField
                size="small"
                className="my-6 "
                fullWidth
                id="outlined-multiline-static"
                label="Other"
                value={insuranceCompany?.other ?? ''}
                variant="outlined"
              />
            </div>
            <div className="flex flex-row w-full overflow-scroll flex-wrap mt-10 px-6">
              {images.map((img, index) => (
                <div className="mb-8 w-224 mr-6 object-contain">
                  <img
                    className="w-224 h-128 shadow-1 rounded-4"
                    src={img.url}
                    key={img.name}
                    alt={''}
                  />
                  <div className="flex flex-row justify-center w-full">
                    <div className="truncate">
                      {images[index].name.split('.', 1)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
      innerScroll
    />
  );
};

export default withRouter(InsuranceClaim);
