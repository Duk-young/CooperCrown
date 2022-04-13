import { firestore } from 'firebase';
import AppBar from '@material-ui/core/AppBar';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Scanner from './Scanner';
import { Paper } from '@material-ui/core';

export default function BarcodeDialog(props) {
  const { open, handleClose, form, setForm, setImages, inventory } = props;

  const onDetected = async (result) => {
    const queryFrames = await firestore()
      .collection(inventory)
      .where('sku', '==', result.codeResult.code)
      .limit(1)
      .get();

    if (queryFrames?.docs.length) {
      let resultFrames = queryFrames.docs[0].data();
      resultFrames.date = resultFrames.date && resultFrames.date.toDate();
      resultFrames.id = queryFrames.docs[0].id;
      setForm(resultFrames);
      setImages(resultFrames?.images?.urls);
    } else {
      setForm({ ...form, sku: result.codeResult.code });
    }

    handleClose();
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
            Scan Barcode...
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper variant="outlined">
        <Scanner onDetected={onDetected} />
      </Paper>
    </Dialog>
  );
}

BarcodeDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
