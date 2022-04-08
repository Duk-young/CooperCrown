import React, { useEffect, useState, Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
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

const OutOfStock = (props) => {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // setisLoading(false);
    const fetchData = async () => {
      let test = [];
      let queryOther = await firestore()
        .collection('other')
        .where('quantity', '==', 0)
        .get();
      queryOther.forEach((doc) => {
        test.push(doc.data());
      });

      let queryLens = await firestore()
        .collection('lens')
        .where('quantity', '==', 0)
        .get();
      queryLens.forEach((doc) => {
        test.push(doc.data());
      });

      let queryFrames = await firestore()
        .collection('frames')
        .where('quantity', '==', 0)
        .get();
      queryFrames.forEach((doc) => {
        test.push(doc.data());
      });
      setRows(test);
      setisLoading(true);
    };
    fetchData();
    console.log(rows);
  }, [rows]);
  if (!isLoading) return <FuseLoading />;
  return !rows ? (
    <></>
  ) : (
    <Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>BRAND</StyledTableCell>
              <StyledTableCell>MODEL</StyledTableCell>
              <StyledTableCell>ENTER DATE</StyledTableCell>
              <StyledTableCell>SOLD OUT DATE</StyledTableCell>
              <StyledTableCell>INITIAL QUANTITY</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .sort((a, b) => (a.initialQuantity < b.initialQuantity ? -1 : 1))
              .map((row) => (
                <StyledTableRow key={row.sku}>
                  <StyledTableCell component="th" scope="row">
                    {row.sku}
                  </StyledTableCell>
                  <StyledTableCell>{row.brand}</StyledTableCell>
                  <StyledTableCell>{row.productDescription}</StyledTableCell>
                  <StyledTableCell>
                    {row?.date?.toDate().toDateString()}
                  </StyledTableCell>
                  <StyledTableCell>{''}</StyledTableCell>
                  <StyledTableCell>{row.initialQuantity}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default withRouter(OutOfStock);
