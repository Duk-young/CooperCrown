import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const rows = [
  {
    id: 'discount-code',
    align: 'center',
    disablePadding: false,
    label: 'NAME',
    sort: true
  },
  {
    id: 'discount-description',
    align: 'center',
    disablePadding: false,
    label: 'DESCRIPTION',
    sort: true
  },
  {
    id: 'discount-amount',
    align: 'center',
    disablePadding: false,
    label: 'PRICE',
    sort: true
  }
];


const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    maxWidth: 'min-content'
  },
  body: {
    fontSize: 14,
    padding: 10
  }
}))(TableCell);

function DiscountsTableHead(props) {

  return (
    <TableHead>
      <TableRow className="h-64">
        {/*<StyledTableCell padding="none" className="relative w-64 text-center">
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
                'flex items-center justify-center absolute w-64 top-0 ltr:center-0 rtl:right-0 mx-56 h-64 z-10',
                classes.actionsButtonWrapper
              )}>
              <IconButton
                aria-owns={selectedProductsMenu ? 'selectedProductsMenu' : null}
                aria-haspopup="true"
                onClick={openSelectedProductsMenu}>
                <Icon>more_horiz</Icon>
              </IconButton>
              <Menu
                id="selectedProductsMenu"
                anchorEl={selectedProductsMenu}
                open={Boolean(selectedProductsMenu)}
                onClose={closeSelectedProductsMenu}>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      closeSelectedProductsMenu();
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
        </StyledTableCell>*/}
        {rows.map((row) => {
          return (
            <StyledTableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}
              sortDirection={
                props.order.id === row.id ? props.order.direction : false
              }>
              {row.label}
              {/* {row.sort && (
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
              )} */}
            </StyledTableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default DiscountsTableHead;
