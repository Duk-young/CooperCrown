import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import { withStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import { withRouter } from 'react-router';
import '../Customers/Search.css';
import '../Customers/Themes.css';
import '../Customers/App.mobile.css';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const Hits = ({ hits }) => (
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>Date</StyledTableCell>
        <StyledTableCell>Order ID</StyledTableCell>
        <StyledTableCell>Customer ID</StyledTableCell>
        <StyledTableCell>Name</StyledTableCell>
        <StyledTableCell>Insurance</StyledTableCell>
        <StyledTableCell>Policy No.</StyledTableCell>
        <StyledTableCell>Claim Amount</StyledTableCell>
        <StyledTableCell>Received Amount</StyledTableCell>
        <StyledTableCell>Status</StyledTableCell>
        <StyledTableCell>Options</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {hits.map((hit) => (
        <StyledTableRow key={hit.objectID} hover>
          <StyledTableCell component="th" scope="row">
            {moment(hit?.orderDate).format('MM-DD-YYYY')}
          </StyledTableCell>
          <StyledTableCell>{hit?.orderId}</StyledTableCell>
          <StyledTableCell>{hit?.customerId}</StyledTableCell>
          <StyledTableCell>{`${hit?.firstName} ${hit?.lastName}`}</StyledTableCell>
          <StyledTableCell>{hit?.insuranceCompany}</StyledTableCell>
          <StyledTableCell>{hit?.policyNo}</StyledTableCell>
          <StyledTableCell>{`$ ${hit?.insuranceCost}`}</StyledTableCell>
          <StyledTableCell>
            {hit?.receivedAmount ? hit?.receivedAmount : `$ 0`}
          </StyledTableCell>
          <StyledTableCell>{hit?.claimStatus}</StyledTableCell>
          <StyledTableCell>
            <Link
              to={`/apps/e-commerce/customers/profile/${hit.customerId}`}
              className="btn btn-primary">
              <IconButton aria-label="view">
                <PageviewOutlinedIcon fontSize="small" />
              </IconButton>
            </Link>
            <Link
              to={`/apps/e-commerce/customers/${hit.customerId}`}
              className="btn btn-primary">
              <IconButton aria-label="edit">
                <EditIcon fontSize="small" />
              </IconButton>
            </Link>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
);
const CustomHits = connectHits(Hits);

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
  return (
    <div className="flex w-full ">
      <TableContainer
        component={Paper}
        className="flex flex-col w-full p-20 rounded-32 shadow-20">
        <InstantSearch searchClient={searchClient} indexName="insuranceClaims">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1"></div>
            <div className="flex flex-col flex-1 mb-10 shadow-10 rounded-12">
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
          <CustomHits />
        </InstantSearch>
      </TableContainer>
    </div>
  );
};

export default withRouter(InsuranceContent);
