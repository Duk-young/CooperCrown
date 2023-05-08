import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import Button from '@material-ui/core/Button';

function Widget8(props) {
  return (
    <Paper className="w-full rounded-8 shadow-none border-1">
      <div className="flex items-center justify-between px-16 h-64 border-b-1">
        <Typography className="text-16">{props.widget.title}</Typography>
      </div>
      <div className="h-full w-full p-10">
        <Doughnut
          data={{
            labels: props.widget.mainChart.labels,
            datasets: props.widget.mainChart.datasets
          }}
          options={props.widget.mainChart.options}
        />
        {props?.customChart && (
          <div className="px-16 flex flex-row items-center justify-center">
            {props.widget.mainChart.labels.slice(0, 3).map((label, index) => (
              <div key={label} className="px-16 flex flex-col items-center">
                <Typography className="h4" color="textSecondary">
                  {label || 'Undefined'}
                </Typography>
                <Typography className="h2 font-300 py-8">{Math.floor(props.widget.mainChart.datasets[0].data[index] /
                  props.widget.mainChart.datasets[0].data.reduce((acc, curr) => acc + curr, 0) * 100)}%</Typography>
              </div>
            ))}
          </div>

        )}
        {props?.customChart && (
          <div className='flex flex-row justify-end'>
            <Button
              className="py-8 px-12 justify-end"
              size="small"
              onClick={() => props.setOpen(true)}>
              OVERVIEW
            </Button>
          </div>
        )}
      </div>
    </Paper>
  );
}

export default React.memo(Widget8);
