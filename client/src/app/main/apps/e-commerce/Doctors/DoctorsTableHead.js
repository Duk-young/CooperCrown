import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

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
  }
];

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    width: 'min-content'
  },
  body: {
    fontSize: 14,
    padding: 10
  }
}))(TableCell);

function DoctorsTableHead(props) {

  return (
    <TableHead>
      <TableRow className="h-64">

        {rows.map((row) => {
          return (
            <StyledTableCell
              key={row.id}
              align={row.align}
              padding={row.disablePadding ? 'none' : 'default'}>
              {row.label}
            </StyledTableCell>
          );
        }, this)}
      </TableRow>
    </TableHead>
  );
}

export default DoctorsTableHead;
