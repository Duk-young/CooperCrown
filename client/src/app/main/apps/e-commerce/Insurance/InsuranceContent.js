import '../Customers/App.mobile.css';
import '../Customers/Search.css';
import '../Customers/Themes.css';
import { connectHits } from 'react-instantsearch-dom';
import { firestore } from 'firebase';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { Link, useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import FuseLoading from '@fuse/core/FuseLoading';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const CustomHits = connectHits(({ hits, payments }) => {
  return (
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>DATE</StyledTableCell>
          <StyledTableCell>ORDER ID</StyledTableCell>
          <StyledTableCell>CUSTOMER ID</StyledTableCell>
          <StyledTableCell>NAME</StyledTableCell>
          <StyledTableCell>INSURANCE</StyledTableCell>
          <StyledTableCell>POLICY No.</StyledTableCell>
          <StyledTableCell>CLAIM AMOUNT</StyledTableCell>
          <StyledTableCell>RECEIVED AMOUNT</StyledTableCell>
          <StyledTableCell>STATUS</StyledTableCell>
          <StyledTableCell>OPTIONS</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits
          .sort((a, b) => (a.orderId > b.orderId ? -1 : 1))
          .map((hit) => (
            <StyledTableRow key={hit.objectID} hover>
              <StyledTableCell component="th" scope="row">
                {moment(hit?.orderDate).format('MM/DD/YYYY')}
              </StyledTableCell>
              <StyledTableCell>
                <Link to={`/apps/e-commerce/orders/vieworder/${hit.orderId}`}>
                  <h3 className="text-black">{hit?.orderId}</h3>
                </Link>
              </StyledTableCell>
              <StyledTableCell>
                <Link
                  to={`/apps/e-commerce/customers/profile/${hit.customerId}`}>
                  <h3 className="text-black">{hit?.customerId}</h3>
                </Link>
              </StyledTableCell>
              <StyledTableCell>{`${hit?.firstName} ${hit?.lastName}`}</StyledTableCell>
              <StyledTableCell>{hit?.insuranceCompany}</StyledTableCell>
              <StyledTableCell>{hit?.policyNo}</StyledTableCell>
              <StyledTableCell>{`$ ${hit?.insuranceCost}`}</StyledTableCell>
              <StyledTableCell>
                ${' '}
                {payments
                  .filter(
                    ({ insuranceClaimId }) =>
                      insuranceClaimId === hit?.insuranceClaimId
                  )
                  .reduce((a, b) => +a + +b.amount, 0)}
              </StyledTableCell>
              <StyledTableCell>{hit?.claimStatus}</StyledTableCell>
              <StyledTableCell>
                <Link
                  to={`/apps/e-commerce/insurances/viewclaim/${hit.insuranceClaimId}`}
                  className="btn btn-primary">
                  <IconButton aria-label="view">
                    <PageviewOutlinedIcon fontSize="small" />
                  </IconButton>
                </Link>
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

const InsuranceContent = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const routeParams = useParams();

  useEffect(() => {
    setisLoading(true);
    const id = routeParams.insuranceClaimId;
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
  }, [routeParams.insuranceClaimId]);
  if (isLoading) return <FuseLoading />;
  return (
    <div className="flex w-full ">
      <TableContainer component={Paper} className="flex flex-col w-full py-20">
        <InstantSearch searchClient={searchClient} indexName="insuranceClaims">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1"></div>
            <div className="flex flex-col flex-1 mb-10 border-1">
              <SearchBox
                translations={{
                  placeholder: 'Searh for Claims...'
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
              />
            </div>
            <div className="flex flex-col flex-1"></div>
          </div>
          <CustomHits payments={payments} />
        </InstantSearch>
      </TableContainer>
    </div>
  );
};

export default withRouter(InsuranceContent);
