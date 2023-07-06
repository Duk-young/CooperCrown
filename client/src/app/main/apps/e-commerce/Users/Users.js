import { firestore } from 'firebase';
import { toast, Zoom } from 'react-toastify';
import { useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FuseLoading from '@fuse/core/FuseLoading';
import moment from 'moment'
import React, {useState, useEffect} from 'react';
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
  HitsPerPage} from 'react-instantsearch-dom';

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

  const [isLoading, setisLoading] = useState(false);
  const [showRooms, setShowRooms] = useState([]);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  useEffect(() => {
    const getRooms = async () => {
      setisLoading(true);
      let showroomdata = [];
      const queryShowrooms = await firestore()
        .collection('showRooms')
        .get();

      queryShowrooms.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(showroomdata);
      setisLoading(false);
    };
    getRooms();

  }, []);

  if (isLoading) return <FuseLoading />

  return (
    <Table stickyHeader aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>DATE</StyledTableCell>
          <StyledTableCell>LOCATION</StyledTableCell>
          <StyledTableCell>EMAIL</StyledTableCell>
          <StyledTableCell>ACCESS LEVEL</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits.sort((a, b) => (a.dateCreated > b.dateCreated ? -1 : 1)).map((hit) => (
          <StyledTableRow
            key={hit.objectID}
            hover
            className="cursor-pointer"
            onClick={() => {
              if (userData?.userRole === 'admin') {
                props.history.push(`/apps/e-commerce/user/${hit?.CompanyId}`);
              }else {
                toast.error('You are not authorized', {
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
            }}>
            <StyledTableCell>{hit?.dateCreated && moment(hit?.dateCreated).format('MM/DD/YYYY')}</StyledTableCell>
            <StyledTableCell>{showRooms.filter((room) => room.showRoomId === hit?.showRoomId)[0]?.locationName}</StyledTableCell>
            <StyledTableCell>{hit.email}</StyledTableCell>
            <StyledTableCell>{hit?.userRole === 'admin' ? 'Admin' : 'Staff'}</StyledTableCell>
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

function Users(props) {
  const classes = useStyles(props);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  return (
        <div className="flex w-full overflow-hidden">
          <InstantSearch
            searchClient={searchClient}
            indexName="users"
            refresh>
            <div className="flex flex-col w-full">
              <div className={clsx(classes.header)}>
                <div className="flex flex-row p-4 w-full justify-center">
                  <Typography
                    className="hidden sm:flex mx-0 sm:mx-12 uppercase"
                    style={{ fontSize: '3rem', fontWeight: 600 }}
                    variant="h6">
                    USER MANAGEMENT
                  </Typography>
                </div>
                <div className="flex pt-32 pb-16 pl-8 items-center">
                  <div className="flex flex-col w-1/3 mt-0 px-12"></div>
                  <div className="flex flex-col w-1/3 border-1 headerSearch">
                    <SearchBox
                      translations={{
                        placeholder: 'Search for users...'
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
                        onClick={() => {props.history.push('/apps/e-commerce/user/new')}}
                        variant="contained"
                        disabled={userData.userRole === 'staff'}
                        color="secondary">
                        <span className="hidden sm:flex">ADD NEW</span>
                        <span className="flex sm:hidden">ADD</span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
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

export default withReducer('eCommerceApp', reducer)(Users);
