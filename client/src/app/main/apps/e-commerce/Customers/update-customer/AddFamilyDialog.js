import '../App.mobile.css';
import '../Search.css';
import '../Themes.css';
import { connectHits } from 'react-instantsearch-dom';
import { firestore } from 'firebase';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { withStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import algoliasearch from 'algoliasearch/lite';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const CustomHits = connectHits(
  ({ hits, mainForm, open, handleClose, setMainForm, setFamilyMembers }) => {
    const handleFamilyChnage = async (hit) => {
      setMainForm({
        ...mainForm,
        family: hit?.family
      });
      const queryFamilyMembers = await firestore()
        .collection('customers')
        .where('family', '==', hit?.family)
        .get();
      let resultFamilyMembers = [];
      queryFamilyMembers.forEach((doc) => {
        resultFamilyMembers.push(doc.data());
      });
      setFamilyMembers(resultFamilyMembers);
      handleClose();
    };

    return (
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>D.O.B</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hits.map((hit) => (
            <StyledTableRow key={hit.objectID}>
              <StyledTableCell>{hit.firstName}</StyledTableCell>
              <StyledTableCell>{hit.lastName}</StyledTableCell>
              <StyledTableCell>
                {moment(hit.dob).format('MM-DD-YYYY')}
              </StyledTableCell>
              <StyledTableCell>{hit.gender}</StyledTableCell>
              <StyledTableCell>
                <Button
                  className="whitespace-no-wrap normal-case ml-24"
                  onClick={() => {
                    handleFamilyChnage(hit);
                  }}
                  variant="contained"
                  color="secondary"
                  size="large"
                  startIcon={<AddToQueueIcon />}>
                  Select
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

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

export default function AddFamilyDialog(props) {
  const {
    mainForm,
    open,
    handleClose,
    setMainForm,
    familyMembers,
    setFamilyMembers
  } = props;
  const { form, handleChange, setForm } = useForm(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const onSubmit = async () => {
    try {
      const dbConfig = (
        await firestore().collection('dbConfig').doc('dbConfig').get()
      ).data();

      await firestore()
        .collection('insurancePayments')
        .add({
          ...form,
          paymentDate: firestore.Timestamp.fromDate(new Date()),
          insurancePaymentId: dbConfig?.insurancePaymentId + 1
          //   insuranceClaimId: claim?.insuranceClaimId
        });

      await firestore()
        .collection('dbConfig')
        .doc('dbConfig')
        .update({ insurancePaymentId: dbConfig?.insurancePaymentId + 1 });

      handleClose();

      dispatch(
        MessageActions.showMessage({
          message: 'Payment Details Saved Successfully!'
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Select or Search User...
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="flex w-full ">
        <TableContainer
          component={Paper}
          className="flex flex-col w-full p-20 rounded-32 shadow-20">
          <InstantSearch searchClient={searchClient} indexName="customers">
            <div className="flex flex-row">
              <div className="flex flex-col flex-1 mb-10 shadow-10 rounded-12">
                <SearchBox
                  translations={{
                    placeholder: 'Searh for customers...'
                  }}
                  submit={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 18 18">
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.67"
                        transform="translate(1 1)">
                        <circle cx="7.11" cy="7.11" r="7.11" />
                        <path d="M16 16l-3.87-3.87" />
                      </g>
                    </svg>
                  }
                />
              </div>
            </div>
            <CustomHits
              mainForm={mainForm}
              open={open}
              handleClose={handleClose}
              setMainForm={setMainForm}
              familyMembers={familyMembers}
              setFamilyMembers={setFamilyMembers}
            />
          </InstantSearch>
        </TableContainer>
      </div>
    </Dialog>
  );
}

AddFamilyDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
