import { useParams } from 'react-router-dom';
import AddExam from './AddExam';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import reducer from '../store/reducers';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function Exams(props) {
  const routeParams = useParams();
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  return (
    <FusePageCarded
      header={
        <div>
          <IconButton
            onClick={() => {
              if (routeParams.examId) {
                props.history.push(`/apps/e-commerce/customers`);
              } else {
                setOpenAlert(true);
              }
            }}>
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4 text-12">Customers</span>
          </IconButton>

          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Exam's Details
            </Typography>
          </div>

          <div>
            <Dialog
              fullWidth
              maxWidth="sm"
              open={openAlert}
              onClose={handleCloseAlert}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description">
              <DialogTitle id="alert-dialog-title">
                <h2>Discard Changes?</h2>
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  All the Changes will be lost. Are you sure?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseAlert} color="secondary">
                  Disagree
                </Button>
                <Button
                  onClick={() => {
                    handleCloseAlert();
                    props.history.push(`/apps/e-commerce/customers`);
                  }}
                  color="secondary"
                  autoFocus>
                  Agree
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
      }
      content={<AddExam />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Exams);
