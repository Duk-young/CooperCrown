import { firestore } from 'firebase';
import React from 'react';
import PropTypes from 'prop-types';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox } from 'react-instantsearch-dom';
import { connectHits } from 'react-instantsearch-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import { toast, Zoom } from 'react-toastify';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import { useState } from 'react';
import Scanner from '../Inventory/Scanner';
import '../Customers/Search.css';
import Barcode from './images/barcode-icon.png';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY);

const CustomHits = connectHits(({ hits, form, setForm, handleClose }) => {
  return (
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>SKU</StyledTableCell>
          <StyledTableCell>Brand</StyledTableCell>
          <StyledTableCell>Description</StyledTableCell>
          <StyledTableCell>Color</StyledTableCell>
          <StyledTableCell>Material</StyledTableCell>
          <StyledTableCell>Shape</StyledTableCell>
          <StyledTableCell>Options</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.map((hit) => (
          <StyledTableRow key={hit.objectID}>
            <StyledTableCell>{hit?.sku}</StyledTableCell>
            <StyledTableCell>{hit?.brand}</StyledTableCell>
            <StyledTableCell>{hit?.productDescription}</StyledTableCell>
            <StyledTableCell>{hit?.colour}</StyledTableCell>
            <StyledTableCell>{hit?.material}</StyledTableCell>
            <StyledTableCell>{hit?.shape}</StyledTableCell>

            <StyledTableCell>
              <Button
                className="whitespace-no-wrap normal-case ml-24"
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => {
                  if (hit?.quantity > 0) {
                    setForm({
                      ...form,
                      frameId: hit?.frameId,
                      frameBrand: hit?.brand,
                      frameModel: hit?.productDescription,
                      frameColour: hit?.colour,
                      frameRate: hit?.retailRate,
                      frameWsRate: hit?.ws,
                      frameQuantity: hit?.quantity,
                      frameShape: hit?.shape
                    });
                    handleClose();
                  } else {
                    toast.error('Required Frame is not available in Invntory', {
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
                }}
                startIcon={<AddToQueueIcon />}>
                Select
              </Button>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
});

const CustomProductHits = connectHits(
  ({ hits, form, setForm, handleClose }) => {
    return (
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>SKU</StyledTableCell>
            <StyledTableCell>Brand</StyledTableCell>
            <StyledTableCell>Description</StyledTableCell>
            <StyledTableCell>Color</StyledTableCell>
            <StyledTableCell>Material</StyledTableCell>
            <StyledTableCell>Shape</StyledTableCell>
            <StyledTableCell>Options</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {hits.map((hit) => (
            <StyledTableRow key={hit.objectID}>
              <StyledTableCell>{hit?.sku}</StyledTableCell>
              <StyledTableCell>{hit?.brand}</StyledTableCell>
              <StyledTableCell>{hit?.productDescription}</StyledTableCell>
              <StyledTableCell>{hit?.colour}</StyledTableCell>
              <StyledTableCell>{hit?.material}</StyledTableCell>
              <StyledTableCell>{hit?.shape}</StyledTableCell>

              <StyledTableCell>
                <Button
                  className="whitespace-no-wrap normal-case ml-24"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    if (hit?.quantity > 0) {
                      setForm({
                        ...form,
                        otherProductBrand: hit?.brand,
                        otherProductModel: hit?.productDescription,
                        otherProductColour: hit?.colour,
                        otherProductMaterial: hit?.material,
                        otherProductSize: hit?.retailRate,
                        otherProductQty: hit?.quantity,
                        otherProductPrice: hit?.retailRate,
                        otherProductWS: hit?.ws,
                        otherProductSKU: hit?.sku
                      });
                      handleClose();
                    } else {
                      toast.error(
                        'Required product is not available in Inventory',
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
                  }}
                  startIcon={<AddToQueueIcon />}>
                  Select
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    );
  }
);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const emails = ['username@gmail.com', 'user02@gmail.com'];
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  },
  table: {
    minWidth: 700
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, form, setForm } = props;
  const [searchType, setSearchType] = useState();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onDetected = async (result) => {
    const queryFrames = await firestore()
      .collection('frames')
      .where('sku', '==', result.codeResult.code)
      .limit(1)
      .get();

    if (queryFrames?.docs.length) {
      let resultFrames = queryFrames.docs[0].data();

      if (resultFrames?.quantity > 0) {
        setForm({
          ...form,
          frameId: resultFrames?.frameId,
          frameBrand: resultFrames?.brand,
          frameModel: resultFrames?.productDescription,
          frameColour: resultFrames?.colour,
          frameRate: resultFrames?.retailRate,
          frameWsRate: resultFrames?.ws,
          frameQuantity: resultFrames?.quantity,
          frameShape: resultFrames?.shape
        });
        handleClose();
      } else {
        toast.error('Required Frame is not available in Inventory', {
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
    } else {
      toast.error('Required Frame is not available in Invntory', {
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
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Select Frame
      </DialogTitle>
      <div className="p-8 w-full h-auto relative">
        <FormControl component="fieldset">
          <RadioGroup
            className="ml-60"
            row
            aria-label="searchType"
            name="searchType"
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
            }}>
            <FormControlLabel
              value="search"
              control={<Radio />}
              label="Search Frame"
            />
            <FormControlLabel
              value="barcode"
              control={<Radio />}
              label="Scan Barcode"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {searchType === 'search' && (
        <div className="flex w-full ">
          <TableContainer
            component={Paper}
            className="flex flex-col w-full p-20 rounded-32 shadow-20">
            <InstantSearch searchClient={searchClient} indexName="frames">
              <div className="flex flex-row">
                <div className="flex flex-col flex-1 mb-10 shadow-10 rounded-12 inventorySearch">
                  <SearchBox
                    translations={{
                      placeholder: 'Search for Frames...'
                    }}
                    submit={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 18 18">
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.67"
                          transform="translate(1 1)">
                          <circle cx="7.11" cy="7.11" r="7.11" />
                          <path d="M16 16l-3.87-3.87" />
                        </g>
                      </svg>
                    }
                  />
                </div>
              </div>
              <CustomHits
                form={form}
                setForm={setForm}
                handleClose={handleClose}
              />
            </InstantSearch>
          </TableContainer>
        </div>
      )}
      {searchType === 'barcode' && (
        <Paper variant="outlined">
          <Scanner onDetected={onDetected} />
        </Paper>
      )}
    </Dialog>
  );
}

function SimpleInventoryDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open, form, setForm } = props;
  const [searchType, setSearchType] = useState();

  const handleClose = () => {
    onClose(selectedValue);
  };

  const onDetected = async (result) => {
    const queryOtherProducts = await firestore()
      .collection('other')
      .where('sku', '==', result.codeResult.code)
      .limit(1)
      .get();

    if (queryOtherProducts?.docs.length) {
      let resultOtherProducts = queryOtherProducts.docs[0].data();

      if (resultOtherProducts?.quantity > 0) {
        setForm({
          ...form,
          otherProductBrand: resultOtherProducts?.brand,
          otherProductModel: resultOtherProducts?.productDescription,
          otherProductColour: resultOtherProducts?.colour,
          otherProductMaterial: resultOtherProducts?.material,
          otherProductSize: resultOtherProducts?.retailRate,
          otherProductQty: resultOtherProducts?.quantity,
          otherProductMemo: resultOtherProducts?.otherProductMemo,
          otherProductAdditionalPrice:
            resultOtherProducts?.otherProductAdditionalPrice,
          otherProductPrice: resultOtherProducts?.retailRate,
          otherProductWS: resultOtherProducts?.ws,
          otherProductSKU: resultOtherProducts?.sku
        });
        handleClose();
      } else {
        toast.error('Required product is not available in Inventory', {
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
    } else {
      toast.error('Required product is not available in Inventory', {
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
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <DialogTitle className={classes.title} id="simple-dialog-title">
        Select Other Product
      </DialogTitle>
      <div className="p-8 w-full h-auto relative">
        <FormControl component="fieldset">
          <RadioGroup
            className="ml-60"
            row
            aria-label="searchType"
            name="searchType"
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
            }}>
            <FormControlLabel
              value="search"
              control={<Radio />}
              label="Search Other Product"
            />
            <FormControlLabel
              value="barcode"
              control={<Radio />}
              label="Scan Barcode"
            />
          </RadioGroup>
        </FormControl>
      </div>
      {searchType === 'search' && (
        <div className="flex w-full ">
          <TableContainer
            component={Paper}
            className="flex flex-col w-full p-20 rounded-32 shadow-20">
            <InstantSearch searchClient={searchClient} indexName="other">
              <div className="flex flex-row">
                <div className="flex flex-col flex-1 mb-10 shadow-10 rounded-12">
                  <SearchBox
                    translations={{
                      placeholder: 'Search for other product...'
                    }}
                    submit={
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 18 18">
                        <g
                          fill="none"
                          fillRule="evenodd"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.67"
                          transform="translate(1 1)">
                          <circle cx="7.11" cy="7.11" r="7.11" />
                          <path d="M16 16l-3.87-3.87" />
                        </g>
                      </svg>
                    }
                  />
                </div>
              </div>
              <CustomProductHits
                form={form}
                setForm={setForm}
                handleClose={handleClose}
              />
            </InstantSearch>
          </TableContainer>
        </div>
      )}
      {searchType === 'barcode' && (
        <Paper variant="outlined">
          <Scanner onDetected={onDetected} />
        </Paper>
      )}
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function SearchFrameDialouge(props) {
  const [open, setOpen] = React.useState(false);
  const { form, setForm, disabledState, variant } = props;
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      {/* <IconButton onClick={handleClickOpen}>
        <Icon>addcircle</Icon>
      </IconButton> */}
      <button onClick={handleClickOpen} disabled={disabledState}>
        <img src={Barcode} alt="barcode" />
      </button>
      {variant === 'frame' && (
        <SimpleDialog
          form={form}
          setForm={setForm}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      )}
      {variant === 'inventory' && (
        <SimpleInventoryDialog
          form={form}
          setForm={setForm}
          selectedValue={selectedValue}
          open={open}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
