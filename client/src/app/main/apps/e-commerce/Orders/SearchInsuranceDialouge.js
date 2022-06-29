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
import Fab from '@material-ui/core/Fab';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  const { form, open, handleClose, customer, onSubmit } = props;
  const dispatch = useDispatch();
  const [hits, setHits] = useState([]);
  const [selectedInsurances, setSelectedInsurances] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);

  const onSubmitInsurance = async () => {
    try {
      if (form?.orderId) {
        setDisabledState(true);
        const queryExisting = await firestore()
          .collection('insuranceClaims')
          .where('orderId', '==', Number(form?.orderId))
          .get();
        queryExisting.forEach((doc) => {
          doc.ref.delete();
        });

        for (let i = 0; i < selectedInsurances?.length; i++) {
          const dbConfigLoop = (
            await firestore().collection('dbConfig').doc('dbConfig').get()
          ).data();

          await firestore()
            .collection('insuranceClaims')
            .add({
              orderDate: form?.orderDate,
              locationName: form?.locationName,
              insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1,
              orderId: form?.orderId,
              customerId: customer?.customerId,
              firstName: customer?.firstName,
              lastName: customer?.lastName,
              insuranceId: selectedInsurances[i]?.insuranceId,
              insuranceCompany: selectedInsurances[i]?.insuranceCompany,
              policyNo: selectedInsurances[i]?.policyNo,
              insuranceCost: Number(form?.insuranceCost),
              claimStatus: 'Unclaimed'
            });

          await firestore()
            .collection('dbConfig')
            .doc('dbConfig')
            .update({ insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1 });
        }
        dispatch(
          MessageActions.showMessage({
            message: 'Insurance Claim Saved Successfully...'
          })
        );
      } else {
        setDisabledState(true);
        const dbConfig = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();
        let newOrderId = dbConfig?.orderId + 1;

        const queryExisting = await firestore()
          .collection('insuranceClaims')
          .where('orderId', '==', Number(newOrderId))
          .get();
        queryExisting.forEach((doc) => {
          doc.ref.delete();
        });

        for (let i = 0; i < selectedInsurances?.length; i++) {
          const dbConfigLoop = (
            await firestore().collection('dbConfig').doc('dbConfig').get()
          ).data();

          await firestore()
            .collection('insuranceClaims')
            .add({
              orderDate: firestore.Timestamp.fromDate(new Date()),
              locationName: form?.locationName,
              insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1,
              orderId: newOrderId,
              customerId: customer?.customerId,
              firstName: customer?.firstName,
              lastName: customer?.lastName,
              insuranceCompany: selectedInsurances[i]?.insuranceCompany,
              policyNo: selectedInsurances[i]?.policyNo,
              insuranceCost: Number(form?.insuranceCost),
              claimStatus: 'Unclaimed'
            });

          await firestore()
            .collection('dbConfig')
            .doc('dbConfig')
            .update({ insuranceClaimId: dbConfigLoop?.insuranceClaimId + 1 });
        }
        dispatch(
          MessageActions.showMessage({
            message: 'Insurance Claim Saved Successfully...'
          })
        );
      }
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
  }, []);

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
        Select Insurance
      </DialogTitle>
      <div className="flex flex-col w-full ">
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
              {hits.map((hit, index) => (
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
                        let newHits = hits;
                        newHits.splice(index, 1);
                        setHits([...newHits]);
                        selectedInsurances.push(hit);
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
        <div className="my-10 flex flex-row justify-around">
          <Fab
            onClick={() => {
              if (selectedInsurances?.length) {
                onSubmitInsurance();
              } else {
                setInsuranceError(
                  'Please select atleast one Insurance Company!'
                );
              }
            }}
            variant="extended"
            disabled={disabledState}
            color="primary"
            aria-label="add">
            <AddIcon />
            Save Insurance Claims!
          </Fab>
          <Fab
            onClick={() => {
              onSubmit();
              handleClose();
            }}
            variant="extended"
            disabled={!disabledState}
            color="primary"
            aria-label="add">
            <AddIcon />
            Place Order
          </Fab>
        </div>
        {insuranceError && <h3 className="p-6 bg-red-100">{insuranceError}</h3>}
      </div>
    </Dialog>
  );
}

SearchInsuranceDialouge.propTypes = {
  open: PropTypes.bool.isRequired
};
