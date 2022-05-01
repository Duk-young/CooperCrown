import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import UsersHeader from './UsersHeader';
import UsersTable from './UsersTable';

function Users() {
  return (
    <FusePageCarded
      header={<UsersHeader />}
      content={<UsersTable />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Users);
