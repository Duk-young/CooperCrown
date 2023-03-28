import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../dashboards/analytics/store/actions';
import reducer from '../../dashboards/analytics/store/reducers';
import PieChart from './PieChart';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import { useForm } from '@fuse/hooks';
import FormControl from '@material-ui/core/FormControl';
import { firestore } from 'firebase';
import SalesChartYearWise from './SalesChartYearWise';
import PaymentsChart from './PaymentsChart';
import ExamsChart from './ExamsChart';

function AnalyticsDashboardApp() {
  const { form, handleChange } = useForm({});
  const [orders, setOrders] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datasets, setDatasets] = useState([]);
  const dispatch = useDispatch();

  const changeCriteria = (e) => {
    if (e.target.value === 'dob') {
      let counter = {};

      orders.map((row) => {
        let today = new Date();
        let birthDate = row?.dob ? row?.dob.toDate() : new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (age === 0) {
          counter['Undefined'] = (counter['Undefined'] || 0) + 1;
        } else if (age <= 20) {
          counter['Uptill 20'] = (counter['Uptill 20'] || 0) + 1;
        } else if (age > 20 && age <= 40) {
          counter['20 to 40'] = (counter['20 to 40'] || 0) + 1;
        } else if (age > 40 && age <= 60) {
          counter['40 to 60'] = (counter['40 to 60'] || 0) + 1;
        } else {
          counter['Greater than 60'] = (counter['Greater than 60'] || 0) + 1;
        }
        return null;
      });
      let keys = Object.keys(counter);
      let label = [];
      let values = [];
      keys.map((row) => {
        label.push(row.replace(/"/g, ''));
        values.push(counter[row]);
        return null;
      });
      setLabels(label);
      setDatasets([
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
    } else {
      let counter = {};

      orders.forEach(function (obj) {
        let key = JSON.stringify(obj[e.target.value]);
        counter[key] = (counter[key] || 0) + 1;
      });

      let keys = Object.keys(counter);
      let label = [];
      let values = [];
      keys.map((row) => {
        label.push(row.replace(/"/g, ''));
        values.push(counter[row]);
        return null;
      });
      setLabels(label);
      setDatasets([
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
    }
  };

  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );

  useEffect(() => {
    dispatch(Actions.getWidgets());

    const fetchDetails = async () => {
      const queryOrders = await firestore().collection('orders').get();

      let resultOrders = [];
      queryOrders.forEach((doc) => {
        resultOrders.push(doc.data());
      });
      setOrders(resultOrders);
    };
    fetchDetails();
  }, [dispatch]);

  if (!widgets) {
    return null;
  }
  return (
    <div className="w-full">
      <SalesChartYearWise orders={orders} />
      {/* <ExamsChart /> */}
      <PaymentsChart />
      <FuseAnimate animation="transition.slideUpIn" delay={200}>
        <div className="flex flex-col md:flex-row sm:p-8 container">
          <div className="flex flex-col w-1/2">
            <div className="flex flex-row justify-start">
              <Typography
                className="username text-16 whitespace-no-wrap self-center font-700 underline"
                color="inherit">
                Criteria
              </Typography>
              <FormControl className="ml-32 ">
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="ethnicityId"
                  defaultValue={form?.criteria}
                  value={form?.criteria}
                  name="criteria"
                  onChange={(e) => {
                    handleChange(e);
                    setLabels([]);
                    setDatasets([]);
                    changeCriteria(e);
                  }}
                  autoWidth>
                  <MenuItem value={'dob'}>Age</MenuItem>
                  <MenuItem value={'gender'}>Gender</MenuItem>
                  <MenuItem value={'ethnicity'}>Ethnicity</MenuItem>
                  <MenuItem value={'state'}>State</MenuItem>
                </Select>
                <FormHelperText>Select from the list</FormHelperText>
              </FormControl>
            </div>
            <PieChart
              criteria={form?.criteria}
              labels={labels}
              datasets={datasets}
            />
          </div>
        </div>
      </FuseAnimate>
    </div>
  );
}

export default withReducer(
  'analyticsDashboardApp',
  reducer
)(AnalyticsDashboardApp);
