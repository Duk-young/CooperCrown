
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import Widget5 from '../../dashboards/analytics/widgets/Widget5';

const OrderTimesChart = (props) => {

  const { orders, widget5 } = props;
  const [data, setData] = useState(false);

  const getTimeIndex = (date) => {
    const hours = date.getHours();
    let index = Math.floor((hours - 6) / 2);
    if (index < 0 || index > 9) {
      index = -1; // return -1 if the time is outside the range
    }
    return index;
  }


  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(widget5));

    newData.datasets = {
      all: [{
        label: 'Orders',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        fill: 'start'
      }]
    }

    orders.forEach((order) => {
      const timeIndex = getTimeIndex(order?.orderDate.toDate())
      newData.datasets.all[0].data[timeIndex] += 1
    });
    setData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  if (!widget5 || !data) return <FuseLoading />;
  return (
    <div className="w-full p-4">
      <Widget5 data={data} title={'Order Times'} />
    </div>
  );
};
export default OrderTimesChart;
