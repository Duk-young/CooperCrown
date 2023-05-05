import { firestore } from 'firebase';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../dashboards/analytics/store/actions';
import CCFrameChart from './CCFrameChart';
import CustomersChart from './CustomersChart';
import ExamsChart from './ExamsChart';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import PaymentsChart from './PaymentsChart';
import React, { useEffect, useState } from 'react';
import reducer from '../../dashboards/analytics/store/reducers';
import SalesChartYearWise from './SalesChartYearWise';
import withReducer from 'app/store/withReducer';
import OtherFrameChart from './OtherFrameChart';
import OwnFrameChart from './OwnFrameChart';
import LensTypesChart from './LensTypesChart';
import ProgressiveLensChart from './ProgressiveLensChart';
import DistanceLensChart from './DistanceLensChart';
import FlatTopLensChart from './FlatTopLensChart';
import ReadingLensChart from './ReadingLensChart';
import ContactLensChart from './ContactLensChart';
import OtherProductsChart from './OtherProductsChart';
import RedoOrdersChart from './RedoOrdersChart';
import NewCustomersChart from './NewCustomersChart';

function AnalyticsDashboardApp() {

  const dispatch = useDispatch();
  const [exams, setExams] = useState([]);
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );

  useEffect(() => {
    dispatch(Actions.getWidgets());

    const fetchDetails = async () => {
      setIsLoading(true)

      const queryOrders = await firestore().collection('orders').get();
      let resultOrders = [];
      queryOrders.forEach((doc) => {
        resultOrders.push(doc.data());
      });
      setOrders(resultOrders);

      const queryCustomers = await firestore().collection('customers').get();
      let resultCustomers = [];
      queryCustomers.forEach((doc) => {
        resultCustomers.push(doc.data());
      });
      setCustomers(resultCustomers);

      const queryExams = await firestore().collection('exams').get();
      let examsData = [];
      queryExams.forEach((doc) => {
        examsData.push(doc.data());
      });
      setExams(examsData)

      setIsLoading(false)
    };
    fetchDetails();
  }, [dispatch]);

  if (!widgets || isLoading) {
    return <FuseLoading />
  }
  return (
    <div className="w-full">
      <SalesChartYearWise orders={orders} />
      <PaymentsChart />
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
          <CCFrameChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <OtherFrameChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
          <OwnFrameChart orders={orders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
          <ExamsChart exams={exams} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <LensTypesChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <ProgressiveLensChart orders={orders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
        <DistanceLensChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <FlatTopLensChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <ReadingLensChart orders={orders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
        <ContactLensChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <OtherProductsChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <RedoOrdersChart orders={orders} widget2={widgets?.widget2} />
        </div>
      </div>
      <div className='flex flex-row w-full'>
        <div className='flex flex-row w-1/3'>
        <NewCustomersChart customers={customers} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <OtherProductsChart orders={orders} widget2={widgets?.widget2} />
        </div>
        <div className='flex flex-row w-1/3'>
        <RedoOrdersChart orders={orders} widget2={widgets?.widget2} />
        </div>
      </div>
      <CustomersChart orders={orders} />
    </div>
  );
}

export default withReducer(
  'analyticsDashboardApp',
  reducer
)(AnalyticsDashboardApp);
