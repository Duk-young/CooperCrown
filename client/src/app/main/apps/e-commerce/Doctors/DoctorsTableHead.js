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
    align: 'left',
    disablePadding: false,
    label: 'DATE',
    sort: true
  },
  {
    id: 'doctor-name',
    align: 'left',
    disablePadding: false,
    label: 'DOCTOR NAME',
    sort: true
  },
  {
    id: 'Location-Address1',
    align: 'left',
    disablePadding: false,
    label: 'Location 1',
    sort: true
  },
  {
    id: 'Location-Address2',
    align: 'left',
    disablePadding: false,
    label: 'Location 2',
    sort: true
  },
  {
    id: 'Location-Address3',
    align: 'left',
    disablePadding: false,
    label: 'Location 3',
    sort: true
  },
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
    textAlign: 'left'
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
        <StyledTableCell padding="none" className="relative w-64 text-center">
          <Checkbox
            indeterminate={
              props.numSelected > 0 && props.numSelected < props.rowCount
            }
            checked={props.numSelected === props.rowCount}
            onChange={props.onSelectAllClick}
          />
          {props.numSelected > 0 && (
            <div
              className={clsx(
                'flex items-center justify-center absolute w-64 top-0 ltr:left-0 rtl:right-0 mx-56 h-64 z-10',
                classes.actionsButtonWrapper
              )}>
              <IconButton
                aria-owns={selectedDoctorsMenu ? 'selectedDoctorsMenu' : null}
                aria-haspopup="true"
                onClick={openselectedDoctorsMenu}>
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedDoctorsMenu"
                anchorEl={selectedDoctorsMenu}
                open={Boolean(selectedDoctorsMenu)}
                onClose={closeselectedDoctorsMenu}>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      closeselectedDoctorsMenu();
                    }}>
                    <ListItemIcon className="min-w-40">
                      <Icon>delete</Icon>
                    </ListItemIcon>
                    <ListItemText primary="Remove" />
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          )}
        </StyledTableCell>
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
