import './Inventory.css';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import clsx from 'clsx';
import Frames from './Frames/Frames';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Lens from './Lens/Lens';
import Other from './Other/Other';
import OutOfStock from './Out Of Stock/OutOfStock';
import React, { useState } from 'react';
import ShowRoomInventory from './ShowRoom Inventory/ShowRoomInventory';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  tabHeader: {
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark,
    padding: '10px 0',
    width: '100%'
  }
}));

function Inventory() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  return (
    <FusePageSimple
      content={
        <div>
          <div className={clsx(classes.tabHeader)}>
            <div className="flex flex-row w-full items-center justify-center">
                <Typography style={{ fontSize: '3rem', fontWeight: 600 }} variant="h4">INVENTORY</Typography>
            </div>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              indicatorColor="secondary"
              textColor="white"
              variant="fullwidth"
              scrollButtons="off"
              centered>
              <Tab className="h-64" label="FRAMES" />
              <Tab className="h-64" label="LENS" />
              <Tab className="h-64" label="OTHER" />
              <Tab className="h-64" label="OUT OF STOCK" />
              <Tab className="h-64" label="SHOWROOM" />
            </Tabs>
          </div>
          <div>
            {selectedTab === 0 && (<Frames />)}
            {selectedTab === 1 && (<Lens />)}
            {selectedTab === 2 && (<Other />)}
            {selectedTab === 3 && (<OutOfStock />)}
            {selectedTab === 4 && (<ShowRoomInventory />)}
          </div>
        </div>

      }
    />
  );
}

export default withRouter(Inventory);
