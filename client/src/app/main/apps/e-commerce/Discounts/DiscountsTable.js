import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import { firestore, storage } from 'firebase';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import IconButton from '@material-ui/core/IconButton';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import DiscountsTableHead from './DiscountsTableHead';

function DiscountsTable(props) {
  const dispatch = useDispatch();
  const products = useSelector(
    ({ eCommerceApp }) => eCommerceApp.discounts.data
  );
  const searchText = useSelector(
    ({ eCommerceApp }) => eCommerceApp.discounts.searchText
  );

  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(products);
  const [isLoading, setisLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [order, setOrder] = useState({
    direction: 'asc',
    id: null
  });

  useEffect(() => {
    const getRooms = async () => {
      setisLoading(false);
      await dispatch(await Actions.getDiscounts());
      setisLoading(true);
    };
    getRooms();
  }, [dispatch]);

  useEffect(() => {
    // if (searchText.length !== 0) {
    // 	setData(_.filter(products, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
    // 	setPage(0);
    // } else {
    setData(products);
    // }
  }, [products, searchText]);

  function handleRequestSort(event, property) {
    const id = property;
    let direction = 'desc';

    if (order.id === property && order.direction === 'desc') {
      direction = 'asc';
    }
    setOrder({
      direction,
      id
    });
  }
  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontSize: 14,
      padding: 5,
      textAlign: 'center'
    },
    body: {
      fontSize: 14,
      padding: 0,
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
  function handleSelectAllClick(event) {
    if (event.target.checked) {
      setSelected(data.map((n) => n.id));
      return;
    }
    setSelected([]);
  }

  // function handleClick(item) {
  //   props.history.push(`/apps/e-commerce/discount/${item.id}`);
  // }
  function handleCheck(event, id) {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  }

  function handleChangePage(event, value) {
    setPage(value);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(event.target.value);
  }
  const handleDelete = async () => {
    try {
      const queryDiscount = await firestore()
        .collection('discounts')
        .where('discountId', '==', Number(data.discountId))
        .limit(1)
        .get();

      let result = queryDiscount.docs[0].data();
      result.id = queryDiscount.docs[0].id;
      await firestore().collection('discounts').doc(result.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'Discount deleted successfully'
        })
      );
      props.history.push(
        `/apps/e-commerce/discount/${data.id}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  if (!isLoading) return <FuseLoading />;
  return (
    <div className="w-full flex flex-col">
      <FuseScrollbars className="flex-grow overflow-x-auto">
        <Table className="min-w-xl" aria-labelledby="tableTitle">
          <DiscountsTableHead
            numSelected={selected.length}
            order={order}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={data.length}
          />

          <TableBody>
            {_.orderBy(
              data,
              [
                (o) => {
                  switch (order.id) {
                    case 'State': {
                      return o.categories[0];
                    }
                    default: {
                      return o[order.id];
                    }
                  }
                }
              ],
              [order.direction]
            )
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {
                const isSelected = selected.indexOf(n.id) !== -1;
                return (
                  <StyledTableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/discount/${n.id}`
                      );
                    }}>
                    {/* <TableCell className="w-64 text-center" padding="none">
                       <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      /> 
                    </TableCell> */}
                    <StyledTableCell component="th" scope="row">
                      {n.code}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.description}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.amount}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                    <IconButton color="primary"  variant="contained"
                       
                       onClick={() => {
                         props.history.push(
                           `/apps/e-commerce/discount/${n.id}`
                         );
                       }}>
 <DeleteOutlined fontSize="medium" />
</IconButton>
                     
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className="overflow-hidden"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default withRouter(DiscountsTable);
