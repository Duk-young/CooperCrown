import _ from '@lodash';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { withRouter } from 'react-router';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import React, { useCallback, useState } from 'react';
import SearchFrameDialouge from '../SearchFrameDialouge';
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

const OtherProductsOrder = (props) => {
  const classes = useStyles();
  const [otherProduct, setOtherProduct] = useState(null);
  const { disabledState, form, handleChange, otherProductInfo, setOtherProductInfo } = props;

  const handleOtherProductChange = useCallback((event) => {
    event?.persist && event.persist();
    setOtherProduct((_otherProduct) =>
      _.setIn(
        { ..._otherProduct },
        event.target.name,
        event.target.type === 'checkbox'
          ? event.target.checked
          : event.target.value
      )
    );
    return null;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddOtherProductToOrder = () => {
    if (!otherProduct) {
      return toast.error('Please fill the details for the other product', {
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

    setOtherProductInfo([...otherProductInfo, otherProduct]);
  };

  return (
    <div>
      <div className="other-products-info flex flex-col p-16 sm:px-24">
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
                    checked={form?.shipOtherProductToCustomerLogic ?? ''}
                    onChange={handleChange}
                    name="shipOtherProductToCustomerLogic"
                    disabled={disabledState}
                  />
                }
                label="Ship To Customer"
              />
              <h2 className="font-700" style={{ color: '#f15a25' }}>
                OTHER PRODUCT INFO
              </h2>
              <FormControlLabel
                className="m-0"
                style={{ color: '#f15a25' }}
                control={
                  <Checkbox
                    checked={form?.rushOtherProductOrder ?? ''}
                    onChange={handleChange}
                    name="rushOtherProductOrder"
                    disabled={disabledState}
                  />
                }
                label="Rush Order"
              />
            </div>
            <div className="flex flex-row w-full p-8 gap-10">
              <div className="flex flex-col w-full">
                <div className="flex flex-col px-8">
                  <div className="flex flex-col my-10 relative">
                    <div className="flex flex-row absolute right-0">
                      <SearchFrameDialouge
                        disabledState={disabledState}
                        form={otherProduct}
                        setForm={setOtherProduct}
                        variant="inventory"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col w-1/2 my-0 mx-auto gap-10">
                    <TextField
                      fullWidth
                      style={{ borderRadius: '0px' }}
                      variant="outlined"
                      id="standard-basic"
                      value={otherProduct?.otherProductBrand ?? ''}
                      onChange={handleOtherProductChange}
                      name={'otherProductBrand'}
                      label="Brand"
                      size="small"
                      disabled={true}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                    <TextField
                      className="mt-4"
                      fullWidth
                      variant="outlined"
                      id="standard-basic"
                      value={otherProduct?.otherProductModel ?? ''}
                      onChange={handleOtherProductChange}
                      name={'otherProductModel'}
                      label="Model"
                      size="small"
                      disabled={true}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                    <TextField
                      className="mt-4"
                      fullWidth
                      variant="outlined"
                      id="standard-basic"
                      value={otherProduct?.otherProductColour ?? ''}
                      onChange={handleOtherProductChange}
                      name={'otherProductColour'}
                      label="Colour"
                      size="small"
                      disabled={true}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                    <TextField
                      className="mt-4"
                      fullWidth
                      variant="outlined"
                      id="standard-basic"
                      value={otherProduct?.otherProductMaterial ?? ''}
                      onChange={handleOtherProductChange}
                      name={'otherProductMaterial'}
                      label="Material"
                      size="small"
                      disabled={true}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                    <TextField
                      className="mt-4"
                      fullWidth
                      variant="outlined"
                      id="standard-basic"
                      value={otherProduct?.otherProductSize ?? ''}
                      onChange={handleOtherProductChange}
                      name={'otherProductSize'}
                      label="Size"
                      size="small"
                      disabled={true}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                    <TextField
                      className="mt-4"
                      fullWidth
                      variant="outlined"
                      id="standard-basic"
                      value={otherProduct?.otherProductQty ?? ''}
                      onChange={handleOtherProductChange}
                      name={'otherProductQty'}
                      label="QTY"
                      size="small"
                      disabled={true}
                      InputProps={{
                        inputProps: {
                          style: { textAlign: 'center' }
                        }
                      }}
                    />
                    <div className="flex gap-10">
                      <TextField
                        id="outlined-multiline-static"
                        label="Memo"
                        variant="outlined"
                        size="small"
                        className="w-full"
                        name="otherProductMemo"
                        disabled={disabledState}
                        value={otherProduct?.otherProductMemo ?? ''}
                        onChange={handleOtherProductChange}
                      />
                      <TextField
                        id="outlined-multiline-static"
                        label="Additional Price"
                        variant="outlined"
                        size="small"
                        className="w-1"
                        disabled={disabledState}
                        name="otherProductAdditionalPrice"
                        error={
                          otherProduct?.otherProductAdditionalPrice &&
                          !Number(
                            otherProduct?.otherProductAdditionalPrice
                          )
                        }
                        value={
                          otherProduct?.otherProductAdditionalPrice ?? ''
                        }
                        onChange={handleOtherProductChange}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row p-10">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleAddOtherProductToOrder}
                disabled={disabledState}
                aria-label="add">
                <AddIcon />
                Add to Order
              </Button>
              <div className='pl-4'>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => { setOtherProduct({}) }}
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
                      {/* <StyledTableCell>Order No</StyledTableCell> */}
                      <StyledTableCell>SKU</StyledTableCell>
                      <StyledTableCell>Brand</StyledTableCell>
                      <StyledTableCell>Model</StyledTableCell>
                      <StyledTableCell>Color</StyledTableCell>
                      <StyledTableCell>Material</StyledTableCell>
                      <StyledTableCell>Size</StyledTableCell>
                      <StyledTableCell>Qty</StyledTableCell>
                      <StyledTableCell>Price</StyledTableCell>
                      <StyledTableCell></StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {otherProductInfo.map((row, index) => (
                      <StyledTableRow
                        onClick={() => { setOtherProduct(row) }}
                        key={index}
                        hover
                        className="cursor-pointer">
                        <StyledTableCell component="th" scope="row">
                          {row?.otherProductSKU}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.otherProductBrand}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.otherProductModel}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.otherProductColour}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.otherProductMaterial}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.otherProductSize}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.otherProductQty}
                        </StyledTableCell>
                        <StyledTableCell>
                          {row?.otherProductPrice}
                        </StyledTableCell>
                        <StyledTableCell>
                          <IconButton
                            disabled={disabledState}
                            onClick={() => {
                              let data = otherProductInfo;
                              otherProductInfo.splice(index, 1);
                              setOtherProductInfo([...data]);
                              setOtherProduct(row);
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

export default withRouter(OtherProductsOrder);
