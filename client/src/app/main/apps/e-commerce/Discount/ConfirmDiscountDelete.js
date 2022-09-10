import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { format } from 'joi-browser';
const useStyles = makeStyles({
    table: {
        minWidth: 450
    },
    button: {
        backgroundColor: '#f15a25',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#f47b51',
            color: '#fff'
        }
    }
});
export default function ConfirmDiscountDelete(props) {
    const { open, handleClose, form, propssent } = props;
    const classes = useStyles();
    // const { form, handleChange } = useForm(null);
    const dispatch = useDispatch();
    const handleDelete = async () => {
        try {
          const queryDiscount = await firestore()
            .collection('discounts')
            .where('discountId', '==', form.discountId)
            .get();
          let result = queryDiscount.docs[0].data();
          result.id = queryDiscount.docs[0].id;
          await firestore().collection('discounts').doc(result.id).delete();
          dispatch(
            MessageActions.showMessage({
              message: 'Discount deleted successfully'
            })
          );
       
          propssent.history.push('/apps/e-commerce/discounts');
          
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


            <div className="flex flex-col p-10 w-full ">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                    <div className="flex flex-row justify-center border-b-1 border-black border-solid">
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

ConfirmDiscountDelete.propTypes = {
    open: PropTypes.bool.isRequired
};