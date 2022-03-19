import React, { useEffect, useState } from 'react';
import { firestore } from 'firebase';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';

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

export default function SearchInsuranceDialouge(props) {
  const classes = useStyles();
  const { form, open, handleClose, customer } = props;

  const [hits, setHits] = useState([]);

  const onSubmit = async (hit) => {
    try {
      const dbConfig = (
        await firestore().collection('dbConfig').doc('dbConfig').get()
      ).data();

      await firestore()
        .collection('insuranceClaims')
        .add({
          orderDate: firestore.Timestamp.fromDate(new Date()),
          insuranceClaimId: dbConfig?.insuranceClaimId + 1,
          orderId: dbConfig?.orderId + 1,
          customerId: customer?.customerId,
          firstName: customer?.firstName,
          lastName: customer?.lastName,
          insuranceCompany: hit?.insuranceCompany,
          policyNo: hit?.policyNo,
          claimStatus: 'Unclaimed'
        });

      await firestore()
        .collection('dbConfig')
        .doc('dbConfig')
        .update({ insuranceClaimId: dbConfig?.insuranceClaimId + 1 });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      let test = [];
      let queryInsurance = await firestore()
        .collection('insurances')
        .where('customerId', '==', Number(customer?.customerId))
        .get();
      queryInsurance.forEach((doc) => {
        test.push(doc.data());
      });

      setHits(test);
    };
    fetchData();
  }, [hits]);

  return !hits ? (
    <></>
  ) : (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Select Frame
      </DialogTitle>
      <div className="flex w-full ">
        <TableContainer
          component={Paper}
          className="flex flex-col w-full p-20 rounded-32 shadow-20">
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Primary Holder</StyledTableCell>
                <StyledTableCell>Insurance Company</StyledTableCell>
                <StyledTableCell>Policy No.</StyledTableCell>
                <StyledTableCell>SSN</StyledTableCell>
                <StyledTableCell>Options</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hits.map((hit) => (
                <StyledTableRow key={hit.insuranceId}>
                  <StyledTableCell>{hit?.primaryHolder}</StyledTableCell>
                  <StyledTableCell>{hit?.insuranceCompany}</StyledTableCell>
                  <StyledTableCell>{hit?.policyNo}</StyledTableCell>
                  <StyledTableCell>{hit?.ssn}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      className="whitespace-no-wrap normal-case ml-24"
                      variant="contained"
                      color="secondary"
                      size="large"
                      onClick={() => {
                        onSubmit(hit);
                        handleClose();
                      }}
                      startIcon={<AddToQueueIcon />}>
                      Select
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </Dialog>
  );
}

SearchInsuranceDialouge.propTypes = {
  open: PropTypes.bool.isRequired
};
