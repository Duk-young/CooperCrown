import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const GlassesDetails = (props) => {
  const { form, handleChange, disabledState } = props;

  return (
    <div>
      <div className="flex flex-col h-225 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              GLASSES CONDITION
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex flex-row ml-10 justify-around">
              <FormControlLabel
                control={
                  <Checkbox
                    classname="ml-20"
                    checked={form?.lost}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="lost"
                  />
                }
                label="Lost"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    classname="ml-20"
                    checked={form?.broken}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="broken"
                  />
                }
                label="Broken"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    classname="ml-20"
                    checked={form?.tooWeak}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="tooWeak"
                  />
                }
                label="Too Weak"

              />
              <FormControlLabel
                control={
                  <Checkbox
                    classname="ml-20"
                    checked={form?.tooStrong}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="tooStrong"
                  />
                }
                label="Too Strong"
              />
              <TextField
                className="ml-15"
                size="small"
                id="outlined-multiline-static"
                label="Other"
                disabled={disabledState}
                value={form?.otherCondition}
                onChange={handleChange}
                name={'otherCondition'}
                variant="outlined"
              />
            </div>
          </div>
          {/* <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.lost}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="lost"
                  />
                }
                label="Lost"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.broken}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="broken"
                  />
                }
                label="Broken"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.tooWeak}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="tooWeak"
                  />
                }
                label="Too Weak"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.tooStrong}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="tooStrong"
                  />
                }
                label="Too Strong"
              />

            </div>

            <div className="flex-1 flex flex-row justify-center ">
              <TextField
                className="ml-12"
                size="small"
                id="outlined-multiline-static"
                label="Other"
                disabled={disabledState}
                value={form?.otherCondition}
                onChange={handleChange}
                name={'otherCondition'}
                variant="outlined"
              />
              <br></br>

            </div>
            <br></br><br></br>
          </div> */}

        </div>
      </div>

      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              PURPOSE OF GLASSES
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row justify-center">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.distancePurpose}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="distancePurpose"
                  />
                }
                label="Distance (TV, Driving...etc)"
              />

            </div>
            <div className="flex-1 flex flex-row justify-center ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.closePurpose}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="closePurpose"
                  />
                }
                label="Reading / Close-work (Reading,Sewing...etc)"
              />
              <br></br>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default withRouter(GlassesDetails);
