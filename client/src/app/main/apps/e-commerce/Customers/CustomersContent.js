import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
import { withRouter } from 'react-router';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const CustomersContent = (props) => {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setisLoading(false);
    const fetchCustomers = async () => {
      await firestore()
        .collection('customers')
        .get()
        .then((querySnapshot) => {
          let test = [];
          querySnapshot.forEach((doc) => {
            test.push(doc.data());
          });
          setRows(test);
          setisLoading(true);
        });
    };
    fetchCustomers();
  }, []);
  if (!isLoading) return <FuseLoading />;
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Customer No.</StyledTableCell>
            <StyledTableCell>First Name</StyledTableCell>
            <StyledTableCell>Last Name</StyledTableCell>
            <StyledTableCell>D.O.B</StyledTableCell>
            <StyledTableCell>Last Exam</StyledTableCell>
            <StyledTableCell>Gender</StyledTableCell>
            <StyledTableCell>State</StyledTableCell>
            <StyledTableCell>Zip Code</StyledTableCell>
            <StyledTableCell>Phone</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .sort((a, b) => (a.customerId < b.customerId ? -1 : 1))
            .map((row) => (
              <StyledTableRow key={row.customerId}>
                <StyledTableCell component="th" scope="row">
                  {row.customerId}
                </StyledTableCell>
                <StyledTableCell>{row.firstName}</StyledTableCell>
                <StyledTableCell>{row.lastName}</StyledTableCell>
                <StyledTableCell>
                  {row.dob.toDate().toDateString()}
                </StyledTableCell>
                <StyledTableCell>{''}</StyledTableCell>
                <StyledTableCell>{row.gender}</StyledTableCell>
                <StyledTableCell>{row.state}</StyledTableCell>
                <StyledTableCell>{row.zipCode}</StyledTableCell>
                <StyledTableCell>{row.phone1}</StyledTableCell>
                <StyledTableCell>{row.email}</StyledTableCell>
                <StyledTableCell>
                  <IconButton
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/customers/profile/${row.customerId}`
                      );
                    }}
                    aria-label="view">
                    <PageviewOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/customers/${row.customerId}`
                      );
                    }}
                    aria-label="edit">
                    <EditIcon fontSize="small" />
                  </IconButton>

                  <Button
                    className="whitespace-no-wrap normal-case ml-24"
                    variant="contained"
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/customers/addAppointment/${row.customerId}`
                      );
                    }}
                    color="secondary"
                    size="large"
                    startIcon={<AddToQueueIcon />}>
                    Appointment
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default withRouter(CustomersContent);
