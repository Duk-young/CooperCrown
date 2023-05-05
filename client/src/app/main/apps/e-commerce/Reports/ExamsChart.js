import Widget2 from '../../dashboards/analytics/widgets/Widget2';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';

const ExamsChart = (props) => {

  const { exams, widget2 } = props;
  const [chartData, setChartData] = useState(false);
  
  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(widget2));
    newData.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    newData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    newData.datasets[0].label = 'Exams'

    exams.forEach((exam) => {
      const examMonth = exam?.examTime.toDate().getMonth();
      newData.datasets[0].data[examMonth] += 1;
    });
    setChartData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exams]);

  if (!widget2 || !chartData) return <FuseLoading />;
  return (
    <div className="w-full p-4">
      <Widget2 title="Exams" data={chartData} />
    </div>
  );
};
export default ExamsChart;
