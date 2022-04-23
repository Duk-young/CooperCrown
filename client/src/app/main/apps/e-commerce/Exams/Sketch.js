import React, { useState } from 'react';
import { withRouter } from 'react-router';
import CanvasDraw from 'react-canvas-draw';
import Capture from './Capture.PNG';
import Fab from '@material-ui/core/Fab';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

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
  const [selectedColour, setSelectedColour] = useState('#000000');
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
          <div className="flex">
            <Typography
              className="username text-16 whitespace-no-wrap self-center"
              color="inherit">
              Colour
            </Typography>
            <FormControl className="ml-32 ">
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="ethnicityId"
                defaultValue={selectedColour}
                value={selectedColour}
                onChange={(e) => {
                  setSelectedColour(e.target.value);
                }}
                autoWidth>
                <MenuItem value={'Black'}>Black</MenuItem>
                <MenuItem value={'Red'}>Red</MenuItem>
                <MenuItem value={'Green'}>Green</MenuItem>
                <MenuItem value={'Blue'}>Blue</MenuItem>
              </Select>
              <FormHelperText>Select from the list</FormHelperText>
            </FormControl>
          </div>
          <CanvasDraw
            ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
            imgSrc={Capture}
            brushRadius="3"
            brushColor={selectedColour}
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
