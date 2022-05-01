import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import ContactsHeader from './ServicesHeader';
import ContactsTable from './ServicesTable';

function Services() {
  return (
    <FusePageCarded
      header={<ContactsHeader />}
      content={<ContactsTable />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Services);
