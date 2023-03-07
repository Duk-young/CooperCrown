import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const ChiefComplaints = (props) => {
  const { form, handleChange, disabledState } = props;

  return (
    <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              CHIEF COMPLAINTS
            </h1>
          </div>
          <br></br>



          <div className="flex flex-row  justify-evenly px-4">
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.headaches}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="headaches"
                  />
                }
                label="Headaches"
              />

            </div>
            <div className="flex-1 flex flex-row  ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.burn}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="burn"
                  />
                }
                label="Burn"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.tearWater}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="tearWater"
                  />
                }
                label="Tear-Water"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.itch}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="itch"
                  />
                }
                label="Itch"
              />

            </div>

          </div>

          <div className="flex flex-row justify-evenly px-4">
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.dry}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="dry"
                  />
                }
                label="Dry"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.floaters}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="floaters"
                  />
                }
                label="Floaters"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.flashes}
                    onChange={handleChange}
                    name="flashes"
                    disabled={disabledState}
                  />
                }
                label="Flashes"
              />

            </div>
            <div className="flex-1 flex flex-row ">
              <TextField
                size="small"
                id="outlined-multiline-static"
                label="Other"
                disabled={disabledState}
                value={form?.otherReason}
                onChange={handleChange}
                name={'otherReason'}
                variant="outlined"
              />
              <br></br>

            </div>

          </div>
        </div>
      </div>
  );
};

export default withRouter(ChiefComplaints);
