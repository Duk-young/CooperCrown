import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import Widget9 from '../../dashboards/analytics/widgets/Widget9';

const TopDesignsTable = (props) => {

  const { orders, widget9 } = props;
  const [data, setData] = useState(false);


  useEffect(() => {
    let newData = []

    orders.forEach((order) => {
      order.eyeglasses.map((pair) => {
        if (pair?.frameId) {
          const obj = newData.find(row => row.frameId === pair?.frameId);
          if (obj) {
            obj.conversion++;
          } else {
            newData.push({ frameId: pair?.frameId, title: pair?.frameModel, clicks: pair?.frameColour, conversion: 1 })
          }
          return null
        }
        return null
      })
    });

    newData.sort((a, b) => b.conversion - a.conversion);
    const limitedRows = newData.slice(0, 10);
    setData({ rows: limitedRows })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [widget9]);

  if (!widget9 || !data) return <FuseLoading />;

  return (
    <div className="w-full p-4">
      <Widget9 title={'Top Designs'} secondColumn={'COLOR'} thirdColumn={'PCS'} data={data} />
    </div>
  );
};
export default TopDesignsTable;
