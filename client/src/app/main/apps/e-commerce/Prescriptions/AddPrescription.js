import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
import { withRouter } from 'react-router';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useParams } from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { useForm } from '@fuse/hooks';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import FuseAnimate from '@fuse/core/FuseAnimate';
import Button from '@material-ui/core/Button';

const AddPrescription = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const { form, handleChange, setForm } = useForm(null);
  const [filteredPrescription, setFilteredPrescription] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const routeParams = useParams();
  const dispatch = useDispatch();

  const [eyeglassesSphereOdInput, setEyeglassesSphereOdInput] = useState(
    form?.eyeglassesSphereOd
  );
  const [eyeglassesCylinderOdInput, setEyeglassesCylinderOdInput] = useState(
    form?.eyeglassesCylinderOd
  );
  const [eyeglassesAxisOdInput, setEyeglassesAxisOdInput] = useState(
    form?.eyeglassesAxisOd
  );
  const [eyeglassesAddOdInput, setEyeglassesAddOdInput] = useState(
    form?.eyeglassesAddOd
  );
  const [eyeglassesPrismOdInput, setEyeglassesPrismOdInput] = useState(
    form?.eyeglassesPrismOd
  );
  const [eyeglassesVaOdInput, setEyeglassesVaOdInput] = useState(
    form?.eyeglassesVaOd
  );

  const [eyeglassesSphereOsInput, setEyeglassesSphereOsInput] = useState(
    form?.eyeglassesSphereOs
  );
  const [eyeglassesCylinderOsInput, setEyeglassesCylinderOsInput] = useState(
    form?.eyeglassesCylinderOs
  );
  const [eyeglassesAxisOsInput, setEyeglassesAxisOsInput] = useState(
    form?.eyeglassesAxisOs
  );
  const [eyeglassesAddOsInput, setEyeglassesAddOsInput] = useState(
    form?.eyeglassesAddOs
  );
  const [eyeglassesPrismOsInput, setEyeglassesPrismOsInput] = useState(
    form?.eyeglassesPrismOs
  );
  const [eyeglassesVaOsInput, setEyeglassesVaOsInput] = useState(
    form?.eyeglassesVaOs
  );

  const [contactLensSphereOdInput, setContactLensSphereOdInput] = useState(
    form?.contactLensSphereOd
  );
  const [contactLensCylinderOdInput, setContactLensCylinderOdInput] = useState(
    form?.contactLensCylinderOd
  );
  const [contactLensAxisOdInput, setContactLensAxisOdInput] = useState(
    form?.contactLensAxisOd
  );
  const [contactLensAddOdInput, setContactLensAddOdInput] = useState(
    form?.contactLensAddOd
  );
  const [contactLensDiaOdInput, setContactLensDiaOdInput] = useState(
    form?.contactLensDiaOd
  );
  const [contactLensBcOdInput, setContactLensBcOdInput] = useState(
    form?.contactLensBcOd
  );

  const [contactLensSphereOsInput, setContactLensSphereOsInput] = useState(
    form?.contactLensSphereOs
  );
  const [contactLensCylinderOsInput, setContactLensCylinderOsInput] = useState(
    form?.contactLensCylinderOs
  );
  const [contactLensAxisOsInput, setContactLensAxisOsInput] = useState(
    form?.contactLensAxisOs
  );
  const [contactLensAddOsInput, setContactLensAddOsInput] = useState(
    form?.contactLensAddOs
  );
  const [contactLensDiaOsInput, setContactLensDiaOsInput] = useState(
    form?.contactLensDiaOs
  );
  const [contactLensBcOsInput, setContactLensBcOsInput] = useState(
    form?.contactLensBcOs
  );

  const [contactLensCompanyInput, setContactLensCompanyInput] = useState(
    form?.contactLensCompany
  );
  const [contactLensModelInput, setContactLensModelInput] = useState(
    form?.contactLensModel
  );
  const [contactLensModalityInput, setContactLensModalityInput] = useState(
    form?.contactLensModality
  );

  useEffect(() => {
    if (routeParams.prescriptionId) {
      setisLoading(true);

      const prescriptionId = routeParams.prescriptionId;
      const fetchCustomer = async () => {
        const queryEditPrescription = await firestore()
          .collection('prescriptions')
          .where('prescriptionId', '==', Number(prescriptionId))
          .limit(1)
          .get();

        let resultEditPrescription = queryEditPrescription.docs[0].data();
        resultEditPrescription.prescriptionDate =
          resultEditPrescription.prescriptionDate &&
          resultEditPrescription.prescriptionDate.toDate();
        resultEditPrescription.id = queryEditPrescription.docs[0].id;
        setForm(resultEditPrescription);

        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(resultEditPrescription.customerId))
          .limit(1)
          .get();

        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);

        const queryPrescription = await firestore()
          .collection('prescriptions')
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        setFilteredPrescription(resultPrescription);
        setisLoading(false);
      };
      fetchCustomer();
    } else {
      setisLoading(true);

      const id = routeParams.customerId;
      const fetchCustomer = async () => {
        const queryCustomer = await firestore()
          .collection('customers')
          .where('customerId', '==', Number(id))
          .limit(1)
          .get();

        let resultCustomer = queryCustomer.docs[0].data();
        resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
        resultCustomer.id = queryCustomer.docs[0].id;
        setCustomer(resultCustomer);

        const queryPrescription = await firestore()
          .collection('prescriptions')
          .get();

        let resultPrescription = [];
        queryPrescription.forEach((doc) => {
          resultPrescription.push(doc.data());
        });
        setFilteredPrescription(resultPrescription);

        setisLoading(false);
      };
      fetchCustomer();
    }
  }, []);
  if (isLoading) return <FuseLoading />;

  const onSubmit = async () => {
    if (form.prescriptionId) {
      setisLoading(true);
      console.log(form);
      try {
        const ref = firestore().collection('prescriptions').doc(form?.id);

        let data = {
          ...form,
          prescriptionDate: firestore.Timestamp.fromDate(form?.prescriptionDate)
        };
        delete data.id;
        await ref.set(data);

        dispatch(
          MessageActions.showMessage({
            message: 'Prescription updated successfully'
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
        const prescriptionId = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        await firestore()
          .collection('prescriptions')
          .add({
            ...form,
            prescriptionId: prescriptionId?.prescriptionId + 1,
            customerId: customer.customerId,
            prescriptionDate: firestore.Timestamp.fromDate(new Date())
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ prescriptionId: prescriptionId?.prescriptionId + 1 });
        dispatch(
          MessageActions.showMessage({
            message: 'Prescription Saved Successfully'
          })
        );

        props.history.push('/apps/e-commerce/customers');
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  return !customer ? (
    <></>
  ) : (
    <div className="flex flex-col w-full">
      <div className="flex flex-row p-16 sm:p-24 w-full">
        <div className="p-8 w-1/3 h-auto border-grey-400 border-solid border-1 shadow-10 rounded-20">
          <h1>Patient Details</h1>
          <h2>{`Name: ${customer.firstName} ${customer.lastName} Customer Id: ${customer.customerId}`}</h2>
          <h2>{`Address: ${customer.address}, ${customer.state}, ${customer.zipCode}`}</h2>
          <h2>{`Phone: ${customer.phone1}`}</h2>
          <h2>{`Email: ${customer.email}`}</h2>
          <h2>{`DOB: ${customer.dob.toDateString()}`}</h2>
          <h2>{`Sex: ${customer.gender}`}</h2>
        </div>
        <div className="p-8 w-2/3 h-auto relative">
          <h1>Prescription Details</h1>
          <h3>Select type of Prescription:</h3>
          <FormControl component="fieldset">
            <RadioGroup
              className="ml-60"
              row
              aria-label="prescriptionType"
              name="prescriptionType"
              value={form?.prescriptionType}
              onChange={handleChange}>
              <FormControlLabel
                value="eyeglassesRx"
                onClick={() => {
                  let eyeglassesRx = filteredPrescription.filter(
                    (word) => word.prescriptionType === 'eyeglassesRx'
                  );
                  console.log(eyeglassesRx);
                  setPrescription(eyeglassesRx);
                }}
                control={<Radio />}
                label="Eyeglasses Rx"
              />
              <FormControlLabel
                onClick={() => {
                  let contactLensRx = filteredPrescription.filter(
                    (word) => word.prescriptionType === 'contactLensRx'
                  );
                  console.log(contactLensRx);
                  setPrescription(contactLensRx);
                }}
                value="contactLensRx"
                control={<Radio />}
                label="Contact Lens Rx"
              />
              <FormControlLabel
                value="medicationRx"
                control={<Radio />}
                label="Medication Rx"
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <div className="flex flex-row p-16 sm:p-24">
        {form?.prescriptionType === 'eyeglassesRx' && (
          <FuseAnimate animation="transition.slideRightIn" delay={500}>
            <div className="p-16 sm:p-24 w-full border border-grey-400 shadow-10 rounded-20 ">
              <h1 className="underline p-10">Eyeglasses Rx</h1>
              <div className="flex flex-row px-60">
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700"></h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Sphere</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Cylinder</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Axis</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Add</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Prism</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">VA</h3>
                </div>
              </div>
              <div className="flex flex-row px-60">
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <h3 className="mt-20 text-center font-700">OD</h3>
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesSphereOd || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesSphereOd}
                    inputValue={eyeglassesSphereOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesSphereOdInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesSphereOd' }
                      });
                    }}
                    name="eyeglassesSphereOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesSphereOd,
                          name: 'eyeglassesSphereOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesCylinderOd || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesCylinderOd}
                    inputValue={eyeglassesCylinderOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesCylinderOdInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesCylinderOd' }
                      });
                    }}
                    name="eyeglassesCylinderOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesCylinderOd,
                          name: 'eyeglassesCylinderOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesAxisOd || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesAxisOd}
                    inputValue={eyeglassesAxisOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesAxisOdInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesAxisOd' }
                      });
                    }}
                    name="eyeglassesAxisOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesAxisOd,
                          name: 'eyeglassesAxisOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesAddOd || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesAddOd}
                    inputValue={eyeglassesAddOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesAddOdInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesAddOd' }
                      });
                    }}
                    name="eyeglassesAddOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesAddOd,
                          name: 'eyeglassesAddOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesPrismOd || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesPrismOd}
                    inputValue={eyeglassesPrismOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesPrismOdInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesPrismOd' }
                      });
                    }}
                    name="eyeglassesPrismOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesPrismOd,
                          name: 'eyeglassesPrismOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesVaOd || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesVaOd}
                    inputValue={eyeglassesVaOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesVaOdInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesVaOd' }
                      });
                    }}
                    name="eyeglassesVaOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesVaOd,
                          name: 'eyeglassesVaOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-row px-60">
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <h3 className="mt-20 text-center font-700">OS</h3>
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesSphereOs || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesSphereOs}
                    inputValue={eyeglassesSphereOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesSphereOsInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesSphereOs' }
                      });
                    }}
                    name="eyeglassesSphereOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesSphereOs,
                          name: 'eyeglassesSphereOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesCylinderOs || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesCylinderOs}
                    inputValue={eyeglassesCylinderOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesCylinderOsInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesCylinderOs' }
                      });
                    }}
                    name="eyeglassesCylinderOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesCylinderOs,
                          name: 'eyeglassesCylinderOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesAxisOs || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesAxisOs}
                    inputValue={eyeglassesAxisOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesAxisOsInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesAxisOs' }
                      });
                    }}
                    name="eyeglassesAxisOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesAxisOs,
                          name: 'eyeglassesAxisOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesAddOs || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesAddOs}
                    inputValue={eyeglassesAddOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesAddOsInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesAddOs' }
                      });
                    }}
                    name="eyeglassesAddOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesAddOs,
                          name: 'eyeglassesAddOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesPrismOs || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesPrismOs}
                    inputValue={eyeglassesPrismOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesPrismOsInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesPrismOs' }
                      });
                    }}
                    name="eyeglassesPrismOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesPrismOs,
                          name: 'eyeglassesPrismOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.eyeglassesVaOs || option
                    }
                    id="prescriptionId"
                    value={form?.eyeglassesVaOs}
                    inputValue={eyeglassesVaOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setEyeglassesVaOsInput(value);
                      handleChange({
                        target: { value: value, name: 'eyeglassesVaOs' }
                      });
                    }}
                    name="eyeglassesVaOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.eyeglassesVaOs,
                          name: 'eyeglassesVaOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
              </div>
              <div className="flex mt-10 px-60">
                <FuseAnimate animation="transition.slideRightIn" delay={500}>
                  <Button
                    className="whitespace-no-wrap normal-case"
                    variant="contained"
                    color="secondary"
                    onClick={!form ? undefined : onSubmit}>
                    Save Eyeglasses Rx
                  </Button>
                </FuseAnimate>
              </div>
            </div>
          </FuseAnimate>
        )}

        {form?.prescriptionType === 'contactLensRx' && (
          <FuseAnimate animation="transition.slideLeftIn" delay={500}>
            <div className="p-16 sm:p-24 w-full border border-grey-400 shadow-10 rounded-20">
              <h1 className="underline p-10">Contact Lens Rx</h1>
              <div className="flex flex-row px-60">
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700"></h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Sphere</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Cylinder</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">Axis</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">ADD</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">DIA</h3>
                </div>
                <div className="p-8 h-auto flex-1">
                  <h3 className="text-center font-700">BC</h3>
                </div>
              </div>
              <div className="flex flex-row px-60">
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <h3 className="mt-20 text-center font-700">OD</h3>
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensSphereOd || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensSphereOd}
                    inputValue={contactLensSphereOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensSphereOdInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensSphereOd' }
                      });
                    }}
                    name="contactLensSphereOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensSphereOd,
                          name: 'contactLensSphereOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensCylinderOd || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensCylinderOd}
                    inputValue={contactLensCylinderOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensCylinderOdInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensCylinderOd' }
                      });
                    }}
                    name="contactLensCylinderOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensCylinderOd,
                          name: 'contactLensCylinderOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensAxisOd || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensAxisOd}
                    inputValue={contactLensAxisOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensAxisOdInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensAxisOd' }
                      });
                    }}
                    name="contactLensAxisOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensAxisOd,
                          name: 'contactLensAxisOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensAddOd || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensAddOd}
                    inputValue={contactLensAddOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensAddOdInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensAddOd' }
                      });
                    }}
                    name="contactLensAddOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensAddOd,
                          name: 'contactLensAddOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensDiaOd || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensDiaOd}
                    inputValue={contactLensDiaOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensDiaOdInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensDiaOd' }
                      });
                    }}
                    name="contactLensDiaOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensDiaOd,
                          name: 'contactLensDiaOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensBcOd || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensBcOd}
                    inputValue={contactLensBcOdInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensBcOdInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensBcOd' }
                      });
                    }}
                    name="contactLensBcOd"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensBcOd,
                          name: 'contactLensBcOd'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
              </div>

              <div className="flex flex-row px-60">
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <h3 className="mt-20 text-center font-700">OS</h3>
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensSphereOs || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensSphereOs}
                    inputValue={contactLensSphereOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensSphereOsInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensSphereOs' }
                      });
                    }}
                    name="contactLensSphereOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensSphereOs,
                          name: 'contactLensSphereOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensCylinderOs || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensCylinderOs}
                    inputValue={contactLensCylinderOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensCylinderOsInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensCylinderOs' }
                      });
                    }}
                    name="contactLensCylinderOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensCylinderOs,
                          name: 'contactLensCylinderOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensAxisOs || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensAxisOs}
                    inputValue={contactLensAxisOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensAxisOsInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensAxisOs' }
                      });
                    }}
                    name="contactLensAxisOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensAxisOs,
                          name: 'contactLensAxisOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensAddOs || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensAddOs}
                    inputValue={contactLensAddOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensAddOsInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensAddOs' }
                      });
                    }}
                    name="contactLensAddOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensAddOs,
                          name: 'contactLensAddOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensDiaOs || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensDiaOs}
                    inputValue={contactLensDiaOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensDiaOsInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensDiaOs' }
                      });
                    }}
                    name="contactLensDiaOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensDiaOs,
                          name: 'contactLensDiaOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
                <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensBcOs || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensBcOs}
                    inputValue={contactLensBcOsInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensBcOsInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensBcOs' }
                      });
                    }}
                    name="contactLensBcOs"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensBcOs,
                          name: 'contactLensBcOs'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField {...params} type="number" margin="normal" />
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row p-8 w-2/3 mt-10 px-60 justify-around">
                <div className=" flex-1">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensCompany || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensCompany}
                    inputValue={contactLensCompanyInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensCompanyInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensCompany' }
                      });
                    }}
                    name="contactLensCompany"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensCompany,
                          name: 'contactLensCompany'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Company"
                        variant="outlined"
                        margin="normal"
                      />
                    )}
                  />
                </div>
                <div className="pl-8 flex-1">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensModel || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensModel}
                    inputValue={contactLensModelInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensModelInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensModel' }
                      });
                    }}
                    name="contactLensModel"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensModel,
                          name: 'contactLensModel'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Model"
                        margin="normal"
                      />
                    )}
                  />
                </div>
                <div className="pl-8 flex-1">
                  <Autocomplete
                    options={prescription}
                    getOptionLabel={(option) =>
                      option?.contactLensModality || option
                    }
                    id="prescriptionId"
                    value={form?.contactLensModality}
                    inputValue={contactLensModalityInput}
                    freeSolo
                    onInputChange={(e, value) => {
                      setContactLensModalityInput(value);
                      handleChange({
                        target: { value: value, name: 'contactLensModality' }
                      });
                    }}
                    name="contactLensModality"
                    onChange={(_, value) =>
                      handleChange({
                        target: {
                          value: value?.contactLensModality,
                          name: 'contactLensModality'
                        }
                      })
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Modality"
                        margin="normal"
                      />
                    )}
                  />
                </div>
              </div>
              <div className="flex mt-10 px-60">
                <Button
                  className="whitespace-no-wrap normal-case"
                  variant="contained"
                  color="secondary"
                  onClick={!form ? undefined : onSubmit}>
                  Save Contact Lens Rx
                </Button>
              </div>
            </div>
          </FuseAnimate>
        )}

        {form?.prescriptionType === 'medicationRx' && (
          <FuseAnimate animation="transition.slideLeftIn" delay={500}>
            <div className="p-16 sm:p-24 w-full  shadow-4 rounded-20">
              <h1 className="underline p-10">Medication Rx</h1>
              <TextField
                className="mt-10 "
                fullWidth
                InputProps={{ style: { fontSize: 20 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                id="outlined-multiline-static"
                label="Comments"
                multiline
                rows={4}
                value={form?.medicationComments}
                onChange={handleChange}
                name={'medicationComments'}
                variant="outlined"
              />
              <div className="flex mt-10 px-60">
                <Button
                  className="whitespace-no-wrap normal-case"
                  variant="contained"
                  color="secondary"
                  onClick={!form ? undefined : onSubmit}>
                  Save Medication Rx
                </Button>
              </div>
            </div>
          </FuseAnimate>
        )}
      </div>
    </div>
  );
};

export default withRouter(AddPrescription);
