import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';

function PieChart(props) {
  const { criteria, labels, datasets } = props;

  const options = {
    cutoutPercentage: 0,
    spanGaps: false,
    legend: {
      display: true,
      position: 'bottom',
      labels: {
        padding: 16,
        usePointStyle: true
      }
    },
    maintainAspectRatio: false
  };

  return (
    datasets != [] && (
      <Paper className="w-full rounded-8 shadow-none border-1">
        <div className="flex items-center justify-between px-16 h-64 border-b-1">
          <Typography className="text-16">
            'Customers Graph based on {criteria === 'ethnicity' && 'Ethnicity'}
            {criteria === 'gender' && 'Gender'}
            {criteria === 'state' && 'State'}
            {criteria === 'dob' && 'Age'}'
          </Typography>
        </div>
        <div className="h-400 w-full p-32">
          <Doughnut
            data={{
              labels: labels,
              datasets: datasets
            }}
            options={options}
          />
        </div>
      </Paper>
    )
  );
}

export default React.memo(PieChart);
