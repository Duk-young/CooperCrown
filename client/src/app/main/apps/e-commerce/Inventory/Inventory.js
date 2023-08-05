import './Inventory.css';
import { IconButton } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router';
import algoliasearch from 'algoliasearch/lite';
import CachedIcon from '@material-ui/icons/Cached';
import clsx from 'clsx';
import Frames from './Frames/Frames';
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
    minWidth: '100px',
    fontSize: '1.2rem',
    '&$selected': {
      color: '#f15a25', // Custom color for the selected tab
    },
  },
  selected: {},
}))(Tab);

function Inventory() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);
  const [searchClient, setsearchClient] = useState(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))

  const handleTabChange = (event, value) => {
    setSelectedTab(value);
  };

  return (
    <div className='flex flex-col overflow-hidden'>
      <div className={clsx(classes.tabHeader)}>
        <div className="flex flex-row w-full items-center justify-center">
          <Typography style={{ fontSize: '3rem', fontWeight: 600 }} variant="h4">INVENTORY</Typography>
          <IconButton color='secondary' onClick={() => {
            setsearchClient(algoliasearch(process.env.REACT_APP_ALGOLIA_APPLICATION_ID, process.env.REACT_APP_ALGOLIA_SEARCH_ONLY_KEY))
          }}>
            <CachedIcon />
          </IconButton>
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
      <div className='flex flex-col overflow-hidden'>
        {selectedTab === 0 && (<Frames searchClient={searchClient} />)}
        {selectedTab === 1 && (<Lens searchClient={searchClient} />)}
        {selectedTab === 2 && (<Other searchClient={searchClient} />)}
        {selectedTab === 3 && (<OutOfStock />)}
        {selectedTab === 4 && (<ShowRoomInventory searchClient={searchClient} />)}
      </div>
    </div>
  );
}

export default withRouter(Inventory);
