import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as Actions from '../store/actions';
const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});
function DoctorsHeader(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const searchText = useSelector(
    ({ eCommerceApp }) => eCommerceApp.doctors.searchText
  );
  const mainTheme = useSelector(({ fuse }) => fuse.settings.mainTheme);

  return (
    <>
      <div className="flex flex-col w-full items-center  sm:px-18 justify-start">
        <div className="flex-1 items-center">
          <h3 className=" hidden font-700 ">H</h3>
        </div>
        <div className='flex w-full flex-1 items-center justify-start '>
          <div className="flex-1 items-center">
            <h3 className=" hidden font-700 ">H</h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-center ">
        <div className="flex items-center pb-10">
          <FuseAnimate animation="transition.slideLeftIn" delay={300}>
            <Typography className="hidden sm:flex mx-0 sm:mx-12 font-500" variant="h4">
              DOCTORS
            </Typography>
          </FuseAnimate>
        </div>
        <div className='flex flex-1 flex-row items-center justify-center mb-10'>
          <ThemeProvider theme={mainTheme}>
            <FuseAnimate animation="transition.slideDownIn" delay={300}>
              <Paper
                className="flex items-center w-full max-w-512 px-8 py-4 rounded-8"
                elevation={1}>
                <Icon color="action">search</Icon>

                <Input
                  placeholder="Search"
                  className="flex flex-1 mx-8"
                  disableUnderline
                  fullWidth
                  value={searchText}
                  inputProps={{
                    'aria-label': 'Search'
                  }}
                  onChange={(ev) => dispatch(Actions.setDoctorsSearchText(ev))}
                />
              </Paper>
            </FuseAnimate>
          </ThemeProvider>
        </div>
      </div>
      <div className="flex flex-col w-full items-center justify-end pr-20">
        <div className="flex-1 pl-30 items-center">
          <h3 className="ml-40 hidden font-700 ">Hidden</h3>
        </div>
        <div className='flex w-full flex-1 items-center justify-end pr-20 pb-10'>
          <FuseAnimate animation="transition.slideRightIn" delay={300}>
            <Button
              component={Link}
              to="/apps/e-commerce/doctor/new"
              className={classes.button}
              variant="contained"
              color="secondary">
              <span className="hidden sm:flex">Add New </span>
              <span className="flex sm:hidden">New</span>
            </Button>
          </FuseAnimate>
        </div>
      </div>
    </>

  );
}

export default DoctorsHeader;
