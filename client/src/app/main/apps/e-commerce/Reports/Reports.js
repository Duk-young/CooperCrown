import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as Actions from '../../dashboards/analytics/store/actions';
import Button from '@material-ui/core/Button';
import CCFrameChart from './CCFrameChart';
import ContactLensChart from './ContactLensChart';
import CustomData from './CustomData';
import CustomersChart from './CustomersChart';
import DateFnsUtils from '@date-io/date-fns';
import DistanceLensChart from './DistanceLensChart';
import ExamsChart from './ExamsChart';
import FlatTopLensChart from './FlatTopLensChart';
import FrameBrandPieChart from './FrameBrandPieChart';
import FrameColorPieChart from './FrameColorPieChart';
import FrameShapePieChart from './FrameShapePieChart';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import GenderGraph from './GenderGraph';
import Grid from '@material-ui/core/Grid';
import LensTypePieChart from './LensTypePieChart';
import LensTypesChart from './LensTypesChart';
import NewCustomersChart from './NewCustomersChart';
import OrderTimesChart from './OrderTimesChart';
import OtherFrameChart from './OtherFrameChart';
import OtherProductsChart from './OtherProductsChart';
import OwnFrameChart from './OwnFrameChart';
import PaymentsChart from './PaymentsChart';
import ProgressiveLensChart from './ProgressiveLensChart';
import React, { useEffect, useState } from 'react';
import ReadingLensChart from './ReadingLensChart';
import RedoOrdersChart from './RedoOrdersChart';
import reducer from '../../dashboards/analytics/store/reducers';
import RevisitsChart from './RevisitsChart';
import SalesChartYearWise from './SalesChartYearWise';
import SalesRatioPieChart from './SalesRatioPieChart';
import SunglassesChart from './SunglassesChart';
import TopDesignsTable from './TopDesignsTable';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles({
  flexGrow: {
    flex: '1'
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});

function Reports() {

  const classes = useStyles();
  const dispatch = useDispatch();
  const [exams, setExams] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [filteredExams, setFilteredExams] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [showrooms, setShowrooms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  const widgets = useSelector(({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data);


  useEffect(() => {
    dispatch(Actions.getWidgets());
  }, [dispatch])

  const filterData = () => {
    let newOrders = orders.filter((order) => {
      const orderDate = order?.orderDate.toDate()
      return orderDate >= form?.startDate && orderDate <= form?.endDate;
    })
    setFilteredOrders(newOrders)

    let newExams = exams.filter((exam) => {
      const examTime = exam?.examTime.toDate()
      return examTime >= form?.startDate && examTime <= form?.endDate;
    })
    setFilteredExams(newExams)

    let newCustomers = customers.filter((customer) => {
      const creationDate = customer?.creationDate && customer?.creationDate.toDate()
      return creationDate >= form?.startDate && creationDate <= form?.endDate;
    })
    setFilteredCustomers(newCustomers)
  }

  useEffect(() => {

    const fetchDetails = async () => {
      setIsLoading(true)

      const queryOrders = await firestore().collection('orders').get();
      let resultOrders = [];
      queryOrders.forEach((doc) => {
        resultOrders.push(doc.data());
      });
      setOrders(resultOrders);
      setFilteredOrders(resultOrders);

      const queryCustomers = await firestore().collection('customers').get();
      let resultCustomers = [];
      queryCustomers.forEach((doc) => {
        resultCustomers.push(doc.data());
      });
      setCustomers(resultCustomers);
      setFilteredCustomers(resultCustomers)

      const queryExams = await firestore().collection('exams').get();
      let examsData = [];
      queryExams.forEach((doc) => {
        examsData.push(doc.data());
      });
      setExams(examsData)
      setFilteredExams(examsData)

      const queryShowrooms = await firestore().collection('showRooms').get();
      let showroomsData = [];
      queryShowrooms.forEach((doc) => {
        showroomsData.push(doc.data());
      });
      setShowrooms(showroomsData)

      setIsLoading(false)
    };
    fetchDetails();
  }, []);

  if (!widgets || isLoading) {
    return <FuseLoading />
  }
  return (
    <div className="w-full">
      <SalesChartYearWise orders={orders} />
      <PaymentsChart />
      <OrderTimesChart widget5={widgets?.widget5} orders={filteredOrders}/>
      <div className='flex flex-row justify-between items-center px-20'>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="center">
            <KeyboardDatePicker
              label="Select Start Date"
              margin="normal"
              id="date-picker-dialog"
              format="MM/dd/yyyy"
              value={form?.startDate ?? new Date()}
              onChange={(date) => {
                handleChange({
                  target: { name: 'startDate', value: date }
                });
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justifyContent="center">
            <KeyboardDatePicker
              label="Select End Date"
              margin="normal"
              id="date-picker-dialog"
              format="MM/dd/yyyy"
              value={form?.endDate ?? new Date()}
              onChange={(date) => {
                handleChange({
                  target: { name: 'endDate', value: date }
                });
              }}
              KeyboardButtonProps={{
                'aria-label': 'change date'
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
        <div>
          <Button
            className={classes.button}
            onClick={() => filterData()}
            variant="contained"
            color="secondary">
            Filter
          </Button>
        </div>
        <div className='pl-4'>
          <Button
            onClick={() => {
              setFilteredOrders(orders)
              setFilteredExams(exams)
              setFilteredCustomers(customers)
              setForm({ startDate: new Date(), endDate: new Date() })
            }}
            variant="contained"
            color="primary">
            Clear
          </Button>
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
          <CCFrameChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <OtherFrameChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <OwnFrameChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
          <ExamsChart exams={filteredExams} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <LensTypesChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <ProgressiveLensChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
          <DistanceLensChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <FlatTopLensChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <ReadingLensChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
          <ContactLensChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <OtherProductsChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <RedoOrdersChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
          <NewCustomersChart customers={filteredCustomers} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <SunglassesChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <RevisitsChart orders={filteredOrders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-col w-2/3'>
          <CustomersChart orders={filteredOrders} />
          <div className='flex flex-row'>
          <GenderGraph customers={customers} />
          </div>
          <SalesRatioPieChart orders={filteredOrders} />
          <LensTypePieChart orders={filteredOrders} />
        </div>
        <div className='flex flex-col w-1/3'>
          <TopDesignsTable orders={filteredOrders} widget9={widgets?.widget9} />
          <FrameBrandPieChart orders={filteredOrders} />
          <FrameShapePieChart orders={filteredOrders} />
          <FrameColorPieChart orders={filteredOrders} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <CustomData orders={orders} customers={customers} showrooms={showrooms} exams ={exams}/>
      </div>
    </div>
  );
}

export default withReducer(
  'analyticsDashboardApp',
  reducer
)(Reports);
