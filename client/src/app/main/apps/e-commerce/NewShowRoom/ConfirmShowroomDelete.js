import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import React from 'react';

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
export default function ConfirmShowroomDelete(props) {
  const { open, handleClose, form, propssent } = props;
  const classes = useStyles();
  // const { form, handleChange } = useForm(null);
  const dispatch = useDispatch();
  const handleDelete = async () => {
    try {

      const queryshowRoom = await firestore()
        .collection('showRooms')
        .where('showRoomId', '==', Number(form.showRoomId))
        .limit(1)
        .get();

      let result = queryshowRoom.docs[0].data();
      result.id = queryshowRoom.docs[0].id;
      await firestore().collection('showRooms').doc(result.id).delete();
      handleClose();
      dispatch(
        MessageActions.showMessage({
          message: 'showRoom deleted successfully'

        })

      );
      propssent.history.push(
        propssent.history.push(`/apps/e-commerce/showRooms`)
      );
    } catch (error) {
      console.log(error);
    }
  };

  //   const onSubmit = async () => {
  //     try {
  //       await firestore()
  //         .collection('lensPrice')
  //         .doc('lensPrice')
  //         .update({ [form?.lensType]: newTable });

  //       handleClose();

  //       dispatch(
  //         MessageActions.showMessage({
  //           message: 'New Lens Type Saved Successfully!'
  //         })
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>


      <div className="flex flex-col p-20 w-full item-center">
        <IconButton aria-label="close" onClick={handleClose} style={{ alignSelf: 'end', padding: 0 }}>
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
          onClick={handleDelete}
        >
          Confirm
        </Button>
      </div>
    </Dialog>
  );
}

ConfirmShowroomDelete.propTypes = {
  open: PropTypes.bool.isRequired
};