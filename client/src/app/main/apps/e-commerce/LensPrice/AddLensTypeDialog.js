import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
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

  const newTable = [
    {
      id: 10
    },
    {
      id: 9.75
    },
    {
      id: 9.5
    },
    {
      id: 9.25
    },
    {
      id: 9
    },
    {
      id: 8.75
    },
    {
      id: 8.5
    },
    {
      id: 8.25
    },
    {
      id: 8
    },
    {
      id: 7.75
    },
    {
      id: 7.5
    },
    {
      id: 7.25
    },
    {
      id: 7
    },
    {
      id: 6.75
    },
    {
      id: 6.5
    },
    {
      id: 6.25
    },
    {
      id: 6
    },
    {
      id: 5.75
    },
    {
      id: 5.5
    },
    {
      id: 5.25
    },
    {
      id: 5
    },
    {
      id: 4.75
    },
    {
      id: 4.5
    },
    {
      id: 4.25
    },
    {
      id: 4
    },
    {
      id: 3.75
    },
    {
      id: 3.5
    },
    {
      id: 3.25
    },
    {
      id: 3
    },
    {
      id: 2.75
    },
    {
      id: 2.5
    },
    {
      id: 2.25
    },
    {
      id: 2
    },
    {
      id: 1.75
    },
    {
      id: 1.5
    },
    {
      id: 1.25
    },
    {
      id: 1
    },
    {
      id: 0.75
    },
    {
      id: 0.5
    },
    {
      id: 0.25
    },
    {
      id: 0
    }
  ];

  const onSubmit = async () => {
    try {
      await firestore()
        .collection('lensPrice')
        .doc('lensPrice')
        .update({ [form?.lensType]: {
          prismPrice: form?.prismPrice,
          outOfRangePrice: form?.outOfRangePrice,
          rows: newTable
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
          onChange={handleChange}
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
          <AddIcon />
          Save Details
        </Button>
      </div>
    </Dialog>
  );
}

AddLensTypeDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
