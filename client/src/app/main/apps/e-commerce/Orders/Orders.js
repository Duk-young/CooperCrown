import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import OrdersContent from './OrdersContent';

function Orders(props) {
  // const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);
  return (
    <FusePageCarded
      // classes={{
      //   content: 'flex p-0',
      //   header: 'min-h-72 h-72 sm:h-136 sm:min-h-136 p-0'
      // }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32">description</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                Orders
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      }
      content={<OrdersContent />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Orders);
