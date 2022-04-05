import { Fab } from '@material-ui/core';
import { firestore, storage } from 'firebase';
import { green } from '@material-ui/core/colors';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import CustomAlert from '../../ReusableComponents/CustomAlert';
import DateFnsUtils from '@date-io/date-fns';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
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

  const handleCloseAlert = () => {
    setOpenAlert(false);
  };

  useEffect(() => {
    const id = routeParams.frameId;
    const fetchFrame = async () => {
      const query = await firestore()
        .collection('frames')
        .where('frameId', '==', Number(id))
        .limit(1)
        .get();

      let result = query.docs[0].data();
      result.date = result.date && result.date.toDate();
      result.id = query.docs[0].id;
      setForm(result);
      setImages(result.images.urls);
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
          date: firestore.Timestamp.fromDate(form?.date),
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
            date: firestore.Timestamp.fromDate(form?.date),
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
        <div className="mt-24">
          <IconButton
            onClick={() => {
              setOpenAlert(true);
            }}>
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4 text-12">Customers</span>
          </IconButton>

          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Frame's Details
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
      contentToolbar={
        <div className="px-24">
          <h4>Please fill all the required fields properly!</h4>
        </div>
      }
      content={
        !form ? (
          <></>
        ) : (
          <div className="p-16 sm:p-24 ">
            <div className="flex flex-row items-center flex-wrap">
              <div className="flex ">
                <TextField
                  className="mt-8 w-200 mb-16"
                  //   error={error?.firstName}
                  required
                  label="SKU"
                  autoFocus
                  id="sku"
                  name="sku"
                  value={form?.sku}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-200 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Brand"
                  id="brand"
                  name="brand"
                  value={form?.brand}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-288 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Product Description"
                  id="productDescription"
                  name="productDescription"
                  value={form?.productDescription}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-128 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
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
              <div className="flex  pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Material"
                  id="material"
                  name="material"
                  value={form?.material}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex  pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Shape"
                  id="shape"
                  name="shape"
                  value={form?.shape}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-96 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Size X"
                  id="sizeX"
                  name="sizeX"
                  value={form?.sizeX}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-96 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Size Y"
                  id="sizeY"
                  name="sizeY"
                  value={form?.sizeY}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-96 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Size Z"
                  id="sizeZ"
                  name="sizeZ"
                  value={form?.sizeZ}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row items-center flex-wrap">
              <div className="flex w-200">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container>
                    <KeyboardDatePicker
                      margin="normal"
                      label="Date"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={form?.date}
                      onChange={(date) => {
                        handleChange({ target: { name: 'date', value: date } });
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
              <div className="flex w-200 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Made In"
                  id="madeIn"
                  name="madeIn"
                  value={form?.madeIn}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-512 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Supplier"
                  id="supplier"
                  name="supplier"
                  value={form?.supplier}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
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
              <div className="flex pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="W.S $"
                  id="ws"
                  name="ws"
                  value={form?.ws}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex  pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Retail $"
                  id="retailRate"
                  name="retailRate"
                  value={form?.retailRate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="ml-52">
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={form?.retail}
                    onChange={handleChange}
                    name="retail"
                  />
                }
                label="Retail Sale"
              />
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={form?.wholeSale}
                    onChange={handleChange}
                    name="wholeSale"
                  />
                }
                label="Whole Sale"
              />
            </div>
            <div className="flex">
              <div>
                <div className="flex flex-row">
                  {images.map((img, index) => (
                    <div className="mb-8 w-224 mr-6 ">
                      <img
                        className="w-full border-grey-300 border-1 relative shadow-1 rounded-4"
                        src={img.url}
                        key={img.name}
                        alt={''}
                      />
                      <div
                        className="flex flex-row justify-between items-center"
                        onClick={() => {
                          let newImages = images;
                          newImages.splice(index, 1);
                          setImages([...newImages]);
                        }}>
                        <div>{img.name}</div>
                        <IconButton
                          aria-label="delete"
                          className={classes.margin}>
                          <DeleteIcon color="red" fontSize="small" />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>

                <label htmlFor="upload-photo1">
                  <input
                    style={{ display: 'none' }}
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

                  <Fab
                    color="secondary"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended">
                    <AddIcon /> Upload photo
                  </Fab>
                  <br />
                  <br />
                </label>
              </div>
            </div>

            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
                onClick={() => {
                  if (form) {
                    setOpenAlertOnSave(true);
                  }
                }}>
                Save Details
              </Button>
            </FuseAnimate>
            <CustomAlert
              open={openAlertOnSave}
              setOpen={setOpenAlertOnSave}
              text1="Save Changes?"
              text2="Are you sure?"
              customFunction={onSubmit}
            />
          </div>
        )
      }
    />
  );
}

export default AddFrames;
