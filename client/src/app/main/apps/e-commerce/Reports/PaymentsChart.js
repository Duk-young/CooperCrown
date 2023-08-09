import { useSelector } from 'react-redux';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState } from 'react';
import Widget5 from '../../dashboards/analytics/widgets/Widget5';

const PaymentsChart = (props) => {
  const [chartDataSales, setChartDataSales] = useState(null);

  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );

  const getOrderDataByFilter = async (
    orderPayments,
    insurancePayments,
    filters
  ) => {
    const filteredData = {};

    filters.forEach((filter) => {
      switch (filter) {
        case 'ALL':
          filteredData[filter] = [
            { label: 'Order', data: Array(12).fill(0), fill: 'start' },
            { label: 'Insurance', data: Array(12).fill(0), fill: 'start' }
          ];
          orderPayments.forEach((order) => {
            const orderMonth = order.paymentDate.toDate().getMonth();
            filteredData[filter][0].data[orderMonth] += Number(order.amount);
          });
          insurancePayments.forEach((insurance) => {
            const insuranceMonth = insurance.paymentDate.toDate().getMonth();
            filteredData[filter][1].data[insuranceMonth] += Number(
              insurance.amount
            );
          });
          break;
        default:
          break;
      }
    });
    return filteredData;
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {

      try {
        const filterData = await getOrderDataByFilter(
          props?.orderPayments,
          props?.insurancePayments,
          ['ALL']
        );
        let widgetData = JSON.parse(JSON.stringify(widgets?.widget5));
        widgetData.datasets = filterData;
        const labels = [
          'JAN',
          'FEB',
          'MAR',
          'APR',
          'MAY',
          'JUN',
          'JUL',
          'AUG',
          'SEP',
          'OCT',
          'NOV',
          'DEC'
        ];
        widgetData.labels = labels;
        setChartDataSales(widgetData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPaymentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  if (!chartDataSales) return <FuseLoading />;
  return (
    <div className="w-full py-10">
      <Widget5 data={chartDataSales} title={'Sales ( Order / Insurance )'} />
    </div>
  );
};
export default PaymentsChart;
