import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const MedicalOcularHistory = (props) => {
  const { form, handleChange, disabledState } = props;

  return (
    <div className="flex flex-col h-260  px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              MEDICAL AND OCULAR HISTORY
            </h1>
          </div>
          <br></br>
          <div className="flex flex-row justify-center">
            <div className="flex-1 pl-30">
              <h3 className="ml-40 hidden font-700 ">Hidden</h3>
            </div>
            <div className="flex-1">
              <h3 className="hidden font-700 text-center">Hidden</h3>
            </div>
            <div className="flex-1 flex flex-row  justify-center">
              <h3> ( Patient ) </h3>
            </div>
            <div className="flex-1 flex-row justify-center">
              <h3> ( Blood Relatives )</h3>
            </div>

          </div>
          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1  pl-30">
                <h3 className=" ml-40 font-700  ">High Blood Pressure</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patienthighbp}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patienthighbp"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativehighbp}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativehighbp"
                    />
                  }
                />
              </div>

            </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row ">
              <div className="flex-1  pl-30">
                <h3 className=" ml-40 font-700  ">Diabetes</h3>

              </div>


              <div className="flex-1 flex flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.dmi}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="dmi"
                    />
                  }
                  label="DM I"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.dmii}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="dmii"
                    />
                  }
                  label="DM II"
                />
              </div>

              <div className="flex-1 flex flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientdiabetes}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientdiabetes"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativediabetes}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativediabetes"
                    />
                  }
                />
              </div>

            </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className="ml-40 font-700  ">Cholestrol</h3>

              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientcholestrol}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientcholestrol"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativecholestrol}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativecholestrol"
                    />
                  }
                />
              </div>

            </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 justify-around pl-30">
                <h3 className=" ml-40 font-700  ">Heart Problems</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row  justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientHeartProblems}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientHeartProblems"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeHeartProblems}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeHeartProblems"
                    />
                  }
                />
              </div>

            </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className=" ml-40 font-700  ">Asthma</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row  justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientAsthma}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientAsthma"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeAsthma}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeAsthma"
                    />
                  }
                />
              </div>

            </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className=" font-700 ml-40 ">{`Cataracts`}</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row  justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientCataracts}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientCataracts"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeCataracts}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeCataracts"
                    />
                  }
                />
              </div>

            </div>
          </div>
          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className=" font-700 ml-40 ">{`Retincal Detachment`}</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row   justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientRetincalDetachment}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientRetincalDetachment"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeRetincalDetachment}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeRetincalDetachment"
                    />
                  }
                />
              </div>

            </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className=" font-700 ml-40 ">Blindness</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientBlindness}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientBlindness"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeBlindness}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeBlindness"
                    />
                  }
                />
              </div>

            </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className=" font-700  ml-40">{`Lazy or Crossed Eyes`}</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center  ">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientLazyorCrossedEyes}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientLazyorCrossedEyes"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeLazyorCrossedEyes}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeLazyorCrossedEyes"
                    />
                  }
                />
              </div>

            </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className=" font-700  ml-40">{`Glaucoma`}</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientGlaucoma}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientGlaucoma"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeGlaucoma}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeGlaucoma"
                    />
                  }
                />
              </div>

            </div>
          </div>

          <div className=" border-b-1 border-black border-solid px-11">
            <div className="flex flex-row justify-center">
              <div className="flex-1 pl-30">
                <h3 className=" font-700  ml-40 ">{`Macular Degeneration`}</h3>
              </div>
              <div className="flex-1">
                <h3 className="hidden font-700 text-center">Hidden</h3>
              </div>
              <div className="flex-1 flex flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.patientMacularDegeneration}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="patientMacularDegeneration"
                    />
                  }
                />
              </div>
              <div className="flex-1 flex-row justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={form?.relativeMacularDegeneration}
                      onChange={handleChange}
                      disabled={disabledState}
                      name="relativeMacularDegeneration"
                    />
                  }
                />
              </div>

            </div>
          </div>
          <br></br>
          <div className="flex flex-row justify-center ">
            <h3 className=" ml-40 font-700  ">{`Other Ocular ( eye ) Problems: `}</h3>

            <TextField
              className="mx-10"
              fullWidth
              multiline
              rows={4}
              id="outlined-multiline-static"
              disabled={disabledState}
              value={form?.otherocular}
              onChange={handleChange}
              name={'otherocular'}
              variant="outlined"
            />


          </div>
          <br></br>
          <div className="flex flex-row justify-center ">

            <h3 className="ml-40 font-700  ">{`Other General Health Problems: `}</h3>


            <TextField
              className="mx-10"
              fullWidth
              multiline
              rows={4}
              id="outlined-multiline-static"

              disabled={disabledState}
              value={form?.otherhealth}
              onChange={handleChange}
              name={'otherhealth'}
              variant="outlined"
            />


          </div>
          <br></br>
          <div className="justify-center ">
            <h3 className="ml-40 font-700  ">{`List of medications currently taking ( Including Aspirin, Birth Control, and OTC medications ):`}</h3>

            <TextField

              fullWidth
              multiline
              rows={4}
              disabled={disabledState}
              id="outlined-multiline-static"
              value={form?.currentmedication}
              onChange={handleChange}
              name={'currentmedication'}
              variant="outlined"
            />

          </div>
          <br></br><br></br>
        </div>
      </div>
  );
};

export default withRouter(MedicalOcularHistory);
