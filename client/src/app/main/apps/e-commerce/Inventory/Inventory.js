import Frames from './Frames/Frames';
import Other from './Other/Other';
import Lens from './Lens/Lens';
import OutOfStock from './Out Of Stock/OutOfStock';
import ShowRoomInventory from './ShowRoom Inventory/ShowRoomInventory';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Typography from '@material-ui/core/Typography';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import { withRouter } from 'react-router';
import './Inventory.css';

const useStyles = makeStyles({
  layoutRoot: {}
});

function Inventory() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot,
        toolbar: 'p-0'
      }}
      header={
        <div className="py-24">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32">category</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                Inventory
              </Typography>
            </FuseAnimate>
          </div>
        </div>
      }
      contentToolbar={
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="off"
          className="w-full h-64">
          <Tab className="h-64" label="FRAMES" />

          <Tab className="h-64" label="LENS" />
          <Tab className="h-64" label="OTHER" />
          <Tab className="h-64" label="OUT OF STOCK" />
          <Tab className="h-64" label="SHOWROOM" />
        </Tabs>
      }
      content={
        <div className="py-2">
          {selectedTab === 0 && (
            <div>
              <Frames />
            </div>
          )}

          {selectedTab === 1 && (
            <div>
              <Lens />
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <Other />
            </div>
          )}
          {selectedTab === 3 && (
            <div>
              <OutOfStock />
            </div>
          )}
          {selectedTab === 4 && (
            <div>
              <ShowRoomInventory />
            </div>
          )}
        </div>
      }
    />
  );
}

export default withRouter(Inventory);
