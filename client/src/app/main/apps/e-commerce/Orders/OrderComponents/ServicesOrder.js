import _ from '@lodash';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { withRouter } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import CustomAutocomplete from '../../ReusableComponents/Autocomplete';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import React, { useCallback, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    width: '100%',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  noBorder: {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  body: {
    fontSize: 14,
    padding: '10px',
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    },
    '&:hover': {
      backgroundColor: 'lightyellow !important'
    }
  }
}))(TableRow);

const ServicesOrder = (props) => {
  const classes = useStyles();
  const [selectedMedication, setSelectedMedication] = useState({});
  const { disabledState, services, medication, setMedication } = props;

  const handleSelectedMedicationChange = useCallback((event) => {
    event?.persist && event.persist();
    setSelectedMedication((_selectedMedication) =>
      _.setIn(
        { ..._selectedMedication },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddExamServiceToOrder = () => {
    if (selectedMedication) {
      let count = 0;
      medication.map((row) => {
        if (row?.name === selectedMedication?.name) {
          count++;
        }
        return null;
      });

      if (count > 0) {
        toast.error('Selected service already added...', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom
        });
      } else {
        services.map((row) => {
          if (selectedMedication?.name === row?.name) {
            setMedication([
              ...medication,
              {
                ...selectedMedication,
                price: +row?.price
              }
            ]);
          }
          return null;
        });
      }
    } else {
      toast.error('Please Select atleast one service...', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
    }
  };

  return (
    <div>
      <div className="exam-service flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                EXAM / SERVICE
              </h1>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col px-10 w-1/2 pt-10">
                <CustomAutocomplete
                  list={services}
                  form={selectedMedication}
                  disabled={disabledState}
                  setForm={setSelectedMedication}
                  handleChange={handleSelectedMedicationChange}
                  id="name"
                  freeSolo={false}
                  label="Select Services..."
                />
              </div>
              <div className="p-10">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleAddExamServiceToOrder}
                  disabled={disabledState}
                  aria-label="add">
                  <AddIcon />
                  Add To Order
                </Button>
              </div>
            </div>
            <div className="flex flex-col max-h-320">
              <TableContainer
                className="flex flex-col w-full overflow-scroll"
                component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell>
                        Service Name
                      </StyledTableCell>
                      <StyledTableCell>
                        Service Price
                      </StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {medication.map((row, index) => (
                      <StyledTableRow
                        onClick={() => {
                          setSelectedMedication(row);
                        }}
                        key={index}
                        hover
                        className="cursor-pointer">
                        <StyledTableCell>
                          {row?.name}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.price}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            disabled={disabledState}
                            onClick={() => {
                              let newMedication = medication;
                              newMedication.splice(index, 1);
                              setMedication([...newMedication]);
                            }}
                            aria-label="view">
                            <Icon>delete</Icon>
                          </IconButton>
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </FuseAnimate>
      </div>
    </div>
  );
};

export default withRouter(ServicesOrder);
