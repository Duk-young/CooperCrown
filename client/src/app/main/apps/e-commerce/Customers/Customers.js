import './App.mobile.css';
import './Search.css';
import './Themes.css';
import { algoliaDefaultRanking, toastAttributes } from '../ReusableComponents/HelperFunctions';
import { connectHits, Pagination, InstantSearch, SearchBox, HitsPerPage, Configure, connectStateResults } from 'react-instantsearch-dom';
import { IconButton } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useForm } from '@fuse/hooks';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch';
import Button from '@material-ui/core/Button';
import CachedIcon from '@material-ui/icons/Cached';
import clsx from 'clsx';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
import moment from 'moment';
import React, { useState } from 'react';
import reducer from '../store/reducers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: 160,
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

const CustomHits = connectHits(({ hits, props, setisLoading, setSearchClient }) => {

  const [currentSort, setCurrentSort] = useState(null)
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  const changeSort = async (columnName, currentSort) => {

    let attributeToSet = currentSort === `asc(${columnName})` ? `desc(${columnName})` : `asc(${columnName})`

    try {
      setisLoading(true)
      const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_UPDATE_SETTINGS_KEY)
      const index = client.initIndex('customers')

      index.setSettings({ ranking: [attributeToSet, ...algoliaDefaultRanking] }).then(() => {
        setCurrentSort(attributeToSet);

        setTimeout(() => {
          setSearchClient(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))
          setisLoading(false)
        }, 1000);
      }).catch((err) => {
        console.error('Error updating index settings:', err);
        setisLoading(false);
      })

    } catch (error) {
      console.error('Error updating index settings:', error);
    }
  }

  return (
    <Table stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow className='truncate cursor-pointer'>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell onClick={() => changeSort('firstName', currentSort)}>FIRST NAME {currentSort === 'asc(firstName)' && <ExpandMoreIcon />}
            {currentSort === 'desc(firstName)' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => changeSort('lastName', currentSort)}>LAST NAME {currentSort === 'asc(lastName)' && <ExpandMoreIcon />}
            {currentSort === 'desc(lastName)' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => changeSort('dob', currentSort)}>D.O.B {currentSort === 'asc(dob)' && <ExpandMoreIcon />}
            {currentSort === 'desc(dob)' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => changeSort('gender', currentSort)}>GENDER {currentSort === 'asc(gender)' && <ExpandMoreIcon />}
            {currentSort === 'desc(gender)' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => changeSort('state', currentSort)}>STATE {currentSort === 'asc(state)' && <ExpandMoreIcon />}
            {currentSort === 'desc(state)' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => changeSort('zipCode', currentSort)}>ZIP CODE {currentSort === 'asc(zipCode)' && <ExpandMoreIcon />}
            {currentSort === 'desc(zipCode)' && <ExpandLessIcon />}</StyledTableCell>
          <StyledTableCell onClick={() => changeSort('phone1', currentSort)}>PHONE {currentSort === 'asc(phone1)' && <ExpandMoreIcon />}
            {currentSort === 'desc(phone1)' && <ExpandLessIcon />}</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.map((hit) => (
          <StyledTableRow
            key={hit.objectID}
            hover
            className="cursor-pointer truncate"
            onClick={() => {
              if (userData.userRole === 'admin' || userData?.customersView) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${hit.customerId}`
                );
              } else {
                toast.error('You are not authorized', toastAttributes);
              }
            }}>
            <StyledTableCell component="th" scope="row">
              {hit?.customCustomerId}
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

const StyledDatePicker = withStyles((theme) => ({
  root: {
    '& label.Mui-focused': {
      color: 'white'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'yellow'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'yellow'
      }
    }
  }
}))(TextField);

function Customers(props) {
  const classes = useStyles(props);
  const { form, handleChange } = useForm(null);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);
  const [isLoading, setisLoading] = useState(false)
  const [searchClient, setSearchClient] = useState(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))

  const ResultStats = connectStateResults(
    ({ searching }) =>
      (searching || isLoading) ? (<LoadingDialog />) : (<div></div>)
  );

  return (
    <div className="flex w-full overflow-hidden">
      <InstantSearch
        searchClient={searchClient}
        indexName="customers"
        refresh>
        <div className="flex flex-col w-full">
          <div className={clsx(classes.header)}>
            <div className="flex flex-row p-4 w-full justify-center items-center">
              <Configure
                filters={`dob: ${form?.start ? new Date(form?.start).setHours(0, 0, 0, 0) : -2208988800000
                  } TO ${form?.end ? new Date(form?.end).setHours(23, 59, 59, 0) : new Date().getTime()
                  }`}
              />
              <Typography
                className="hidden sm:flex mx-0 sm:mx-12 uppercase"
                style={{ fontSize: '3rem', fontWeight: 600 }}
                variant="h6">
                Customer
              </Typography>
              <IconButton color='secondary' onClick={() => {
                setSearchClient(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))
              }}>
                <CachedIcon />
              </IconButton>
            </div>
            <div className="flex pt-32 pb-16 items-center">
              <div className="flex flex-col w-1/3 mt-0 px-6">
                <div className="flex flex-row justify-around gap-8">
                  <div className="w-full flex gap-10 date-input justify-around">
                    <StyledDatePicker
                      id="date"
                      label="Start Date"
                      type="date"
                      value={form?.start}
                      variant="outlined"
                      style={{ border: 'none' }}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: 'white' }
                      }}
                      InputProps={{
                        inputProps: {
                          style: { color: 'white', fontSize: '10px' }
                        }
                      }}
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: 'start',
                            value: e.target.value
                          }
                        });
                      }}
                    />
                    <StyledDatePicker
                      id="date"
                      label="End Date"
                      type="date"
                      value={form?.end}
                      variant="outlined"
                      style={{ border: 'none' }}
                      InputLabelProps={{
                        shrink: true,
                        style: { color: 'white' }
                      }}
                      InputProps={{
                        inputProps: {
                          style: { color: 'white', fontSize: '10px' }
                        }
                      }}
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: 'end',
                            value: e.target.value
                          }
                        });
                      }}
                    />
                  </div>
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
                </div>
                <div className="">
                  <Button
                    className={classes.button}
                    onClick={() => {
                      if (userData.userRole === 'admin' || userData?.customersCreate) {
                        props.history.push('/apps/e-commerce/create-customer')
                      } else {
                        toast.error('You are not authorized', toastAttributes);
                      }
                    }
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
          <ResultStats />
          <TableContainer
            stickyHeader
            className="flex flex-col w-full overflow-scroll">
            <CustomHits props={props} setSearchClient={setSearchClient} setisLoading={setisLoading} />
          </TableContainer>
          <div className="flex flex-row justify-center">
            <div className="flex flex-1"></div>
            <div className="flex flex-1 justify-center mt-8"><Pagination showLast={true} /></div>
            <div className="flex flex-1"></div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(Customers);
