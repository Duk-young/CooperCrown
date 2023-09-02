import { slitLampAngleValues } from '../ReusableComponents/HelperFunctions';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
  centerText: {
    textAlign: 'center',
  },
});

const SlitLampExam = (props) => {
  const classes = useStyles();
  const { form, handleChange, disabledState, setForm } = props;

  return (
    <div className="flex flex-col h-260 px-16 py-6">
      <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
        <div className="flex flex-row justify-center border-b-1 border-black border-solid">
          <h1 className="font-700" style={{ color: '#f15a25' }}>
            SLIT LAMP EXAMINATION
          </h1>
        </div>
        <br></br>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700  ">OD</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'></div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700  ">OS</h3>
          </div>
        </div>

        <div className='flex flex-row w-full'>
          <div className='flex flex-row w-1/3 justify-center'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.slitOdNormal}
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.checked) {
                      setForm({
                        ...form,
                        odTears: 'Normal',
                        odLashes: 'Normal',
                        odCornea: 'Normal',
                        odPalConj: 'Normal',
                        odBulConj: 'Normal',
                        odAntChamber: 'Normal',
                        odIris: 'Normal',
                        odLens: 'Normal',
                        odAntVit: 'Normal',
                        odAngleEstimate: 'Normal'
                      });
                    } else {
                      setForm({
                        ...form,
                        odTears: '',
                        odLashes: '',
                        odCornea: '',
                        odPalConj: '',
                        odBulConj: '',
                        odAntChamber: '',
                        odIris: '',
                        odLens: '',
                        odAntVit: '',
                        odAngleEstimate: ''
                      });
                    }
                  }}
                  disabled={disabledState}
                  name="slitOdNormal"
                />
              }
              label="WNL"
            />
          </div>
          <div className='w-1/3'></div>
          <div className='flex flex-row w-1/3 justify-center'>
            <FormControlLabel
              control={
                <Checkbox
                  checked={form?.slitOsNormal}
                  onChange={(e) => {
                    handleChange(e);
                    if (e.target.checked) {
                      setForm({
                        ...form,
                        osTears: 'Normal',
                        osLashes: 'Normal',
                        osCornea: 'Normal',
                        osPalConj: 'Normal',
                        osBulConj: 'Normal',
                        osAntChamber: 'Normal',
                        osIris: 'Normal',
                        osLens: 'Normal',
                        osAntVit: 'Normal',
                        osAngleEstimate: 'Normal'
                      });
                    } else {
                      setForm({
                        ...form,
                        osTears: '',
                        osLashes: '',
                        osCornea: '',
                        osPalConj: '',
                        osBulConj: '',
                        osAntChamber: '',
                        osIris: '',
                        osLens: '',
                        osAntVit: '',
                        osAngleEstimate: ''
                      });
                    }
                  }}
                  disabled={disabledState}
                  name="slitOsNormal"
                />
              }
              label="WNL"
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              disabled={disabledState}
              value={form?.odTears}
              onChange={handleChange}
              name={'odTears'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Tears</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              disabled={disabledState}
              value={form?.osTears}
              onChange={handleChange}
              name={'osTears'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              value={form?.odLashes}
              disabled={disabledState}
              onChange={handleChange}
              name={'odLashes'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Lids/Lashes</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              value={form?.osLashes}
              onChange={handleChange}
              disabled={disabledState}
              name={'osLashes'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              value={form?.odCornea}
              onChange={handleChange}
              disabled={disabledState}
              name={'odCornea'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Cornea</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              value={form?.osCornea}
              onChange={handleChange}
              disabled={disabledState}
              name={'osCornea'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="Q"
              id="standard-basic"
              value={form?.odPalConj}
              onChange={handleChange}
              disabled={disabledState}
              name={'odPalConj'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Pal Conj</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="Q"
              id="standard-basic"
              value={form?.osPalConj}
              disabled={disabledState}
              onChange={handleChange}
              name={'osPalConj'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="Q"
              id="standard-basic"
              value={form?.odBulConj}
              onChange={handleChange}
              disabled={disabledState}
              name={'odBulConj'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Bul Conj</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="Q"
              id="standard-basic"
              value={form?.osBulConj}
              disabled={disabledState}
              onChange={handleChange}
              name={'osBulConj'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="D/Q"
              id="standard-basic"
              value={form?.odAntChamber}
              onChange={handleChange}
              disabled={disabledState}
              name={'odAntChamber'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Ant Chamber</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="D/Q"
              id="standard-basic"
              disabled={disabledState}
              value={form?.osAntChamber}
              onChange={handleChange}
              name={'osAntChamber'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="Flat"
              id="standard-basic"
              disabled={disabledState}
              value={form?.odIris}
              onChange={handleChange}
              name={'odIris'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Iris</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="Flat"
              id="standard-basic"
              value={form?.osIris}
              disabled={disabledState}
              onChange={handleChange}
              name={'osIris'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              value={form?.odLens}
              disabled={disabledState}
              onChange={handleChange}
              name={'odLens'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Lens</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              disabled={disabledState}
              value={form?.osLens}
              onChange={handleChange}
              name={'osLens'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end'>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              value={form?.odAntVit}
              disabled={disabledState}
              onChange={handleChange}
              name={'odAntVit'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Ant Vit</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <TextField
              size="small"
              label="CL"
              id="standard-basic"
              value={form?.osAntVit}
              onChange={handleChange}
              disabled={disabledState}
              name={'osAntVit'}
              InputProps={{
                inputProps: {
                  style: { textAlign: 'center' }
                }
              }}
            />
          </div>
        </div>

        <div className='flex flex-row w-full items-end py-8'>
          <div className='flex flex-row w-1/3 justify-center'>
            <div className='flex flex-col w-160'>
              <Select
                className={classes.centerText}
                disabled={disabledState}
                value={form?.odAngleEstimate ?? ''}
                name="odAngleEstimate"
                onChange={handleChange}
              >
                {slitLampAngleValues.map((row) => (
                  <MenuItem key={row} value={row}>{row}</MenuItem>
                ))}
              </Select>
            </div>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <h3 className="font-700 text-center">Angle Estimate</h3>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <div className='flex flex-col w-160'>
              <Select
                className={classes.centerText}
                disabled={disabledState}
                value={form?.osAngleEstimate ?? ''}
                name="osAngleEstimate"
                onChange={handleChange}
              >
                {slitLampAngleValues.map((row) => (
                  <MenuItem key={row} value={row}>{row}</MenuItem>
                ))}
              </Select>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default withRouter(SlitLampExam);
