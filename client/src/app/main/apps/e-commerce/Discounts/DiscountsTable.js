import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import Button from '@material-ui/core/Button';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
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
                  <TableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={-1}
                    key={n.id}
                    selected={isSelected}
                    // onClick={(event) => handleClick(n)}
                  >
                    <TableCell className="w-64 text-center" padding="none">
                      <Checkbox
                        checked={isSelected}
                        onClick={(event) => event.stopPropagation()}
                        onChange={(event) => handleCheck(event, n.id)}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.code}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {n.amount}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        className="whitespace-no-wrap normal-case"
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          props.history.push(
                            `/apps/e-commerce/discount/${n.id}`
                          );
                        }}>
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
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
