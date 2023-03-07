import { useSelector } from 'react-redux';
import Widget5 from '../../dashboards/analytics/widgets/Widget5';
import React, { useEffect, useState } from 'react';
import { firestore } from 'firebase/app';
import FuseLoading from '@fuse/core/FuseLoading';

const PaymentsChart = () => {
  const [chartDataSales, setChartDataSales] = useState(null);

  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );

  const getOrderDataByFilter = async (orderPayments, filters) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const filteredData = {};

    filters.forEach((filter) => {
      switch (filter) {
        case 'Today':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' }
          ];
          orderPayments
            .filter((order) => {
              const orderDate = order.paymentDate.toDate();
              return (
                orderDate.getFullYear() === currentYear &&
                orderDate.getMonth() === currentMonth &&
                orderDate.getDate() === currentDay
              );
            })
            .forEach((order) => {
              const orderMonth = order.paymentDate.toDate().getMonth();
              filteredData[filter][0].data[orderMonth] += Number(order.amount);
            });
          break;
        case 'Yesterday':
          const yesterday = new Date(currentDate);
          yesterday.setDate(yesterday.getDate() - 1);
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' }
          ];
          orderPayments
            .filter((order) => {
              const orderDate = order.paymentDate.toDate();
              return (
                orderDate.getFullYear() === yesterday.getFullYear() &&
                orderDate.getMonth() === yesterday.getMonth() &&
                orderDate.getDate() === yesterday.getDate()
              );
            })
            .forEach((order) => {
              const orderMonth = order.paymentDate.toDate().getMonth();
              filteredData[filter][0].data[orderMonth] += Number(order.amount);
            });
          break;
        case 'This Week':
          const firstDayOfWeek = new Date(
            currentDate.setDate(
              currentDate.getDate() - currentDate.getDay() + 1
            )
          );
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' }
          ];
          orderPayments
            .filter((order) => {
              const orderDate = order.paymentDate.toDate();
              return orderDate >= firstDayOfWeek;
            })
            .forEach((order) => {
              const orderMonth = order.paymentDate.toDate().getMonth();
              filteredData[filter][0].data[orderMonth] += Number(order.amount);
            });
          break;
        case 'This Month':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' }
          ];
          orderPayments
            .filter((order) => {
              const orderDate = order.paymentDate.toDate();
              return (
                orderDate.getFullYear() === currentYear &&
                orderDate.getMonth() === currentMonth
              );
            })
            .forEach((order) => {
              const orderMonth = order.paymentDate.toDate().getMonth();
              filteredData[filter][0].data[orderMonth] += Number(order.amount);
            });
          break;
        case 'This Year':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' }
          ];
          orderPayments
            .filter((order) => {
              const orderDate = order.paymentDate.toDate();
              return orderDate.getFullYear() === currentYear;
            })
            .forEach((order) => {
              const orderMonth = order.paymentDate.toDate().getMonth();
              filteredData[filter][0].data[orderMonth] += Number(order.amount);
            });
          break;
        case 'All':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' }
          ];
          orderPayments.forEach((order) => {
            const orderMonth = order.paymentDate.toDate().getMonth();
            filteredData[filter][0].data[orderMonth] += Number(order.amount);
          });

        default:
          break;
      }
    });
    return filteredData;
  };

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      const queryPayments = await firestore().collection('orderPayments').get();

      let resultPayments = [];
      queryPayments.forEach((doc) => {
        resultPayments.push(doc.data());
      });
      try {
        const filterData = await getOrderDataByFilter(resultPayments, [
          'Today',
          'Yesterday',
          'This Week',
          'This Month',
          'This Year',
          'All'
        ]);
        let widgetData = { ...widgets?.widget5 };
        widgetData.datasets = filterData;
        setChartDataSales(widgetData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPaymentDetails();
  }, []);

  if (!chartDataSales) return <FuseLoading />;
  return (
    <div className="w-full py-10">
      <Widget5 data={chartDataSales} />
    </div>
  );
};
export default PaymentsChart;
