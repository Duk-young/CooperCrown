import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { KeyboardTimePicker } from '@material-ui/pickers';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import reducer from '../../store/reducers';

function UpdateCustomerForm(props) {
  const { form, handleChange, error } = props;
  const [state, setState] = useState(form?.state);

  const defaultFamilies = {
    options: top100Films,
    getOptionLabel: (option) => option.title || option
  };

  const defaultStates = {
    options: states,
    getOptionLabel: (option) => option.name || option
  };

  useEffect(() => {}, [form]);

  return (
    <div className="p-16 sm:p-24 max-w-2xl">
      <div className="flex flex-col">
        <div className="flex flex-row items-center flex-wrap">
          <div className="flex w-1/2">
            <TextField
              className="mt-8 mb-16"
              error={error?.firstName}
              required
              label="First Name"
              autoFocus
              id="first-name"
              name="firstName"
              value={form?.firstName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex w-1/2 pl-10">
            <TextField
              className="mt-8 mb-16"
              error={error?.lastName}
              required
              label="Last Name"
              id="last-name"
              name="lastName"
              value={form?.lastName}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
        </div>

        <div className="flex">
          <Typography
            className="username text-16 whitespace-no-wrap self-center"
            color="inherit">
            Date of Birth
          </Typography>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justifyContent="start">
              <KeyboardDatePicker
                className="ml-24"
                margin="normal"
                id="date-picker-dialog"
                format="MM/dd/yyyy"
                value={form?.dob}
                onChange={(date) => {
                  handleChange({ target: { name: 'dob', value: date } });
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change date'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </div>

        <div className="flex mt-10">
          <Typography
            className={`username text-16 whitespace-no-wrap self-center ${
              error?.gender ? 'text-red' : ''
            } `}
            color="inherit">
            Gender
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup
              className="ml-60"
              row
              aria-label="gender"
              name="gender"
              value={form?.gender}
              onChange={handleChange}>
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel value="Male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="flex">
          <Typography
            className="username text-16 whitespace-no-wrap self-center"
            color="inherit">
            ETHNICITY
          </Typography>
          <FormControl className="ml-32 ">
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="ethnicityId"
              defaultValue={form?.ethnicity}
              value={form?.ethnicity}
              name="ethnicity"
              onChange={handleChange}
              error={error?.ethnicity}
              autoWidth>
              <MenuItem value={'White'}>White</MenuItem>
              <MenuItem value={'Black'}>Black</MenuItem>
              <MenuItem value={'Asian'}>Asian</MenuItem>
              <MenuItem value={'Amerindian'}>Amerindian</MenuItem>
              <MenuItem value={'Hawaiian'}>Hawaiian</MenuItem>
              <MenuItem value={'Mixed Ethnicity'}>Mixed Ethnicity</MenuItem>
            </Select>
            <FormHelperText>Select from the list</FormHelperText>
          </FormControl>
          <Typography
            className="ml-96 username text-16 whitespace-no-wrap self-center"
            color="inherit">
            State
          </Typography>
          <div
            className="stateAutocomplete"
            style={{ width: 300, marginLeft: 20 }}>
            <Autocomplete
              {...defaultStates}
              id="stateId"
              value={form?.state}
              getOptionSelected={(option, value) => option.name === value}
              inputValue={state}
              onInputChange={(e, value) => setState(value)}
              name="state"
              onChange={(_, value) =>
                handleChange({ target: { value: value?.name, name: 'state' } })
              }
              renderInput={(params) => (
                <TextField {...params} label="State Name" margin="normal" />
              )}
            />
          </div>
        </div>
        <TextField
          className="mt-10"
          id="outlined-multiline-static"
          label="Address"
          multiline
          rows={4}
          defaultValue={'House#'}
          error={error?.address}
          value={form?.address}
          onChange={handleChange}
          name={'address'}
          variant="outlined"
        />

        <div className="flex flex-row items-center flex-wrap">
          <div className="flex w-1/2">
            <TextField
              className="mt-8 mb-16"
              required
              error={error?.city}
              label="City"
              id="city"
              name="city"
              value={form?.city}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex w-1/2 pl-10">
            <TextField
              className="mt-8 mb-16"
              required
              error={error?.zipCode}
              label="ZIP Code"
              id="zip-code"
              name="zipCode"
              value={form?.zipCode}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
        </div>

        <div className="flex flex-row items-center flex-wrap">
          <div className="flex w-1/3">
            <TextField
              className="mt-8 mb-16"
              required
              label="Phone 1"
              id="phone1"
              name="phone1"
              error={error?.phone1}
              value={form?.phone1}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex w-1/3 pl-10">
            <TextField
              className="mt-8 mb-16"
              required
              label="Phone 2"
              id="phone2"
              name="phone2"
              value={form?.phone2}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div className="flex w-1/3 pl-10">
            <TextField
              className="mt-8 mb-16"
              required
              label="Email"
              id="email"
              name="email"
              error={error?.email}
              value={form?.email}
              onChange={handleChange}
              variant="outlined"
              fullWidth
            />
          </div>
        </div>
        <TextField
          className="mt-8 mb-16"
          error={form?.code === ''}
          required
          label="Other Information"
          id="other"
          name="other"
          value={form?.other}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
        <div style={{ width: 300 }}>
          <Autocomplete
            {...defaultFamilies}
            id="family"
            freeSolo
            inputValue={form?.family}
            // onInputChange={(_, value) =>
            //   handleChange({ target: { value, name: 'family' } })
            // }
            value={form?.family}
            name="family"
            onChange={(_, value) =>
              handleChange({ target: { value: value?.title, name: 'family' } })
            }
            renderInput={(params) => (
              <TextField {...params} label="Family Name" margin="normal" />
            )}
          />
        </div>
      </div>
    </div>
  );
}

const top100Films = [
  { title: 'The Shawshank Redemption' },
  { title: 'The Godfather' },
  { title: 'The Godfather: Part II' },
  { title: 'The Dark Knight' },
  { title: '12 Angry Men' },
  { title: "Schindler's List" },
  { title: 'Pulp Fiction' },
  { title: 'The Lord of the Rings: The Return of the King' },
  { title: 'The Good, the Bad and the Ugly' },
  { title: 'Fight Club' },
  { title: 'The Lord of the Rings: The Fellowship of the Ring' },
  { title: 'Star Wars: Episode V - The Empire Strikes Back' },
  { title: 'Forrest Gump' },
  { title: 'Inception' },
  { title: 'The Lord of the Rings: The Two Towers' },
  { title: "One Flew Over the Cuckoo's Nest" },
  { title: 'Goodfellas' },
  { title: 'The Matrix' },
  { title: 'Seven Samurai' },
  { title: 'Star Wars: Episode IV - A New Hope' }
];

const states = [
  {
    name: 'Alabama',
    abbreviation: 'AL'
  },
  {
    name: 'Alaska',
    abbreviation: 'AK'
  },
  {
    name: 'American Samoa',
    abbreviation: 'AS'
  },
  {
    name: 'Arizona',
    abbreviation: 'AZ'
  },
  {
    name: 'Arkansas',
    abbreviation: 'AR'
  },
  {
    name: 'California',
    abbreviation: 'CA'
  },
  {
    name: 'Colorado',
    abbreviation: 'CO'
  },
  {
    name: 'Connecticut',
    abbreviation: 'CT'
  },
  {
    name: 'Delaware',
    abbreviation: 'DE'
  },
  {
    name: 'District Of Columbia',
    abbreviation: 'DC'
  },
  {
    name: 'Federated States Of Micronesia',
    abbreviation: 'FM'
  },
  {
    name: 'Florida',
    abbreviation: 'FL'
  },
  {
    name: 'Georgia',
    abbreviation: 'GA'
  },
  {
    name: 'Guam',
    abbreviation: 'GU'
  },
  {
    name: 'Hawaii',
    abbreviation: 'HI'
  },
  {
    name: 'Idaho',
    abbreviation: 'ID'
  },
  {
    name: 'Illinois',
    abbreviation: 'IL'
  },
  {
    name: 'Indiana',
    abbreviation: 'IN'
  },
  {
    name: 'Iowa',
    abbreviation: 'IA'
  },
  {
    name: 'Kansas',
    abbreviation: 'KS'
  },
  {
    name: 'Kentucky',
    abbreviation: 'KY'
  },
  {
    name: 'Louisiana',
    abbreviation: 'LA'
  },
  {
    name: 'Maine',
    abbreviation: 'ME'
  },
  {
    name: 'Marshall Islands',
    abbreviation: 'MH'
  },
  {
    name: 'Maryland',
    abbreviation: 'MD'
  },
  {
    name: 'Massachusetts',
    abbreviation: 'MA'
  },
  {
    name: 'Michigan',
    abbreviation: 'MI'
  },
  {
    name: 'Minnesota',
    abbreviation: 'MN'
  },
  {
    name: 'Mississippi',
    abbreviation: 'MS'
  },
  {
    name: 'Missouri',
    abbreviation: 'MO'
  },
  {
    name: 'Montana',
    abbreviation: 'MT'
  },
  {
    name: 'Nebraska',
    abbreviation: 'NE'
  },
  {
    name: 'Nevada',
    abbreviation: 'NV'
  },
  {
    name: 'New Hampshire',
    abbreviation: 'NH'
  },
  {
    name: 'New Jersey',
    abbreviation: 'NJ'
  },
  {
    name: 'New Mexico',
    abbreviation: 'NM'
  },
  {
    name: 'New York',
    abbreviation: 'NY'
  },
  {
    name: 'North Carolina',
    abbreviation: 'NC'
  },
  {
    name: 'North Dakota',
    abbreviation: 'ND'
  },
  {
    name: 'Northern Mariana Islands',
    abbreviation: 'MP'
  },
  {
    name: 'Ohio',
    abbreviation: 'OH'
  },
  {
    name: 'Oklahoma',
    abbreviation: 'OK'
  },
  {
    name: 'Oregon',
    abbreviation: 'OR'
  },
  {
    name: 'Palau',
    abbreviation: 'PW'
  },
  {
    name: 'Pennsylvania',
    abbreviation: 'PA'
  },
  {
    name: 'Puerto Rico',
    abbreviation: 'PR'
  },
  {
    name: 'Rhode Island',
    abbreviation: 'RI'
  },
  {
    name: 'South Carolina',
    abbreviation: 'SC'
  },
  {
    name: 'South Dakota',
    abbreviation: 'SD'
  },
  {
    name: 'Tennessee',
    abbreviation: 'TN'
  },
  {
    name: 'Texas',
    abbreviation: 'TX'
  },
  {
    name: 'Utah',
    abbreviation: 'UT'
  },
  {
    name: 'Vermont',
    abbreviation: 'VT'
  },
  {
    name: 'Virgin Islands',
    abbreviation: 'VI'
  },
  {
    name: 'Virginia',
    abbreviation: 'VA'
  },
  {
    name: 'Washington',
    abbreviation: 'WA'
  },
  {
    name: 'West Virginia',
    abbreviation: 'WV'
  },
  {
    name: 'Wisconsin',
    abbreviation: 'WI'
  },
  {
    name: 'Wyoming',
    abbreviation: 'WY'
  }
];

export default withReducer('eCommerceApp', reducer)(UpdateCustomerForm);
