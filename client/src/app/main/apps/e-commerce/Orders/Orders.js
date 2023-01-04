import {
  InstantSearch,
  SearchBox,
  Pagination,
  HitsPerPage,
  // connectSearchBox,
  Configure
} from 'react-instantsearch-dom';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
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
import DateFnsUtils from '@date-io/date-fns';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import moment from 'moment';
import React from 'react';
import reducer from '../store/reducers';
import SearchDialouge from './SearchDialouge';
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
    backgroundColor: theme.palette.primary.dark,
  },
  tabHeader: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark,
    padding: '10px 0'
  }
}));

const searchClient = algoliasearch(
  '5AS4E06TDY',
  '42176bd827d90462ba9ccb9578eb43b2'
);


function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
};

const statuses = ['draft', 'lab ready', 'in progress', 'hold', 'to showroom', 'pick up ready', 'completed']

const CustomHits = connectHits(({ hits, props, value }) => {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const [data, setData] = React.useState(hits);

  console.log({ hits, value })

  // React.useEffect(() => {
  //   if (value === 0) {
  //     setData(hits)
  //   } else if (value === 2) {
  //     const dataArray = hits.filter(item => item.orderStatus.toLowerCase == 'in progress')
  //     setData(dataArray)
  //   }
  // }, [value])

  return (
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ 'aria-label': 'select all desserts' }}
            />
          </TableCell>
          <StyledTableCell>ORDER NO</StyledTableCell>
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
          .map((hit) => (
            <StyledTableRow key={hit.objectID} hover className="cursor-pointer">
              <StyledTableCell padding="checkbox">
                <Checkbox
                // checked={isItemSelected}
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
                {hit?.rushOrder ? (
                  <LabelImportantIcon color="secondary" />
                ) : (
                  '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
                )}{' '}
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
                onClick={() => {
                  props.history.push(
                    `/apps/e-commerce/orders/vieworder/${hit.orderId}`
                  );
                }}>
                {hit?.orderStatus}
              </StyledTableCell>
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
    textAlign: 'left'
  },
  body: {
    fontSize: 14,
    padding: 10
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
      {...other}
    >
      {value === index && (
        <>
          {children}
        </>
      )}
    </div>
  );
}


function Orders(props) {
  const classes = useStyles(props);
  const { form, handleChange } = useForm(null);


  console.log({ props })

  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
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
                    className="hidden sm:flex mx-0 sm:mx-12 text-center"
                    variant="h6"
                    style={{ fontSize: '3rem', fontWeight: 600 }}
                  >
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
                  variant="fullWidth"
                  aria-label="simple tabs example">
                  {statuses.map((status, index) => (
                    <Tab key={index} className="p-0" label={status.toUpperCase()} style={{ minWidth: '100px', fontSize: '1.2rem' }} {...a11yProps(index)} />
                  ))}
                </Tabs>
              </div>
              <div className={clsx(classes.header)}>
                <div className="flex flex-col w-1/3">
                  <div className="flex flex-row gap-10">
                    <TextField
                      id="date"
                      label="Start Date"
                      type="date"
                      className='w-1/2'
                      defaultValue={form?.start}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          color: 'white',
                          marginTop: '3px',
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
                            name: 'start',
                            value: firestore.Timestamp.fromDate(new Date(e.target.value))
                          }
                        });
                      }}
                    />
                    <TextField
                      id="date"
                      label="End Date"
                      type="date"
                      className='w-1/2'
                      style={{ color: '#fff' }}
                      defaultValue={form?.end}
                      InputLabelProps={{
                        shrink: true,
                        style: {
                          color: 'white',
                          marginTop: '3px',
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
                            value: firestore.Timestamp.fromDate(new Date(e.target.value))
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
                    <SearchDialouge />
                  </FuseAnimate>
                </div>
              </div>
              <>
                {statuses.map((status, index) => (
                  <TabPanel key={index} value={value} index={index}>
                    <CustomHits props={props} value={value} />
                  </TabPanel>
                ))}
              </>
              <div className="flex flex-row justify-center">
                <div className="flex flex-1"></div>
                <div className="flex flex-1 justify-center mt-8">
                  <Pagination />
                </div>
                {/* <div className="flex flex-1 justify-center mt-8">
                  <HitsPerPage
                    defaultRefinement={50}
                    items={[
                      { value: 50, label: 'Show 50' },
                      { value: 100, label: 'Show 100' },
                      { value: 200, label: 'Show 200' }
                    ]}
                  />
                </div> */}
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
