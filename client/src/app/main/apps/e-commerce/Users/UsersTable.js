import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useHistory } from 'react-router-dom';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
import FormControl from '@material-ui/core/FormControl';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import moment from 'moment';
import UsersTableHead from './UsersTableHead';
const StyledTableCell = withStyles((theme) => ({
  // head: {
  //   backgroundColor: theme.palette.common.black,
  //   color: theme.palette.common.white,
  //   textAlign: 'center'
  // },
  body: {
    fontSize: 14,
    padding: 0,
    textAlign: 'left',
    width: '20%'
  }
}))(TableCell);
function UsersTable(props) {
  const dispatch = useDispatch();
  const products = useSelector(({ eCommerceApp }) => eCommerceApp.users.data);
  const searchText = useSelector(
    ({ eCommerceApp }) => eCommerceApp.users.searchText
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
      await dispatch(await Actions.getUsers());
      setisLoading(true);
    };
    getRooms();
    // const fetchlocation = async () => {
    //   let showroomdata = [];
    //     const queryShowrooms = await firestore()
    //     .collection('showRooms')
    //     .get();

    //     queryShowrooms.forEach((doc) => {
    //       showroomdata.push(doc.data());
    //     });
    //     setShowRooms(showroomdata);

    //     if (history?.location?.state?.start !== undefined) {
    //       setForm({
    //         start: history.location.state.start,
    //         showRoomId: history.location.state.showRoomId,
    //       });
    //     }
    //     setisLoading(false);
    //   };
    //   fetchlocation();
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
  function handleClick(item) {
    console.log(item.id)
    props.history.push(`/apps/e-commerce/user/${item.id}`);
  }

  // function handleClick(ite m) {
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
          <UsersTableHead
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
                    onClick={(event) => {
                      handleClick(n)
                      { console.log(n.id) }
                    }}

                  >

                    <StyledTableCell component="th" scope="row">
                      {/* {moment(n?.dobString).format('MM/DD/YYYY')} */}
                      {n.date ? n.date : '-----'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.location ? n.location : '-----'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">

                      {n.email ? n.email : '-----'}
                    </StyledTableCell>
                    {/* <StyledTableCell component="th" scope="row">
                      {n.phone1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.dob}
                    </StyledTableCell> */}

                    <StyledTableCell component="th" scope="row">
                      {n.username ? n.username : '-----'}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.Role ? n.Role : '-----'}
                    </StyledTableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </FuseScrollbars>

      <TablePagination
        className=" flex overflow-hidden justify-center"
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}

        backIconButtonProps={{
          'aria-label': 'Previous Page'
        }}
        page={page}

        nextIconButtonProps={{
          'aria-label': 'Next Page'
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />

    </div>
  );
}

export default withRouter(UsersTable);
