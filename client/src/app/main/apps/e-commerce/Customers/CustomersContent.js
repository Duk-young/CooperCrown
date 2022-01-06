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
import FuseLoading from '@fuse/core/FuseLoading';
import { Link } from 'react-router-dom';
import { firestore } from 'firebase';

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

export default function CustomersContent(props) {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(async () => {
    setisLoading(false);
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
  }, [1]);
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
                  <Button
                    className="whitespace-no-wrap normal-case"
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to={`/apps/e-commerce/customers/${row.customerId}`}
                    // onClick={() => {
                    //   props.history.push(
                    //     `/apps/e-commerce/customers/${row.customerId}`
                    //   );
                    // }}
                  >
                    Edit
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
