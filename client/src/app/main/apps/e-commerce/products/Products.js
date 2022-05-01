import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import ProductsHeader from './ProductsHeader';
import ProductsTable from './ProductsTable';

function Contacts() {
  return (
    <FusePageCarded
      header={<ProductsHeader />}
      content={<ProductsTable />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Contacts);
