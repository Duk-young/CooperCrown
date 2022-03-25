import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function ReceiveInsurancePayment(props) {
  const { claim, open, handleClose, payments } = props;
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
          insurancePaymentId: dbConfig?.insurancePaymentId + 1,
          insuranceClaimId: claim?.insuranceClaimId
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
      maxWidth="xs"
      fullWidth
      onClose={(e) => {
        setError(null);
        setForm(null);
        handleClose();
      }}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Fill Payment Details!
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="flex flex-col p-10 w-full ">
        <FormControl className="mt-6" fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-amount">
            Payment Amount
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={form?.amount}
            error={error ? true : false}
            name={'amount'}
            onChange={handleChange}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            labelWidth={60}
            type="number"
          />
          <FormHelperText id="filled-weight-helper-text">
            {error}{' '}
          </FormHelperText>
        </FormControl>

        <TextField
          className="mt-8 mb-16"
          id="extraNotes"
          label="Extra Notes"
          type="text"
          name="extraNotes"
          value={form?.extraNotes}
          onChange={handleChange}
          multiline
          rows={5}
          variant="outlined"
          fullWidth
        />
        <Fab
          onClick={() => {
            if (form?.amount > 0) {
              let balance =
                +claim?.insuranceCost -
                payments.reduce((a, b) => +a + +b.amount, 0);
              if (balance >= form?.amount) {
                onSubmit();
              } else {
                setError('Balance amount is less than the receiving!');
              }
            } else {
              setError('Amount cannot be empty!');
            }
          }}
          variant="extended"
          color="primary"
          aria-label="add">
          <AddIcon />
          Save Details
        </Fab>
      </div>
    </Dialog>
  );
}

ReceiveInsurancePayment.propTypes = {
  open: PropTypes.bool.isRequired
};
