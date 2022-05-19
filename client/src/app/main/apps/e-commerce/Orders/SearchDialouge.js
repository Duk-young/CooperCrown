import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { Link } from 'react-router-dom';
import moment from 'moment';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const Hits = ({ hits }) => (
  <Table aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell>First Name</StyledTableCell>
        <StyledTableCell>Last Name</StyledTableCell>
        <StyledTableCell>D.O.B</StyledTableCell>
        <StyledTableCell>Gender</StyledTableCell>
        <StyledTableCell>Options</StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {hits.map((hit) => (
        <StyledTableRow key={hit.objectID}>
          <StyledTableCell>{hit.firstName}</StyledTableCell>
          <StyledTableCell>{hit.lastName}</StyledTableCell>
          <StyledTableCell>
            {moment(hit.dob).format('MM/DD/YYYY')}
          </StyledTableCell>
          <StyledTableCell>{hit.gender}</StyledTableCell>
          <StyledTableCell>
            <Link
              to={`/apps/e-commerce/orders/addorder/${hit.customerId}`}
              className="btn btn-primary">
              <Button
                className="whitespace-no-wrap normal-case ml-24"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AddToQueueIcon />}>
                Select
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
    fontSize: 14,
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

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  table: {
    minWidth: 700
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Select Customer or Search
      </DialogTitle>
      <div className="flex w-full ">
        <TableContainer
          component={Paper}
          className="flex flex-col w-full p-20 rounded-32 shadow-20">
          <InstantSearch searchClient={searchClient} indexName="customers">
            <div className="flex flex-row">
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
            </div>
            <CustomHits />
          </InstantSearch>
        </TableContainer>
      </div>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function SearchDialouge() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div className="flex flex-col ">
      <Button
        className="whitespace-no-wrap normal-case mt-42"
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}>
        <span className="hidden sm:flex">Create Order</span>
        <span className="flex sm:hidden">Create</span>
      </Button>
      <SimpleDialog
        PaperProps={{
          style: {
            backgroundColor: 'transparent',
            boxShadow: 'none'
          }
        }}
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
