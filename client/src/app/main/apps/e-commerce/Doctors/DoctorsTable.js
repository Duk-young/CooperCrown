import FuseScrollbars from '@fuse/core/FuseScrollbars';
import _ from '@lodash';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import moment from 'moment';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as Actions from '../store/actions';
import DoctorsTableHead from './DoctorsTableHead';
import { firestore } from 'firebase';

function DoctorsTable(props) {
  const dispatch = useDispatch();
  const [doctors, setDoctors] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);


  useEffect(() => {
    const fetchDoctors = async () => {
      setisLoading(false);
      let doctorsData = []
      const queryDoctors = await firestore().collection('doctors').get()
      queryDoctors.forEach((doc) => {
        doctorsData.push({...doc.data(), id: doc.id});
      });
      setDoctors(doctorsData);
      setisLoading(true);
    };
    fetchDoctors();
  }, [dispatch]);
 

  

 

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
      textAlign: 'center',
      width: 'min-content'
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
          <DoctorsTableHead
            rowCount={doctors.length}
          />

          <TableBody>
            {doctors
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((n) => {

                return (
                  <StyledTableRow
                    className="h-64 cursor-pointer"
                    hover
                    role="checkbox"

                    tabIndex={-1}
                    key={n.id}
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/doctor/${n.id}`
                      );
                    }}>
                    <StyledTableCell component="th" scope="row">
                      {moment(n.date.toDate()).format('MM/DD/YYYY') }
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.fname} {n.lname}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.location1}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.location2}
                    </StyledTableCell>
                    <StyledTableCell component="th" scope="row">
                      {n.location3}
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
        count={doctors?.length}
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

export default withRouter(DoctorsTable);
