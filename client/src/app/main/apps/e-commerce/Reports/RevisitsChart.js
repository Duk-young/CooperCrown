import Widget2 from '../../dashboards/analytics/widgets/Widget2';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

const RevisitsChart = (props) => {

  const { orders, widget2 } = props;
  const [data, setData] = useState(false);


  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(widget2));
    newData.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    newData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    newData.datasets[0].label = 'Revisits'

    // Group orders by customerId
    const ordersByCustomer = orders.reduce((acc, order) => {
      if (!acc[order.customerId]) {
        acc[order.customerId] = [];
      }
      acc[order.customerId].push(order);
      return acc;
    }, {});

    // Remove first order for each customer
    const updatedOrders = Object.values(ordersByCustomer).flatMap(orders => {
      const firstOrder = orders[0].orderId;
      return orders.filter(order => order.orderId !== firstOrder);
    });



    updatedOrders.forEach((order) => {
      const month = order?.orderDate.toDate().getMonth();
      newData.datasets[0].data[month] += 1;
    });

    const currentMonthValue = newData.datasets[0].data[new Date().getMonth()]
    const prevMonthValue = newData.datasets[0].data[new Date().getMonth() - 1]
    newData.conversion.value = currentMonthValue
    newData.conversion.ofTarget = (currentMonthValue && prevMonthValue) ?
      Math.floor(((currentMonthValue - prevMonthValue) / prevMonthValue) * 100) : 0

    setData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  if (!widget2 || !data) return <FuseLoading />;
  return (
    <div className="w-full p-4">
      <Widget2 title="Revisits" data={data} />
    </div>
  );
};
export default RevisitsChart;
