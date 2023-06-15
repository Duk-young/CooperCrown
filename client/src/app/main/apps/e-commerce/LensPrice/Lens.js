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
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import CustomAlert from '../ReusableComponents/CustomAlert';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import { useForm } from '@fuse/hooks';
import ExcelFileReader from './ExcelFileReader';

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
    },
    verticalText: {
      writingMode: 'vertical-lr', // Vertical writing mode from right to left
      textOrientation: 'mixed', // Rotate the characters upright
      whiteSpace: 'nowrap', // Prevent line breaks
    },
  })
);


function Lens(props) {
  const [lensType, setLensType] = useState();
  const [lensName, setLensName] = useState();
  const { form, handleChange, setForm } = useForm(null);
  const [rows, setRows] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [disabledState, setDisabledState] = useState(false);
  const [disabledNameState, setDisabledNameState] = useState(true);
  const [disabledPrismPriceState, setDisabledPrismPriceState] = useState(true);
  const [disabledOutRangeState, setDisabledOutRangeState] = useState(true);
  const [openAlert, setOpenAlert] = useState(false);
  const routeParams = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();


  useEffect(() => {
    const fetchDetails = async () => {
      setIsLoading(true)
      if (routeParams?.lensName) {
        setLensType(routeParams.lensName)
        setLensName(routeParams.lensName)
        const lensPrices = (
          await firestore().collection('lensPrice').doc('lensPrice').get()
        ).data();
        setRows(lensPrices[routeParams.lensName].rows);
        setForm(lensPrices[routeParams.lensName]);
      } else {
        setRows([]);
      }
      setIsLoading(false)
    };

    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    setIsLoading(true)
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .update({
        [lensType]: {
          prismPrice: form?.prismPrice,
          outOfRangePrice: form?.outOfRangePrice,
          rows
        }
      });

    dispatch(
      MessageActions.showMessage({
        message: 'Prices Updated Successfully'
      })
    );
    setDisabledState(false);
    setIsLoading(false)
  };
  const handleDelete = async () => {
    setIsLoading(true)
    let lensPrices = (await firestore().collection('lensPrice').doc('lensPrice').get()).data()
    const { [lensType]: omit, ...rest } = lensPrices;
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .set(rest);

    dispatch(
      MessageActions.showMessage({
        message: 'Prices table deleted successfully'
      })
    );
    setDisabledState(false);
    setIsLoading(false)
    props.history.push(
      `/apps/e-commerce/lensPrice`
    );
  };

  const handleExtraPricesChange = async () => {
    setIsLoading(true)
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .update({
        [lensType]: {
          prismPrice: form?.prismPrice,
          outOfRangePrice: form?.outOfRangePrice,
          rows
        }
      });

    dispatch(
      MessageActions.showMessage({
        message: 'Lens extra prices updated successfully'
      })
    );
    setDisabledOutRangeState(true);
    setDisabledPrismPriceState(true);
    setIsLoading(false)
  };
  const handleLensNameChange = async () => {
    setIsLoading(true)
    let lensPrices = (await firestore().collection('lensPrice').doc('lensPrice').get()).data()
    const { [lensType]: omit, ...rest } = lensPrices;
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .set({
        ...rest, [lensName]: {
          prismPrice: form?.prismPrice,
          outOfRangePrice: form?.outOfRangePrice,
          rows
        }
      });

    dispatch(
      MessageActions.showMessage({
        message: 'Lens name updated successfully'
      })
    );
    setDisabledNameState(true);
    setIsLoading(false)
    props.history.push(
      `/apps/e-commerce/viewlens/${lensName}`
    );
  };

  const saveUploadedRates = async(rows) => {
    await firestore()
      .collection('lensPrice')
      .doc('lensPrice')
      .update({
        [lensType]: {
          prismPrice: form?.prismPrice,
          outOfRangePrice: form?.outOfRangePrice,
          rows
        }
      });

      setRows(rows)

    dispatch(
      MessageActions.showMessage({
        message: 'Prices Uploaded Successfully'
      })
    );
  }

  if (isLoading) return (
    <FuseLoading />
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
                {!disabledState && (
                  <div className='px-10'>
                    <Button
                      onClick={() => setOpenAlert(true)}
                      className={classes.button}
                      variant="contained"
                      color="secondary"
                      disabled={rows?.length ? disabledState : true}
                      aria-label="add">
                      <DeleteIcon fontSize="small" />
                      Delete Lens
                    </Button>
                  </div>
                )}
                <ExcelFileReader saveUploadedRates={saveUploadedRates}/>
                <CustomAlert
                  open={openAlert}
                  setOpen={setOpenAlert}
                  text1="Delete Prices?"
                  text2="All the prices will be lost. Are you sure?"
                  customFunction={handleDelete}
                />
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 ">
          <div className='flex flex-row justify-around'>
            <TextField
              className="mb-4"
              label="Lens Name"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      disabledNameState &&
                      <IconButton variant="outlined" color="default" onClick={() => setDisabledNameState(false)}>
                        <EditIcon />
                      </IconButton>
                    }
                    {
                      !disabledNameState &&
                      <IconButton variant="outlined" color="default" onClick={handleLensNameChange}>
                        <SaveIcon />
                      </IconButton>
                    }
                  </InputAdornment>
                ),
              }}
              value={lensName}
              disabled={disabledNameState}
              onChange={(e) => {
                setLensName(e.target.value)
              }}
              variant="outlined"
            />
            <TextField
              className="mb-4"
              label="Prism Price"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      disabledPrismPriceState &&
                      <IconButton variant="outlined" color="default" onClick={() => setDisabledPrismPriceState(false)}>
                        <EditIcon />
                      </IconButton>
                    }
                    {
                      !disabledPrismPriceState &&
                      <IconButton variant="outlined" color="default" onClick={handleExtraPricesChange}>
                        <SaveIcon />
                      </IconButton>
                    }
                  </InputAdornment>
                ),
              }}
              value={form?.prismPrice}
              disabled={disabledPrismPriceState}
              onChange={handleChange}
              name='prismPrice'
              variant="outlined"
            />
            <TextField
              className="mb-4"
              label="Out of Range Price"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {
                      disabledOutRangeState &&
                      <IconButton variant="outlined" color="default" onClick={() => setDisabledOutRangeState(false)}>
                        <EditIcon />
                      </IconButton>
                    }
                    {
                      !disabledOutRangeState &&
                      <IconButton variant="outlined" color="default" onClick={handleExtraPricesChange}>
                        <SaveIcon />
                      </IconButton>
                    }
                  </InputAdornment>
                ),
              }}
              value={form?.outOfRangePrice}
              disabled={disabledOutRangeState}
              onChange={handleChange}
              name='outOfRangePrice'
              variant="outlined"
            />
          </div>
          <div className='flex flex-row justify-center'>
            <Typography className="text-20 font-700 text-center">
              Cylinder
            </Typography>
          </div>
          <div className='flex flex-row w-full items-center'>
            <div className={classes.verticalText}>
            <Typography className="text-20 font-700 text-center">
              Sphere
            </Typography>
            </div>
            <TableGrid disabledState={disabledState} rows={rows} setRows={setRows} />
          </div>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Lens);
