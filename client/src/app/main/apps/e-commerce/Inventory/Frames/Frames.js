// import FuseLoading from '@fuse/core/FuseLoading';
import '../../Customers/Search.css';
import '../../Customers/Themes.css';
import { connectHits } from 'react-instantsearch-dom';
import { firestore } from 'firebase';
import {
  InstantSearch,
  Panel,
  SearchBox,
  HitsPerPage,
  Pagination
} from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { RefinementList } from 'react-instantsearch-dom';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

const CustomHits = connectHits(({ hits }) => {
  const [images, setImages] = useState([]);
  const classes = useStyles();
  const handleClick = async (item) => {
    const query = await firestore()
      .collection('frames')
      .where('frameId', '==', Number(item))
      .limit(1)
      .get();

    let result = query.docs[0].data();
    setImages(result?.images?.urls);
  };
  return (
    <div className="flex flex-col ml-8 w-full">
      <div className="flex flex-row">
        {images?.map((img, index) => (
          <div className="mb-8 w-224 mr-6 ">
            <img
              className="w-full border-grey-300 border-1 relative shadow-1 rounded-4"
              src={img.url}
              key={img.name}
              alt={''}
            />
            <div className="truncate">{img.name.split('.', 1)}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-row w-full">
        <Table
          className={classes.table}
          stickyHeader
          aria-label="customized table">
          <TableHead>
            <TableRow style={{ height: 10 }}>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>BRANDS</StyledTableCell>
              <StyledTableCell>MODEL</StyledTableCell>
              <StyledTableCell>COLOUR</StyledTableCell>
              <StyledTableCell>MATERIAL</StyledTableCell>
              <StyledTableCell>SHAPE</StyledTableCell>
              <StyledTableCell>SIZE</StyledTableCell>
              <StyledTableCell>INITIAL QTY</StyledTableCell>
              <StyledTableCell>CURRENT QTY</StyledTableCell>
              <StyledTableCell>OPTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits
              .sort((a, b) => (a.frameId < b.frameId ? -1 : 1))
              .map((hit) => (
                <StyledTableRow
                  style={{ height: 10 }}
                  onClick={() => handleClick(hit.frameId)}
                  key={hit.frameId}
                  className="cursor-pointer">
                  <StyledTableCell component="th" scope="row">
                    {hit.sku}
                  </StyledTableCell>
                  <StyledTableCell>{hit.brand}</StyledTableCell>
                  <StyledTableCell>{hit.productDescription}</StyledTableCell>
                  <StyledTableCell>{hit.colour}</StyledTableCell>
                  <StyledTableCell>{hit.material}</StyledTableCell>
                  <StyledTableCell>{hit.shape}</StyledTableCell>
                  <StyledTableCell>{`  ${hit.sizeX}-${hit.sizeY}-${hit.sizeZ}-${
                    hit?.sizeZ2 ? hit?.sizeZ2 : ''
                  }   `}</StyledTableCell>
                  <StyledTableCell>{hit.initialQuantity}</StyledTableCell>
                  <StyledTableCell>{hit.quantity}</StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/apps/inventory/addframes/${hit.frameId}`}
                      className="btn btn-primary">
                      <IconButton aria-label="edit">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Link>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14,
    padding: 0
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 900
  }
});

const Frames = (props) => {
  const [openFiltersDialog, setOpenFiltersDialog] = useState(false);

  const [searchState, setSearchState] = useState({});
  const handleCloseFiltersDialog = () => {
    setOpenFiltersDialog(false);
  };

  return (
    <div className="flex flex-col w-full ">
      <InstantSearch
        searchClient={searchClient}
        indexName="frames"
        searchState={searchState}>
        <TableContainer component={Paper} className="flex flex-col w-full ">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1"></div>
            <div className="flex flex-col flex-1 mb-10 border-1">
              <SearchBox
                onChange={(e) => {
                  setSearchState({ ...searchState, query: e.target.value });
                  console.log(searchState);
                }}
                translations={{
                  placeholder: 'Searh for frames...'
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
            <div className="flex flex-col flex-1">
              <div className="flex w-full justify-around">
                <Button
                  className="whitespace-no-wrap normal-case mt-10"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenFiltersDialog(true);
                  }}>
                  Filters
                </Button>
                <Button
                  className="whitespace-no-wrap normal-case mt-10"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.history.push('/apps/inventory/addframes');
                  }}>
                  Add Inventory
                </Button>
              </div>
            </div>
          </div>
          <div>
            <div>
              <Dialog
                fullWidth
                maxWidth="sm"
                open={openFiltersDialog}
                onClose={handleCloseFiltersDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                  <h2>Select Filters!</h2>
                </DialogTitle>
                <DialogContent>
                  <div className="flex flex-row justify-between">
                    <InstantSearch
                      searchClient={searchClient}
                      indexName="frames"
                      // onChange={(e) => {
                      //   console.log(e);
                      // }}
                      searchState={searchState}
                      onSearchStateChange={(e) => {
                        setSearchState(e);
                        console.log(searchState);
                      }}>
                      <Panel header="Brands">
                        <RefinementList
                          attribute="brand"
                          limit={4}
                          searchable={true}
                          translations={{
                            placeholder: 'Search for brands…'
                          }}
                        />
                      </Panel>
                      <Panel header="Colour">
                        <RefinementList
                          attribute="colour"
                          limit={4}
                          searchable={true}
                          translations={{
                            placeholder: 'Search for colours…'
                          }}
                        />
                      </Panel>
                      <Panel header="Material">
                        <RefinementList
                          attribute="material"
                          limit={4}
                          searchable={true}
                          translations={{
                            placeholder: 'Search for materials…'
                          }}
                        />
                      </Panel>
                    </InstantSearch>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <CustomHits props={props} />
          <div className="flex flex-row justify-center">
            <div className="flex flex-1"></div>
            <div className="flex flex-1 justify-center mt-8">
              <Pagination />
            </div>
            <div className="flex flex-1 justify-center mt-8">
              <HitsPerPage
                defaultRefinement={50}
                items={[
                  { value: 50, label: 'Show 50' },
                  { value: 100, label: 'Show 100' },
                  { value: 200, label: 'Show 200' }
                ]}
              />
            </div>
          </div>
        </TableContainer>
      </InstantSearch>
    </div>
  );
};

export default withRouter(Frames);
