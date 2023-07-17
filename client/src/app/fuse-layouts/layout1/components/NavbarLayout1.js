import { IconButton, Typography } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import * as authActions from 'app/auth/store/actions';
import AppBar from '@material-ui/core/AppBar';
import clsx from 'clsx';
import FuseScrollbars from '@fuse/core/FuseScrollbars';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import Logo from 'app/fuse-layouts/shared-components/Logo';
import NavbarFoldedToggleButton from 'app/fuse-layouts/shared-components/NavbarFoldedToggleButton';
import NavbarMobileToggleButton from 'app/fuse-layouts/shared-components/NavbarMobileToggleButton';
import Navigation from 'app/fuse-layouts/shared-components/Navigation';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import React from 'react';
import UserNavbarHeader from 'app/fuse-layouts/shared-components/UserNavbarHeader';

const useStyles = makeStyles({
  content: {
    overflowX: 'hidden',
    overflowY: 'auto',
    '-webkit-overflow-scrolling': 'touch',
    background:
      'linear-gradient(rgba(0, 0, 0, 0) 30%, rgba(0, 0, 0, 0) 30%), linear-gradient(rgba(0, 0, 0, 0.25) 0, rgba(0, 0, 0, 0) 40%)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100% 40px, 100% 10px',
    backgroundAttachment: 'local, scroll',
    marginBottom:'45px'
  }
});

function NavbarLayout1(props) {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch = useDispatch()
  const { displayState, setDisplayState } = props;

  return (
    <div
      className={clsx('flex flex-col overflow-hidden h-full relative', props.className)}>
      <AppBar
        color="primary"
        position="static"
        elevation={0}
        className="flex flex-row items-center flex-shrink h-64 min-h-64 px-12">
        <div className="flex flex-1 mx-8">
          <Logo />
        </div>

        <Hidden mdDown>
          <NavbarFoldedToggleButton
            className="w-40 h-40 p-0"
            displayState={displayState}
            setDisplayState={setDisplayState}
          />
        </Hidden>

        <Hidden lgUp>
          <NavbarMobileToggleButton
            className="w-40 h-40 p-0"
            displayState={displayState}
            setDisplayState={setDisplayState}>
            <Icon>
              {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}"
            </Icon>
          </NavbarMobileToggleButton>
        </Hidden>
      </AppBar>

      <FuseScrollbars
        className={clsx(classes.content)}
        option={{ suppressScrollX: true }}>
        <UserNavbarHeader />

        <Navigation layout="vertical" />
      </FuseScrollbars>
      <div className='bottom-left-component w-full'>
        <div className='flex flex-col items-center justify-center self-center w-full'>
          <IconButton onClick={() => { dispatch(authActions.logoutUser()) }}>
            <PowerSettingsNewIcon className='mr-10' />
            <Typography style={{ fontSize: '1.5rem', fontWeight: 600, color: 'white' }} variant="h6">LOGOUT</Typography>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default React.memo(NavbarLayout1);
