import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
export default function AddLensTypeDialog(props) {
  const { open, handleClose } = props;
  const classes = useStyles();
  const { form, handleChange } = useForm(null);
  const dispatch = useDispatch();

  const generateNewTableValues = () => {
    let newTable = [];

for (let i = -15; i <= 15; i += 0.25) {
  newTable.push({ id: i.toFixed(2) });
}

return newTable
  }
  const onSubmit = async () => {
    const sanitizedLensType = form?.lensType.replace('.', '-')
    try {
      await firestore()
        .collection('lensPrice')
        .doc('lensPrice')
        .update({ [sanitizedLensType]: {
          prismPrice: form?.prismPrice,
          outOfRangePrice: form?.outOfRangePrice,
          rows: generateNewTableValues()
        } });

      handleClose();

      dispatch(
        MessageActions.showMessage({
          message: 'New Lens Type Saved Successfully!'
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
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Fill Lens Type:
          </Typography>
        </Toolbar>
      </AppBar>

      <div className="flex flex-col p-10 w-full ">
        <TextField
          className="mt-8 mb-16"
          id="lensType"
          label="Lens Type"
          type="text"
          name="lensType"
          value={form?.lensType}
          onChange={(e) => handleChange({
            target: {
              name: 'lensType',
              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
            }
          })}
          variant="outlined"
          fullWidth
        />
        <TextField
          className="mt-8 mb-16"
          id="prismPrice"
          label="Prism Price"
          type="number"
          name="prismPrice"
          value={form?.prismPrice}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <TextField
          className="mt-8 mb-16"
          id="outOfRangePrice"
          label="Out Of Range Price"
          type="text"
          name="outOfRangePrice"
          value={form?.outOfRangePrice}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <Button
          onClick={onSubmit}
          className={classes.button}
          variant="extended"
          color="primary"
          aria-label="add">
          Save Details
        </Button>
      </div>
    </Dialog>
  );
}

AddLensTypeDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
