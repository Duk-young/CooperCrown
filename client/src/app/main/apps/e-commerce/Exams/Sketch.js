import React, { useState } from 'react';
import { withRouter } from 'react-router';
import CanvasDraw from 'react-canvas-draw';
import Capture from './Capture.PNG';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: 'absolute',
    bottom: 0,
    right: 0
  }
}));

const Sketch = (props) => {
  const { form, setForm } = props;
  const [saveableCanvas, setSaveableCanvas] = useState();
  const classes = useStyles();

  return (
    <div>
      <p>
        <span role="img" aria-label="fingers pointing down">
          👇👇👇👇
        </span>{' '}
        Use your finder or mouse to draw{' '}
        <span role="img" aria-label="fingers pointing down">
          👇👇👇👇
        </span>
      </p>

      {form?.examId && (
        <CanvasDraw
          ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
          imgSrc={Capture}
          disabled
          brushRadius="3"
          brushColor="red"
          saveData={form?.sketch}
          lazyRadius="2"
          style={{
            boxShadow:
              '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)'
          }}
        />
      )}
      {!form?.examId && (
        <div className="relative">
          <CanvasDraw
            ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
            imgSrc={Capture}
            brushRadius="3"
            brushColor="red"
            onChange={() => {
              setForm({ ...form, sketch: saveableCanvas.getSaveData() });
            }}
            lazyRadius="2"
            style={{
              boxShadow:
                '0 13px 27px -5px rgba(50, 50, 93, 0.25),    0 8px 16px -8px rgba(0, 0, 0, 0.3)'
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

export default withRouter(Sketch);
