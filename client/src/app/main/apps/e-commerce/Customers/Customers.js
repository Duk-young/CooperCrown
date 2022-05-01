import FusePageCarded from '@fuse/core/FusePageCarded';
import withReducer from 'app/store/withReducer';
import React from 'react';
import reducer from '../store/reducers';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CustomersContent from './CustomersContent';

function Customers(props) {
  return (
    <FusePageCarded
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32">people</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                Customers
              </Typography>
            </FuseAnimate>
          </div>

          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
              onClick={() =>
                props.history.push('/apps/e-commerce/create-customer')
              }
              className="whitespace-no-wrap normal-case"
              variant="contained"
              color="secondary">
              <span className="hidden sm:flex">Create Customer</span>
              <span className="flex sm:hidden">Create</span>
            </Button>
          </FuseAnimate>
        </div>
      }
      content={<CustomersContent />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Customers);
