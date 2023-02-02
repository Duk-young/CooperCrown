import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    alignSelf: 'center',
    marginBottom: '1rem',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});
export default function ConfirmDelete(props) {
  const { open, handleClose, form, propssent } = props;
  const classes = useStyles();
  // const { form, handleChange } = useForm(null);
  const dispatch = useDispatch();

  const handleDelete = async () => {
    try {
      const queryOrder = await firestore()
        .collection('orders')
        .where('orderId', '==', form?.orderId)
        .limit(1)
        .get();

      let result = queryOrder.docs[0].data();
      result.id = queryOrder.docs[0].id;
      await firestore().collection('orders').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'Order deleted successfully'
        })
      );
      propssent.history.push(propssent.history.push(`/apps/e-commerce/orders`));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <div className="flex flex-col p-20 w-full item-center">
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{ alignSelf: 'end', padding: 0 }}>
          <CloseIcon />
        </IconButton>
        <div className="flex flex-col h-full py-4 mb-20">
          <div className="flex flex-row justify-center">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              Are you sure you want to delete?
            </h1>
          </div>
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          onClick={handleDelete}>
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}

ConfirmDelete.propTypes = {
  open: PropTypes.bool.isRequired
};
