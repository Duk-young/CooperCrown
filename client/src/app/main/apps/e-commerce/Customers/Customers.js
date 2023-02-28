import './App.mobile.css';
import './Search.css';
import './Themes.css';
import { useForm } from '@fuse/hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import reducer from '../store/reducers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import {
  connectHits,
  Pagination,
  InstantSearch,
  SearchBox,
  SortBy,
  HitsPerPage,
  Configure
} from 'react-instantsearch-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: 100,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
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

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const CustomHits = connectHits(({ hits, props }) => {
  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  return (
    <Table stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>FIRST NAME</StyledTableCell>
          <StyledTableCell>LAST NAME</StyledTableCell>
          <StyledTableCell>D.O.B</StyledTableCell>
          {/* <StyledTableCell>LAST EXAM</StyledTableCell> */}
          <StyledTableCell>GENDER</StyledTableCell>
          <StyledTableCell>STATE</StyledTableCell>
          <StyledTableCell>ZIP CODE</StyledTableCell>
          <StyledTableCell>PHONE</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.map((hit) => (
          <StyledTableRow
            key={hit.objectID}
            hover
            className="cursor-pointer"
            onClick={() => {
              props.history.push(
                `/apps/e-commerce/customers/profile/${hit.customerId}`
              );
            }}>
            <StyledTableCell component="th" scope="row">
              {hit.customerId}
            </StyledTableCell>
            <StyledTableCell>{hit.firstName}</StyledTableCell>
            <StyledTableCell>{hit.lastName}</StyledTableCell>
            <StyledTableCell>
              {moment(hit.dob).format('MM/DD/YYYY')}
            </StyledTableCell>
            {/* <StyledTableCell>
              {hit.lastExam
                ? moment(hit?.lastExam).format('MM/DD/YYYY')
                : 'No Exam'}
            </StyledTableCell> */}
            <StyledTableCell>{hit.gender}</StyledTableCell>
            <StyledTableCell>{hit.state}</StyledTableCell>
            <StyledTableCell>{hit.zipCode}</StyledTableCell>
            <StyledTableCell>{formatPhoneNumber(hit.phone1)}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
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

function Customers(props) {
  const classes = useStyles(props);
  const { form, handleChange } = useForm(null);

  return (
    <FusePageSimple
      content={
        <div className="flex w-full">
          <InstantSearch
            searchClient={searchClient}
            indexName="customers"
            refresh>
            <div className="flex flex-col w-full">
              <div className={clsx(classes.header)}>
                <div className="flex flex-row p-4 w-full justify-center">
                  <Configure
                    filters={`dob: ${
                      form?.start ? form?.start.getTime() : -2208988800000
                    } TO ${
                      form?.end ? form?.end.getTime() : new Date().getTime()
                    }`}
                  />
                  <Typography
                    className="hidden sm:flex mx-0 sm:mx-12 uppercase"
                    style={{ fontSize: '3rem', fontWeight: 600 }}
                    variant="h6">
                    Customer
                  </Typography>
                </div>
                <div className="flex pt-32 pb-16 pl-8 items-center">
                  <div className="flex flex-col w-1/3 mt-0 px-12">
                    <div className="flex flex-row justify-around gap-8">
                      <div className="date-picker w-full flex gap-10">
                        <TextField
                          id="date"
                          label="Start Date"
                          type="date"
                          defaultValue={form?.start} // Update with info from customer
                          value={form?.start}
                          variant="outlined"
                          style={{ border: 'none' }}
                          InputLabelProps={{
                            shrink: true,
                            style: { color: 'white' }
                          }}
                          InputProps={{
                            inputProps: {
                              style: { color: 'white' }
                            }
                          }}
                          onChange={(date) => {
                            handleChange({
                              target: { name: 'start', value: date }
                            });
                          }}
                        />
                        <TextField
                          id="date"
                          label="End Date"
                          type="date"
                          defaultValue={form?.end} // Update with info from customer
                          value={form?.end}
                          variant="outlined"
                          style={{ border: 'none' }}
                          InputLabelProps={{
                            shrink: true,
                            style: { color: 'white' }
                          }}
                          InputProps={{
                            inputProps: {
                              style: { color: 'white' }
                            }
                          }}
                          onChange={(date) => {
                            handleChange({
                              target: { name: 'end', value: date }
                            });
                          }}
                        />
                      </div>
                      {/* <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="start">
                          <KeyboardDatePicker
                            label="Start Date"
                            className="mt-0 bg-transparent"
                            margin="normal"
                            id="date-picker-dialog"
                            format="MM/dd/yyyy"
                            value={form?.start}
                            InputLabelProps={{
                              style: { color: 'white', marginLeft: 3 }
                            }}
                            InputProps={{
                              inputProps: {
                                style: { color: 'white', marginLeft: 3 }
                              }
                            }}
                            onChange={(date) => {
                              handleChange({
                                target: { name: 'start', value: date }
                              });
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="start">
                          <KeyboardDatePicker
                            label="End Date"
                            className="mt-0 bg-transparent"
                            margin="normal"
                            id="date-picker-dialog"
                            format="MM/dd/yyyy"
                            value={form?.end}
                            InputLabelProps={{
                              style: { color: 'white', marginLeft: 3 }
                            }}
                            InputProps={{
                              inputProps: {
                                style: { color: 'white', marginLeft: 3 }
                              }
                            }}
                            onChange={(date) => {
                              handleChange({
                                target: { name: 'end', value: date }
                              });
                            }}
                            KeyboardButtonProps={{
                              'aria-label': 'change date'
                            }}
                          />
                        </Grid>
                      </MuiPickersUtilsProvider> */}
                    </div>
                  </div>
                  <div className="flex flex-col w-1/3 border-1 headerSearch">
                    <SearchBox
                      translations={{
                        placeholder: 'Search for customers...'
                      }}
                      submit={
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 18 18">
                          <g
                            fill="none"
                            fillRule="evenodd"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.67"
                            transform="translate(1 1)">
                            <circle cx="7.11" cy="7.11" r="7.11" />
                            <path d="M16 16l-3.87-3.87" />
                          </g>
                        </svg>
                      }
                      reset={false}
                    />
                  </div>
                  <div className="flex flex-row w-1/3 justify-around items-center">
                    <div className="flex flex-col w-1/3 ">
                      <div className="flex flex-1 justify-center">
                        <HitsPerPage
                          defaultRefinement={50}
                          items={[
                            { value: 50, label: 'Show 50' },
                            { value: 100, label: 'Show 100' },
                            { value: 200, label: 'Show 200' }
                          ]}
                        />
                      </div>
                      {/* <h5>Sort By:</h5>
                      <SortBy
                        className="w-full"
                        defaultRefinement="customers"
                        items={[
                          { value: 'customers', label: 'Recently Updated' },
                          {
                            value: 'customersFirstName',
                            label: 'First Name (Asc)'
                          },
                          {
                            value: 'customersFirstNameDesc',
                            label: 'First Name (Desc)'
                          },
                          {
                            value: 'customersLastName',
                            label: 'Last Name (Asc)'
                          },
                          {
                            value: 'customersLastNameDesc',
                            label: 'Last Name (Desc)'
                          },
                          {
                            value: 'customersDOB',
                            label: 'Date of Birth (Asc)'
                          },
                          {
                            value: 'customersDOBDesc',
                            label: 'Date of Birth (Desc)'
                          },
                          {
                            value: 'customersLastExam',
                            label: 'Last Exam (Asc)'
                          },
                          {
                            value: 'customersLastExamDesc',
                            label: 'Last Exam (Desc)'
                          }
                        ]}
                      /> */}
                    </div>
                    <div className="">
                      <Button
                        className={classes.button}
                        onClick={() =>
                          props.history.push('/apps/e-commerce/create-customer')
                        }
                        // className="whitespace-no-wrap normal-case"
                        variant="contained"
                        color="secondary">
                        <span className="hidden sm:flex">ADD NEW</span>
                        <span className="flex sm:hidden">ADD</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <TableContainer
                stickyHeader
                component={Paper}
                className="flex flex-col w-full overflow-scroll">
                <CustomHits props={props} />
              </TableContainer>
              <div className="flex flex-row justify-center">
                <div className="flex flex-1"></div>
                <div className="flex flex-1 justify-center mt-8">
                  <Pagination />
                </div>
              </div>
            </div>
          </InstantSearch>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Customers);
