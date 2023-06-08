import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router';
import React from 'react';
import Sketch from './Sketch';
import Checkbox from '@material-ui/core/Checkbox';

const PeripheralRetina = (props) => {
  const { form, handleChange, disabledState, setForm } = props;

  return (
    <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-260 py-6">
          <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                PERIPHERAL RETINA
              </h1>
            </div>

            <br></br>
            <div className="flex flex-row justify-center">
              <Sketch form={form} setForm={setForm} handleChange={handleChange} disabledState={disabledState} />
            </div>
            <br></br>
            <div className="flex flex-row justify-center">



              <div className="flex-1 flex flex-row justify-center ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.flatattach}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="flatattach"
                    />
                  }
                  label="FLAT ATTACHED"
                />

              </div>
              <div className="flex-1 flex flex-row justify-center ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.flatattach1}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="flatattach1"
                    />
                  }
                  label="FLAT ATTACHED"
                />

              </div>


            </div>
            <br></br>
            <div className="flex flex-row justify-center">
              <div className="flex-1 flex flex-row justify-center ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.rcnull}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="rcnull"
                    />
                  }
                  label="RC Images N / A"
                />

              </div>
              <div className="flex-1 flex flex-row justify-center ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.rcreviewed}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="rcreviewed"
                    />
                  }
                  label="RC Images Reviewed
                  "
                />
                <br></br><br></br>
              </div>

              <br></br>
            </div>

          </div>
        </div>
        </div>
  );
};

export default withRouter(PeripheralRetina);
