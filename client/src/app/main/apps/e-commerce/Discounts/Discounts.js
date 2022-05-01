import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import DiscountsHeader from './DiscountsHeader';
import DiscountsTable from './DiscountsTable';

function Discounts() {
  return (
    <FusePageCarded
      header={<DiscountsHeader />}
      content={<DiscountsTable />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Discounts);
