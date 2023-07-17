import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Bar } from 'react-chartjs-2';

function Widget2(props) {
  const theme = useTheme();

  return (
    <Card className="w-full rounded-8 shadow-none border-1">
      <div className="pt-16 px-16 pb-0 flex flex-col flex-wrap">
        <Typography className="h3 truncate" color="textSecondary">
          {props.title ?? 'Conversion'}
        </Typography>
      </div>
      <div className="px-16 pb-0 flex flex-row flex-no-wrap items-end truncate">
        <Typography className="text-56 font-300 leading-none mt-8 truncate">
          {props.data.conversion.value}
        </Typography>

        {props.data.conversion.ofTarget !== 0 && (
          <div className="py-4 text-16 flex flex-row items-center">
            <div className="flex flex-row items-center">
              {props.data.conversion.ofTarget > 0 && (
                <Icon className="text-green">trending_up</Icon>
              )}
              {props.data.conversion.ofTarget < 0 && (
                <Icon className="text-red">trending_down</Icon>
              )}
              <Typography className="mx-4 truncate">
                {props.data.conversion.ofTarget}%
              </Typography>
            </div>
            <Typography className="whitespace-no-wrap truncate">of target</Typography>
          </div>
        )}
      </div>

      <div className="h-96 w-100-p">
        <Bar
          data={{
            labels: props.data.labels,
            datasets: props.data.datasets.map((obj) => ({
              ...obj,
              borderColor: theme.palette.secondary.main,
              backgroundColor: theme.palette.secondary.main
            }))
          }}
          options={props.data.options}
        />
      </div>
    </Card>
  );
}

export default React.memo(Widget2);
