import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import CanvasDraw from 'react-canvas-draw';
import DocSig from './DocSig.PNG';
import Fab from '@material-ui/core/Fab';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  }
}));

const DoctorSignature = (props) => {
  const { form, setForm } = props;
  const [saveableCanvas, setSaveableCanvas] = useState();
  const [selectedColour, setSelectedColour] = useState('#000000');
  const classes = useStyles();

  return (
    <div>
      {form?.examId && (
        <CanvasDraw
          ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
          imgSrc={DocSig}
          disabled
          saveData={form?.sketch}
          lazyRadius="1"
          style={{
            boxShadow:
              '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)',
               
            }}
        />
      )}
      {!form?.examId && (
        <div className="relative">
          
          <CanvasDraw
            ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
            imgSrc={DocSig}
            brushRadius={form?.brushRadius ? form?.brushRadius : 1}
            brushColor={selectedColour}
            onChange={() => {
              setForm({ ...form, sketch: saveableCanvas.getSaveData() });
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
            className={classes.fab}>
            Reset
          </Fab>
        </div>
      )}
    </div>
  );
};

export default withRouter(DoctorSignature);
