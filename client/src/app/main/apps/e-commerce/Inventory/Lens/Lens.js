import React, { useEffect, useState, Fragment } from 'react';
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

const Lens = (props) => {
  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setisLoading(false);
    const fetchLens = async () => {
      await firestore()
        .collection('lens')
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
    fetchLens();
  }, []);
  if (!isLoading) return <FuseLoading />;
  return (
    <Fragment>
      <Button
        className="whitespace-no-wrap normal-case mb-24 ml-24"
        variant="contained"
        color="primary"
        onClick={() => {
          props.history.push('/apps/inventory/addlens');
        }}>
        Add Inventory
      </Button>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>Lens Material</StyledTableCell>
              <StyledTableCell>Sphere</StyledTableCell>
              <StyledTableCell>Cylinder</StyledTableCell>
              <StyledTableCell>Quantity</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .sort((a, b) => (a.lensId < b.lensId ? -1 : 1))
              .map((row) => (
                <StyledTableRow key={row.lensId}>
                  <StyledTableCell component="th" scope="row">
                    {row.sku}
                  </StyledTableCell>
                  <StyledTableCell>{row.material}</StyledTableCell>
                  <StyledTableCell>{row.sphere}</StyledTableCell>
                  <StyledTableCell>{row.cylinder}</StyledTableCell>
                  <StyledTableCell>{row.quantity}</StyledTableCell>
                  <StyledTableCell>
                    <Button
                      className="whitespace-no-wrap normal-case"
                      variant="contained"
                      color="secondary"
                      onClick={() => {
                        props.history.push(
                          `/apps/inventory/addlens/${row.lensId}`
                        );
                      }}>
                      Edit
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default withRouter(Lens);
