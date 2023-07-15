import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Icon from '@material-ui/core/Icon';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  orangeButton: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});

export default function ReceiveOrderPayment(props) {
  const {
    calculateBalance,
    open,
    handleClose,
    payments,
    editablePayment,
    setPayments,
    setEditablePayment,
    orderId,
    customOrderId,
    firstName,
    lastName,
    locationName
  } = props;
  const classes = useStyles();
  const { form, handleChange, setForm } = useForm(null);
  const [error, setError] = useState(null);
  const [disabledState, setDisabledState] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setForm(editablePayment);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

        const ref = firestore()
          .collection('orderPayments')
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
          .collection('orderPayments')
          .add({
            ...form,
            paymentDate: firestore.Timestamp.fromDate(new Date()),
            orderPaymentId: dbConfig?.orderPaymentId + 1,
            orderId: Number(orderId),
            customOrderId,
            firstName,
            lastName,
            locationName
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ orderPaymentId: dbConfig?.orderPaymentId + 1 });

        const queryPayments = await firestore()
          .collection('orderPayments')
          .where('orderId', '==', Number(orderId))
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
      <div className="flex flex-col p-8">
        <div className="my-6 border-1 border-black border-solid rounded-6 w-full">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              {form?.orderPaymentId
                ? `EDIT PAYMENT `
                : `NEW PAYMENT `}
            </h1>
          </div>
          <div className="flex flex-col w-full p-6">
            <FormControl>
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
                <MenuItem value={'Check'}>Check</MenuItem>
                <MenuItem value={'Store Credit / Gift Card'}>
                  Store Credit / Gift Card
                </MenuItem>
              </Select>
            </FormControl>
            <FormControl className="mt-12" fullWidth variant="outlined">
              <InputLabel htmlFor="outlined-adornment-amount">
                Payment Amount
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-amount"
                value={form?.amount}
                error={error ? true : false}
                name={'amount'}
                onChange={handleChange}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                labelWidth={120}
                type="number"
              />
              <FormHelperText id="filled-weight-helper-text">
                {error}{' '}
              </FormHelperText>
            </FormControl>

            <TextField
              className="mt-8 mb-16"
              id="extraNotes"
              label="Memo"
              type="text"
              name="extraNotes"
              value={form?.extraNotes}
              onChange={handleChange}
              multiline
              rows={5}
              variant="outlined"
              fullWidth
            />
            <div className="flex flex-col p-6">
              <Button
                className={classes.orangeButton}
                disabled={disabledState}
                variant="contained"
                onClick={() => {
                  if (form?.amount > 0) {
                    let balance =
                      Number(calculateBalance()) +
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
                }}>
                <Icon>save</Icon>
                SAVE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

ReceiveOrderPayment.propTypes = {
  open: PropTypes.bool.isRequired
};
