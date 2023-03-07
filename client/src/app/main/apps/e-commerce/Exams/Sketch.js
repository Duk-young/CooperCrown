import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import CanvasDraw from 'react-canvas-draw';
import Capture from './Capture.png';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';


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
      {form?.examId && (
        <CanvasDraw
          ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
          imgSrc={Capture}
          disabled
          saveData={form?.sketch}
          lazyRadius="1"
        />
      )}
      {!form?.examId && (
        <div className="relative">
          <div className="flex flex-row justify-around">
            <div className="flex-1 flex flex-row ">
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
                <FormHelperText>Color</FormHelperText>
              </FormControl>
            </div>
            <div className="flex-1 flex flex-row ">
              <TextField
                className="ml-4"
                size="small"
                id="outlined-multiline-static"
                label="Brush Radius"
                value={form?.brushRadius}
                onChange={(e) => {
                  setForm({ ...form, brushRadius: e.target.value });
                }}
                name={'brushRadius'}
                variant="outlined"
                type="number"
              />
            </div>
          </div>
          <CanvasDraw
            ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
            imgSrc={Capture}
            brushRadius={form?.brushRadius ? form?.brushRadius : 1}
            brushColor={selectedColour}
            onChange={() => {
              setForm({ ...form, sketch: saveableCanvas.getSaveData() });
            }}
            lazyRadius="0"
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
