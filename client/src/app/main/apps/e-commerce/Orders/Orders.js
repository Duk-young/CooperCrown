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
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import algoliasearch from 'algoliasearch/lite';
import clsx from 'clsx';
import DateFnsUtils from '@date-io/date-fns';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import moment from 'moment';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Paper from '@material-ui/core/Paper';
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
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles((theme) => ({
  header: {
    height: 100,
    minHeight: 100,
    display: 'flex',
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

function Orders(props) {
  const classes = useStyles(props);
  const { form, handleChange, setForm } = useForm(null);
  return (
    <FusePageSimple
      // header={
      //   <div className="flex flex-1 w-full items-center justify-between">
      //     <div className="flex items-center">
      //       <FuseAnimate animation="transition.expandIn" delay={300}>

      //       </FuseAnimate>
      //       <FuseAnimate animation="transition.slideLeftIn" delay={300}>

      //       </FuseAnimate>
      //     </div>
      //   </div>
      // }
      content={
        <div className="flex w-full ">
          <TableContainer className="flex flex-col w-full">
            <InstantSearch searchClient={searchClient} indexName="orders">
              <div className={clsx(classes.header)}>
                <div className="flex flex-col w-1/3  px-12">
                  <div className="flex flex-row p-4">
                    <Configure
                      filters={`orderDate: ${
                        form?.start ? form?.start.getTime() : -2208988800000
                      } TO ${
                        form?.end ? form?.end.getTime() : new Date().getTime()
                      }`}
                    />
                    <Icon className="text-32">description</Icon>
                    <Typography
                      className="hidden sm:flex mx-0 sm:mx-12"
                      variant="h6">
                      Orders
                    </Typography>
                  </div>
                  <div className="flex flex-row justify-around">
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                      <Grid container justifyContent="start">
                        <KeyboardDatePicker
                          label="Start Date"
                          className=" mt-0 mb-24 bg-white"
                          margin="normal"
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={form?.start}
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
                          className=" mt-0 mb-24 bg-white"
                          margin="normal"
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          value={form?.end}
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
                  </div>
                </div>

                <div className="flex flex-col w-1/3 border-1 pt-32">
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
            </InstantSearch>
          </TableContainer>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Orders);
