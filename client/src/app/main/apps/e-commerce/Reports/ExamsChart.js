import { useSelector } from 'react-redux';
import Widget2 from '../../dashboards/analytics/widgets/Widget2';
import React, { useEffect } from 'react';
import { firestore } from 'firebase/app';
import FuseLoading from '@fuse/core/FuseLoading';

const ExamsChart = () => {

  const widgets = useSelector(
    ({ analyticsDashboardApp }) => analyticsDashboardApp.widgets.data
  );

  useEffect(() => {
    const fetchExamsDetails = async () => {
      const queryExams = await firestore().collection('exams').get();

      let examsData = [];
      queryExams.forEach((doc) => {
        examsData.push(doc.data());
      });
    };

    fetchExamsDetails();
  }, []);

  if (!widgets.widget2) return <FuseLoading />;
  return (
    <div className="w-full py-10">
      <Widget2 title="Exams" data={widgets.widget2} />
    </div>
  );
};
export default ExamsChart;
