import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { firestore } from 'firebase';
import { Doughnut } from 'react-chartjs-2';

function PieChart(props) {
  const { criteria } = props;
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);

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

  useEffect(() => {
    const fetchDetails = async () => {
      const queryCustomers = await firestore().collection('customers').get();

      let resultCustomers = [];
      queryCustomers.forEach((doc) => {
        resultCustomers.push(doc.data());
      });

      let counter = {};

      resultCustomers.forEach(function (obj) {
        var key = JSON.stringify(obj[criteria]);
        counter[key] = (counter[key] || 0) + 1;
      });

      var keys = Object.keys(counter);
      let values = [];
      keys.forEach((row) => {
        labels.push(row.replace(/"/g, ''));
        values.push(counter[row]);
      });
      setDatasets([
        ...datasets,
        {
          data: values,
          backgroundColor: [
            '#F44336',
            '#9C27B0',
            '#03A9F4',
            '#E91E63',
            '#FFC107'
          ],
          hoverBackgroundColor: [
            '#F45A4D',
            '#A041B0',
            '#25B6F4',
            '#E9487F',
            '#FFD341'
          ]
        }
      ]);
    };
    fetchDetails();
  }, []);

  return (
    datasets != [] && (
      <Paper className="w-full rounded-8 shadow-none border-1">
        <div className="flex items-center justify-between px-16 h-64 border-b-1">
          <Typography className="text-16">
            'Customers Graph based on {criteria === 'ethnicity' && 'Ethnicity'}
            {criteria === 'gender' && 'Gender'}
            {criteria === 'state' && 'State'}'
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
