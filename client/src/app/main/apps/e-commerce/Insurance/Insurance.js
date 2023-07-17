import { firestore } from 'firebase';
import { Link } from 'react-router-dom';
import { useForm } from '@fuse/hooks';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import LoadingDialog from '../ReusableComponents/LoadingDialog';
import moment from 'moment'
import React, { useState, useEffect } from 'react';
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
import {
  connectHits,
  Pagination,
  InstantSearch,
  SearchBox,
  HitsPerPage,
  SortBy,
  Configure,
  connectStateResults
} from 'react-instantsearch-dom';

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

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY);

const CustomHits = connectHits(({ hits, payments, props }) => {
  return (
    <Table stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow className='truncate'>
          <StyledTableCell>DATE</StyledTableCell>
          <StyledTableCell>LOCATION</StyledTableCell>
          <StyledTableCell>ID</StyledTableCell>
          <StyledTableCell>ORDER No</StyledTableCell>
          <StyledTableCell>NAME</StyledTableCell>
          <StyledTableCell>DOB</StyledTableCell>
          <StyledTableCell>INSURANCE</StyledTableCell>
          <StyledTableCell>POLICY No.</StyledTableCell>
          <StyledTableCell>CLAIM AMOUNT</StyledTableCell>
          <StyledTableCell>RECEIVED AMOUNT</StyledTableCell>
          <StyledTableCell>STATUS</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.map((hit) => (
          <StyledTableRow key={hit.objectID} hover className="cursor-pointer truncate">
            <StyledTableCell
              component="th"
              scope="row"
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>
              {moment(hit?.orderDate).format('MM/DD/YYYY')}
            </StyledTableCell>
            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>
              {hit?.locationName}
            </StyledTableCell>
            <StyledTableCell>
              <Link to={`/apps/e-commerce/customers/profile/${hit.customerId}`}>
                <h3 className="text-black">{hit?.customerId}</h3>
              </Link>
            </StyledTableCell>
            <StyledTableCell>
              <Link to={`/apps/e-commerce/orders/vieworder/${hit.orderId}`}>
                <h3 className="text-black">{hit?.orderId}</h3>
              </Link>
            </StyledTableCell>

            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>{`${hit?.firstName} ${hit?.lastName}`}</StyledTableCell>
            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>{hit?.dob ? moment(hit?.dob).format('MM/DD/YYYY') : ''}</StyledTableCell>
            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>
              {hit?.insuranceCompany}
            </StyledTableCell>
            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>
              {hit?.policyNo}
            </StyledTableCell>
            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>{`$ ${hit?.insuranceCost}`}</StyledTableCell>
            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>
              ${' '}
              {payments
                .filter(
                  ({ insuranceClaimId }) =>
                    insuranceClaimId === hit?.insuranceClaimId
                )
                .reduce((a, b) => +a + +b.amount, 0)}
            </StyledTableCell>
            <StyledTableCell
              onClick={() => {
                props.history.push(
                  `/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`
                );
              }}>
              {hit?.claimStatus}
            </StyledTableCell>
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

function Insurance(props) {
  const classes = useStyles(props);
  const [isLoading, setisLoading] = useState(true);
  const [payments, setPayments] = useState(true);
  const { form, handleChange } = useForm(null);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);


  useEffect(() => {
    setisLoading(true);

    const fetchData = async () => {
      const queryPayments = await firestore()
        .collection('insurancePayments')
        .get();
      let resultPayments = [];
      queryPayments.forEach((doc) => {
        resultPayments.push(doc.data());
      });
      setPayments(resultPayments);
      setisLoading(false);
    };

    fetchData();
  }, []);

  const ResultStats = connectStateResults(
    ({ searching }) =>
      searching ? (<LoadingDialog />) : (<div></div>)
  );

  if (isLoading) return <FuseLoading />;


  return (
    <div className="flex w-full overflow-hidden">
      <InstantSearch
        searchClient={searchClient}
        indexName="insuranceClaims"
        refresh>
        <div className="flex flex-col w-full">
          <div className={clsx(classes.header)}>
            <div className="flex flex-row p-4 w-full justify-center">
              <Configure
                filters={`orderDate: ${form?.start ? new Date(form?.start).setHours(0, 0, 0, 0) : -2208988800000
                  } TO ${form?.end ? new Date(form?.end).setHours(23, 59, 59, 0) : new Date().getTime()
                  } ${userData?.userRole === 'staff' ? `AND locationName: '${userData?.locationName}'` : ''}`}
              />
              <Typography
                className="hidden sm:flex mx-0 sm:mx-12 uppercase"
                style={{ fontSize: '3rem', fontWeight: 600 }}
                variant="h6">
                INSURANCE
              </Typography>
            </div>
            <div className="flex pt-32 pb-16 pl-8 items-center">
              <div className="flex flex-col w-1/3 mt-0 px-12">
                <div className="flex flex-row justify-around gap-8">
                  <div className="w-full flex gap-10">
                    <StyledDatePicker
                      id="date"
                      label="Start Date"
                      type="date"
                      value={form?.start}
                      variant="outlined"
                      style={{ border: 'none' }}
                      name='start'
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
                        handleChange(e)
                        console.log(new Date(form?.start).setHours(0, 0, 0, 0))
                      }}
                    />
                    <StyledDatePicker
                      id="date" 
                      label="End Date"
                      type="date"
                      value={form?.end}
                      name='end'
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
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-1/3 border-1 headerSearch">
                <SearchBox
                  translations={{
                    placeholder: 'Search for claims...'
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
                <div>
                  <HitsPerPage
                    defaultRefinement={50}
                    items={[
                      { value: 50, label: 'Show 50' },
                      { value: 100, label: 'Show 100' },
                      { value: 200, label: 'Show 200' }
                    ]}
                  />
                </div>
                <div>
                  <SortBy
                    className="w-full"
                    defaultRefinement="insuranceClaims"
                    items={[
                      { value: 'insuranceClaims', label: 'By Date' },
                      // { value: 'insuranceClaimsIdAsc', label: 'ID (Asc)' },
                      // { value: 'insuranceClaimsIdAsc', label: 'ID (Desc)' },
                      { value: 'insuranceClaimsOrderAsc', label: 'Order ID (Asc)' },
                      { value: 'insuranceClaimsOrderDesc', label: 'Order ID (Desc)' },
                      { value: 'insuranceClaimAmountAsc', label: 'Amount (Asc)' },
                      { value: 'insuranceClaimAmountDesc', label: 'Amount (Desc)' }
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
          <ResultStats />
          <TableContainer
            stickyHeader
            className="flex flex-col w-full overflow-scroll">
            <CustomHits payments={payments} props={props} />
          </TableContainer>
          <div className="flex flex-row justify-center">
            <Pagination showLast={true} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(Insurance);
