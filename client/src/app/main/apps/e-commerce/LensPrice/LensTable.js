// import FuseScrollbars from '@fuse/core/FuseScrollbars';
// import _ from '@lodash';
// import Checkbox from '@material-ui/core/Checkbox';
// import Table from '@material-ui/core/Table';
// import Button from '@material-ui/core/Button';
// import TableBody from '@material-ui/core/TableBody';
// import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
// import TableCell from '@material-ui/core/TableCell';
// import TablePagination from '@material-ui/core/TablePagination';
// import TableRow from '@material-ui/core/TableRow';
// import FuseLoading from '@fuse/core/FuseLoading';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { withRouter } from 'react-router-dom';
// import * as Actions from '../store/actions';
// import LensTableHead from './LensTableHead';

// function LensTable(props) {
//   const dispatch = useDispatch();
//   const lens = useSelector(
//     ({ eCommerceApp }) => eCommerceApp.lens.data
//   );
//   const searchText = useSelector(
//     ({ eCommerceApp }) => eCommerceApp.lens.searchText
//   );

//   const [selected, setSelected] = useState([]);
//   const [data, setData] = useState(lens);
//   const [isLoading, setisLoading] = useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [order, setOrder] = useState({
//     direction: 'asc',
//     id: null
//   });

//   useEffect(() => {
//     const getRooms = async () => {
//       setisLoading(false);
//       await dispatch(await Actions.getShowRooms());
//       setisLoading(true);
//     };
//     getRooms();
//   }, [dispatch]);

//   useEffect(() => {
//     if (searchText.length !== 0) {
//     	setData(_.filter(lens, item => item.name.toLowerCase().includes(searchText.toLowerCase())));
//     	setPage(0);
//     } else {
//     setData(lens);
//     }
//   }, [lens, searchText]);

//   function handleRequestSort(event, property) {
//     const id = property;
//     let direction = 'desc';

//     if (order.id === property && order.direction === 'desc') {
//       direction = 'asc';
//     }

//     setOrder({
//       direction,
//       id
//     });
//   }

//   function handleSelectAllClick(event) {
//     if (event.target.checked) {
//       setSelected(data.map((n) => n.id));
//       return;
//     }
//     setSelected([]);
//   }

//   function handleClick(item) {
//     props.history.push(`/apps/e-commerce/showRoom/${item.id}`);
//   }

//   function handleCheck(event, id) {
//     const selectedIndex = selected.indexOf(id);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, id);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1)
//       );
//     }

//     setSelected(newSelected);
//   }

//   function handleChangePage(event, value) {
//     setPage(value);
//   }

//   function handleChangeRowsPerPage(event) {
//     setRowsPerPage(event.target.value);
//   }
//   if (!isLoading) return <FuseLoading />;
//   return (
//     <div className="w-full flex flex-col">
//       <FuseScrollbars className="flex-grow overflow-x-auto">
//         <Table className="min-w-xl" aria-labelledby="tableTitle">
//           <LensTableHead
//             numSelected={selected.length}
//             order={order}
//             onSelectAllClick={handleSelectAllClick}
//             onRequestSort={handleRequestSort}
//             rowCount={data.length}
//           />

//           <TableBody>
//             {_.orderBy(
//               data,
//               [
//                 (o) => {
//                   switch (order.id) {
//                     case 'State': {
//                       return o.categories[0];
//                     }
//                     default: {
//                       return o[order.id];
//                     }
//                   }
//                 }
//               ],
//               [order.direction]
//             )
//               .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//               .map((n) => {
//                 const isSelected = selected.indexOf(n.id) !== -1;
//                 return (
//                   <TableRow
//                     className="h-64 cursor-pointer"
//                     hover
//                     role="checkbox"
//                     aria-checked={isSelected}
//                     tabIndex={-1}
//                     key={n.id}
//                     selected={isSelected}
//                     onClick={(event) => handleClick(n)}>
//                     <TableCell className="w-64 text-center" padding="none">
//                       <Checkbox
//                         checked={isSelected}
//                         onClick={(event) => event.stopPropagation()}
//                         onChange={(event) => handleCheck(event, n.id)}
//                       />
//                     </TableCell>

//                     <TableCell component="th" scope="row">
//                       {n.lenstype}
//                     </TableCell>

                
//                     <TableCell component="th" scope="row">
//                       <Button
//                         className="whitespace-no-wrap normal-case"
//                         variant="contained"
//                         color="secondary"
//                         onClick={() => {
//                           props.history.push(
//                             `/apps/e-commerce/lens/${n.id}`
//                           );
//                         }}>
//                         <DeleteOutlined/>
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//           </TableBody>
//         </Table>
//       </FuseScrollbars>

//       <TablePagination
//         className="overflow-hidden"
//         component="div"
//         count={data.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         backIconButtonProps={{
//           'aria-label': 'Previous Page'
//         }}
//         nextIconButtonProps={{
//           'aria-label': 'Next Page'
//         }}
//         onChangePage={handleChangePage}
//         onChangeRowsPerPage={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// }

// export default withRouter(LensTable);
