import _ from '@lodash';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAutocomplete from '../../ReusableComponents/Autocomplete';
import CustomAutocomplete1 from '../Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React from 'react';
import SearchFrameDialouge from '../SearchFrameDialouge';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    width: '100%',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  noBorder: {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  body: {
    fontSize: 14,
    padding: '10px',
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:hover': {
      backgroundColor: 'lightyellow !important'
    }
  }
}))(TableRow);

const EyeglassessOrder = (props) => {
  const classes = useStyles();
  const { form, handleChange, disabledState, prescription, selectedFrame, setSelectedFrame, 
    handleSelectedFrameChange, lensTypeNames, handleAddFrameToOrder, eyeglasses, setEyeglasses } = props;

  return (
    <div>
      <div className="eyeglasses-prescription flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8  border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                EYEGLASSES PRESCRIPTION
              </h1>
            </div>
            <div className="w-full flex flex-row ">
              <div>
                <div className="flex flex-col p-8 flex-1 h-auto justify-between">
                  <div className="flex flex-row w-full pb-10">
                    <div className="flex flex-col px-10 w-1/2 ">
                      <CustomAutocomplete1
                        list={prescription.filter(
                          (word) =>
                            word.prescriptionType === 'eyeglassesRx'
                        )}
                        form={selectedFrame}
                        disabled={disabledState}
                        setForm={setSelectedFrame}
                        handleChange={handleSelectedFrameChange}
                        id="prescriptionId"
                        freeSolo={false}
                        label="Select Prescription"
                      />
                    </div>
                  </div>
                  <div className="flex gap-10">
                    <div className="w-2/3">
                      <div className="flex flex-row ">
                        <div className="p-8 h-auto w-40">
                          <h3 className="text-center font-700">
                            RX
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Sphere
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Cylinder
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Axis
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-1/6">
                          <h3 className="text-center font-700">
                            Add
                          </h3>
                        </div>
                        <div className="p-8 h-auto w-2/6">
                          <h3 className="text-center font-700">
                            Prism/Base
                          </h3>
                        </div>
                      </div>
                      <div className="flex flex-row ">
                        <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">
                            OD
                          </h3>
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            value={
                              selectedFrame?.eyeglassesSphereOd
                                ? selectedFrame?.eyeglassesSphereOd
                                : ''
                            }
                            onChange={handleSelectedFrameChange}
                            disabled={disabledState}
                            name={'eyeglassesSphereOd'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            value={
                              selectedFrame?.eyeglassesCylinderOd
                            }
                            onChange={handleSelectedFrameChange}
                            disabled={disabledState}
                            name={'eyeglassesCylinderOd'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            value={selectedFrame?.eyeglassesAxisOd}
                            disabled={disabledState}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAxisOd'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled={disabledState}
                            value={selectedFrame?.eyeglassesAddOd}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAddOd'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-2/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled={disabledState}
                            value={selectedFrame?.eyeglassesPrismOd}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesPrismOd'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex flex-row ">
                        <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                          <h3 className="text-center font-700">
                            OS
                          </h3>
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled={disabledState}
                            value={
                              selectedFrame?.eyeglassesSphereOs
                            }
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesSphereOs'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled={disabledState}
                            value={
                              selectedFrame?.eyeglassesCylinderOs
                            }
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesCylinderOs'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled={disabledState}
                            value={selectedFrame?.eyeglassesAxisOs}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAxisOs'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                        <div className="p-8 w-1/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            id="standard-basic"
                            disabled={disabledState}
                            value={selectedFrame?.eyeglassesAddOs}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesAddOs'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>

                        <div className="p-8 w-2/6 h-auto border-grey-400 border-solid border-1 justify-between">
                          <TextField
                            size="small"
                            fullWidth
                            disabled={disabledState}
                            id="standard-basic"
                            value={selectedFrame?.eyeglassesPrismOs}
                            onChange={handleSelectedFrameChange}
                            name={'eyeglassesPrismOs'}
                            InputProps={{
                              inputProps: {
                                style: { textAlign: 'center' }
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-1/3">
                      <div className="flex flex-col mt-0 flex-1 h-auto justify-between">
                        <div className="flex flex-row ">
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              PD
                            </h3>
                          </div>
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              OU
                            </h3>
                          </div>
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              OD
                            </h3>
                          </div>
                          <div className="p-8 h-auto w-1/4">
                            <h3 className="text-center font-700">
                              OS
                            </h3>
                          </div>
                        </div>
                        <div className="flex flex-row ">
                          <div className="p-3 flex w-1/3 h-auto border-grey-400 border-solid border-1 justify-center items-center">
                            <h3 className="text-center font-700">
                              Distance
                            </h3>
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOuDistance}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOuDistance'}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOdDistance}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOdDistance'}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOsDistance}
                              disabled={disabledState}
                              onChange={handleSelectedFrameChange}
                              name={'pdOsDistance'}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row ">
                          <div className="p-3 flex w-1/3 h-auto border-grey-400 border-solid border-1 justify-center items-center">
                            <h3 className="text-center font-700">
                              Near
                            </h3>
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOuNear}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOuNear'}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOdNear}
                              onChange={handleSelectedFrameChange}
                              disabled={disabledState}
                              name={'pdOdNear'}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                          <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                            <TextField
                              size="small"
                              fullWidth
                              id="standard-basic"
                              value={selectedFrame?.pdOsNear}
                              disabled={disabledState}
                              onChange={handleSelectedFrameChange}
                              name={'pdOsNear'}
                              InputProps={{
                                inputProps: {
                                  style: { textAlign: 'center' }
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          </div>
        </FuseAnimate>
      </div>

      <div className="eyeglasses-info flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8 border-1 border-black border-solid rounded-6">
            <div className="flex px-20 flex-row justify-between border-b-1 border-black border-solid">
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.shipFrameToCustomerLogic}
                    onChange={handleChange}
                    name="shipFrameToCustomerLogic"
                    disabled={disabledState}
                  />
                }
                label="Ship To Customer"
              />
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                EYEGLASSES INFO
              </h1>
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.rushFrameOrder}
                    onChange={handleChange}
                    name="rushFrameOrder"
                    disabled={disabledState}
                  />
                }
                label="Rush Order"
              />
            </div>
            <div className="flex flex-row w-full p-8 gap-10">
              <div className="border-1 border-black border-solid w-1/2">
                <div className="flex flex-col w-full">
                  <div className="flex flex-col px-8">
                    <div className="flex flex-col my-10 relative">
                      <h2 className="text-center">Frame</h2>
                      <div className="flex flex-row absolute right-0">
                        <SearchFrameDialouge
                          disabledState={disabledState}
                          form={selectedFrame}
                          setForm={setSelectedFrame}
                          variant="frame"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col">
                      <TextField
                        fullWidth
                        style={{ borderRadius: '0px' }}
                        variant="outlined"
                        disabled={true}
                        id="standard-basic"
                        value={selectedFrame?.frameBrand}
                        onChange={handleSelectedFrameChange}
                        name={'frameBrand'}
                        label="Brand"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={true}
                        id="standard-basic"
                        value={selectedFrame?.frameModel}
                        onChange={handleSelectedFrameChange}
                        name={'frameModel'}
                        label="Model"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={true}
                        id="standard-basic"
                        value={selectedFrame?.frameColour}
                        onChange={handleSelectedFrameChange}
                        name={'frameColour'}
                        label="Colour"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <div className="flex flex-row">
                        <TextField
                          className="mt-4"
                          fullWidth
                          variant="outlined"
                          disabled={disabledState}
                          id="standard-basic"
                          value={selectedFrame?.segHtOd}
                          onChange={handleSelectedFrameChange}
                          name={'segHtOd'}
                          label="Seg Ht OD"
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                        <TextField
                          className="mt-4 ml-2"
                          fullWidth
                          variant="outlined"
                          disabled={disabledState}
                          id="standard-basic"
                          value={selectedFrame?.segHtOs}
                          onChange={handleSelectedFrameChange}
                          name={'segHtOs'}
                          label="Seg Ht OS"
                          InputProps={{
                            inputProps: {
                              style: { textAlign: 'center' }
                            }
                          }}
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-10">
                      <FormControlLabel
                        className="m-0"
                        style={{ color: '#f15a25' }}
                        control={
                          <Checkbox
                            checked={selectedFrame?.sendFrameToLab ? selectedFrame?.sendFrameToLab : ''}
                            onChange={handleSelectedFrameChange}
                            name="sendFrameToLab"
                            disabled={disabledState}
                          />
                        }
                        label="Sending Frame to Lab"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={
                              selectedFrame?.frameLater
                                ? selectedFrame?.frameLater
                                : ''
                            }
                            onChange={handleSelectedFrameChange}
                            name="frameLater"
                            disabled={disabledState}
                          />
                        }
                        label="Frame to come later"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={
                              selectedFrame?.orderFrameInsurance ? selectedFrame?.orderFrameInsurance : ''
                            }
                            onChange={handleSelectedFrameChange}
                            name="orderFrameInsurance"
                            disabled={disabledState}
                          />
                        }
                        label="Order Frame from Insurance"
                      />
                      <div>
                        <FormControlLabel
                          className="m-0"
                          control={
                            <Checkbox
                              checked={selectedFrame?.customerFrame ? selectedFrame?.customerFrame : ''}
                              onChange={handleSelectedFrameChange}
                              name="customerFrame"
                              disabled={disabledState}
                            />
                          }
                          label="Customer’s Frame"
                        />
                        {selectedFrame?.customerFrame && (
                          <TextField
                            id="outlined-multiline-static"
                            variant="outlined"
                            size="small"
                            className="w-full"
                            name="customerFrameDetail"
                            value={
                              selectedFrame?.customerFrameDetail ? selectedFrame?.customerFrameDetail : ''
                            }
                            onChange={handleSelectedFrameChange}
                          />
                        )}
                      </div>
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.otherFrame ? selectedFrame?.otherFrame : ''}
                            onChange={handleSelectedFrameChange}
                            name="otherFrame"
                            disabled={disabledState}
                          />
                        }
                        label="Other Frame"
                      />
                      {selectedFrame?.otherFrame && (
                        <TextField
                          id="outlined-multiline-static"
                          variant="outlined"
                          size="small"
                          className="w-full"
                          name="otherFrameDetail"
                          value={selectedFrame?.otherFrameDetail ? selectedFrame?.otherFrameDetail : ''}
                          onChange={handleSelectedFrameChange}
                        />
                      )}
                    </div>
                    <div className="flex gap-10 py-10">
                      <TextField
                        id="outlined-multiline-static"
                        label="Memo"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="frameMemo"
                        value={selectedFrame?.frameMemo ? selectedFrame?.frameMemo : ''}
                        onChange={handleSelectedFrameChange}
                      />
                      <TextField
                        id="outlined-multiline-static"
                        label="Additional Price"
                        variant="outlined"
                        size="small"
                        className="w-1"
                        name="frameAdditionalPrice"
                        error={
                          selectedFrame?.frameAdditionalPrice &&
                          !Number(
                            selectedFrame?.frameAdditionalPrice
                          )
                        }
                        value={selectedFrame?.frameAdditionalPrice ? selectedFrame?.frameAdditionalPrice : ''}
                        onChange={handleSelectedFrameChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-1 border-black border-solid w-1/2">
                <div className="flex flex-col w-full px-8">
                  <div className="flex flex-col my-10">
                    <h2 className="text-center">Lens</h2>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-row">
                      <div className="w-full">
                        <FormControl
                          component="fieldset"
                          className="w-full">
                          <RadioGroup
                            className="flex px-20"
                            row
                            aria-label="lensType"
                            name="lensType"
                            value={selectedFrame?.lensType ? selectedFrame?.lensType : ''}
                            onChange={handleSelectedFrameChange}>
                            <div className="w-1/2 flex flex-col">
                              <FormControlLabel
                                disabled={disabledState}
                                value="distance"
                                control={<Radio />}
                                label="Distance"
                              />
                              <FormControlLabel
                                value="fTop"
                                disabled={disabledState}
                                control={<Radio />}
                                label="Flat Top"
                              />
                            </div>
                            <div className="w-1/2 flex flex-col">
                              <FormControlLabel
                                value="read"
                                disabled={disabledState}
                                control={<Radio />}
                                label="Reading"
                              />
                              <FormControlLabel
                                value="progressive"
                                disabled={disabledState}
                                control={<Radio />}
                                label="Progressive"
                              />
                            </div>
                          </RadioGroup>
                        </FormControl>
                      </div>
                    </div>
                    <div className="flex flex-row justify-between">
                      <div className="flex flex-col px-10 w-full">
                        <CustomAutocomplete
                          list={lensTypeNames}
                          form={selectedFrame}
                          setForm={setSelectedFrame}
                          handleChange={handleSelectedFrameChange}
                          id="lensTypeName"
                          freeSolo={false}
                          label="Select Lens Type"
                          disabled={disabledState}
                        />
                      </div>
                    </div>
                    <div>
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={disabledState}
                        id="standard-basic"
                        value={selectedFrame?.lensColour}
                        onChange={handleSelectedFrameChange}
                        name={'lensColour'}
                        label="Colour/Tint"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                      <TextField
                        className="mt-4"
                        fullWidth
                        variant="outlined"
                        disabled={disabledState}
                        id="standard-basic"
                        value={selectedFrame?.lensDetail}
                        onChange={handleSelectedFrameChange}
                        name={'lensDetail'}
                        label="Detail"
                        InputProps={{
                          inputProps: {
                            style: { textAlign: 'center' }
                          }
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-10">
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.oversizeLens ? selectedFrame?.oversizeLens : ''}
                            onChange={handleSelectedFrameChange}
                            name="oversizeLens"
                            disabled={disabledState}
                          />
                        }
                        label="Oversize Lens ( Additional Price )"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.cutLensOnly ? selectedFrame?.cutLensOnly : ''}
                            onChange={handleSelectedFrameChange}
                            name="cutLensOnly"
                            disabled={disabledState}
                          />
                        }
                        label="Cut Lens Only"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={selectedFrame?.sendUncutLenses ? selectedFrame?.sendUncutLenses : ''}
                            onChange={handleSelectedFrameChange}
                            name="sendUncutLenses"
                            disabled={disabledState}
                          />
                        }
                        label="Send Uncut Lenses"
                      />
                      <FormControlLabel
                        className="m-0"
                        control={
                          <Checkbox
                            checked={
                              selectedFrame?.orderLensInsurance ? selectedFrame?.orderLensInsurance : ''
                            }
                            onChange={handleSelectedFrameChange}
                            name="orderLensInsurance"
                            disabled={disabledState}
                          />
                        }
                        label="Order Lens from Insurance"
                      />
                    </div>
                  </div>
                  <div
                    className="flex gap-10 py-10"
                    style={{ paddingTop: '5rem' }}>
                    <TextField
                      id="outlined-memo"
                      label="Memo"
                      variant="outlined"
                      size="small"
                      className="w-full"
                      name="lensMemo"
                      value={selectedFrame?.lensMemo ?? ''}
                      onChange={handleSelectedFrameChange}
                    />
                    <TextField
                      id="outlined-additional-price"
                      label="Additional Price"
                      variant="outlined"
                      size="small"
                      className="w-1"
                      name="lensAdditionalPrice"
                      error={
                        selectedFrame?.lensAdditionalPrice &&
                        !Number(selectedFrame?.lensAdditionalPrice)
                      }
                      value={selectedFrame?.lensAdditionalPrice ? selectedFrame?.lensAdditionalPrice : ''}
                      onChange={handleSelectedFrameChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-10">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleAddFrameToOrder}
                disabled={disabledState}
                aria-label="add">
                <AddIcon />
                Add to Order
              </Button>
            </div>
            <div className="flex flex-col max-h-320">
              <TableContainer
                className="flex flex-col w-full overflow-scroll"
                component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>Brand</StyledTableCell>
                      <StyledTableCell>Model</StyledTableCell>
                      <StyledTableCell>Frame Color</StyledTableCell>
                      <StyledTableCell>Lens Type</StyledTableCell>
                      {/* <StyledTableCell>Lens Detail</StyledTableCell> */}
                      <StyledTableCell>Lens Color</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {eyeglasses.map((row, index) => (
                      <StyledTableRow
                        onClick={() => {
                          setSelectedFrame(row);
                        }}
                        key={index}
                        hover
                        className="cursor-pointer">
                        <StyledTableCell component="th" scope="row">
                          {row?.frameBrand}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.frameModel}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.frameColour}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.lensType === 'distance' &&
                            'Distance'}
                          {row?.lensType === 'read' && 'Reading'}
                          {row?.lensType === 'fTop' && 'Flat Top'}
                          {row?.lensType === 'progressive' &&
                            'Progressive'}
                        </StyledTableCell>
                        {/* <StyledTableCell>
                                    {row?.lensDetail}
                                  </StyledTableCell> */}
                        <StyledTableCell>
                          {row?.lensColour}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            onClick={() => {
                              let newEyeglasses = eyeglasses;
                              newEyeglasses.splice(index, 1);
                              setEyeglasses([...newEyeglasses]);
                              setSelectedFrame(row);
                              // setDisabledState(false);
                            }}
                            aria-label="view">
                            <Icon>delete</Icon>
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default withRouter(EyeglassessOrder);
