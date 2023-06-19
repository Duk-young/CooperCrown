import './Inventory.css';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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

const StyledTab = withStyles((theme) => ({
  root: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    '&$selected': {
      color: '#f15a25', // Custom color for the selected tab
    },
  },
  selected: {},
}))(Tab);

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
              indicatorColor="transparent"
              textColor="white"
              variant="fullwidth"
              scrollButtons="off"
              centered>
              <StyledTab className="h-64" label="FRAMES" />
              <StyledTab className="h-64" label="LENS" />
              <StyledTab className="h-64" label="OTHER" />
              <StyledTab className="h-64" label="OUT OF STOCK" />
              <StyledTab className="h-64" label="SHOWROOM" />
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
