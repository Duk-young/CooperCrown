import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import CanvasDraw from 'react-canvas-draw';
import Capture from './Capture.png';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useState, useEffect } from 'react';
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
  const { form, setForm, disabledState } = props;
  const [saveableCanvas, setSaveableCanvas] = useState();
  const [selectedColour, setSelectedColour] = useState('Black');
  const classes = useStyles();

  useEffect(() => {
    if (form?.sketch && saveableCanvas) saveableCanvas.loadSaveData(form?.sketch)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveableCanvas])

  return (
    <div>
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
                value={form?.brushRadius || 1}
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
            disabled={disabledState}
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

export default withRouter(Sketch);
