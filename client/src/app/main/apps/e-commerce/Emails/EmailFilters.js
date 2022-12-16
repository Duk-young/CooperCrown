import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { useForm } from '@fuse/hooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as Actions from '../store/actions';
import { states } from './helper'


const useStyles = makeStyles((theme) => ({
  formControl: {
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    minWidth: 120,
    maxWidth: 240,
  },
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 'max-content',
    },
  },
};

export default function EmailFilters({ open, handleClose }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { form, handleChange, setForm, resetForm } = useForm(null);
  const theme = useTheme();

  const [showroom, setShowroom] = useState([]);
  const [stateAddress, setStateAddress] = useState([]);
  const [gender, setGender] = useState([]);
  const [orderType, setOrderType] = useState([]);
  const [ageRange, setAgeRange] = useState([]);
  const [ethnicity, setEthnicity] = useState([]);


  const [allShowrooms, setAllShowrooms] = useState(false);
  const [allStates, setAllStates] = useState(false);
  const [allGenders, setAllGenders] = useState(false);
  const [allOrders, setAllOrders] = useState(false);
  const [allAgeRanges, setAllAgeRanges] = useState(false);
  const [allEthnicities, setAllEthnicities] = useState(false);



  const showroomList = [
    'Bayside',
    'Brooklyn Dubo',
    'Brooklyn Bedford St',
    'Closter',
    'Flushing',
    'Greenwich Village',
    'Long Island City',
    'Long Island Roslyn',
    'Manhattan 72nd St',
    'Manhattan Mott St',
    'Manhattan Wallstreet',
    'Sunny Side',
  ];
  const stateList = states.map(state => `(${state.abbreviation}) ${state.name}`)

  const genderList = [
    'Male',
    'Female',
    'Other'
  ];
  const orderTypeList = [
    'CC Frame',
    'Other Frame',
    'Own Frame',
    'Sunglass',
    'Lens ( Poly )',
    'Lens ( 1.67 )',
    'Lens ( 1.74 )',
    'Blue light',
    'Flat Top',
    'Progressive',
    'Transition',
    'Other Product',
    'Exam',
    'Insurance',
  ];
  const ageRangeList = [
    'Age between 90+',
    'Age between 85 - 89',
    'Age between 80 - 84',
    'Age between 75 - 79',
    'Age between 70 - 74',
    'Age between 65 - 69',
    'Age between 60 - 64',
    'Age between 59 - 55',
    'Age between 50 - 54',
    'Age between 45 - 49',
    'Age between 40 - 44',
    'Age between 35 - 39',
    'Age between 30 - 34',
    'Age between 25 - 29',
    'Age between 20 - 24',
    'Age between 15 - 19',
    'Age between 10 - 14',
    'Age between 5 - 9',
    'Age between 0 - 4'
  ];
  const ethnicityList = [
    'White / Caucasian',
    'Hispanic / Latino',
    'Black / African American',
    'Asian',
    'Asian / India & Pakistan',
    'American Indian & Alaska Native',
    'Native Hawaiian & Other Pacific Islander',
    'Others'
  ];



  const isAllChecked = (category) => {
    if (category === 'showroom') {
      setAllShowrooms(!allShowrooms);
      setShowroom(showroomList.map(li => li));

      if (allShowrooms) {
        setShowroom([]);
      }
    }

    if (category === 'state-address') {
      setAllStates(!allStates);
      setStateAddress(stateList.map(li => li));

      if (allStates) {
        setStateAddress([]);
      }
    }

    if (category === 'gender') {
      setAllGenders(!allGenders);
      setGender(genderList.map(li => li));

      if (allGenders) {
        setGender([]);
      }
    }

    if (category === 'orders') {
      setAllOrders(!allOrders);
      setOrderType(orderTypeList.map(li => li));

      if (allOrders) {
        setOrderType([]);
      }
    }

    if (category === 'age-range') {
      setAllAgeRanges(!allAgeRanges);
      setAgeRange(ageRangeList.map(li => li));

      if (allAgeRanges) {
        setAgeRange([]);
      }
    }

    if (category === 'ethnicity') {
      setAllEthnicities(!allEthnicities);
      setEthnicity(ethnicityList.map(li => li));

      if (allEthnicities) {
        setEthnicity([]);
      }
    }
  };

  const handleShowroomChange = (event) => {
    const index = showroom.indexOf(event.target.value)

    if (index === -1) {
      setShowroom([...showroom, event.target.value])

    } else {
      setShowroom(showroom.filter(item => item !== event.target.value));

      if (allShowrooms) {
        setAllShowrooms(false);
      }
    }
  };

  const handleStateAddressChange = (event) => {
    const index = stateAddress.indexOf(event.target.value)

    if (index === -1) {
      setStateAddress(event.target.value)

    } else {
      setStateAddress(stateAddress.filter(item => item !== event.target.value));

      if (allStates) {
        setAllStates(false);
      }
    }

  };

  const handleGenderChange = (event) => {
    const index = gender.indexOf(event.target.value)

    if (index === -1) {
      setGender([...gender, event.target.value])

    } else {
      setGender(gender.filter(item => item !== event.target.value));

      if (allGenders) {
        setAllGenders(false)
      }
    }
  };

  const handleOrderTypeChange = (event) => {
    const index = orderType.indexOf(event.target.value)

    if (index === -1) {
      setOrderType([...orderType, event.target.value])

    } else {
      setOrderType(orderType.filter(item => item !== event.target.value));

      if (allOrders) {
        setAllOrders(false);
      }
    }
  };

  const handleAgeRangeChange = (event) => {
    const index = ageRange.indexOf(event.target.value)

    if (index === -1) {
      setAgeRange([...ageRange, event.target.value])

    } else {
      setAgeRange(ageRange.filter(item => item !== event.target.value));

      if (allAgeRanges) {
        setAllAgeRanges(false);
      }
    }
  };

  const handleEthnicityChange = (event) => {
    const index = ethnicity.indexOf(event.target.value)

    if (index === -1) {
      setEthnicity([...ethnicity, event.target.value])

    } else {
      setEthnicity(ethnicity.filter(item => item !== event.target.value));

      if (allEthnicities) {
        setAllEthnicities(false);
      }
    }
  };

  const reset = () => {
    setAllShowrooms(false);
    setAllStates(false);
    setAllGenders(false);
    setAllOrders(false);
    setAllAgeRanges(false);
    setAllEthnicities(false);

    setShowroom([]);
    setStateAddress([]);
    setGender([]);
    setOrderType([]);
    setAgeRange([]);
    setEthnicity([]);

    resetForm();
  }


  useEffect(() => {
    if (showroom || allShowrooms || !allShowrooms) {
      setForm({ ...form, showroom })
    }
  }, [showroom, allShowrooms])

  useEffect(() => {
    if (stateAddress || allStates || !allStates) {
      setForm({ ...form, stateAddress })
    }
  }, [stateAddress, allStates])

  useEffect(() => {
    if (gender || allGenders || !allGenders) {
      setForm({ ...form, gender })
    }
  }, [gender, allGenders])

  useEffect(() => {
    if (orderType || allOrders || !allOrders) {
      setForm({ ...form, orderType })
    }
  }, [orderType, allOrders])

  useEffect(() => {
    if (ethnicity || allEthnicities || !allEthnicities) {
      setForm({ ...form, ethnicity })
    }
  }, [ethnicity, allEthnicities])

  useEffect(() => {
    if (ageRange || allAgeRanges || !allAgeRanges) {
      setForm({ ...form, ageRange })
    }
  }, [ageRange, allAgeRanges])

  useEffect(() => {
    if (form) {
      dispatch(Actions.getSelectedFilters(form))
    }
  }, [form])

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <div className="flex flex-col h-260  px-16 py-6">
            <div className="flex flex-col h-260 px-16 py-6">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row items-center border-b-1 border-black border-solid">
                  <h1 className="font-700 flex-1 text-center" style={{ color: '#f15a25' }}>
                    Filters
                  </h1>
                  <div className='justify-right relative right-20' style={{ right: '2rem', }}>
                    <IconButton aria-label="close" onClick={handleClose} style={{ fontSize: '2rem', alignSelf: 'end', padding: 0 }}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
                <br></br>
                <div className='p-20'>
                  <div className="flex flex-row">
                    <div className="flex-1 flex flex-col">
                      <div className='showroom__location mb-20'>
                        <p className='font-bold text-underline'>SHOWROOM LOCATION</p>
                        <div className='flex flex-col'>
                          <FormGroup>
                            <FormControlLabel
                              label="All"
                              value="showroomall"
                              control={
                                <Checkbox
                                  checked={allShowrooms}
                                  onChange={() => isAllChecked('showroom')}
                                />
                              }
                            />
                            {showroomList.map((item, index) => (
                              <FormControlLabel
                                key={index}
                                label={item}
                                value={item}
                                control={
                                  <Checkbox
                                    checked={showroom.includes(item)}
                                    onChange={handleShowroomChange}
                                  />
                                }
                              />
                            ))}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='state__address'>
                        <p className='font-bold text-underline'>STATE BY THE ADDRESS</p>
                        <div className='flex flex-col mb-20'>
                          <FormGroup>
                            <FormControlLabel
                              value="stateAll"
                              label="All"
                              control={
                                <Checkbox
                                  checked={allStates}
                                  onChange={() => isAllChecked('state-address')}
                                />
                              }
                            />
                            {/* <FormControl variant='outlined' className={classes.formControl}>
                              <InputLabel id="demo-simple-select-outlined-label">Showroom</InputLabel>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="showRoomId"
                                label="Showroom"
                                defaultValue={form?.showRoomId}
                                value={form?.showRoomId}
                                // helperText={errors.showRoomId}
                                name="showRoomId"
                                onChange={handleChange}
                              >
                                {showRooms.map((row) => (
                                  <MenuItem key={row?.showRoomId} value={row?.showRoomId}>
                                    {row?.locationName}
                                  </MenuItem>
                                ))}
                              </Select>
                              {errors.showRoomId && (
                                <FormHelperText>Select Showroom from the list</FormHelperText>
                              )}
                            </FormControl> */}

                            <FormControl variant='outlined' className={classes.formControl}>
                              <Select
                                labelId="demo-simple-select-outlined-label"
                                id="demo-mutiple-name"
                                multiple
                                defaultValue={stateAddress}
                                value={stateAddress}
                                onChange={handleStateAddressChange}
                                input={<Input />}
                                MenuProps={MenuProps}
                              >
                                {stateList.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </FormGroup>
                        </div>
                        <TextField
                          className="mt-8 mr-40"
                          required
                          label="Zip Code"
                          id="zipCode"
                          type="number"
                          name="zipCode"
                          value={form?.zipCode}
                          onChange={handleChange}
                          variant="outlined"
                          small
                        />
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className='gender mb-20'>
                        <p className='font-bold text-underline'>GENDER</p>
                        <div className='flex flex-col'>
                          <FormGroup>
                            <FormControlLabel
                              label="All"
                              value="genderAll"
                              control={
                                <Checkbox
                                  checked={allGenders}
                                  onChange={() => isAllChecked('gender')}
                                />
                              }
                            />
                            {genderList.map((item, index) => (
                              <FormControlLabel
                                key={index}
                                label={item}
                                value={item}
                                control={
                                  <Checkbox
                                    checked={gender.includes(item)}
                                    onChange={handleGenderChange}
                                  />
                                }
                              />
                            ))}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='order__type mb-20'>
                        <p className='font-bold text-underline'>ORDER TYPE</p>
                        <div className='flex flex-col'>
                          <FormGroup>
                            <FormControlLabel
                              label="All"
                              value="orderTypeAll"
                              control={
                                <Checkbox
                                  checked={allOrders}
                                  onChange={() => isAllChecked('orders')}
                                />
                              }
                            />
                            {orderTypeList.map((item, index) => (
                              <FormControlLabel
                                key={index}
                                label={item}
                                value={item}
                                control={
                                  <Checkbox
                                    checked={orderType.includes(item)}
                                    onChange={handleOrderTypeChange}
                                  />
                                }
                              />
                            ))}
                          </FormGroup>
                        </div>
                      </div>
                      <div className='ethnicity'>
                        <p className='font-bold text-underline'>ETHENICITY</p>
                        <div className='flex flex-col'>
                          <FormGroup>
                            <FormControlLabel
                              label="All"
                              value="ethnicityAll"
                              control={
                                <Checkbox
                                  checked={allEthnicities}
                                  onChange={() => isAllChecked('ethnicity')}
                                />
                              }
                            />
                            {ethnicityList.map((item, index) => (
                              <FormControlLabel
                                key={index}
                                label={item}
                                value={item}
                                control={
                                  <Checkbox
                                    checked={ethnicity.includes(item)}
                                    onChange={handleEthnicityChange}
                                  />
                                }
                              />
                            ))}
                          </FormGroup>

                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className='age__range'>
                        <p className='font-bold text-underline'>AGE RANGE</p>
                        <div className='flex flex-col mb-20'>
                          <FormGroup>
                            <FormControlLabel
                              label="All"
                              value="ageRangeAll"
                              control={
                                <Checkbox
                                  checked={allAgeRanges}
                                  onChange={() => isAllChecked('age-range')}
                                />
                              }
                            />
                            {ageRangeList.map((item, index) => (
                              <FormControlLabel
                                key={index}
                                label={item}
                                value={item}
                                control={
                                  <Checkbox
                                    checked={ageRange.includes(item)}
                                    onChange={handleAgeRangeChange}
                                  />
                                }
                              />
                            ))}
                          </FormGroup>

                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex pt-20 px-20 pb-40'>
                    <Button
                      className={classes.button}
                      variant="contained"
                      value="clear"
                      fullWidth
                      onClick={reset}
                    >
                      Clear All
                    </Button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
};
