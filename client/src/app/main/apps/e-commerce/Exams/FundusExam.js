import { customValuesArrayGenerator } from '../ReusableComponents/HelperFunctions';
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

const FundusExam = (props) => {
  const classes = useStyles();
  const { form, handleChange, disabledState, setForm } = props;

  return (
    <div className="flex flex-col h-260 px-16 py-6">
      <div className="flex flex-col h-260 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              FUNDUS EXAMINATION
            </h1>
          </div>
          <br></br>

          <div className='flex flex-row w-full items-end'>
            <div className='flex flex-row w-1/3 justify-center'></div>
            <div className='flex flex-row w-1/3 justify-between'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.fundusBio}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="fundusBio"
                  />
                }
                label="BIO"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.fundus90D}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="fundus90D"
                  />
                }
                label="90D"
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'></div>
          </div>

          <div className='flex flex-row w-full items-end'>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700  ">OD</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'></div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700  ">OS</h3>
            </div>
          </div>

          <div className='flex flex-row w-full items-end'>
            <div className='flex flex-row w-1/3 justify-center'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.fundusOdNormal}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          odVessels: 'Normal',
                          odAV: 'Normal',
                          odMedia: 'Normal',
                          odMacula: 'Normal',
                          odPostPole: 'Normal',
                          odVitreous: 'Normal',
                          odDiscMargins: 'Normal'
                        });
                      } else {
                        setForm({
                          ...form,
                          odVessels: '',
                          odAV: '',
                          odMedia: '',
                          odMacula: '',
                          odPostPole: '',
                          odVitreous: '',
                          odDiscMargins: ''
                        });
                      }
                    }}
                    disabled={disabledState}
                    name="fundusOdNormal"
                  />
                }
                label="None"
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'></div>
            <div className='flex flex-row w-1/3 justify-center'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.fundusOsNormal}
                    onChange={(e) => {
                      handleChange(e);
                      if (e.target.checked) {
                        setForm({
                          ...form,
                          osVessels: 'Normal',
                          osAV: 'Normal',
                          osMedia: 'Normal',
                          osMacula: 'Normal',
                          osPostPole: 'Normal',
                          osVitreous: 'Normal',
                          osDiscMargins: 'Normal'
                        });
                      } else {
                        setForm({
                          ...form,
                          osVessels: '',
                          osAV: '',
                          osMedia: '',
                          osMacula: '',
                          osPostPole: '',
                          osVitreous: '',
                          osDiscMargins: ''
                        });
                      }
                    }}
                    disabled={disabledState}
                    name="fundusOsNormal"
                  />
                }
                label="None"
              />
            </div>
          </div>

          <div className='flex flex-row w-full items-end'>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="Norm Caliber"
                id="standard-basic"
                disabled={disabledState}
                value={form?.odVessels}
                onChange={handleChange}
                name={'odVessels'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center">Vessels</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="Norm Caliber"
                id="standard-basic"
                value={form?.osVessels}
                disabled={disabledState}
                onChange={handleChange}
                name={'osVessels'}
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
                label="2/3"
                id="standard-basic"
                value={form?.odAV}
                disabled={disabledState}
                onChange={handleChange}
                name={'odAV'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center">A / V</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="2/3"
                disabled={disabledState}
                id="standard-basic"
                value={form?.osAV}
                onChange={handleChange}
                name={'osAV'}
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
                value={form?.odMedia}
                disabled={disabledState}
                onChange={handleChange}
                name={'odMedia'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center">Media</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="CL"
                id="standard-basic"
                value={form?.osMedia}
                disabled={disabledState}
                onChange={handleChange}
                name={'osMedia'}
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
                disabled={disabledState}
                value={form?.odMacula}
                onChange={handleChange}
                name={'odMacula'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center">Macula</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="CL"
                id="standard-basic"
                value={form?.osMacula}
                onChange={handleChange}
                disabled={disabledState}
                name={'osMacula'}
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
                label="Flat Norm"
                id="standard-basic"
                value={form?.odPostPole}
                disabled={disabledState}
                onChange={handleChange}
                name={'odPostPole'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center ">Post Pole</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="Flat Norm"
                id="standard-basic"
                value={form?.osPostPole}
                disabled={disabledState}
                onChange={handleChange}
                name={'osPostPole'}
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
                value={form?.odVitreous}
                onChange={handleChange}
                disabled={disabledState}
                name={'odVitreous'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center">Vitreous</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="CL"
                id="standard-basic"
                value={form?.osVitreous}
                disabled={disabledState}
                onChange={handleChange}
                name={'osVitreous'}
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
                label="Distinct"
                id="standard-basic"
                disabled={disabledState}
                value={form?.odDiscMargins}
                onChange={handleChange}
                name={'odDiscMargins'}
                InputProps={{
                  inputProps: {
                    style: { textAlign: 'center' }
                  }
                }}
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center">Disc Margins</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <TextField
                size="small"
                label="Distinct"
                id="standard-basic"
                value={form?.osDiscMargins}
                disabled={disabledState}
                onChange={handleChange}
                name={'osDiscMargins'}
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.fovealLightReflexOd}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="fovealLightReflexOd"
                  />
                }
                label="Yes"
              />
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center pt-10">Foveal Light Reflex</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.fovealLightReflexOs}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="fovealLightReflexOs"
                  />
                }
                label="Yes"
              />
            </div>
          </div>

          <div className='flex flex-row w-full items-end py-8'>
            <div className='flex flex-row w-1/3 justify-center items-center gap-6'>
              <div className='flex flex-col w-72'>
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.odCDRatio1 ?? ''}
                  name="odCDRatio1"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(0.05, 1, 0.05).map((row) => (
                    <MenuItem key={row?.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
              <h3 className='font-700'> / </h3>
              <div className='flex flex-col w-72'>
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.odCDRatio2 ?? ''}
                  name="odCDRatio2"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(0.05, 1, 0.05).map((row) => (
                    <MenuItem key={row?.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
            <div className='flex flex-row w-1/3 justify-center'>
              <h3 className="font-700 text-center">C/D Ratio</h3>
            </div>
            <div className='flex flex-row w-1/3 justify-center items-center gap-6'>
              <div className='flex flex-col w-72'>
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.osCDRatio1 ?? ''}
                  name="osCDRatio1"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(0.05, 1, 0.05).map((row) => (
                    <MenuItem key={row?.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
              <h3 className='font-700'> / </h3>
              <div className='flex flex-col w-72'>
                <Select
                  className={classes.centerText}
                  disabled={disabledState}
                  value={form?.osCDRatio2 ?? ''}
                  name="osCDRatio2"
                  onChange={handleChange}
                >
                  {customValuesArrayGenerator(0.05, 1, 0.05).map((row) => (
                    <MenuItem key={row?.value} value={row?.value}>{row?.label}</MenuItem>
                  ))}
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(FundusExam);
