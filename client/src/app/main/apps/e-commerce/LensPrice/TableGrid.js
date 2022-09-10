import { DataGrid } from '@material-ui/data-grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { firestore } from 'firebase';
import { Button } from '@material-ui/core';
import Fab from '@material-ui/core/Fab';
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
  const { form, rows, setRows } = props;
  const [disabledState, setDisabledState] = useState(false);
  const classes = useStyles();

  const dispatch = useDispatch();


  const onSubmit = async () => {
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .update({ [form?.a]: rows });

    dispatch(
      MessageActions.showMessage({
        message: 'Prices Updated Successfully'
      })
    );
    setDisabledState(false);
  };

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

  

  const columns = [
    { field: 'id', headerName: 'ID', width: 75, sortable: false },
    {
      field: '0',
      headerName: '0.0',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-0.25',
      headerName: '-0.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-0.5',
      headerName: '-0.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-0.75',
      headerName: '-0.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-1',
      headerName: '-1.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-1.25',
      headerName: '-1.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-1.5',
      headerName: '-1.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-1.75',
      headerName: '-1.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-2',
      headerName: '-2.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-2.25',
      headerName: '-2.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-2.5',
      headerName: '-2.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-2.75',
      headerName: '-2.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-3',
      headerName: '-3.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-3.25',
      headerName: '-3.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-3.5',
      headerName: '-3.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-3.75',
      headerName: '-3.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-4',
      headerName: '-4.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-4.25',
      headerName: '-4.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-4.5',
      headerName: '-4.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-4.75',
      headerName: '-4.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-5',
      headerName: '-5.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-5.25',
      headerName: '-5.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-5.5',
      headerName: '-5.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-5.75',
      headerName: '-5.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-6',
      headerName: '-6.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-6.25',
      headerName: '-6.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-6.5',
      headerName: '-6.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-6.75',
      headerName: '-6.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-7',
      headerName: '-7.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-7.25',
      headerName: '-7.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-7.5',
      headerName: '-7.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-7.75',
      headerName: '-7.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-8',
      headerName: '-8.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-8.25',
      headerName: '-8.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-8.5',
      headerName: '-8.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-8.75',
      headerName: '-8.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-9',
      headerName: '-9.00',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-9.25',
      headerName: '-9.25',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-9.5',
      headerName: '-9.50',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-9.75',
      headerName: '-9.75',
      width: 75,
      type: 'number',
      editable: disabledState,
      sortable: false
    },
    {
      field: '-10',
      headerName: '-10.00',
      width: 90,
      type: 'number',
      editable: disabledState,
      sortable: false
    }
  ];

  return (
    <div style={{ height: 600, width: '100%' }}>
     
      <DataGrid
        onCellEditCommit={handleCommit}
        className={classes.root}
        rows={rows}
        columns={columns}
        pageSize={100}
        disableSelectionOnClick
        density="compact"
        disableColumnMenu={true}
        hideFooterPagination={true}
      />
      <div className="flex flex-row p-6 justify-around w-full">
        <Button
          onClick={() => {
            setDisabledState(true);
          }}
          className={classes.button}
          variant="contained"
          color="secondary"
          disabled={rows?.length ? disabledState : true}
          
          aria-label="add">
          <EditIcon fontSize="small" />
          Edit Prices
        </Button>
        {disabledState && (
          <Button
            onClick={onSubmit}
            className={classes.button}
                  variant="contained"
                  color="secondary">
            Save Changes!
          </Button>
        )}
       
      </div>
    </div>
  );
}
