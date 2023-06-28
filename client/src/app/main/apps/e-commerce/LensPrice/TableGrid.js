import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import React, { useState, useEffect } from 'react';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& .MuiDataGrid-renderingZone': {
        '& .MuiDataGrid-row': {
          '&:nth-child(2n)': {
            backgroundColor: 'rgba(16, 232, 212, 0.08)'
          }
        }
      }
    },
    table: {
      minWidth: 450
    },
    button: {
      backgroundColor: '#f15a25',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#f47b51',
        color: '#fff'
      }
    }
  })
);

export default function TableGrid(props) {
  const classes = useStyles();
  const [columns, setColumns] = useState(null)
  const { disabledState, rows, setRows } = props;

  const handleCommit = (e) => {
    const array = rows.map((row) => {
      if (row.id === e.id) {
        return {
          ...row,
          [e.field]: e.value
        };
      } else {
        return { ...row };
      }
    });
    setRows(array);
  };

  useEffect(() => {
    let columns = []
    columns.push({ field: 'id', headerName: 'ID', width: 75, sortable: false })
    for (let i = 0; i >= -10; i -= 0.25) {
      columns.push({
        field: i.toFixed(2),
        headerName: i.toFixed(2),
        width: i === -10 ? 85 : 75,
        type: 'number',
        editable: disabledState,
        sortable: false
      })
    }
    setColumns(columns)

  }, [disabledState])

  if (!columns) return <FuseLoading />
  return (
    <div className="custom-height custom-height-lg w-full">
      <DataGrid
        onCellEditCommit={handleCommit}
        className={classes.root}
        rows={rows}
        columns={columns}
        // pageSize={100}
        disableSelectionOnClick
        density="compact"
        disableColumnMenu={true}
        hideFooterPagination={false}
        pagination
        // page={page}
        // onPageChange={handlePageChange}
        rowCount={rows.length}
      />
    </div>
  );
}
