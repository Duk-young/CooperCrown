// import FuseLoading from '@fuse/core/FuseLoading';
import './App.mobile.css';
import './Search.css';
import './Themes.css';
import { connectHits } from 'react-instantsearch-dom';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles } from '@material-ui/core/styles';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Paper from '@material-ui/core/Paper';
import React from 'react';
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

const Hits = ({ hits }) => (
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>ID</StyledTableCell>
        <StyledTableCell>First Name</StyledTableCell>
        <StyledTableCell>Last Name</StyledTableCell>
        <StyledTableCell>D.O.B</StyledTableCell>
        <StyledTableCell>Last Exam</StyledTableCell>
        <StyledTableCell>Gender</StyledTableCell>
        <StyledTableCell>State</StyledTableCell>
        <StyledTableCell>Zip Code</StyledTableCell>
        <StyledTableCell>Phone</StyledTableCell>
        <StyledTableCell>Email</StyledTableCell>
        <StyledTableCell>Options</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {hits.map((hit) => (
        <StyledTableRow key={hit.objectID} hover>
          <StyledTableCell component="th" scope="row">
            {hit.customerId}
          </StyledTableCell>
          <StyledTableCell>{hit.firstName}</StyledTableCell>
          <StyledTableCell>{hit.lastName}</StyledTableCell>
          <StyledTableCell>
            {moment(hit.dob).format('MM-DD-YYYY')}
          </StyledTableCell>
          <StyledTableCell>
            {hit.lastExam
              ? moment(hit?.lastExam).format('MM-DD-YYYY')
              : 'No Exam'}
          </StyledTableCell>
          <StyledTableCell>{hit.gender}</StyledTableCell>
          <StyledTableCell>{hit.state}</StyledTableCell>
          <StyledTableCell>{hit.zipCode}</StyledTableCell>
          <StyledTableCell>{hit.phone1}</StyledTableCell>
          <StyledTableCell>{hit.email}</StyledTableCell>
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
            <Link
              to={`/apps/e-commerce/customers/addAppointment/${hit.customerId}`}
              className="btn btn-primary">
              <Button
                className="whitespace-no-wrap normal-case ml-24"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddToQueueIcon />}>
                Appointment
              </Button>
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
    fontSize: 14
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

const CustomersContent = (props) => {
  // const classes = useStyles();
  // const [isLoading, setisLoading] = useState(false);

  // if (isLoading) return <FuseLoading />;
  return (
    <div className="flex w-full ">
      <TableContainer
        component={Paper}
        className="flex flex-col w-full p-20 rounded-32 shadow-20">
        <InstantSearch searchClient={searchClient} indexName="customers">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1"></div>
            <div className="flex flex-col flex-1 mb-10 shadow-10 rounded-12">
              <SearchBox
                translations={{
                  placeholder: 'Searh for customers...'
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

export default withRouter(CustomersContent);
