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

    const currentMonthValue = newData.datasets[0].data[new Date().getMonth()]
    const prevMonthValue = newData.datasets[0].data[new Date().getMonth() - 1]
    newData.conversion.value = currentMonthValue
    newData.conversion.ofTarget = (currentMonthValue && prevMonthValue) ?
      Math.floor(((currentMonthValue - prevMonthValue) / prevMonthValue) * 100) : 0

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
