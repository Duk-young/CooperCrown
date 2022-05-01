import FusePageCarded from '@fuse/core/FusePageCarded';
import InsuranceContent from './InsuranceContent';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import PolicyOutlinedIcon from '@material-ui/icons/PolicyOutlined';

function Insurance() {
  return (
    <FusePageCarded
      header={
        <div className="flex flex-row m-28">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <PolicyOutlinedIcon className="mt-2 mr-4" />
          </FuseAnimate>
          <h1>INSURANCE</h1>
        </div>
      }
      content={<InsuranceContent />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Insurance);
