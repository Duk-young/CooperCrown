
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../dashboards/project/store/actions';
import FuseLoading from '@fuse/core/FuseLoading';
import React, { useEffect, useState } from 'react';
import reducer from '../../dashboards/project/store/reducers';
import Widget8 from '../../dashboards/project/widgets/Widget8';
import withReducer from 'app/store/withReducer';
import OverviewDialog from './OverviewDialog';

const FrameBrandPieChart = (props) => {

  const { orders } = props;
  const dispatch = useDispatch();
  const [data, setData] = useState(false);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(false);
  const widgets = useSelector(({ projectDashboardApp }) => projectDashboardApp.widgets);

  useEffect(() => {
    dispatch(Actions.getWidgets());
  }, [dispatch]);

  const handleClose = () => {
    setOpen(false)
  }


  useEffect(() => {
    if (!widgets) return
    let newData = JSON.parse(JSON.stringify(widgets?.widget8))
    newData.title = 'Frame Brand'
    newData.mainChart.datasets[0].data = []
    newData.mainChart.labels = []
    newData.mainChart.options.legend.display = false

    let framesData = []

    orders.forEach((order) => {
      order.eyeglasses.map((pair) => {
        if (pair?.frameId) {
          const obj = framesData.find(row => row.title === pair?.frameModel);
          if (obj) {
            obj.conversion++;
          } else {
            framesData.push({ frameId: pair?.frameId, title: pair?.frameModel, clicks: pair?.frameColour, conversion: 1 })
          }
          return null
        }
        return null
      })
    });
    framesData.sort((a, b) => b.conversion - a.conversion);
    setDialogData({rows: framesData})

    framesData.forEach((frame) => {
      newData.mainChart.datasets[0].data.push(frame?.conversion)
      newData.mainChart.labels.push(frame?.title)
    })

    setData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, widgets]);



  if (!widgets || !data) return <FuseLoading />;
  return (
    <div className="w-full p-4">
      <Widget8 widget={data} customChart={true} setOpen={setOpen} />
      <OverviewDialog title={'Frame Brands'} secondColumn={'COLOR'} thirdColumn={'PCS'} data={dialogData} open={open} handleClose={handleClose} />
    </div>
  );
};
export default withReducer('projectDashboardApp', reducer)(FrameBrandPieChart);
