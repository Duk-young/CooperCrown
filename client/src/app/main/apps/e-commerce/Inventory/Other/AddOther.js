import { firestore, storage } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import BarcodeDialog from '../BarcodeDialog';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CameraDialog from '../CameraDialog';
import CustomAlert from '../../ReusableComponents/CustomAlert';
import DeleteIcon from '@material-ui/icons/Delete';
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

function AddOther(props) {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(null);
  const [isLoading, setisLoading] = useState(false);
  const routeParams = useParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [openAlertOnSave, setOpenAlertOnSave] = useState(false);
  const [openBarcodeDialog, setOpenBarcodeDialog] = useState(false);
  const [openCameraDialog, setOpenCameraDialog] = useState(false);

  const handleCameraDilogClose = () => {
    setOpenCameraDialog(false);
  };

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  const handleBarCodeDilogClose = () => {
    setOpenBarcodeDialog(false);
  };

  useEffect(() => {
    const id = routeParams.otherId;
    const fetchLens = async () => {
      const queryOther = await firestore()
        .collection('other')
        .where('otherId', '==', Number(id))
        .limit(1)
        .get();

      let resultOther = queryOther.docs[0].data();
      resultOther.date = resultOther.date && resultOther.date.toDate();
      resultOther.id = queryOther.docs[0].id;
      setForm(resultOther);
      setImages(resultOther.images.urls);

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
    if (form.otherId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('other').doc(form?.id);

        let urls = [];
        for (let img of images) {
          if (img.file) {
            await storage().ref(`images/${img.id}`).put(img.file);

            const url = await storage()
              .ref('images')
              .child(img.id)
              .getDownloadURL();
            urls.push({ url, name: img.name });

            continue;
          }
          urls.push({ url: img.url, name: img.name });
        }
        let data = {
          ...form,
          images: { urls },
          initialQuantity: form.quantity
        };

        await ref.set(data);

        dispatch(
          MessageActions.showMessage({
            message: 'Other product updated successfully'
          })
        );
        props.history.push('/apps/inventory');
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    } else {
      setisLoading(true);

      const queryOther = await firestore().collection('other').get();
      let resultOther = [];
      queryOther.forEach((doc) => {
        resultOther.push(doc.data());
      });
      let count = 0;
      resultOther.map((row) => {
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

          let urls = [];
          for (let img of images) {
            await storage().ref(`images/${img.id}`).put(img.file);

            const url = await storage()
              .ref('images')
              .child(img.id)
              .getDownloadURL();
            urls.push({ url, name: img.name });
          }

          await firestore()
            .collection('other')
            .add({
              ...form,
              date: firestore.Timestamp.fromDate(new Date()),
              otherId: dbConfig?.otherId + 1,
              images: { urls },
              initialQuantity: form.quantity
            });

          await firestore()
            .collection('dbConfig')
            .doc('dbConfig')
            .update({ otherId: dbConfig?.otherId + 1 });
          dispatch(
            MessageActions.showMessage({
              message: 'Other product saved successfully'
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
    <div className='overflow-hidden'>
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
              <Typography style={{ fontSize: '3rem', fontWeight: 600 }} variant="h6">NEW PRODUCT</Typography>
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
                              className='pl-10'
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
                                    images={images}
                                    setImages={setImages}
                                    inventory={'other'}
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
                          label="Brand"
                          id="brand"
                          name="brand"
                          value={form?.brand ? form?.brand : ''}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'brand',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          className="mt-8"
                          required
                          label="Model Name"
                          id="productDescription"
                          name="productDescription"
                          value={
                            form?.productDescription
                              ? form?.productDescription
                              : ''
                          }
                          onChange={(e) => handleChange({
                            target: {
                              name: 'productDescription',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          className="mt-8"
                          required
                          label="Color"
                          id="colour"
                          name="colour"
                          value={form?.colour ? form?.colour : ''}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'colour',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
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
                          onChange={(e) => handleChange({
                            target: {
                              name: 'material',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
                          variant="outlined"
                          fullWidth
                        />
                        <TextField
                          className="mt-8"
                          required
                          label="Shape"
                          id="shape"
                          name="shape"
                          value={form?.shape ? form?.shape : ''}
                          onChange={(e) => handleChange({
                            target: {
                              name: 'shape',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
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

                    <div className="flex flex-row w-full mt-32">
                      <div className="flex flex-col w-1/3 justify-center items-center">
                        <h3 className="font-700">PRINTED SIZE</h3>
                      </div>
                      <div className="flex flex-row w-2/3 justify-center pr-92 gap-8">
                        <TextField
                          required
                          label="A"
                          id="sizeX"
                          name="sizeX"
                          value={form?.sizeX ? form?.sizeX : ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="number"
                        />
                        <TextField
                          required
                          label="B"
                          id="sizeY"
                          name="sizeY"
                          value={form?.sizeY ? form?.sizeY : ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="number"
                        />
                        <TextField
                          required
                          label="TEMPLE"
                          id="sizeZ"
                          name="sizeZ"
                          value={form?.sizeZ ? form?.sizeZ : ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full mt-32">
                      <div className="flex flex-col w-1/3 justify-center items-center">
                        <h3 className="font-700">MEASURED SIZE</h3>
                      </div>
                      <div className="flex flex-row w-2/3 justify-center pr-12 gap-8">
                        <TextField
                          required
                          label="A"
                          id="sizeA"
                          name="sizeA"
                          value={form?.sizeA ? form?.sizeA : ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="number"
                        />
                        <TextField
                          required
                          label="B"
                          id="sizeB"
                          name="sizeB"
                          value={form?.sizeB ? form?.sizeB : ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="number"
                        />
                        <TextField
                          required
                          label="DBL"
                          id="sizeDbl"
                          name="sizeDbl"
                          value={form?.sizeDbl ? form?.sizeDbl : ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="number"
                        />
                        <TextField
                          required
                          label="ED"
                          id="sizeEd"
                          name="sizeEd"
                          value={form?.sizeEd ? form?.sizeEd : ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullWidth
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row w-full justify-around">
                      <label htmlFor="upload-photo1" className="w-full">
                        <input
                          style={{ display: 'none', width: '100%' }}
                          id="upload-photo1"
                          type="file"
                          accept="image/*"
                          onClick={(event) => {
                            event.target.value = '';
                          }}
                          onChange={(e) =>
                            setImages([
                              ...images,
                              {
                                name: e.target.files[0].name,
                                id: uuidv4(),
                                url: URL.createObjectURL(e.target.files[0]),
                                file: e.target.files[0]
                              }
                            ])
                          }
                        />
                        <div className="flex flex-col p-12 w-full">
                          <Button
                            className={classes.buttonBlack}
                            style={{
                              maxHeight: '100px',
                              minHeight: '100px'
                            }}
                            variant="contained"
                            component="span">
                            <AddIcon /> UPLOAD PHOTO
                          </Button>
                        </div>
                      </label>
                      <div className="flex flex-col p-12 w-full">
                        <Button
                          onClick={() => {
                            setOpenCameraDialog(true);
                          }}
                          className={classes.buttonBlack}
                          style={{
                            maxHeight: '100px',
                            minHeight: '100px'
                          }}
                          variant="contained"
                          component="span">
                          <CameraAltIcon /> CAPTURE PHOTO
                        </Button>
                        <CameraDialog
                          open={openCameraDialog}
                          handleClose={handleCameraDilogClose}
                          setImages={setImages}
                          images={images}
                        />
                      </div>
                    </div>
                    <div className="flex flex-row w-full overflow-scroll flex-wrap mt-10 p-6">
                      {images.map((img, index) => (
                        <div className="mb-8 w-224 mr-6 object-contain">
                          <img
                            className="w-224 h-128 shadow-1 rounded-4"
                            src={img.url}
                            key={img.name}
                            alt={''}
                          />
                          <div className="flex flex-row justify-between items-center">
                            <div className="truncate">
                              <TextField
                                size="small"
                                className="mt-12 "
                                fullWidth
                                label="Name"
                                id="outlined-multiline-static"
                                value={images[index].name.split('.', 1)}
                                onChange={(e) => {
                                  let newImages = images;
                                  newImages[index].name = e.target.value;
                                  setImages([...newImages]);
                                }}
                                variant="outlined"
                              />
                            </div>

                            <IconButton
                              onClick={() => {
                                let newImages = images;
                                newImages.splice(index, 1);
                                setImages([...newImages]);
                              }}
                              aria-label="delete"
                              className={classes.margin}>
                              <DeleteIcon
                                style={{ color: red[500] }}
                                fontSize="small"
                              />
                            </IconButton>
                          </div>
                        </div>
                      ))}
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
                          onChange={(e) => handleChange({
                            target: {
                              name: 'madeIn',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
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
                          onChange={(e) => handleChange({
                            target: {
                              name: 'supplier',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
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
                          onChange={(e) => handleChange({
                            target: {
                              name: 'supplierAddress',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
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
                          onChange={(e) => handleChange({
                            target: {
                              name: 'supplierNotes',
                              value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                            }
                          })}
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
                  style={{ minHeight: '4 gap-80px', maxHeight: '4 gap-80px' }}
                  onClick={() => {
                    if (form && form?.sku) {
                      setOpenAlertOnSave(true);
                    } else {
                      toast.error('SKU is mandatory', {
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
        innerScroll
      />
    </div>
  );
}

export default AddOther;
