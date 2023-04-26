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

  const getOrderDataByFilter = async (
    orderPayments,
    insurancePayments,
    filters
  ) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
    const filteredData = {};

    filters.forEach((filter) => {
      switch (filter) {
        case 'Today':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' },
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
          insurancePayments
            .filter((insurance) => {
              const insuranceDate = insurance.paymentDate.toDate();
              return (
                insuranceDate.getFullYear() === currentYear &&
                insuranceDate.getMonth() === currentMonth &&
                insuranceDate.getDate() === currentDay
              );
            })
            .forEach((insurance) => {
              const insuranceMonth = insurance.paymentDate.toDate().getMonth();
              filteredData[filter][1].data[insuranceMonth] += Number(
                insurance.amount
              );
            });
          break;
        case 'Yesterday':
          const yesterday = new Date(currentDate);
          yesterday.setDate(yesterday.getDate() - 1);
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' },
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
          insurancePayments
            .filter((insurance) => {
              const insuranceDate = insurance.paymentDate.toDate();
              return (
                insuranceDate.getFullYear() === yesterday.getFullYear() &&
                insuranceDate.getMonth() === yesterday.getMonth() &&
                insuranceDate.getDate() === yesterday.getDate()
              );
            })
            .forEach((insurance) => {
              const insuranceMonth = insurance.paymentDate.toDate().getMonth();
              filteredData[filter][1].data[insuranceMonth] += Number(
                insurance.amount
              );
            });
          break;
        case 'This Week':
          const firstDayOfWeek = new Date(
            currentDate.setDate(
              currentDate.getDate() - currentDate.getDay() + 1
            )
          );
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' },
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
          insurancePayments
            .filter((insurance) => {
              const insuranceDate = insurance.paymentDate.toDate();
              return insuranceDate >= firstDayOfWeek;
            })
            .forEach((insurance) => {
              const insuranceMonth = insurance.paymentDate.toDate().getMonth();
              filteredData[filter][1].data[insuranceMonth] += Number(
                insurance.amount
              );
            });
          break;
        case 'This Month':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' },
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
          insurancePayments
            .filter((insurance) => {
              const insuranceDate = insurance.paymentDate.toDate();
              return (
                insuranceDate.getFullYear() === currentYear &&
                insuranceDate.getMonth() === currentMonth
              );
            })
            .forEach((insurance) => {
              const insuranceMonth = insurance.paymentDate.toDate().getMonth();
              filteredData[filter][1].data[insuranceMonth] += Number(
                insurance.amount
              );
            });
          break;
        case 'This Year':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' },
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
          insurancePayments
            .filter((insurance) => {
              const insuranceDate = insurance.paymentDate.toDate();
              return insuranceDate.getFullYear() === currentYear;
            })
            .forEach((insurance) => {
              const insuranceMonth = insurance.paymentDate.toDate().getMonth();
              filteredData[filter][1].data[insuranceMonth] += Number(
                insurance.amount
              );
            });
          break;
        case 'All':
          filteredData[filter] = [
            { label: filter, data: Array(12).fill(0), fill: 'start' },
            { label: filter, data: Array(12).fill(0), fill: 'start' }
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
      const queryPayments = await firestore().collection('orderPayments').get();

      let resultPayments = [];
      queryPayments.forEach((doc) => {
        resultPayments.push(doc.data());
      });

      const inPayments = await firestore()
        .collection('insurancePayments')
        .get();
      let insPayments = [];
      inPayments.forEach((doc) => {
        insPayments.push(doc.data());
      });
      console.log(insPayments);

      try {
        const filterData = await getOrderDataByFilter(
          resultPayments,
          insPayments,
          ['Today', 'Yesterday', 'This Week', 'This Month', 'This Year', 'All']
        );
        let widgetData = { ...widgets?.widget5 };
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
  }, []);

  if (!chartDataSales) return <FuseLoading />;
  return (
    <div className="w-full py-10">
      <Widget5 data={chartDataSales} />
    </div>
  );
};
export default PaymentsChart;
