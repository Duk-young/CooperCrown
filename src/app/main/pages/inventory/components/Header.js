import React from 'react';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { Typography, Menu, MenuItem, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="flex flex-1 w-full items-center justify-between px-20 ">
      <div
        className="flex flex-col items-center max-w-full"
        style={{ display: 'contents' }}>
        {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/setup/purchase/purchases"
            color="inherit">
            {/* <Icon className="text-20">{'arrow_back'}</Icon> 
            <span className="mx-4">Inventory Lists</span>
          </Typography>
        </FuseAnimate> */}

        <div className="flex items-center max-w-full">
          <FuseAnimate animation="transition.expandIn" delay={300}>
            <span
              className="material-icons MuiIcon-root text-48"
              aria-hidden="true">
              clear_all
            </span>
          </FuseAnimate>
          <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="text-16 sm:text-20 truncate">
                Inventory Lists
              </Typography>
            </FuseAnimate>
            {/* <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography variant="caption">Purchase Order Detail</Typography>
            </FuseAnimate> */}
          </div>
        </div>
        <FuseAnimate animation="transition.slideRightIn" delay={300}>
          {/* <div
            style={{
              alignItems: 'center',
              justifyContent: 'space-between',
              display: 'flex',
              width: '18%'
            }}> */}
          <Button
            // disabled={form?.position === 0 ? false : true}
            className="whitespace-no-wrap normal-case"
            variant="contained"
            color="secondary"
            // onClick={submitSave}
          >
            Create Inventory
          </Button>
          {/* </div> */}
        </FuseAnimate>
      </div>
    </div>
  );
};

export default Header;
