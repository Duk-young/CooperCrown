import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import React from 'react';
import reducer from '../store/reducers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import {
  connectHits,
  Pagination,
  InstantSearch,
  SearchBox,
  HitsPerPage,
  connectStateResults
} from 'react-instantsearch-dom';
import LoadingDialog from '../ReusableComponents/LoadingDialog';

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: 160,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY);

const CustomHits = connectHits(({ hits, props }) => {

  return (
    <Table stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>EXAM / SERVICE</StyledTableCell>
          <StyledTableCell>DESCRIPTION</StyledTableCell>
          <StyledTableCell>PRICE</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.sort((a, b) => (a.serviceId > b.serviceId ? -1 : 1)).map((hit) => (
          <StyledTableRow
            key={hit.objectID}
            hover
            className="cursor-pointer"
            onClick={() => { props.history.push(`/apps/e-commerce/service/${hit.serviceId}`); }}>
            <StyledTableCell>{hit.name}</StyledTableCell>
            <StyledTableCell>{hit.description}</StyledTableCell>
            <StyledTableCell>{hit.price}</StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  );
});

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
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

function Services(props) {
  const classes = useStyles(props);

  const ResultStats = connectStateResults(
    ({ searching }) =>
      searching ? (<LoadingDialog />) : (<div></div>)
  );

  return (
    <div className="flex w-full">
      <InstantSearch
        searchClient={searchClient}
        indexName="services"
        refresh>
        <div className="flex flex-col w-full">
          <div className={clsx(classes.header)}>
            <div className="flex flex-row p-4 w-full justify-center">
              <Typography
                className="hidden sm:flex mx-0 sm:mx-12 uppercase"
                style={{ fontSize: '3rem', fontWeight: 600 }}
                variant="h6">
                SERVICES
              </Typography>
            </div>
            <div className="flex pt-32 pb-16 pl-8 items-center">
              <div className="flex flex-col w-1/3 mt-0 px-12"></div>
              <div className="flex flex-col w-1/3 border-1 headerSearch">
                <SearchBox
                  translations={{
                    placeholder: 'Search for services...'
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
              <div className="flex flex-row w-1/3 justify-around items-center">
                <div className="flex flex-col w-1/3 ">
                  <div className="flex flex-1 justify-center">
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
                <div className="">
                  <Button
                    className={classes.button}
                    onClick={() => { props.history.push('/apps/e-commerce/service/new') }}
                    variant="contained"
                    color="secondary">
                    <span className="hidden sm:flex">ADD NEW</span>
                    <span className="flex sm:hidden">ADD</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ResultStats />
          <TableContainer
            stickyHeader
            className="flex flex-col w-full overflow-scroll">
            <CustomHits props={props} />
          </TableContainer>
          <div className="flex flex-row justify-center">
            <div className="flex flex-1"></div>
            <div className="flex flex-1 justify-center mt-8"><Pagination showLast={true} /></div>
            <div className="flex flex-1"></div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

export default withReducer('eCommerceApp', reducer)(Services);
