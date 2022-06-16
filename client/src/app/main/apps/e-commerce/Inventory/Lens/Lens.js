// import '../../Customers/Search.css';
// import '../../Customers/Themes.css';
import {
  InstantSearch,
  Panel,
  SearchBox,
  connectRefinementList,
  RefinementList,
  connectHits
} from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);
const VirtualRefinementList = connectRefinementList(() => null);

const Hits = ({ hits }) => {
  const classes = useStyles();

  return (
    <div className="flex flex-col ml-8 w-full">
      <div className="flex flex-row w-full">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>SKU</StyledTableCell>
              <StyledTableCell>LENS MATERIAL</StyledTableCell>
              <StyledTableCell>SPHERE</StyledTableCell>
              <StyledTableCell>CYLINDER</StyledTableCell>
              <StyledTableCell>QUANTITY</StyledTableCell>
              <StyledTableCell>OPTIONS</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hits
              .sort((a, b) => (a.lensId < b.lensId ? -1 : 1))
              .map((row) => (
                <StyledTableRow key={row.lensId}>
                  <StyledTableCell component="th" scope="row">
                    {row.sku}
                  </StyledTableCell>
                  <StyledTableCell>{row.material}</StyledTableCell>
                  <StyledTableCell>{row.sphere}</StyledTableCell>
                  <StyledTableCell>{row.cylinder}</StyledTableCell>
                  <StyledTableCell>{row.quantity}</StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/apps/inventory/addlens/${row.lensId}`}
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
};
const CustomHits = connectHits(Hits);

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
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
    minWidth: 700
  }
});

const Lens = (props) => {
  const [openFiltersDialog, setOpenFiltersDialog] = useState(false);
  const [searchState, setSearchState] = useState({});

  const handleCloseFiltersDialog = () => {
    setOpenFiltersDialog(false);
  };

  return (
    <div className="flex flex-col w-full h-full">
      <InstantSearch
        searchClient={searchClient}
        indexName="lens"
        onSearchStateChange={(state) => {
          if (
            openFiltersDialog &&
            (state.refinementList?.sphere ||
              state.refinementList?.cylinder ||
              state.refinementList?.material)
          ) {
            setSearchState(state.refinementList);
          }
        }}>
        <TableContainer component={Paper} className="flex flex-col w-full ">
          <div className="flex flex-row">
            <div className="flex flex-col flex-1">
              <VirtualRefinementList
                defaultRefinement={searchState?.sphere}
                attribute="sphere"
              />
              <VirtualRefinementList
                defaultRefinement={searchState?.cylinder}
                attribute="cylinder"
              />
              <VirtualRefinementList
                defaultRefinement={searchState?.material}
                attribute="material"
              />
            </div>
            <div className="flex flex-col flex-1 mb-10 ">
              <SearchBox
                translations={{
                  placeholder: 'Searh for lens...'
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
                reset={false}
              />
            </div>
            <div className="flex flex-col flex-1">
              <div className="flex w-full justify-end">
                <Button
                  className="whitespace-no-wrap normal-case mt-10"
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setOpenFiltersDialog(true);
                    setSearchState({});
                  }}>
                  Filters
                </Button>
                <Button
                  className="whitespace-no-wrap normal-case mb-24 ml-24"
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.history.push('/apps/inventory/addlens');
                  }}>
                  Add Inventory
                </Button>
              </div>
            </div>
          </div>

          <div>
            <Dialog
              fullWidth
              maxWidth="md"
              open={openFiltersDialog}
              onClose={handleCloseFiltersDialog}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                <h2>Select Filters!</h2>
              </DialogTitle>
              <DialogContent>
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="p-8 mb-10 border-1 border-black border-dashed">
                    <Panel header="Sphere">
                      <RefinementList
                        reset={false}
                        attribute="sphere"
                        limit={4}
                        searchable={true}
                        translations={{
                          placeholder: 'Search for sphere…'
                        }}
                      />
                    </Panel>
                  </div>
                  <div className="p-8 mb-10 rounded-12 shadow-5">
                    <Panel header="Cylinder">
                      <RefinementList
                        attribute="cylinder"
                        limit={4}
                        searchable={true}
                        translations={{
                          placeholder: 'Search for cylinder…'
                        }}
                      />
                    </Panel>
                  </div>
                  <div className="p-8 mb-10 rounded-12 shadow-5">
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
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex flex-row">
            <CustomHits />
          </div>
        </TableContainer>
      </InstantSearch>
    </div>
  );
};

export default withRouter(Lens);
