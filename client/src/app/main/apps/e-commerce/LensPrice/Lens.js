import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import TableGrid from './TableGrid';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { firestore } from 'firebase';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { Button } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';

const useStyles = makeStyles((theme) =>
    createStyles({
      root: {
        '& .MuiDataGrid-renderingZone': {
          '& .MuiDataGrid-row': {
            '&:nth-child(2n)': {
              backgroundColor: 'rgba(16, 232, 212, 0.08)'
            }
          }
        }
      },
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
    })
  );


function Lens() {
  const [lensType, setLensType] = useState();
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const routeParams = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();

  
  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true)
      if (routeParams?.lensName) {
        setLensType(routeParams.lensName)
        const lensPrices = (
          await firestore().collection('lensPrice').doc('lensPrice').get()
          ).data();
          setRows(lensPrices[routeParams.lensName]);
        } else {
          setRows([]);
        }
        setIsLoading(false)
    };

    fetchDetails();
  }, []);

  const onSubmit = async () => {
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .update({ [lensType]: rows });

    dispatch(
      MessageActions.showMessage({
        message: 'Prices Updated Successfully'
      })
    );
    setDisabledState(false);
  };

  if (isLoading) return (
    <FuseLoading/>
  )

  return (
    <FusePageCarded
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-row items-center w-full">
              <div className="flex flex-col mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 ml-10 sm:text-20 truncate">
                    Lens Price
                  </Typography>
                </FuseAnimate>
              </div>
              <div className="flex flex-row p-6 justify-end w-full">
       {!disabledState && (
         <Button
         onClick={() => {
           setDisabledState(true);
         }}
         className={classes.button}
         variant="contained"
         color="secondary"
         disabled={rows?.length ? disabledState : true}
         
         aria-label="add">
         <EditIcon fontSize="small" />
         Edit Prices
       </Button>
       )}
        {disabledState && (
          <Button
            onClick={onSubmit}
            className={classes.button}
                  variant="contained"
                  color="secondary">
            Save Changes!
          </Button>
        )}
       
      </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 ">
          <TableGrid disabledState={disabledState} rows={rows} setRows={setRows} />
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Lens);
