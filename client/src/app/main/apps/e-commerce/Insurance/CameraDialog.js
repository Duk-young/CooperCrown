import { Paper } from '@material-ui/core';
import { v4 as uuidv4 } from 'uuid';
import AppBar from '@material-ui/core/AppBar';
import CapturePhotos from '../ReusableComponents/CapturePhotos';
import Dialog from '@material-ui/core/Dialog';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export default function CameraDialog(props) {
  const { open, handleClose, setImages, images } = props;
  const [showImgCapture, setShowImgCapture] = useState(true);

  const onCapture = (imageData) => {
    setImages([
      ...images,
      {
        name: imageData.file?.name,
        id: uuidv4(),
        url: URL.createObjectURL(imageData?.blob),
        file: imageData?.blob
      }
    ]);
    if (showImgCapture) {
      setShowImgCapture(false);
    }
    handleClose();
  };

  return (
    <Dialog
      maxWidth="sm"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <AppBar position="static">
        <Toolbar className="flex w-full">
          <Typography variant="subtitle1" color="inherit">
            Capture Photo...
          </Typography>
        </Toolbar>
      </AppBar>
      <Paper variant="outlined">
        <CapturePhotos onCapture={onCapture} showImgCapture={open} />
      </Paper>
    </Dialog>
  );
}

CameraDialog.propTypes = {
  open: PropTypes.bool.isRequired
};
