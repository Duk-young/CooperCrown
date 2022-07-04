import { firestore, storage } from 'firebase';
import { red } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
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
      backgroundColor: '#372b25',
      color: '#fff'
    }
  },
  table: {
    minWidth: 700
  }
}));

function AddFrames(props) {
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
    const id = routeParams.frameId;
    const fetchFrame = async () => {
      const queryFrame = await firestore()
        .collection('frames')
        .where('frameId', '==', Number(id))
        .limit(1)
        .get();

      let resultFrame = queryFrame.docs[0].data();
      resultFrame.date = resultFrame.date && resultFrame.date.toDate();
      resultFrame.id = queryFrame.docs[0].id;
      setForm(resultFrame);
      setImages(resultFrame.images.urls);

      setisLoading(false);
    };

    if (id) fetchFrame();
    else {
      setForm({});
      setisLoading(false);
    }
  }, []);

  if (isLoading) {
    return <FuseLoading />;
  }

  const onSubmit = async () => {
    if (form.frameId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('frames').doc(form?.id);

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
            message: 'Frames updated successfully'
          })
        );
        props.history.push('/apps/inventory');
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    } else {
      setisLoading(true);

      try {
        const frameId = (
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
          .collection('frames')
          .add({
            ...form,
            date: firestore.Timestamp.fromDate(new Date()),
            frameId: frameId?.frameId + 1,
            images: { urls },
            initialQuantity: form.quantity
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ frameId: frameId?.frameId + 1 });
        dispatch(
          MessageActions.showMessage({
            message: 'Frames data saved to firebase'
          })
        );

        props.history.push('/apps/inventory');
      } catch (error) {
        console.log(error);
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
        <div>
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

          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Frame Detail
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
                      <div className="flex flex-col p-2 border-1 border-grey-400">
                        <FormControl>
                          <InputLabel htmlFor="standard-adornment-password">
                            SKU
                          </InputLabel>
                          <Input
                            id="standard-adornment-password"
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
                                  inventory={'frames'}
                                />
                                <IconButton
                                  onClick={() => {
                                    setOpenBarcodeDialog(true);
                                  }}
                                  key="barcode"
                                  aria-label="Barcode"
                                  color="inherit">
                                  <img src="https://img.icons8.com/ios/30/000000/barcode-scanner.png" />
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
                        value={form?.brand}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Model Name"
                        id="productDescription"
                        name="productDescription"
                        value={form?.productDescription}
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
                        value={form?.colour}
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
                        value={form?.material}
                        onChange={handleChange}
                        variant="outlined"
                        fullWidth
                      />
                      <TextField
                        className="mt-8"
                        required
                        label="Shape"
                        id="shape"
                        name="shape"
                        value={form?.shape}
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
                        value={form?.quantity}
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
                    <div className="flex flex-row w-2/3 justify-center pr-92">
                      <TextField
                        required
                        label="A"
                        id="sizeX"
                        name="sizeX"
                        value={form?.sizeX}
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
                        value={form?.sizeY}
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
                        value={form?.sizeZ}
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
                    <div className="flex flex-row w-2/3 justify-center pr-12">
                      <TextField
                        required
                        label="A"
                        id="sizeA"
                        name="sizeA"
                        value={form?.sizeA}
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
                        value={form?.sizeB}
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
                        value={form?.sizeDbl}
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
                        value={form?.sizeEd}
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
                        value={form?.madeIn}
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
                        value={form?.supplier}
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
                        value={form?.supplierAddress}
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
                        value={form?.supplierContact}
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
                        value={form?.supplierNotes}
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
                    value={form?.ws}
                    onChange={handleChange}
                    variant="outlined"
                    type="number"
                  />
                  <TextField
                    label="Retail $"
                    id="retailRate"
                    name="retailRate"
                    value={form?.retailRate}
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
                style={{ minHeight: '60px', maxHeight: '60px' }}
                onClick={() => {
                  if (form) {
                    setOpenAlertOnSave(true);
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

export default AddFrames;
