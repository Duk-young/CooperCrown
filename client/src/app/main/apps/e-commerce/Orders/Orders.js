import React from 'react';
import {
  InstantSearch,
  SearchBox,
  Pagination,
  HitsPerPage,
  // connectSearchBox,
  Configure
} from 'react-instantsearch-dom';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardDatePicker
// } from '@material-ui/pickers';
import '../Customers/App.mobile.css';
import '../Customers/Search.css';
import '../Customers/Themes.css';
import { connectHits } from 'react-instantsearch-dom';
import { Link } from 'react-router-dom';
import { useForm } from '@fuse/hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { firestore } from 'firebase';
import algoliasearch from 'algoliasearch/lite';
import clsx from 'clsx';
// import DateFnsUtils from '@date-io/date-fns';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
// import Grid from '@material-ui/core/Grid';
// import Icon from '@material-ui/core/Icon';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import moment from 'moment';
import reducer from '../store/reducers';
// import SearchDialouge from './SearchDialouge';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import withReducer from 'app/store/withReducer';
import firebaseService from 'app/services/firebaseService';
import { showMessage } from 'app/store/actions/fuse';

// const color = '#fff';

// const customMaterialTheme = createTheme({
//   components: {
//     MuiIconButton: {
//       styleOverrides: {
//         sizeMedium: {
//           color
//         }
//       }
//     },
//     MuiOutlinedInput: {
//       styleOverrides: {
//         root: {
//           color
//         }
//       }
//     },
//     MuiInputLabel: {
//       styleOverrides: {
//         root: {
//           color
//         }
//       }
//     },
//     MuiSvgIcon: {
//       root: {
//         fill: '#fff'
//       }
//     }
//   }
// });

const useStyles = makeStyles((theme) => ({
  header: {
    display: 'flex',
    padding: '10px',
    alignItems: 'center',
    gap: '1rem',
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  tabHeader: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark,
    padding: '10px 0'
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

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const statuses = [
  { value: 0, label: 'all' },
  { value: 1, label: 'draft' },
  { value: 2, label: 'lab ready' },
  { value: 3, label: 'in progress' },
  { value: 4, label: 'hold' },
  { value: 5, label: 'to showroom' },
  { value: 6, label: 'pick up ready' },
  { value: 7, label: 'completed' },
  { value: 8, label: 'cancelled' }
];

const CustomHits = connectHits(
  ({
    hits,
    props,
    value,
    setIsDataEmpty,
    selected,
    setSelected,
    data,
    setData,
    selectAllData,
    setSelectAllData
  }) => {
    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleSelectAllClick = (event) => {
      if (event.target.checked) {
        const newSelecteds = data.map((n) => n.orderId);
        setSelected(newSelecteds);
        return;
      }
      setSelected([]);
    };

    const handleClick = (event, id) => {
      const selectedIndex = selected.indexOf(id);
      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }

      setSelected(newSelected);
    };

    React.useEffect(() => {
      if (hits) {
        if (value === 0 || selectAllData) {
          setData(hits);
        } else {
          let modifiedArray = hits.filter(
            (order) => order.orderStatus === statuses[value].label
          );
          setData(modifiedArray);
          modifiedArray.length === 0
            ? setIsDataEmpty(true)
            : setIsDataEmpty(false);
        }
      }
    }, [hits, value]);

    React.useEffect(() => {
      if (value !== 0) {
        setSelectAllData(false);
      }
    }, [value]);

    return (
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell> </StyledTableCell>
            {value === 0 && (
              <StyledTableCell padding="checkbox">
                <Checkbox
                  indeterminate={
                    selected.length > 0 && selected.length < data.length
                  }
                  checked={data.length > 0 && selected.length === data.length}
                  onChange={handleSelectAllClick}
                  style={{ color: '#fff' }}
                />
              </StyledTableCell>
            )}
            <StyledTableCell>ORDER No.</StyledTableCell>
            <StyledTableCell>DATE</StyledTableCell>
            <StyledTableCell>FIRST NAME</StyledTableCell>
            <StyledTableCell>LAST NAME</StyledTableCell>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell>LOCATION</StyledTableCell>
            <StyledTableCell>STATUS</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .sort((a, b) => (a.orderId > b.orderId ? -1 : 1))
            .map((hit) => {
              const isItemSelected = isSelected(hit.orderId);
              return (
                <StyledTableRow
                  key={hit.objectID}
                  hover
                  className="cursor-pointer"
                  onClick={(event) => handleClick(event, hit.orderId)}>
                  <StyledTableCell
                    scope="row"
                    style={{ maxWidth: 'max-content' }}>
                    <div className="flex">
                      {(hit?.shipFrameToCustomerLogic ||
                        hit?.shipContactLensToCustomerLogic ||
                        hit?.shipOtherProductToCustomerLogic) && (
                        <LabelImportantIcon
                          color="secondary"
                          style={{ color: 'green' }}
                        />
                      )}
                      {(hit?.rushFrameOrder ||
                        hit?.rushContactLensOrder ||
                        hit?.rushOtherProductOrder) && (
                        <LabelImportantIcon
                          color="secondary"
                          style={{ color: 'red' }}
                        />
                      )}
                      {hit?.sendFrameToLab && (
                        <LabelImportantIcon
                          color="secondary"
                          style={{ color: 'blue' }}
                        />
                      )}
                    </div>
                  </StyledTableCell>
                  <StyledTableCell padding="checkbox">
                    <Checkbox
                      checked={isItemSelected}
                      // inputProps={{ 'aria-labelledby': labelId }}
                    />
                  </StyledTableCell>
                  <StyledTableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                      );
                    }}>
                    {hit?.customOrderId}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                      );
                    }}>
                    {moment(hit?.orderDate).format('MM/DD/YYYY')}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                      );
                    }}>
                    {hit?.firstName}
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                      );
                    }}>
                    {hit?.lastName}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Link
                      to={`/apps/e-commerce/customers/profile/${hit.customerId}`}>
                      <h3 className="text-black">{hit?.customerId}</h3>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                      );
                    }}>
                    {hit?.locationName}
                  </StyledTableCell>
                  <StyledTableCell
                    className="capitalize"
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                      );
                    }}>
                    {hit?.orderStatus}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
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
    padding: 10,
    textAlign: 'center',
    maxWidth: 'min-content'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && <>{children}</>}
    </div>
  );
}

function Orders(props) {
  const classes = useStyles(props);
  const { form, handleChange } = useForm(null);
  const [value, setValue] = React.useState(0);
  const [isDataEmpty, setIsDataEmpty] = React.useState(null);
  const [selected, setSelected] = React.useState([]);
  const [data, setData] = React.useState([]);
  const [selectAllData, setSelectAllData] = React.useState(false);

  const updateStatus = async (order, status) => {
    const uuid = order[0]; // add loader then update the page with the new data
    try {
      await firebaseService.firestoreDb
        .collection('orders')
        .doc(uuid)
        .update({ orderStatus: status });
      showMessage({ message: 'status Updated' });
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <FusePageSimple
      content={
        <div className="flex w-full ">
          <TableContainer className="flex flex-col w-full">
            <InstantSearch searchClient={searchClient} indexName="orders">
              <div className={clsx(classes.tabHeader)}>
                <div className="p-4 flex justify-center">
                  <Typography
                    className="hidden sm:flex mx-0 sm:mx-12 text-center uppercase"
                    variant="h6"
                    style={{ fontSize: '3rem', fontWeight: 600 }}>
                    ORDERS
                  </Typography>
                </div>
              </div>
              <div className={clsx(classes.tabHeader)}>
                <Tabs
                  value={value}
                  onChange={handleTabChange}
                  indicatorColor="rgb(241, 90, 37)"
                  textColor="rgb(241, 90, 37)"
                  variant="scrollable"
                  scrollButtons="auto"
                  aria-label="simple tabs example">
                  {statuses.map((status, index) => {
                    return (
                      <Tab
                        key={index}
                        className="p-0"
                        wrapped
                        label={status.label.toUpperCase()}
                        style={{
                          // minWidth: '100px',
                          fontSize: '1.2rem'
                        }}
                        {...a11yProps(status.value)}
                      />
                    );
                  })}
                </Tabs>
              </div>
              <div className={classes.header}>
                <div className="flex flex-col w-1/3">
                  <div className="flex flex-row gap-10">
                    <TextField
                      id="date"
                      label="Start Date"
                      type="date"
                      className="w-1/2"
                      variant="outlined"
                      defaultValue={form?.start}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          color: 'white',
                          marginTop: '5px',
                          padding: '0 5px 0'
                        }
                      }}
                      InputProps={{
                        style: {
                          color: 'white'
                        }
                      }}
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: 'start',
                            value: firestore.Timestamp.fromDate(
                              new Date(e.target.value)
                            )
                          }
                        });
                      }}
                    />
                    <TextField
                      id="date"
                      label="End Date"
                      type="date"
                      className="w-1/2"
                      style={{ color: '#fff' }}
                      defaultValue={form?.end}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          color: 'white',
                          marginTop: '5px',
                          padding: '0 5px 0'
                        }
                      }}
                      InputProps={{
                        style: {
                          color: 'white',
                          borderColor: 'white',
                          borderRadius: '4px'
                        }
                      }}
                      onChange={(e) => {
                        handleChange({
                          target: {
                            name: 'end',
                            value: firestore.Timestamp.fromDate(
                              new Date(e.target.value)
                            )
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-1/3">
                  <SearchBox
                    translations={{
                      placeholder: 'Search for orders...'
                    }}
                    style={{ color: '#000' }}
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
                <div className="flex flex-row">
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <Link to={`/apps/e-commerce/orders/addorder/new`}>
                      <Button
                        // className="whitespace-no-wrap normal-case mt-42"
                        className={classes.button}
                        variant="contained"
                        color="secondary">
                        <span className="hidden sm:flex">+ Add New</span>
                        <span className="flex sm:hidden">New</span>
                      </Button>
                    </Link>
                  </FuseAnimate>
                </div>
              </div>
              <>
                {statuses.map((status) => (
                  <TabPanel
                    key={status.value}
                    value={value}
                    index={status.value}>
                    <CustomHits
                      props={props}
                      value={value}
                      data={data}
                      setData={setData}
                      setIsDataEmpty={setIsDataEmpty}
                      selected={selected}
                      setSelected={setSelected}
                      selectAllData={selectAllData}
                      setSelectAllData={setSelectAllData}
                    />
                  </TabPanel>
                ))}
              </>
              <div className="flex flex-row justify-between">
                <div className="flex"></div>
                <div className="flex justify-center mt-8">
                  <Pagination />
                </div>
                {value !== 0 &&
                  !isDataEmpty &&
                  value === statuses[value].value && (
                    <div className="flex justify-end mt-8 pr-20">
                      <Button
                        className={`whitespace-no-wrap mt-42 uppercase ${
                          selected.length === 0 && 'opacity-75'
                        }`}
                        style={{
                          backgroundColor: '#222',
                          color: '#FFF'
                        }}
                        // className={classes.button}
                        variant="contained"
                        disabled={selected.length === 0}
                        color="secondary"
                        onClick={() =>
                          updateStatus(selected, statuses[value + 1].label)
                        }>
                        <span className="hidden sm:flex">
                          {statuses[value].label !== 'cancelled'
                            ? statuses[value + 1].label
                            : null}
                        </span>
                      </Button>
                      <button></button>
                    </div>
                  )}
              </div>
            </InstantSearch>
          </TableContainer>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Orders);
