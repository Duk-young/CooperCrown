import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Widget1 from '../../dashboards/analytics/widgets/Widget1';

function SalesChartYearWise(orders) {
  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );

  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    function groupDatesByYearAndMonth(orders) {
      if (!orders.length || !widgets?.widget1) return;
      const yearMonthData = {};
      orders.forEach((order) => {
        const date = order?.orderDate.toDate();
        const year = date.getFullYear();
        const monthNum = date.getMonth();
        if (!yearMonthData[year]) {
          yearMonthData[year] = [
            {
              label: 'Sales',
              data: Array(12).fill(0),
              fill: 'start'
            }
          ];
        }
        let yearData = yearMonthData[year];
        yearData[0].data[monthNum]++;
      });
      return yearMonthData;
    }
    const result = groupDatesByYearAndMonth(orders?.orders);
    let finalData = widgets?.widget1;
    finalData.datasets = result;
    if (finalData.datasets) {
      setChartData(widgets?.widget1);
    }
  }, [orders, widgets]);

  if (chartData) {
    return (
      <div className="w-full">
        <Widget1 data={chartData} />
      </div>
    );
  }

  return null;
}

export default SalesChartYearWise;
