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
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function ReceiveInsurancePayment(props) {
  const {
    claim,
    open,
    handleClose,
    payments,
    editablePayment,
    setPayments,
    setEditablePayment
  } = props;
  const { form, handleChange, setForm } = useForm(null);
  const [error, setError] = useState(null);
  const [disabledState, setDisabledState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(editablePayment);
  }, [editablePayment]);

  const onSubmit = async () => {
    try {
      if (form?.insurancePaymentId) {
        const queryEditPayment = await firestore()
          .collection('insurancePayments')
          .where('insurancePaymentId', '==', Number(form?.insurancePaymentId))
          .limit(1)
          .get();
        let resultEditPayment = queryEditPayment.docs[0].data();
        resultEditPayment.id = queryEditPayment.docs[0].id;

        const ref = await firestore()
          .collection('insurancePayments')
          .doc(resultEditPayment.id);
        await ref.set(form);

        let newPayments = payments;
        newPayments[form?.index] = form;

        setPayments(newPayments);

        handleClose();
        setDisabledState(false);
        setEditablePayment(null);

        dispatch(
          MessageActions.showMessage({
            message: 'Payment Details Updated Successfully!'
          })
        );
      } else {
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

        const queryPayments = await firestore()
          .collection('insurancePayments')
          .where('insuranceClaimId', '==', Number(claim?.insuranceClaimId))
          .get();
        let resultPayments = [];
        queryPayments.forEach((doc) => {
          resultPayments.push(doc.data());
        });
        setPayments(resultPayments);

        handleClose();
        setDisabledState(false);
        setForm(null);

        dispatch(
          MessageActions.showMessage({
            message: 'Payment Details Saved Successfully!'
          })
        );
      }
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
        setEditablePayment(null);
        setDisabledState(false);
      }}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            {form?.insurancePaymentId
              ? 'Edit Payment Details!'
              : 'Fill Payment Details!'}
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

        <FormControl variant="outlined">
          <FormHelperText>Select Payment Method...</FormHelperText>
          <Select
            labelId="demo-simple-select-autowidth-label"
            defaultValue={form?.paymentMode}
            value={form?.paymentMode}
            name="paymentMode"
            onChange={handleChange}
            autoWidth>
            <MenuItem value={'Cash'}>Cash</MenuItem>
            <MenuItem value={'Credit Card'}>Credit Card</MenuItem>
            <MenuItem value={'Cheque'}>Cheque</MenuItem>
            <MenuItem value={'Store Credit / Gift Card'}>
              Store Credit / Gift Card
            </MenuItem>
          </Select>
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
                payments.reduce((a, b) => +a + +b.amount, 0) +
                (form?.index >= 0 ? +payments[form?.index].amount : 0);

              if (balance >= form?.amount) {
                setDisabledState(true);
                onSubmit();
              } else {
                setError('Balance amount is less than the receiving!');
              }
            } else {
              setError('Amount cannot be empty!');
            }
          }}
          variant="extended"
          disabled={disabledState}
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
