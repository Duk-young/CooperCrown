import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const PupilsDetails = (props) => {
  const { form, handleChange, disabledState } = props;

  return (
    <div className="flex flex-col h-260 px-16 py-6">
      <div className="flex flex-col h-260 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              PUPILS
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <h3 className="font-700">{`Dim \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
            <h3 className="font-700">{`Light \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`}</h3>
            <h3 className="font-700">{`Reaction`}</h3>

            <br></br>
          </div>
          <div className="flex flex-row justify-center">
            <h3 className="font-700">{`OD: \u00A0`}</h3>
            <TextField
              size="small"
              style={{ width: 80 }}
              id="standard-basic"
              disabled={disabledState}
              value={form?.oddim}
              onChange={handleChange}
              name={'oddim'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
              type="number"
            />
            <h3 className="font-700 pt-10">{`\u00A0-\u00A0`}</h3>
            <TextField
              size="small"
              style={{ width: 80 }}
              id="standard-basic"
              disabled={disabledState}
              value={form?.odlight}
              onChange={handleChange}
              name={'odlight'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
              type="number"
            />
            <h3 className="font-700 pt-10">{`\u00A0PERRLA\u00A0`}</h3>
            <TextField
              size="small"
              style={{ width: 80 }}
              id="standard-basic"
              disabled={disabledState}
              value={form?.odreaction}
              onChange={handleChange}
              name={'odreaction'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
              type="number"
            />

          </div>

          <div className="flex flex-row justify-center">
            <h3 className="font-700">{`OS: \u00A0`}</h3>
            <TextField
              size="small"
              style={{ width: 80 }}
              id="standard-basic"
              disabled={disabledState}
              value={form?.osdim}
              onChange={handleChange}
              name={'osdim'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
              type="number"
            />
            <h3 className="font-700 pt-10">{`\u00A0-\u00A0`}</h3>
            <TextField
              size="small"
              style={{ width: 80 }}
              id="standard-basic"
              disabled={disabledState}
              value={form?.oslight}
              onChange={handleChange}
              name={'oslight'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
              type="number"
            />
            <h3 className="font-700 pt-10">{`\u00A0PERRLA\u00A0`}</h3>
            <TextField
              size="small"
              style={{ width: 80 }}
              id="standard-basic"
              disabled={disabledState}
              value={form?.osreaction}
              onChange={handleChange}
              name={'osreaction'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
              type="number"
            />
            <br></br>
          </div>

          <div className='flex flex-row w-full'>
            <div className='flex flex-row w-1/2 justify-evenly items-center'>
              <h3 className="font-700 text-center">RAPD: </h3>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="RAPD"
                  name="RAPD"
                  value={form?.RAPD}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="POS"
                    control={<Radio />}
                    disabled={disabledState}
                    label="POS"
                  />
                  <FormControlLabel
                    value="NEG"
                    disabled={disabledState}
                    control={<Radio />}
                    label="NEG"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className='flex flex-row w-1/2 justify-evenly'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.pupilod}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="pupilod"
                  />
                }
                label="OD"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.pupiloos}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="pupilos"
                  />
                }
                label="OS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.pupilou}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="pupilou"
                  />
                }
                label="OU"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(PupilsDetails);
