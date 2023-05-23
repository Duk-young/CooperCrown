import FusePageCarded from '@fuse/core/FusePageCarded';
import AddAppointments from './AddAppointments';
import withReducer from 'app/store/withReducer';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import { Link } from 'react-router-dom';
import React from 'react';
import reducer from '../store/reducers';
import '../Customers/Search.css';

function Appointments() {
  return (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className="mt-24">
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/calendar"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Appointments</span>
          </Typography>
          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Appointment Details
            </Typography>
          </div>
        </div>
      }
      content={<AddAppointments />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Appointments);
