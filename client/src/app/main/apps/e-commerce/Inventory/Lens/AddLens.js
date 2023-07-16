import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import BarcodeDialog from '../BarcodeDialog';
import Button from '@material-ui/core/Button';
import CustomAlert from '../../ReusableComponents/CustomAlert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { toast, Zoom } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  orangeButton: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  transparentButton: {
    backgroundColor: '#fff',
    color: '#000000',
    boxShadow: 'none',
    fontSize: '20px',
    '&:hover': {
      backgroundColor: '#F5F5F5',
      color: '#000000'
    }
  },
  buttonBlack: {
    backgroundColor: '#000000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#000000',
      color: '#fff'
    }
  },
  table: {
    minWidth: 700
  }
}));

function AddLens(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(null);
  const [isLoading, setisLoading] = useState(false);
  const routeParams = useParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertOnSave, setOpenAlertOnSave] = useState(false);
  const [openBarcodeDialog, setOpenBarcodeDialog] = useState(false);

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleBarCodeDilogClose = () => {
    setOpenBarcodeDialog(false);
  };

  useEffect(() => {
    const id = routeParams.lensId;
    const fetchLens = async () => {
      const queryLens = await firestore()
        .collection('lens')
        .where('lensId', '==', Number(id))
        .limit(1)
        .get();

      let resultLens = queryLens.docs[0].data();
      resultLens.date = resultLens.date && resultLens.date.toDate();
      resultLens.id = queryLens.docs[0].id;
      setForm(resultLens);
      setisLoading(false);
    };

    if (id) fetchLens();
    else {
      setForm({});
      setisLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <FuseLoading />;
  }

  const onSubmit = async () => {
    if (form.lensId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('lens').doc(form?.id);

        let data = {
          ...form,
          initialQuantity: form.quantity
        };

        await ref.set(data);

        dispatch(
          MessageActions.showMessage({
            message: 'Lens updated successfully'
          })
        );
        props.history.push('/apps/inventory');
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    } else {
      setisLoading(true);
      const queryLens = await firestore().collection('lens').get();
      let resultLens = [];
      queryLens.forEach((doc) => {
        resultLens.push(doc.data());
      });
      let count = 0;
      resultLens.map((row) => {
        if (row?.sku === form?.sku) {
          count++;
        }
        return null;
      });

      if (count > 0) {
        toast.error('Selected SKU already exists in inventory', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          transition: Zoom
        });
      } else {
        try {
          const dbConfig = (
            await firestore().collection('dbConfig').doc('dbConfig').get()
          ).data();

          await firestore()
            .collection('lens')
            .add({
              ...form,
              date: firestore.Timestamp.fromDate(new Date()),
              lensId: dbConfig?.lensId + 1,
              initialQuantity: form?.quantity ? form?.quantity : ''
            });

          await firestore()
            .collection('dbConfig')
            .doc('dbConfig')
            .update({ lensId: dbConfig?.lensId + 1 });
          dispatch(
            MessageActions.showMessage({
              message: 'Lens saved successfully'
            })
          );

          props.history.push('/apps/inventory');
        } catch (error) {
          console.log(error);
        }
      }
      setisLoading(false);
    }
  };

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot
      }}
      header={
        <div className='flex flex-row w-full'>
          <div className='flex flex-row w-1/3 h-16'>
            <IconButton
              onClick={() => {
                if (
                  Object.keys(form).length === 0 &&
                  form.constructor === Object
                ) {
                  props.history.push(`/apps/inventory`);
                } else {
                  setOpenAlert(true);
                }
              }}>
              <Icon className="text-20">arrow_back</Icon>
              <span className="mx-4 text-12">Inventory</span>
            </IconButton>
          </div>
          <div className='flex flex-row w-1/3 justify-center'>
            <Typography style={{ fontSize: '3rem', fontWeight: 600 }} variant="h6">NEW LENS</Typography>
          </div>
          <div className='flex flex-row w-1/3'>
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
                    props.history.push(`/apps/inventory`);
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
      content={
        !form ? (
          <></>
        ) : (
          <div className="flex flex-col p-16 sm:p-24 ">
            <div className="flex flex-col md:flex-row w-full">
              <div className="w-full md:w-1/2 p-6">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      PRODUCT INFO
                    </h1>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2 p-6">
                      <div className="flex flex-col p-2 border-1 border-grey-400 rounded-4">
                        <FormControl>
                          <InputLabel htmlFor="standard-adornment-password">
                            SKU
                          </InputLabel>
                          <Input
                            id="standard-adornment-password"
                            disableUnderline
                            value={form?.sku ? form?.sku : ''}
                            name="sku"
                            onChange={handleChange}
                            endAdornment={
                              <InputAdornment position="end">
                                <BarcodeDialog
                                  open={openBarcodeDialog}
                                  handleClose={handleBarCodeDilogClose}
                                  form={form}
                                  setForm={setForm}
                                  setImages={setImages}
                                  images={images}
                                  inventory={'lens'}
                                />
                                <IconButton
                                  onClick={() => {
                                    setOpenBarcodeDialog(true);
                                  }}
                                  key="barcode"
                                  aria-label="Barcode"
                                  color="inherit">
                                  <img
                                    src="https://img.icons8.com/ios/30/000000/barcode-scanner.png"
                                    alt=""
                                  />
                                </IconButton>
                              </InputAdornment>
                            }
                          />
                        </FormControl>
                      </div>
                      <TextField
                        className="mt-8"
                        required
                        label="Lens Type"
                        id="lensType"
                        name="lensType"
                        value={form?.lensType ? form?.lensType : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Brand"
                        id="brand"
                        name="brand"
                        value={form?.brand ? form?.brand : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Model Name"
                        id="model"
                        name="model"
                        value={form?.model ? form?.model : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Colour"
                        id="colour"
                        name="colour"
                        value={form?.colour ? form?.colour : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="flex flex-col w-1/2 p-6">
                      <TextField
                        required
                        label="Material"
                        id="material"
                        name="material"
                        value={form?.material ? form?.material : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Sphere"
                        id="sphere"
                        name="sphere"
                        value={form?.sphere ? form?.sphere : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Cylinder"
                        id="cylinder"
                        name="cylinder"
                        value={form?.cylinder ? form?.cylinder : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Quantity"
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={form?.quantity ? form?.quantity : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 p-6">
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      SUPPLIER INFO
                    </h1>
                  </div>
                  <div className="flex flex-row w-full">
                    <div className="flex flex-col w-1/2 p-6">
                      <TextField
                        required
                        label="Made In"
                        id="madeIn"
                        name="madeIn"
                        value={form?.madeIn ? form?.madeIn : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Company"
                        id="supplier"
                        name="supplier"
                        value={form?.supplier ? form?.supplier : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        multiline
                        minRows={4}
                        maxRows={4}
                        label="Address"
                        id="supplierAddress"
                        name="supplierAddress"
                        value={
                          form?.supplierAddress ? form?.supplierAddress : ''
                        }
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Contact"
                        id="supplierContact"
                        name="supplierContact"
                        value={
                          form?.supplierContact ? form?.supplierContact : ''
                        }
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                    <div className="flex flex-col w-1/2 p-6">
                      <TextField
                        required
                        multiline
                        minRows={15}
                        maxRows={15}
                        label="Note"
                        id="supplierNotes"
                        name="supplierNotes"
                        value={form?.supplierNotes ? form?.supplierNotes : ''}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col p-6">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h1 className="font-700" style={{ color: '#f15a25' }}>
                    PRICE/SALE
                  </h1>
                </div>
                <div className="flex flex-row justify-around p-32">
                  <TextField
                    label="W.S $"
                    id="ws"
                    name="ws"
                    value={form?.ws ? form?.ws : ''}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                  />
                  <TextField
                    label="Retail $"
                    id="retailRate"
                    name="retailRate"
                    value={form?.retailRate ? form?.retailRate : ''}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col p-12">
              <CustomAlert
                open={openAlertOnSave}
                setOpen={setOpenAlertOnSave}
                text1="Save Changes?"
                text2="Are you sure?"
                customFunction={onSubmit}
              />

              <Button
                className={classes.orangeButton}
                variant="contained"
                style={{ minHeight: '40px', maxHeight: '40px' }}
                onClick={() => {
                  if (form && form?.sku) {
                    setOpenAlertOnSave(true);
                  } else {
                    toast.error('SKU is mandatory!', {
                      position: 'top-center',
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      transition: Zoom
                    });
                  }
                }}>
                <Icon>save</Icon> SAVE
              </Button>
            </div>
          </div>
        )
      }
    />
  );
}

export default AddLens;
