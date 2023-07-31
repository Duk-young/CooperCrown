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
    color: theme.palette.common.white,
    fontSize: 14,
    padding: 10,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
    minWidth: 'min-content',
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTotal = (order) => {
    const mainSum =
      order?.eyeglasses.reduce((a, b) => b?.lensRate ? +a + +b.lensRate : a, 0) +
      order?.eyeglasses.reduce((a, b) => b?.frameRate ? +a + +b.frameRate : a, 0) +
      order?.medication.reduce((a, b) => +a + +b.price, 0) +
      order?.contactLenses.reduce((a, b) => +a + +b.contactLensRate, 0) +
      order?.otherProductInfo.reduce((a, b) => +a + +b.otherProductPrice, 0);

    const frameVal = order?.eyeglasses.find(
      (item) => item?.frameAdditionalPrice || item?.frameAdditionalPrice <= 0
    );
    const lensVal = order?.eyeglasses.find(
      (item) => item?.lensAdditionalPrice || item?.lensAdditionalPrice <= 0
    );

    const otherProductVal = order?.otherProductInfo.find(
      (item) =>
        item?.otherProductAdditionalPrice ||
        item?.otherProductAdditionalPrice <= 0
    );

    if (frameVal || lensVal || otherProductVal) {
      return (
        mainSum +
        order?.eyeglasses.reduce((a, b) => b?.frameAdditionalPrice ? +a + +b.frameAdditionalPrice : a, 0) +
        order?.eyeglasses.reduce((a, b) => b?.lensAdditionalPrice ? +a + +b.lensAdditionalPrice : a, 0) +
        order?.otherProductInfo.reduce(
          (a, b) => b?.otherProductAdditionalPrice ? +a + +b.otherProductAdditionalPrice : a,
          0
        )
      );
    } else {
      return mainSum;
    }
  };

  const handleBalance = (order) => {
    const total = handleTotal(order);

    const deductions =
      (order?.discount ? +order?.discount : 0) +
      (order?.insuranceCostOne ? +order?.insuranceCostOne : 0) +
      (order?.insuranceCostTwo ? +order?.insuranceCostTwo : 0);

    const payment = payments.filter(({ orderId }) => Number(orderId) === order?.orderId).reduce((a, b) => +a + +b.amount, 0);

    const balance = total - deductions - payment;

    return balance
  };

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
              <StyledTableCell>ORDER No.</StyledTableCell>
              <StyledTableCell>DATE</StyledTableCell>
              <StyledTableCell>AMOUNT</StyledTableCell>
              <StyledTableCell>INSURANCE</StyledTableCell>
              <StyledTableCell>PAID</StyledTableCell>
              <StyledTableCell>BALANCE</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.length > 0 &&
              orders
                .sort((a, b) => (a.orderId > b.orderId ? -1 : 1))
                .map((row) => (
                  <StyledTableRow key={row.orderId}>
                    <StyledTableCell component="th" scope="row">
                      <Link
                        to={`/apps/e-commerce/orders/vieworder/${row.orderId}`}>
                        <h3 className="text-black">{row?.customOrderId}</h3>
                      </Link>
                    </StyledTableCell>
                    <StyledTableCell>
                      {' '}
                      {moment(row.orderDate.toDate()).format('MM/DD/YYYY')}
                    </StyledTableCell>

                    <StyledTableCell>
                      {`$ ${handleTotal(row).toLocaleString()}`}
                    </StyledTableCell>
                    <StyledTableCell>
                      {(row?.insuranceCostOne || row?.insuranceCostTwo)
                        ? `$ ${(+row?.insuranceCostOne ?? 0 + +row?.insuranceCostTwo ?? 0).toLocaleString()}`
                        : '$0'}
                    </StyledTableCell>
                    <StyledTableCell>
                      {`$ ${payments
                        .filter(({ orderId }) => Number(orderId) === row?.orderId)
                        .reduce((a, b) => +a + +b.amount, 0)
                        .toLocaleString()}`}
                    </StyledTableCell>
                    <StyledTableCell>
                      {`$ ${handleBalance(row)}`}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default withRouter(OrderHistory);
