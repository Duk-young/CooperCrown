import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import DoctorsHeader from './DoctorsHeader';
import DoctorsTable from './DoctorsTable';

function Doctors() {
  return (
    <FusePageCarded
      header={<DoctorsHeader />}
      content={<DoctorsTable />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Doctors);
