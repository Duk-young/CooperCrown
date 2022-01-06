import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from 'app/store/reducers';
import UsersManagementHeader from './UsersManagementHeader';
import UsersManagementContent from './UsersManagementContent';

function UsersManagement() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={<UsersManagementHeader />}
      content={<UsersManagementContent />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(UsersManagement);
