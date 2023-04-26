import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import CanvasDraw from 'react-canvas-draw';
import DocSig from './DocSig.PNG';
import Fab from '@material-ui/core/Fab';
import React, { useState, useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
}));

const DoctorSignature = (props) => {
  const { form, setForm, disabledState } = props;
  const [saveableCanvas, setSaveableCanvas] = useState();
  const [selectedColour] = useState('#000000');
  const classes = useStyles();

  useEffect(() => {
    if (form?.docSign && saveableCanvas) saveableCanvas.loadSaveData(form?.docSign)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveableCanvas])

  return (
    <div>
        <div className="relative">
          <CanvasDraw
            ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
            imgSrc={DocSig}
            brushRadius={1}
            disabled={disabledState}
            brushColor={selectedColour}
            onChange={() => {
              setForm({ ...form, docSign: saveableCanvas.getSaveData() });
            }}
            lazyRadius="0"
            style={{
              boxShadow:
                '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)',
           }}
          />
          <Fab
            onClick={() => {
              saveableCanvas.eraseAll();
            }}
            color="secondary"
            disabled={disabledState}
            className={classes.fab}>
            Reset
          </Fab>
        </div>
    </div>
  );
};

export default withRouter(DoctorSignature);
