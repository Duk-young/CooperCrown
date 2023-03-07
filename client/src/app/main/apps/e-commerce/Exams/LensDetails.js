import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const LensDetails = (props) => {
  const { form, handleChange, disabledState } = props;

  return (
    <div>
     <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              LENS TYPE
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row  justify-around">

            <div className="ml-24">
              <FormControl component="fieldset">
                <RadioGroup
                  className="ml-60"
                  row
                  aria-label="lensType"
                  name="lensType"
                  value={form?.lensType}
                  onChange={handleChange}>
                  <FormControlLabel
                    disabled={disabledState}
                    value="sv"
                    control={<Radio />}
                    label="SV"
                  />
                  <FormControlLabel
                    value="bifocal"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Bifocal"
                  />
                  <FormControlLabel
                    value="trifocal"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Trifocal"
                  />
                  <FormControlLabel
                    value="progressive"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Progressive"
                  />
                </RadioGroup>
              </FormControl>
              <br></br>
            </div>
          </div>

        </div>
      </div>

      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              CONTACT LENS
            </h1>
          </div>
          <br></br>

          <div className="flex flex-row  justify-around">

            <div className="ml-24">
              <FormControl component="fieldset">

                <RadioGroup
                  className="ml-28"
                  row
                  aria-label="contactLens"
                  name="contactLens"
                  value={form?.contactLens}
                  onChange={handleChange}>
                  <FormControlLabel
                    value="currentlyWearing"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Currently Wearing"
                  />
                  {form?.contactLens === 'currentlyWearing' && (
                    <TextField
                      className="ml-12 mr-10"
                      size="small"
                      disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Currently Wearing"
                      value={form?.currentlyWearingLens}
                      onChange={handleChange}
                      name={'currentlyWearingLens'}
                      variant="outlined"
                    />
                  )}
                  <FormControlLabel
                    value="usedToWear"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Used To Wear"
                  />
                  <FormControlLabel
                    value="neverTried"
                    disabled={disabledState}
                    control={<Radio />}
                    label="Never Tried"
                  />
                  <FormControlLabel
                    value="other"
                    control={<Radio />}
                    label="Other"
                    disabled={disabledState}
                  />
                </RadioGroup>
              </FormControl>
              {form?.contactLens === 'other' && (
                <TextField
                  className="ml-12"
                  size="small"
                  disabled={disabledState}
                  id="outlined-multiline-static"
                  label="Other"
                  value={form?.otherContactLens}
                  onChange={handleChange}
                  name={'otherContactLens'}
                  variant="outlined"
                />
              )}
              <br></br>
            </div>
          </div>

        </div>
      </div>


      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              VISUAL FIELD
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex-1 flex flex-row justify-center">
              <h3 className="font-700 text-center">Oculus </h3>
              <TextField

                size="small"
                id="outlined-multiline-static"

                disabled={disabledState}
                value={form?.oculus}
                onChange={handleChange}
                name={'oculus'}
              />

            </div>
            <div className="flex-1 flex flex-row justify-center">

              <h3 className="ml-35 px-15 font-700 text-center">Confrontation </h3>

              <TextField

                disabled={disabledState}
                size="small"
                id="outlined-multiline-static"

                value={form?.confrontation}
                onChange={handleChange}
                name={'confrontation'}

              />
            </div>
          </div>
          <br></br><br></br>
        </div>
      </div>
    </div>
  );
};

export default withRouter(LensDetails);
