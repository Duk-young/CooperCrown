import _ from '@lodash';
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
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import reducer from '../../store/reducers';
import { firestore } from 'firebase';
import { result } from 'lodash';

function UpdateCustomerForm(props) {
  const { form, handleChange, setInForm, error } = props;
  const [rows, setRows] = useState('');

  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title
  };

  const flatProps = {
    options: top100Films.map((option) => option.title)
  };
  console.log(rows.firstName);
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
              defaultValue={rows.firstName}
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
              <FormControlLabel value="male" control={<Radio />} label="Male" />
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
          <FormControl className="ml-32">
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="ethnicityId"
              value={form?.ethnicity}
              name="ethnicity"
              onChange={handleChange}
              error={error?.ethnicity}
              autoWidth>
              <MenuItem value="">
                <em>...</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirtykjdsfkjhsdkjfhskdfh</MenuItem>
            </Select>
            <FormHelperText>Select from the list</FormHelperText>
          </FormControl>
          <Typography
            className="ml-20 username text-16 whitespace-no-wrap self-center"
            color="inherit">
            State
          </Typography>
          <FormControl className="ml-32">
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="stateId"
              value={form?.state}
              error={error?.state}
              name="state"
              onChange={handleChange}
              autoWidth>
              <MenuItem value="">
                <em>...</em>
              </MenuItem>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirtykjdsfkjhsdkjfhskdfh</MenuItem>
            </Select>
            <FormHelperText>Select from the list</FormHelperText>
          </FormControl>
        </div>
        <TextField
          className="mt-10"
          id="outlined-multiline-static"
          label="Address"
          multiline
          rows={4}
          defaultValue={result.address}
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
              error={form?.code === ''}
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
              error={form?.code === ''}
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
              error={form?.code === ''}
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
              error={form?.code === ''}
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
              error={form?.code === ''}
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
            {...defaultProps}
            id="family"
            value={form?.family}
            name="family"
            onChange={(event, value) =>
              handleChange({ target: { value, name: 'family' } })
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
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  { title: 'The Lord of the Rings: The Return of the King', year: 2003 },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  { title: 'The Lord of the Rings: The Fellowship of the Ring', year: 2001 },
  { title: 'Star Wars: Episode V - The Empire Strikes Back', year: 1980 },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  { title: 'The Lord of the Rings: The Two Towers', year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  { title: 'Star Wars: Episode IV - A New Hope', year: 1977 },
  { title: 'City of God', year: 2002 },
  { title: 'Se7en', year: 1995 },
  { title: 'The Silence of the Lambs', year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: 'Life Is Beautiful', year: 1997 },
  { title: 'The Usual Suspects', year: 1995 },
  { title: 'Léon: The Professional', year: 1994 },
  { title: 'Spirited Away', year: 2001 },
  { title: 'Saving Private Ryan', year: 1998 },
  { title: 'Once Upon a Time in the West', year: 1968 },
  { title: 'American History X', year: 1998 },
  { title: 'Interstellar', year: 2014 }
];

export default withReducer('eCommerceApp', reducer)(UpdateCustomerForm);
