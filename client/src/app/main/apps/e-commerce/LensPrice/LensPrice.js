import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import TableGrid from './TableGrid';

function LensPrice() {
  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full">
            <div className="flex items-center max-w-full">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <img
                  className="w-32 sm:w-48 rounded"
                  src="assets/images/ecommerce/product-image-placeholder.png"
                  alt={''}
                />
              </FuseAnimate>
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    Lens Price
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 ">
          <TableGrid />
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(LensPrice);
