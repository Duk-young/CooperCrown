// import './App.mobile.css';
// import './Search.css';
// import './Themes.css';
import { useForm } from '@fuse/hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import { firestore } from 'firebase';
import moment from 'moment';
import Paper from '@material-ui/core/Paper';
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

const useStyles = makeStyles((theme) => ({
  header: {
    height: 100,
    minHeight: 100,
    display: 'flex',
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
  const [lensTypes, setLensTypes] = useState([]);
  useEffect(() => {
    const fetchDetails = async () => {
      const lensPrice = (
        await firestore().collection('lensPrice').doc('lensPrice').get()
      ).data();
      var keys = Object.keys(lensPrice);
      let lensTypes = [];
      keys.forEach((row) => {
        lensTypes.push({ a: row.replace(/"/g, '') });
      });
      setLensTypes(lensTypes);
      // console.log(lensTypes)
      // console.log(lensTypes.length)
      // console.log(lensTypes[3]);
      for (let i = 0; i < lensTypes.length; i++) {
        console.log(lensTypes[i]);
      }
    };

    fetchDetails();
  }, []);
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
          <StyledTableCell> LENS TYPE</StyledTableCell>

        </TableRow>
      </TableHead>
      <TableBody>
        {lensTypes.map((hit) => (
          <StyledTableRow
            key={hit.id}
            hover
            className="cursor-pointer"
          // onClick={() => {
          //   props.history.push(
          //     `/apps/e-commerce/LensPrice/profile/${hit.customerId}`
          //   );
          // }} 
          >
            {console.log(hit.lensType)}
            <StyledTableCell component="th" scope="row">{hit.lensType}</StyledTableCell>
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
    color: theme.palette.common.black,
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

function LensPrice(props) {
  const classes = useStyles(props);
  const { form, handleChange } = useForm(null);


  return (
    <FusePageSimple
      content={
        <div className="flex w-full">
          <InstantSearch
            searchClient={searchClient}
            indexName="LensPrice"
            refresh>

            <div className="flex flex-col w-full">
              <div className={clsx(classes.header)}>
                <div className="flex flex-col w-1/3 mt-0 px-12">
                  <div className="flex flex-row p-4 justify-around">
                    <div className="flex-1 pl-30">
                      <h3 className="ml-40 hidden font-700 ">Hidden</h3>
                    </div> <div className="flex-1 pl-30">
                      <h3 className="ml-40 hidden font-700 ">Hidden</h3>
                    </div>
                    <div className="flex-1 pl-30">
                      <h3 className="ml-40 hidden font-700 ">Hidden</h3>
                    </div> <div className="flex-1 pl-30">
                      <h3 className="ml-40 hidden font-700 ">Hidden</h3>
                    </div>
                    <Icon className="text-32">people</Icon>
                    <Typography
                      className="hidden sm:flex mx-0 sm:mx-12"
                      variant="h6">
                      LensPrice
                    </Typography>

                  </div>
                  <div className="flex flex-row justify-around ">
                    <div className="flex-1 pl-30">
                      <h3 className="ml-40 hidden font-700 ">Hidden</h3>
                    </div>
                    <div className="flex-1 pl-30">
                      <h3 className="ml-40 hidden font-700 ">Hidden</h3>
                    </div>

                  </div>
                </div>
                <div className="flex flex-col w-1/3 pt-32 border-1 headerSearch">
                  <SearchBox
                    translations={{
                      placeholder: 'Searh for LensPrice...'
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
                <div className="flex flex-row w-1/3 pt-32 justify-around">
                  <div className="flex flex-col w-1/3 ">
                    <div className="flex-1 pl-30">
                      <h3 className="ml-40 hidden font-700 ">Hidden</h3>
                    </div>
                  </div>
                  <div className="pt-10">
                    <Button
                      className={classes.button}
                      onClick={() =>
                        props.history.push('/apps/e-commerce/lensPrice/new')
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

export default withReducer('eCommerceApp', reducer)(LensPrice);
