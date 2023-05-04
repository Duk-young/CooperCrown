import _ from '@lodash';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { withRouter } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAutocomplete1 from '../Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import React, { useCallback, useState } from 'react';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';

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

const ContactsOrder = (props) => {
  const classes = useStyles();
  const [selectedContactLens, setSelectedContactLens] = useState({});
  const { form, handleChange, disabledState, prescription, contactLens, contactLenses, setContactLenses } = props;
  const [filteredContactLensOd, setFilteredContactLensOd] = useState(contactLens);
  const [filteredContactLensOs, setFilteredContactLensOs] = useState(contactLens);

  const handleSelectedContactLensChange = useCallback((event) => {
    event?.persist && event.persist();
    setSelectedContactLens((_selectedContactLens) =>
      _.setIn(
        { ..._selectedContactLens },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchContactLensRate = () => {
    let contactLensRate
    if (
      selectedContactLens?.contactLensStyleOd ||
      selectedContactLens?.contactLensStyleOs
    ) {
      contactLens.map((row) => {
        if (
          row?.style === selectedContactLens?.contactLensStyleOd ||
          selectedContactLens?.contactLensStyleOs
        ) {
          contactLensRate = +row?.price
        }
        return null;
      });
      return contactLensRate
    } else {
      toast.error('Please select Contact Lens Style...', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Zoom
      });
      return null;
    }
  };

  const handleAddContactsLensToOrder = () => {
    let contactLensRate = fetchContactLensRate();

    if (contactLensRate) {
      setContactLenses([...contactLenses, { ...selectedContactLens, contactLensRate }]);
    } else {
      toast.error(
        'Contact Lens Rate is not calculated yet.',
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom
        }
      );
    }
  };

  const filterOdContacts = (value, attribute) => {
    let newContacts = filteredContactLensOd.filter((contact) => contact?.[attribute] === value )
    setFilteredContactLensOd(newContacts)
  }

  const filterOsContacts = (value, attribute) => {
    let newContacts = filteredContactLensOs.filter((contact) => contact?.[attribute] === value )
    setFilteredContactLensOs(newContacts)
  }

  return (
    <div>
      <div className="contact-lens-prescription flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8  border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CONTACT LENS PRESCRIPTION
              </h1>
            </div>
            <div>
              <div className="flex flex-col p-8 flex-1 h-auto justify-between">
                <div className="flex flex-row w-full">
                  <div className="flex flex-col px-10 w-1/2 ">
                    <CustomAutocomplete1
                      list={prescription.filter(
                        (word) =>
                          word.prescriptionType === 'contactLensRx'
                      )}
                      form={selectedContactLens}
                      disabled={disabledState}
                      setForm={setSelectedContactLens}
                      handleChange={handleSelectedContactLensChange}
                      id="prescriptionId"
                      freeSolo={false}
                      label="Select Prescription"
                    />
                  </div>
                </div>

                <div className="flex flex-row ">
                  <div className="p-8 h-auto w-40">
                    <h3 className="text-center font-700">RX</h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">Sphere</h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">
                      Cylinder
                    </h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">Axis</h3>
                  </div>
                  <div className="p-8 h-auto w-80">
                    <h3 className="text-center font-700">Add</h3>
                  </div>
                  <div className="p-8 h-auto w-1/4">
                    <h3 className="text-center font-700">Model</h3>
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OD</h3>
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={selectedContactLens?.contactLensSphereOd ?? ''}
                      onChange={handleSelectedContactLensChange}
                      disabled={disabledState}
                      name={'contactLensSphereOd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={selectedContactLens?.contactLensCylinderOd ?? ''}
                      onChange={handleSelectedContactLensChange}
                      disabled={disabledState}
                      name={'contactLensCylinderOd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      value={selectedContactLens?.contactLensAxisOd ?? ''}
                      disabled={disabledState}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAxisOd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={selectedContactLens?.contactLensAddOd ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAddOd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={selectedContactLens?.contactLensAddOd ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAddOd'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row ">
                  <div className="p-8 w-40 h-auto border-grey-400 border-solid border-1 justify-between">
                    <h3 className="text-center font-700">OS</h3>
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={selectedContactLens?.contactLensSphereOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensSphereOs'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={selectedContactLens?.contactLensCylinderOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensCylinderOs'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={selectedContactLens?.contactLensAxisOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAxisOs'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-80 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={selectedContactLens?.contactLensAddOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAddOs'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                  <div className="p-8 w-1/4 h-auto border-grey-400 border-solid border-1 justify-between">
                    <TextField
                      size="small"
                      fullWidth
                      id="standard-basic"
                      disabled={disabledState}
                      value={selectedContactLens?.contactLensAddOs ?? ''}
                      onChange={handleSelectedContactLensChange}
                      name={'contactLensAddOs'}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FuseAnimate>
      </div>

      <div className="contact-lens-info flex flex-col p-16 sm:px-24">
        <FuseAnimate
          animation="transition.slideRightIn"
          delay={500}>
          <div className="py-8 border-1 border-black border-solid rounded-6">
            <div className="flex px-20 flex-row justify-between border-b-1 border-black border-solid">
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.shipContactLensToCustomerLogic ?? ''}
                    onChange={handleChange}
                    name="shipContactLensToCustomerLogic"
                    disabled={disabledState}
                  />
                }
                label="Ship To Customer"
              />
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CONTACT LENS INFO
              </h1>
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.rushContactLensOrder ?? ''}
                    onChange={handleChange}
                    name="rushContactLensOrder"
                    disabled={disabledState}
                  />
                }
                label="Rush Order"
              />
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col gap-10 w-full">
                <div className="flex w-full items-end gap-20 px-20">
                  <h3 className="text-center font-700">OD</h3>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Style
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensStyleOd ?? ''}
                      name="contactLensStyleOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'style')
                      }}>
                      {[...new Set(filteredContactLensOd?.map((item) => (item?.style ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Brand
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBrandOd ?? ''}
                      name="contactLensBrandOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'brand')
                      }}>
                      {[...new Set(filteredContactLensOd?.map((item) => (item?.brand ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Model
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensNameOd ?? ''}
                      name="contactLensNameOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'model')
                      }}>
                      {[...new Set(filteredContactLensOd?.map((item) => (item?.model ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Base Curve
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBaseCurveOd ?? ''}
                      name="contactLensBaseCurveOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'basecurve')
                      }}>
                      {[...new Set(filteredContactLensOd?.map((item) => (item?.basecurve ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Pack Qty
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensPackQtyOd ?? ''}
                      name="contactLensPackQtyOd"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOdContacts(e.target.value, 'packquantity')
                      }}>
                      {[...new Set(filteredContactLensOd?.map((item) => (item?.packquantity ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex w-full items-end gap-20 px-20">
                  <h3 className="text-center font-700">OS</h3>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Style
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensStyleOs ?? ''}
                      name="contactLensStyleOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'style')
                      }}>
                      {[...new Set(filteredContactLensOs?.map((item) => (item?.style ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Brand
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBrandOs ?? ''}
                      name="contactLensBrandOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'brand')
                      }}>
                      {[...new Set(filteredContactLensOs?.map((item) => (item?.brand ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Model
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensNameOs ?? ''}
                      name="contactLensNameOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'model')
                      }}>
                      {[...new Set(filteredContactLensOs?.map((item) => (item?.model ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Base Curve
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensBaseCurveOs ?? ''}
                      name="contactLensBaseCurveOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'basecurve')
                      }}>
                      {[...new Set(filteredContactLensOs?.map((item) => (item?.basecurve ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl className="w-1/5">
                    <InputLabel id="demo-simple-select-autowidth-label">
                      Pack Qty
                    </InputLabel>
                    <Select
                      disabled={disabledState}
                      labelId="demo-simple-select-autowidth-label"
                      value={selectedContactLens?.contactLensPackQtyOs ?? ''}
                      name="contactLensPackQtyOs"
                      onChange={(e) => {
                        handleSelectedContactLensChange(e)
                        filterOsContacts(e.target.value, 'packquantity')
                      }}>
                      {[...new Set(filteredContactLensOs?.map((item) => (item?.packquantity ?? '')))].map((row) => (
                        <MenuItem value={row}>
                          {row}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="flex flex-col px-20 gap-10">
                  <FormControlLabel
                    className="m-0"
                    style={{ width: 'fit-content' }}
                    control={
                      <Checkbox
                        checked={selectedContactLens?.OU ?? ''}
                        onChange={handleSelectedContactLensChange}
                        name="OU"
                        disabled={disabledState}
                      />
                    }
                    label="OU"
                  />
                  <div className="flex gap-10 justify-between">
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          checked={selectedContactLens?.orderFromShowroom ?? ''}
                          onChange={handleSelectedContactLensChange}
                          name="orderFromShowroom"
                          disabled={disabledState}
                        />
                      }
                      label="Order From Showroom"
                    />
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          checked={selectedContactLens?.orderFromLab ?? ''}
                          onChange={handleSelectedContactLensChange}
                          name="orderFromLab"
                          disabled={disabledState}
                        />
                      }
                      label="Order From Lab"
                    />
                    <FormControlLabel
                      className="m-0"
                      control={
                        <Checkbox
                          checked={selectedContactLens?.contactLensInsurance ?? ''}
                          onChange={handleSelectedContactLensChange}
                          name="contactLensInsurance"
                          disabled={disabledState}
                        />
                      }
                      label="Order From Insurance"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row p-10">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleAddContactsLensToOrder}
                disabled={disabledState}
                aria-label="add">
                <AddIcon />
                Add to Order
              </Button>
              <div className='pl-4'>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setSelectedContactLens({})
                    setFilteredContactLensOd(contactLens)
                    setFilteredContactLensOs(contactLens)
                  }}
                  aria-label="add">
                  CLEAR
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
                      <StyledTableCell>RX</StyledTableCell>
                      <StyledTableCell>Style</StyledTableCell>
                      <StyledTableCell>Brand</StyledTableCell>
                      <StyledTableCell>Model</StyledTableCell>
                      <StyledTableCell>Base Curve</StyledTableCell>
                      <StyledTableCell>Pack Qty</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {contactLenses.map((row, index) => (
                      <StyledTableRow
                        onClick={() => {
                          setSelectedContactLens(row);
                        }}
                        key={index}
                        hover
                        className="cursor-pointer">
                        <StyledTableCell>
                          {(row?.contactLensStyleOd !== '' &&
                            'OD') ||
                            (row?.contactLensStyleOs !== '' &&
                              'OS')}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.contactLensStyleOd ||
                            row?.contactLensStyleOs}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.contactLensBrandOd ||
                            row?.contactLensBrandOs}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.contactLensNameOd ||
                            row?.contactLensNameOs}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.contactLensBaseCurveOd ||
                            row?.contactLensBaseCurveOs}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.contactLensPackQtyOd ||
                            row?.contactLensPackQtyOs}
                        </StyledTableCell>
                        <StyledTableCell>
                          ${row?.contactLensRate}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            disabled={disabledState}
                            onClick={() => {
                              let newContactLenses = contactLenses;
                              newContactLenses.splice(index, 1);
                              setContactLenses([
                                ...newContactLenses
                              ]);
                              setSelectedContactLens(row);
                            }}
                            aria-label="view">
                            <Icon>edit</Icon>
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

export default withRouter(ContactsOrder);
