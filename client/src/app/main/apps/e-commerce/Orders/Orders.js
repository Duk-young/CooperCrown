import {
  InstantSearch,
  SearchBox,
  Pagination,
  HitsPerPage,
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
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
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
    height: 100,
    minHeight: 100,
    display: 'flex',
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  tabHeader: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
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

const statuses = ['DRAFT', 'LAB READY', 'IN PROGRESS', 'HOLD', 'TO SHOWROOM', 'PICK UP READY', 'COMPLETED']

const CustomHits = connectHits(({ hits, props }) => {
  return (
    <Table aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>ORDER NO</StyledTableCell>
          <StyledTableCell>DATE</StyledTableCell>
          <StyledTableCell>FIRST NAME</StyledTableCell>
          <StyledTableCell>LAST NAME</StyledTableCell>
          <StyledTableCell>CUSTOMER No</StyledTableCell>
          <StyledTableCell>LOCATION</StyledTableCell>
          <StyledTableCell>STATUS</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hits
          .sort((a, b) => (a.orderId > b.orderId ? -1 : 1))
          .map((hit) => (
            <StyledTableRow key={hit.objectID} hover className="cursor-pointer">
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

  const [value, setValue] = React.useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
    console.log({ value, newValue })
  };
  return (
    <FusePageSimple
      content={
        <div className="flex w-full ">
          <TableContainer className="flex flex-col w-full">
            <InstantSearch searchClient={searchClient} indexName="orders">
              <div className={clsx(classes.tabHeader)}>
                <div className="p-4 flex justify-center">
                  {/* <Configure
                  filters={`orderDate: ${form?.start ? form?.start.getTime() : -2208988800000
                    } TO ${form?.end ? form?.end.getTime() : new Date().getTime()
                    }`}
                /> */}
                  {/* <Icon className="text-32">description</Icon> */}
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
                    <Tab key={index} label={status} style={{ minWidth: '100px', fontSize: '1.2rem' }} {...a11yProps(index)} />
                  ))}
                </Tabs>
              </div>
              <div className={clsx(classes.header)}>
                <div className="flex flex-col w-1/3 px-12 pt-40">
                  <div className="flex flex-row justify-around">
                    {/* <ThemeProvider theme={customMaterialTheme}> */}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justifyContent="start">
                        <KeyboardDatePicker
                          label="Start Date"
                          className=" mt-0 mb-24 bg-transparent"
                          margin="normal"
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={form?.start}
                          InputLabelProps={{
                            style: {
                              color: 'white'
                            }
                          }}
                          InputProps={{
                            style: {
                              color: 'white',
                              borderColor: 'white',
                              borderRadius: 1
                            }
                          }}
                          onChange={(date) => {
                            handleChange({
                              target: { name: 'start', value: date }
                            });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justifyContent="start">
                        <KeyboardDatePicker
                          label="End Date"
                          className=" mt-0 mb-24 bg-transparent"
                          margin="normal"
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={form?.end}
                          InputLabelProps={{
                            style: {
                              color: 'white'
                            }
                          }}
                          InputProps={{
                            style: {
                              color: 'white',
                              borderColor: 'white',
                              borderRadius: 1
                            }
                          }}
                          onChange={(date) => {
                            handleChange({
                              target: { name: 'end', value: date }
                            });
                          }}
                          KeyboardButtonProps={{
                            'aria-label': 'change date'
                          }}
                        />
                      </Grid>
                    </MuiPickersUtilsProvider>
                    {/* </ThemeProvider> */}
                  </div>
                </div>
                <div className="flex flex-col w-1/3 pt-40">
                  <SearchBox
                    translations={{
                      placeholder: 'Search for orders...'
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
                <div className="flex flex-row w-1/3 justify-center pt-40">
                  <FuseAnimate animation="transition.slideRightIn" delay={300}>
                    <SearchDialouge />
                  </FuseAnimate>
                </div>
              </div>
              <>
              {statuses.map((status, index) => (
                <TabPanel key={index} value={value} index={index}>
                  <CustomHits props={props} />
                </TabPanel>
              ))}
              </>
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
            </InstantSearch>
          </TableContainer>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Orders);
