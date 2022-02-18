import Frames from './Frames/Frames';
import Search from './Search/Search';
import Other from './Other/Other';
import Lens from './Lens/Lens';
import OutOfStock from './Out Of Stock/OutOfStock';
import ShowRoomInventory from './ShowRoom Inventory/ShowRoomInventory';
import DemoContent from '@fuse/core/DemoContent';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React, { useState } from 'react';
import { withRouter } from 'react-router';

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
          <h2>Inventory</h2>
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
          <Tab className="h-64" label="CONTACT LENS" />
          <Tab className="h-64" label="LENS" />
          <Tab className="h-64" label="OTHER" />
          <Tab className="h-64" label="OUT OF STOCK" />
          <Tab className="h-64" label="SHOWROOM" />
        </Tabs>
      }
      content={
        <div className="p-24">
          {selectedTab === 0 && (
            <div>
              <Frames />
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              <h3 className="mb-16">CONTACT LENS</h3>
              <Search />
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              <Lens />
            </div>
          )}
          {selectedTab === 3 && (
            <div>
              <Other />
            </div>
          )}
          {selectedTab === 4 && (
            <div>
              <OutOfStock />
            </div>
          )}
          {selectedTab === 5 && (
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
