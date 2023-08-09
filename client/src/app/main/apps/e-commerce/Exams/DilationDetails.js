import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const DilationDetails = (props) => {
  const { form, handleChange, disabledState } = props;

  return (
    <div className="flex flex-col h-260 px-16 py-6">
      <div className="flex flex-col h-260 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              DILATION
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-start gap-10">
            <h3>@</h3>
            <TextField
              size="small"
              id="outlined-multiline-static"
              disabled={disabledState}
              value={form?.dilation}
              onChange={handleChange}
              name={'dilation'}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.patientRefusedDilation}
                  disabled={disabledState}
                  onChange={handleChange}
                  name="patientRefusedDilation"
                />
              }
              label="Patient Refused"
            />
          </div>

          <div className="flex flex-row w-full px-10">
            <div className='flex flex-row w-1/3 justify-start'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.proparacaine}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="proparacaine"
                  />
                }
                label=".5% Proparacaine"
              />
            </div>
            <div className='flex flex-row w-1/3 justify-start'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.tropicamide}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="tropicamide"
                  />
                }
                label="1% Tropicamide"
              />
            </div>
            <div className='flex flex-row w-1/3 justify-start'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.paramyd}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="paramyd"
                  />
                }
                label="Paramyd"
              />
            </div>
          </div>

          <div className="flex flex-row w-full px-10">
            <div className='flex flex-row w-1/3 justify-start'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.phenylephrine}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="phenylephrine"
                  />
                }
                label="2.5% Phenylephrine"
              />
            </div>
            <div className='flex flex-row w-1/3 justify-start'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.cyclopentolate}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="cyclopentolate"
                  />
                }
                label="1% Cyclopentolate"
              />
            </div>
            <div className='flex flex-row w-1/3 justify-start'></div>
          </div>

          <div className="flex flex-row w-full p-10">
            <TextField
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              id="outlined-multiline-static"
              disabled={disabledState}
              multiline
              fullWidth
              label="Other"
              minRows={1}
              value={form?.otherDilation}
              onChange={handleChange}
              name={'otherDilation'}
              variant="outlined"
            />
          </div>

          <div className="flex flex-row w-full p-10">
            <TextField
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              id="outlined-multiline-static"
              disabled={disabledState}
              multiline
              fullWidth
              label="Patient R / S"
              minRows={1}
              value={form?.patientRS}
              onChange={handleChange}
              name={'patientRS'}
              variant="outlined"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(DilationDetails);
