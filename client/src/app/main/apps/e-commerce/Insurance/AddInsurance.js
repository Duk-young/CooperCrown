import { firestore, storage } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddIcon from '@material-ui/icons/Add';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import CameraDialog from './CameraDialog';
import CustomAlert from '../ReusableComponents/CustomAlert';
import DeleteIcon from '@material-ui/icons/Delete';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles((theme) => ({
  layoutRoot: {},
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  buttonBlack: {
    backgroundColor: '#000000',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#372b25',
      color: '#fff'
    }
  }
}));

function AddInsurance(props) {
  const classes = useStyles();
  const { form, handleChange, setForm } = useForm(null);
  const routeParams = useParams();
  const dispatch = useDispatch();
  const [images, setImages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [insurances, setInsurances] = useState([]);
  const [insuranceCompanyInput, setInsuranceCompanyInput] = useState(
    form?.insuranceCompany
  );
  const [openAlertOnBack, setOpenAlertOnBack] = useState(false);
  const [openCameraDialog, setOpenCameraDialog] = useState(false);

  const handleCameraDilogClose = () => {
    setOpenCameraDialog(false);
  };

  useEffect(() => {
    if (routeParams.insuranceId) {
      setisLoading(true);
      const insuranceId = routeParams.insuranceId;
      const fetchInsurance = async () => {
        const queryEditInsurance = await firestore()
          .collection('insurances')
          .where('insuranceId', '==', Number(insuranceId))
          .limit(1)
          .get();
        let resultEditInsurance = queryEditInsurance.docs[0].data();
        resultEditInsurance.id = queryEditInsurance.docs[0].id;
        setForm(resultEditInsurance);
        setImages(resultEditInsurance.images.urls);
        setisLoading(false);
      };
      fetchInsurance();
    } else {
      setisLoading(true);

      const fetchInsurance = async () => {
        const queryInsurances = await firestore()
          .collection('insurances')
          .get();

        let resultInsurances = [];
        queryInsurances.forEach((doc) => {
          resultInsurances.push(doc.data());
        });

        let resArr = [];
        resultInsurances.filter(function (item) {
          var i = resArr.findIndex(
            (x) => x.insuranceCompany === item.insuranceCompany
          );
          if (i <= -1) {
            resArr.push(item);
          }
          return null;
        });

        setInsurances(resArr);
        setForm({});
        setisLoading(false);
      };
      fetchInsurance();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams.customerId]);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    if (form.insuranceId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('insurances').doc(form?.id);
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
          images: { urls }
        };
        delete data.id;
        await ref.set(data);
        dispatch(
          MessageActions.showMessage({
            message: 'Insurance updated successfully'
          })
        );
        props.history.push(
          `/apps/e-commerce/customers/profile/${form?.customerId}`
        );
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    } else {
      setisLoading(true);
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
          .collection('insurances')
          .add({
            ...form,
            insuranceId: dbConfig?.insuranceId + 1,
            customerId: Number(routeParams.customerId),
            images: { urls }
          });

        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(routeParams.customerId))
          .limit(1)
          .get();
        let docId = queryCustomer.docs[0].id;

        await firestore()
          .collection('customers')
          .doc(docId)
          .update({
            recentUpdated: dbConfig?.recentUpdated + 1
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({
            insuranceId: dbConfig?.insuranceId + 1,
            recentUpdated: dbConfig?.recentUpdated + 1
          });
        dispatch(
          MessageActions.showMessage({
            message: 'Insurance Saved Successfully'
          })
        );
        props.history.push(
          `/apps/e-commerce/customers/profile/${routeParams.customerId}`
        );
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await firestore().collection('insurances').doc(form.id).delete();
      dispatch(
        MessageActions.showMessage({
          message: 'Insurance deleted successfully'
        })
      );
      props.history.push(
        `/apps/e-commerce/customers/profile/${form?.customerId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FusePageCarded
      header={
        <div>
          <IconButton
            onClick={() => {
              if (
                Object.keys(form).length === 0 &&
                form.constructor === Object
              ) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                );
              } else {
                setOpenAlertOnBack(true);
              }
            }}>
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4 text-12">Customer's Profile</span>
          </IconButton>

          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Adding Insurance Info
            </Typography>
          </div>
          <CustomAlert
            open={openAlertOnBack}
            setOpen={setOpenAlertOnBack}
            text1="Discard Changes?"
            text2="All the changes will be lost. Are you sure?"
            customFunction={() => {
              if (routeParams?.customerId) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                );
              } else {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${form?.customerId}`
                );
              }
            }}
          />
        </div>
      }
      content={
        !form ? (
          <></>
        ) : (
          <FuseAnimate animation="transition.slideRightIn" delay={500}>
            <div className="p-16 sm:p-24 w-full">
              <h1 className="underline">Insurance Details</h1>

              <div className="flex flex-row pl-16">
                <div className="md:w-1/4 w-1/2">
                  <div className="h-auto justify-between">
                    <Autocomplete
                      options={insurances}
                      getOptionLabel={(option) =>
                        option?.insuranceCompany || option
                      }
                      id="insuranceId"
                      value={form?.insuranceCompany}
                      inputValue={insuranceCompanyInput}
                      freeSolo
                      onInputChange={(e, value) => {
                        setInsuranceCompanyInput(value);
                        handleChange({
                          target: { value: value, name: 'insuranceCompany' }
                        });
                      }}
                      name="insuranceCompany"
                      onChange={(_, value) =>
                        handleChange({
                          target: {
                            value: value?.insuranceCompany,
                            name: 'insuranceCompany'
                          }
                        })
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Insurance Company"
                          variant="outlined"
                          margin="normal"
                        />
                      )}
                    />
                    <TextField
                      className="mt-12 "
                      fullWidth
                      // disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Primary Holder"
                      value={form?.primaryHolder}
                      onChange={handleChange}
                      name={'primaryHolder'}
                      variant="outlined"
                    />
                    <TextField
                      className="mt-12 "
                      fullWidth
                      // disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Policy #"
                      value={form?.policyNo}
                      onChange={handleChange}
                      name={'policyNo'}
                      variant="outlined"
                    />
                    <TextField
                      className="mt-12 "
                      fullWidth
                      // disabled={disabledState}
                      id="outlined-multiline-static"
                      label="SSN"
                      value={form?.ssn}
                      onChange={handleChange}
                      name={'ssn'}
                      variant="outlined"
                    />
                    <TextField
                      className="mt-12 "
                      fullWidth
                      // disabled={disabledState}
                      id="outlined-multiline-static"
                      label="Other"
                      value={form?.other}
                      onChange={handleChange}
                      name={'other'}
                      variant="outlined"
                    />
                  </div>
                </div>

                <div className="p-8 flex-1 ml-10 h-auto justify-between">
                  <div className="flex flex-col overflow-scroll">
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
                      <div className="flex flex-col p-12 w-full md:w-1/3">
                        <Button
                          className={classes.buttonBlack}
                          style={{
                            maxHeight: '100px',
                            minHeight: '100px'
                          }}
                          variant="contained"
                          component="span"
                          color="secondary">
                          <AddIcon /> UPLOAD PHOTO
                        </Button>
                      </div>
                    </label>
                    <div className="flex flex-col p-12 pt-0 w-full md:w-1/3">
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
                        component="span"
                        color="secondary">
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
                </div>
              </div>
              <div className="flex flex-col w-full overflow-scroll">
                <div className="flex flex-row w-full overflow-scroll flex-wrap mt-10">
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
                            className="mt-12 "
                            fullWidth
                            // disabled={disabledState}
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
                <div className="flex flex-col p-12 md:w-1/4">
                  <Button
                    className={classes.button}
                    style={{
                      maxHeight: '70px',
                      minHeight: '70px'
                    }}
                    variant="contained"
                    color="secondary"
                    onClick={!form ? undefined : onSubmit}>
                    <Icon>save</Icon>
                    SAVE INSURANCE
                  </Button>
                </div>
                {routeParams?.insuranceId && (
                  <div className="flex flex-row p-12 md:w-1/3">
                    <Button
                      style={{
                        maxHeight: '70px',
                        minHeight: '70px',
                        color: 'red'
                      }}
                      variant="outlined"
                      onClick={handleDelete}>
                      <Icon>delete</Icon>
                      DELETE INSURANCE
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </FuseAnimate>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(AddInsurance);
