import React, { useEffect, useState, Fragment } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { firestore } from 'firebase';
import moment from 'moment';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    padding: 0
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

const OrderHistory = (props) => {
  const classes = useStyles();
  const { customer } = props;
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const queryOrders = await firestore()
        .collection('orders')
        .where('customerId', '==', Number(customer?.customerId))
        .get();

      let resultOrders = [];
      queryOrders.forEach((doc) => {
        resultOrders.push(doc.data());
      });
      setOrders(resultOrders);
      const queryPayments = await firestore().collection('orderPayments').get();
      let resultPayments = [];
      queryPayments.forEach((doc) => {
        resultPayments.push(doc.data());
      });
      setPayments(resultPayments);
    };
    fetchData();
  }, []);

  return !orders ? (
    <></>
  ) : (
    <Fragment>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="customized table"
          stickyHeader>
          <TableHead>
            <TableRow>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>DATE</StyledTableCell>
              <StyledTableCell>TYPE</StyledTableCell>
              <StyledTableCell>AMOUNT</StyledTableCell>
              <StyledTableCell>INSURANCE</StyledTableCell>
              <StyledTableCell>PAID</StyledTableCell>
              <StyledTableCell>BALANCE</StyledTableCell>
              <StyledTableCell>STATUS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length ? (
              orders
                .sort((a, b) => (a.orderId > b.orderId ? -1 : 1))
                .map((row) => (
                  <StyledTableRow key={row.orderId}>
                    <StyledTableCell component="th" scope="row">
                      <Link
                        to={`/apps/e-commerce/orders/vieworder/${row.orderId}`}>
                        <h3 className="text-black">{row?.orderId}</h3>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      {' '}
                      {moment(row.orderDate.toDate()).format('MM/DD/YYYY')}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row?.prescriptionType === 'eyeglassesRx' && 'Eyeglasses'}
                      {row?.prescriptionType === 'contactLensRx' &&
                        'Contact Lens'}
                      {row?.prescriptionType === 'medicationRx' && 'Medication'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row?.prescriptionType === 'eyeglassesRx' &&
                        `$ ${(
                          row?.eyeglasses.reduce(
                            (a, b) => +a + +b.lensRate,
                            0
                          ) +
                          row?.eyeglasses.reduce(
                            (a, b) => +a + +b.frameRate,
                            0
                          ) +
                          (row?.additionalCost ? +row?.additionalCost : 0) -
                          (row?.discount ? +row?.discount : 0)
                        ).toLocaleString()}`}
                      {row?.prescriptionType === 'contactLensRx' &&
                        `$ ${(
                          row?.eyeglasses.reduce(
                            (a, b) => +a + +b.contactLensRate,
                            0
                          ) +
                          (row?.additionalCost ? +row?.additionalCost : 0) -
                          (row?.discount ? +row?.discount : 0)
                        ).toLocaleString()}`}
                      {row?.prescriptionType === 'medicationRx' &&
                        `$ ${(
                          row?.eyeglasses.reduce((a, b) => +a + +b.price, 0) +
                          (row?.additionalCost ? +row?.additionalCost : 0) -
                          (row?.discount ? +row?.discount : 0)
                        ).toLocaleString()}`}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row?.insuranceCost ? `$ ${row?.insuranceCost}` : '$0'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {`$ ${payments
                        .filter(({ orderId }) => orderId === row?.orderId)
                        .reduce((a, b) => +a + +b.amount, 0)}`}
                    </StyledTableCell>
                    <StyledTableCell>
                      {row?.prescriptionType === 'eyeglassesRx' &&
                        `$ ${
                          row?.eyeglasses.reduce(
                            (a, b) => +a + +b?.frameRate,
                            0
                          ) +
                          row?.eyeglasses.reduce(
                            (a, b) => +a + +b?.lensRate,
                            0
                          ) -
                          (row?.insuranceCost ? +row?.insuranceCost : 0) +
                          (row?.additionalCost ? +row?.additionalCost : 0) -
                          (row?.discount ? +row?.discount : 0) -
                          payments
                            .filter(({ orderId }) => orderId === row?.orderId)
                            .reduce((a, b) => +a + +b.amount, 0)
                        }`}
                      {row?.prescriptionType === 'contactLensRx' &&
                        `$ ${
                          row?.eyeglasses.reduce(
                            (a, b) => +a + +b?.contactLensRate,
                            0
                          ) -
                          (row?.insuranceCost ? +row?.insuranceCost : 0) +
                          (row?.additionalCost ? +row?.additionalCost : 0) -
                          (row?.discount ? +row?.discount : 0) -
                          payments
                            .filter(({ orderId }) => orderId === row?.orderId)
                            .reduce((a, b) => +a + +b.amount, 0)
                        }`}
                      {row?.prescriptionType === 'medicationRx' &&
                        `$ ${
                          row?.eyeglasses.reduce((a, b) => +a + +b?.price, 0) -
                          (row?.insuranceCost ? +row?.insuranceCost : 0) +
                          (row?.additionalCost ? +row?.additionalCost : 0) -
                          (row?.discount ? +row?.discount : 0) -
                          payments
                            .filter(({ orderId }) => orderId === row?.orderId)
                            .reduce((a, b) => +a + +b.amount, 0)
                        }`}
                    </StyledTableCell>
                    <StyledTableCell>{row?.orderStatus}</StyledTableCell>
                  </StyledTableRow>
                ))
            ) : (
              <div className="flex flex-row justify-center">
                <h2>No Orders</h2>
              </div>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default withRouter(OrderHistory);
