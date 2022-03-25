import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useForm } from '@fuse/hooks';
import { DataGrid } from '@material-ui/data-grid';
import EditIcon from '@material-ui/icons/Edit';
import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import { makeStyles, createStyles } from '@material-ui/core/styles';

export default function TableGrid() {
  const [rows, setRows] = useState([]);
  const [disabledState, setDisabledState] = useState(false);
  const { form, handleChange, setForm } = useForm({});
  const dispatch = useDispatch();

  const handleTypeChange = async (e) => {
    const lensPrices = (
      await firestore().collection('lensPrice').doc('lensPrice').get()
    ).data();
    setRows(lensPrices[e.target.value]);
  };

  const onSubmit = async () => {
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .update({ [form?.lensType]: rows });

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
      }
    })
  );

  const columns = [
    { field: 'id', headerName: 'ID', width: 75, sortable: false },
    {
      field: '0.0',
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
      field: '-0.50',
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
      field: '-1.00',
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
      field: '-1.50',
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
      field: '-2.00',
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
      field: '-2.50',
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
      field: '-3.00',
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
      field: '-3.50',
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
      field: '-4.00',
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
      field: '-4.50',
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
      field: '-5.00',
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
      field: '-5.50',
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
      field: '-6.00',
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
      field: '-6.50',
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
      field: '-7.00',
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
      field: '-7.50',
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
      field: '-8.00',
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
      field: '-8.50',
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
      field: '-9.00',
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
      field: '-9.50',
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
      field: '-10.00',
      headerName: '-10.00',
      width: 90,
      type: 'number',
      editable: disabledState,
      sortable: false
    }
  ];
  const classes = useStyles();
  return (
    <div style={{ height: 600, width: '100%' }}>
      <FormControl className="ml-32 ">
        <Select
          labelId="demo-simple-select-autowidth-label"
          id="ethnicityId"
          defaultValue={form?.lensType}
          value={form?.lensType}
          name="lensType"
          onChange={(e) => {
            handleChange(e);
            handleTypeChange(e);
          }}
          autoWidth>
          <MenuItem value={'distance'}>Distance</MenuItem>
          <MenuItem value={'read'}>Read</MenuItem>
          <MenuItem value={'fTop'}>F. Top</MenuItem>
          <MenuItem value={'progressive'}>Progressive</MenuItem>
        </Select>
        <FormHelperText>Select Lens Type from the list...</FormHelperText>
      </FormControl>
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
      <div className="flex flex-row p-6 justify-between w-1/3">
        <Fab
          onClick={() => {
            setDisabledState(true);
          }}
          variant="extended"
          disabled={rows?.length ? disabledState : true}
          color="primary"
          aria-label="add">
          <EditIcon fontSize="small" />
          Edit Prices
        </Fab>
        {disabledState && (
          <Fab
            onClick={onSubmit}
            variant="extended"
            color="primary"
            aria-label="add">
            Save Changes!
          </Fab>
        )}
      </div>
    </div>
  );
}
