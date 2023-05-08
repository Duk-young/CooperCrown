
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../dashboards/project/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState } from 'react';
import reducer from '../../dashboards/project/store/reducers';
import Widget8 from '../../dashboards/project/widgets/Widget8';
import withReducer from 'app/store/withReducer';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

const FrameBrandPieChart = (props) => {

  const { orders } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState(false);
  const widgets = useSelector(({ projectDashboardApp }) => projectDashboardApp.widgets);

  useEffect(() => {
    dispatch(Actions.getWidgets());
  }, [dispatch]);


  useEffect(() => {
    if (!widgets) return
    let newData = { ...widgets?.widget8 }
    newData.title = 'Frame Brand'
    newData.mainChart.datasets[0].data = []
    newData.mainChart.labels = []
    newData.mainChart.options.legend.display = false

    let framesData = []

    orders.forEach((order) => {
      order.eyeglasses.map((pair) => {
        if (pair?.frameId) {
          const obj = framesData.find(row => row.frameId === pair?.frameId);
          if (obj) {
            obj.pcs++;
          } else {
            framesData.push({ frameId: pair?.frameId, title: pair?.frameModel, pcs: 1 })
          }
          return null
        }
        return null
      })
    });

    framesData.forEach((frame) => {
      newData.mainChart.datasets[0].data.push(frame?.pcs)
      newData.mainChart.labels.push(frame?.title)
    })

    setData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, widgets]);



  if (!widgets || !data) return <FuseLoading />;
  return (
    <div className="w-full p-4">
      <Widget8 widget={data} customChart={true}/>
    </div>
  );
};
export default withReducer('projectDashboardApp', reducer)(FrameBrandPieChart);
