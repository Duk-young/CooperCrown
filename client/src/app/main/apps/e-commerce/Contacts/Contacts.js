import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import ContactsHeader from './ContactsHeader';
import ContactsTable from './ContactsTable';

function Contacts() {
  return (
    <FusePageCarded
      header={<ContactsHeader />}
      content={<ContactsTable />}
      innerScroll
    />
  );
}


export default withReducer('eCommerceApp', reducer)(Contacts);
