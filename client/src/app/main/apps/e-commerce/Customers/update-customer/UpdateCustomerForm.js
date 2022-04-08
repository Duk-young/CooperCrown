import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import AddFamilyDialog from './AddFamilyDialog';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import DateFnsUtils from '@date-io/date-fns';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import React, { useEffect, useState } from 'react';
import reducer from '../../store/reducers';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    padding: 5,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 0,
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

// const useStyles = makeStyles({
//   table: {
//     minWidth: 45
//   }
// });

function UpdateCustomerForm(props) {
  const {
    form,
    handleChange,
    error,
    setForm,
    familyMembers,
    setFamilyMembers
  } = props;
  const [state, setState] = useState(form?.state);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const defaultStates = {
    options: states,
    getOptionLabel: (option) => option.name || option
  };

  useEffect(() => {}, [form]);

  return (
    <div className="flex flex-row ">
      <div className="p-16 sm:p-24 w-2/3">
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
                <FormControlLabel
                  value="Male"
                  control={<Radio />}
                  label="Male"
                />
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
                  handleChange({
                    target: { value: value?.name, name: 'state' }
                  })
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
        </div>
      </div>
      <div className="p-16 sm:p-24 w-1/3 mx-4 my-10 flex flex-row h-360 shadow-4 rounded-8">
        <div className="flex flex-col w-full">
          <AddFamilyDialog
            handleClose={handleClose}
            open={open}
            mainForm={form}
            setMainForm={setForm}
            familyMembers={familyMembers}
            setFamilyMembers={setFamilyMembers}
          />

          <div className="flex flex-col w-full h-288">
            <h1>Family Tree:</h1>
            <TableContainer className="flex flex-col w-full" component={Paper}>
              <Table
                // className={classes.table}
                stickyHeader
                aria-label="customized table">
                <TableHead>
                  <TableRow style={{ height: 10 }}>
                    <StyledTableCell>Sr#</StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>

                    <StyledTableCell>ID</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {familyMembers
                    .sort((a, b) => (a.customerId > b.customerId ? -1 : 1))
                    .map((row, index) => (
                      <StyledTableRow
                        key={row.customerId}
                        style={{ height: 10 }}>
                        <StyledTableCell>{index + 1}</StyledTableCell>
                        <StyledTableCell>{`${row?.lastName}, ${row?.firstName} `}</StyledTableCell>
                        <StyledTableCell>{row?.customerId}</StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="mb-6">
            <Fab
              onClick={() => {
                setOpen(true);
              }}
              variant="extended"
              color="primary"
              aria-label="add">
              <AddIcon />
              Add Family
            </Fab>
          </div>
        </div>
      </div>
    </div>
  );
}

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
