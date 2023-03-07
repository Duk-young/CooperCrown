import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';

const Assessment = (props) => {
  const { form, handleChange, disabledState } = props;

  return (
    <div className="flex flex-col h-260 px-16 py-6">
      <div className="flex flex-col h-260 py-6">
        <div className="justify-aroud flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              ASSESSMENT
            </h1>
          </div>
          <br></br>

          <div className='flex flex-row w-full'>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.hyperopia}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="hyperopia"
                  />
                }
                label="Hyperopia (H52.03)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.myopia}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="myopia"
                  />
                }
                label="Myopia (H52.13)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.astigmatism}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="astigmatism"
                  />
                }
                label="Astigmatism (H52.209)"
              />
            </div>
          </div>

          <div className='flex flex-row w-full'>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.presbyopia}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="presbyopia"
                  />
                }
                label="Presbyopia (H52.4)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.amblyopia}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="amblyopia"
                  />
                }
                label="Amblyopia (H53.009)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.acuteConj}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="acuteConj"
                  />
                }
                label="Acute Conj. (H10.9)"
              />
            </div>
          </div>

          <div className='flex flex-row w-full'>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.blepharitis}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="blepharitis"
                  />
                }
                label="Blepharitis (H01.009)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.cataractUnspecified}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="cataractUnspecified"
                  />
                }
                label="Cataract Unspecified (H26.9)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.chalazion}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="chalazion"
                  />
                }
                label="Chalazion (H00.19)"
              />
            </div>
          </div>

          <div className='flex flex-row w-full'>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.cornealUlcer}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="cornealUlcer"
                  />
                }
                label="Corneal Ulcer (H16.009)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.diabetesWoComp}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="diabetesWoComp"
                  />
                }
                label="Diabetes w/o Comp. (E11.319)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.diabeticRet}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="diabeticRet"
                  />
                }
                label="Diabetic Ret. (E11.319)"
              />
            </div>
          </div>

          <div className='flex flex-row w-full'>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.glaucomaSuspect}
                    onChange={handleChange}
                    name="glaucomaSuspect"
                    disabled={disabledState}
                  />
                }
                label="Glaucoma Suspect (H40.0)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.glaucomaUnspecified}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="glaucomaUnspecified"
                  />
                }
                label="Glaucoma Unspecified (H40.9)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.gpc}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="gpc"
                  />
                }
                label="GPC (H10.419)"
              />
            </div>
          </div>

          <div className='flex flex-row w-full'>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.hypertensiveRet}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="hypertensiveRet"
                  />
                }
                label="Hypertensive Ret. (L35.039)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.macDeg}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="macDeg"
                  />
                }
                label="Mac Deg (H35.30)"
              />
            </div>
            <div className='flex flex-row pl-12 w-1/3'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.spk}
                    disabled={disabledState}
                    onChange={handleChange}
                    name="spk"
                  />
                }
                label="SPK (H16.149)"
              />
            </div>
          </div>

          <div className="flex flex-row p-10">
            <TextField
              fullWidth
              InputProps={{ style: { fontSize: 14 } }}
              InputLabelProps={{ style: { fontSize: 14 } }}
              id="outlined-multiline-static"
              label="Additional Diagnosis"
              multiline
              disabled={disabledState}
              minRows={4}
              value={form?.additionalDiagnosis}
              onChange={handleChange}
              name={'additionalDiagnosis'}
              variant="outlined"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default withRouter(Assessment);
