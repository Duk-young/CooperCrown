import Checkbox from '@material-ui/core/Checkbox';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import clsx from 'clsx';
import React, { useState } from 'react';

const rows = [
  {
    id: 'doctor-date',
    align: 'center',
    disablePadding: false,
    label: 'DATE',
    sort: true
  },
  {
    id: 'doctor-name',
    align: 'center',
    disablePadding: false,
    label: 'DOCTOR NAME',
    sort: true
  },
  {
    id: 'Location-Address1',
    align: 'center',
    disablePadding: false,
    label: 'Location 1',
    sort: true
  },
  {
    id: 'Location-Address2',
    align: 'center',
    disablePadding: false,
    label: 'Location 2',
    sort: true
  },
  {
    id: 'Location-Address3',
    align: 'center',
    disablePadding: false,
    label: 'Location 3',
    sort: true
  },
  
  {
    
    align: 'center',
    disablePadding: false,
    sort: true
  }
];

const useStyles = makeStyles((theme) => ({
  actionsButtonWrapper: {
    background: theme.palette.background.paper
  }
}));
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10
  }
}))(TableCell);
function DoctorsTableHead(props) {
  const classes = useStyles(props);
  const [selectedDoctorsMenu, setselectedDoctorsMenu] = useState(null);

  const createSortHandler = (property) => (event) => {
    props.onRequestSort(event, property);
  };

  function openselectedDoctorsMenu(event) {
    setselectedDoctorsMenu(event.currentTarget);
  }

  function closeselectedDoctorsMenu() {
    setselectedDoctorsMenu(null);
  }

  return (
    <TableHead>
      <TableRow className="h-64">
        
        {rows.map((row) => {
          return (
            <StyledTableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }>
              {row.sort && (
                <Tooltip
                  title="Sort"
                  placement={
                    row.align === 'right' ? 'bottom-end' : 'bottom-start'
                  }
                  enterDelay={300}>
                  <TableSortLabel
                    active={props.order.id === row.id}
                    direction={props.order.direction}
                    onClick={createSortHandler(row.id)}>
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              )}
            </StyledTableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default DoctorsTableHead;
