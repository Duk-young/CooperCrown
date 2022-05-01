import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import ReceiveInsurancePayment from './ReceiveInsurancePayment';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 12,
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
  table: {
    minWidth: 450
  }
});

const InsuranceClaim = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [open, setOpen] = useState(false);
  const { form, handleChange, setForm } = useForm({});
  const [editablePayment, setEditablePayment] = useState({});
  const routeParams = useParams();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleStatusChange = async (e) => {
    const ref = firestore().collection('insuranceClaims').doc(form?.id);
    let data = {
      ...form,
      claimStatus: e.target.value
    };

    await ref.set(data);
    dispatch(
      MessageActions.showMessage({
        message: 'Status changed Successfully'
      })
    );
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
      setisLoading(false);
    };

    fetchData();
  }, [routeParams.insuranceClaimId]);
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
        <div className="mt-24">
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/insurance"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Insurances</span>
          </Typography>
          <div className="flex flex-row">
            <Icon className="text-20 mt-4">people</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Insurance Claim Detail
            </Typography>
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="p-12 w-1/2 h-auto  rounded-20 shadow-lg ">
              <h1 className="underline font-700">Claim Info</h1>
              <h2>{`Order ID: ${form?.orderId}`}</h2>
              <h2>{`Name: ${form?.firstName} ${form.lastName}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Customer Id: ${form.customerId}`}</h2>
              <h2>{`Order Date: ${form?.orderDate.toDateString()}`}</h2>
              <h2>{`Insurance Company: ${form?.insuranceCompany}`}</h2>
              <h2>{`Policy No: ${form?.policyNo}`}</h2>
              <h2>{`Claim Amount : $ ${form?.insuranceCost}`}</h2>
              <h2>{`Total Payments : $ ${payments.reduce(
                (a, b) => +a + +b.amount,
                0
              )}`}</h2>
              <h2>{`Balance Due : $ ${
                +form?.insuranceCost -
                payments.reduce((a, b) => +a + +b.amount, 0)
              }`}</h2>
              <div className="flex flex-row justify-around mt-10">
                <Fab
                  onClick={() => {
                    setOpen(true);
                  }}
                  variant="extended"
                  color="primary"
                  aria-label="add">
                  <AddIcon />
                  Receive Payment
                </Fab>
                <div className="flex flex-row justify-center">
                  <Typography
                    className="username text-16 whitespace-no-wrap self-center font-700 underline"
                    color="inherit">
                    Claim Status
                  </Typography>
                  <FormControl className="ml-32 ">
                    <Select
                      labelId="demo-simple-select-autowidth-label"
                      id="ethnicityId"
                      defaultValue={form?.claimStatus}
                      value={form?.claimStatus}
                      name="claimStatus"
                      onChange={(e) => {
                        handleChange(e);
                        handleStatusChange(e);
                      }}
                      autoWidth>
                      <MenuItem value={'Unclaimed'}>Unclaimed</MenuItem>
                      <MenuItem value={'Claimed Pending Payment'}>
                        Claimed Pending Payment
                      </MenuItem>
                      <MenuItem value={'Received Partial'}>
                        Received Partial
                      </MenuItem>
                      <MenuItem value={'Received Full'}>Received Full</MenuItem>
                      <MenuItem value={'Disputed'}>Disputed</MenuItem>
                    </Select>
                    <FormHelperText>Select from the list</FormHelperText>
                  </FormControl>
                </div>
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
            </div>
          </div>
          <div className="flex flex-col w-full ">
            <h1 className="ml-10 font-700">Payment History</h1>
            <div className="flex flex-col h-320 overflow-scroll">
              <TableContainer
                component={Paper}
                className="flex flex-col w-full m-2 rounded-12 shadow-4 overflow-scroll">
                <Table stickyHeader aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Payment Date</StyledTableCell>
                      <StyledTableCell>Payment Method</StyledTableCell>
                      <StyledTableCell>Amount</StyledTableCell>
                      <StyledTableCell>Extra Notes</StyledTableCell>
                      <StyledTableCell>OPTIONS</StyledTableCell>
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
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      }
      innerScroll
    />
  );
};

export default withRouter(InsuranceClaim);
