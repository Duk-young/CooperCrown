import { Line } from 'react-chartjs-2';
import { useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import React from 'react';
import Typography from '@material-ui/core/Typography';

function Widget5(props) {
  const theme = useTheme();

  if (!props?.data) return null

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="relative p-24 flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Typography className="h3 sm:h2">
            {props?.title || 'Visitors'}
          </Typography>
        </div>
      </div>

      <Typography className="relative h-200 sm:h-320 sm:pb-16">
        <Line
          data={{
            labels: props?.data.labels,
            datasets: props?.data.datasets['ALL'].map((obj, index) => {
              const palette =
                theme.palette[index === 0 ? 'primary' : 'secondary'];
              return {
                ...obj,
                borderColor: palette.main,
                backgroundColor: palette.main,
                pointBackgroundColor: palette.dark,
                pointHoverBackgroundColor: palette.main,
                pointBorderColor: palette.contrastText,
                pointHoverBorderColor: palette.contrastText
              };
            })
          }}
          options={props?.data.options}
        />
      </Typography>
    </Card>
  );
}

export default React.memo(Widget5);
