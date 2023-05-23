import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: 160,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));

function ContactsHeader() {
  const classes = useStyles();

  return (
    <div className="flex flex-col w-full">
      <div className={clsx(classes.header)}>
        <div className='flex flex-col h-full w-full'>
          <div className='flex flex-row w-full justify-center'>
            <Typography
              className="flex uppercase"
              style={{ fontSize: '3rem', fontWeight: 600 }}
              variant="h6">
              CONTACT LENS
            </Typography>
          </div>
          <div className='flex flex-row w-full pt-32 pb-16'>
            <div className='flex flex-col items-center w-1/3'></div>
            <div className='flex flex-col items-center w-1/3'>
              <Paper
                className="flex items-center w-full px-8 py-4 rounded-8 bg-transparent border-1 border-white border-solid"
                elevation={1}>
                <Icon style={{ color: 'orange' }}>search</Icon>
                <Input
                  placeholder="Search"
                  className="flex flex-1 mx-8 min-h-44 bg-transparent text-white"
                  disableUnderline
                  fullWidth
                  inputProps={{
                    'aria-label': 'Search'
                  }}
                />
              </Paper>
            </div>
            <div className='flex flex-col items-center justify-center w-1/3'>
              <Button
                className={classes.button}
                component={Link}
                to="/apps/e-commerce/contact/new"
                variant="contained"
                color="secondary">
                <span className="hidden sm:flex">ADD NEW</span>
                <span className="flex sm:hidden">ADD</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactsHeader;
