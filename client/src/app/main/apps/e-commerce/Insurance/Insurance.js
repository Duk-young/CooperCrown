import FusePageCarded from '@fuse/core/FusePageCarded';
import InsuranceContent from './InsuranceContent';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';

function Insurance() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={<h1>INSURANCE TAB</h1>}
      content={<InsuranceContent />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Insurance);
