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
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function ReceiveOrderPayment(props) {
  const {
    mainForm,
    openOrderPayment,
    handleOrderPaymentClose,
    eyeglasses,
    payments,
    editablePayment,
    setEditablePayment,
    setPayments
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
      if (form?.orderPaymentId) {
        const queryEditPayment = await firestore()
          .collection('orderPayments')
          .where('orderPaymentId', '==', Number(form?.orderPaymentId))
          .limit(1)
          .get();
        let resultEditPayment = queryEditPayment.docs[0].data();
        resultEditPayment.id = queryEditPayment.docs[0].id;

        const ref = await firestore()
          .collection('orderPayments')
          .doc(resultEditPayment.id);
        await ref.set(form);

        handleOrderPaymentClose();

        dispatch(
          MessageActions.showMessage({
            message: 'Payment Details Saved Successfully!'
          })
        );
      } else {
        const dbConfig = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        await firestore()
          .collection('orderPayments')
          .add({
            ...form,
            paymentDate: firestore.Timestamp.fromDate(new Date()),
            orderPaymentId: dbConfig?.orderPaymentId + 1,
            orderId: mainForm?.orderId
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ orderPaymentId: dbConfig?.orderPaymentId + 1 });

        handleOrderPaymentClose();

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
        setEditablePayment(null);
        setDisabledState(false);
        handleOrderPaymentClose();
      }}
      aria-labelledby="simple-dialog-title"
      open={openOrderPayment}>
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
              if (mainForm?.prescriptionType === 'eyeglassesRx') {
                let balance =
                  eyeglasses.reduce((a, b) => +a + +b?.frameRate, 0) +
                  eyeglasses.reduce((a, b) => +a + +b?.lensRate, 0) -
                  (mainForm?.insuranceCost ? +mainForm?.insuranceCost : 0) +
                  (mainForm?.additionalCost ? +mainForm?.additionalCost : 0) -
                  (mainForm?.discount ? +mainForm?.discount : 0) -
                  payments.reduce((a, b) => +a + +b.amount, 0);
                if (balance >= form?.amount) {
                  onSubmit();
                } else {
                  setError(
                    'Balance amount is less than the receiving or Invalid Value!'
                  );
                }
              } else if (mainForm?.prescriptionType === 'contactLensRx') {
                let balance =
                  eyeglasses.reduce((a, b) => +a + +b?.contactLensRate, 0) -
                  (mainForm?.insuranceCost ? +mainForm?.insuranceCost : 0) +
                  (mainForm?.additionalCost ? +mainForm?.additionalCost : 0) -
                  (mainForm?.discount ? +mainForm?.discount : 0) -
                  payments.reduce((a, b) => +a + +b.amount, 0);
                if (balance >= form?.amount) {
                  onSubmit();
                } else {
                  setError(
                    'Balance amount is less than the receiving or Invalid Value!'
                  );
                }
              } else {
                let balance =
                  eyeglasses.reduce((a, b) => +a + +b?.price, 0) -
                  (mainForm?.insuranceCost ? +mainForm?.insuranceCost : 0) +
                  (mainForm?.additionalCost ? +mainForm?.additionalCost : 0) -
                  (mainForm?.discount ? +mainForm?.discount : 0) -
                  payments.reduce((a, b) => +a + +b.amount, 0);
                if (balance >= form?.amount) {
                  setDisabledState(true);
                  onSubmit();
                } else {
                  setError(
                    'Balance amount is less than the receiving or Invalid Value!'
                  );
                }
              }
            } else {
              setError('Amount cannot be empty!');
            }
          }}
          variant="extended"
          color="primary"
          disabled={disabledState}
          aria-label="add">
          <AddIcon />
          Save Details
        </Fab>
      </div>
    </Dialog>
  );
}

ReceiveOrderPayment.propTypes = {
  openOrderPayment: PropTypes.bool.isRequired
};
