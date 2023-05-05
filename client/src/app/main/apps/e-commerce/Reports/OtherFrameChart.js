import Widget2 from '../../dashboards/analytics/widgets/Widget2';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

const OtherFrameChart = (props) => {

  const { orders, widget2 } = props;
  const [data, setData] = useState(false);


  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(widget2));
    newData.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    newData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    newData.datasets[0].label = 'Other Frame'

    orders.forEach((order) => {
      const month = order?.orderDate.toDate().getMonth();
      order.eyeglasses.map((pair) => {
        if (pair?.otherFrame) newData.datasets[0].data[month] += 1;
        return null
      })
    });

    setData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders]);

  if (!widget2 || !data) return <FuseLoading />;
  return (
    <div className="w-full p-10">
      <Widget2 title="Other Frame" data={data} />
    </div>
  );
};
export default OtherFrameChart;
