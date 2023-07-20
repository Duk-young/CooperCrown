import { firestore } from 'firebase';
import { Link, useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useTheme } from '@material-ui/core/styles';
import * as Actions from '../store/actions';
import Button from '@material-ui/core/Button';
import ConfirmContactDelete from './ConfirmContactDelete';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';


const useStyles = makeStyles({
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
});
function NewShowRoom(props) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [allContacts, setAllContacts] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const { form, handleChange, setForm } = useForm(null);
  const [errors, setErrors] = useState({});
  const routeParams = useParams();

  useEffect(() => {
    const fetchDetails = async () => {
      setisLoading(true)
      const queryContacts = await firestore()
        .collection('contacts')
        .get();

      let resultContacts = [];
      queryContacts.forEach((doc) => resultContacts.push({ ...doc.data(), id: doc?.id }));
      if (routeParams.contactId !== 'new') {
        setForm(resultContacts?.filter((contact) => contact?.contactId === Number(routeParams?.contactId))?.[0])
      }
      setAllContacts(resultContacts);
      setisLoading(false)
    }
    fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    setOpen(false);
  };





  const isFormValid = () => {
    const errs = {};

    if (!form.style) {
      errs.style = 'Please enter contact style'
    }

    if (!form.brand) {
      errs.brand = 'Please enter contact brand'
    }

    if (!form.model) {
      errs.model = 'Please enter contact model'
    }

    if (!form.basecurve) {
      errs.basecurve = 'Please enter contact basecurve'
    }

    if (!form.price) {
      errs.price = 'Please enter price'
    }

    if (!form.packquantity) {
      errs.packquantity = 'Please enter pack quanity'
    }

    return errs;
  }

  const submitForm = async () => {
    if (routeParams.contactId === 'new') {
      setisLoading(true);
      await dispatch(await Actions.saveContact(form));
      props.history.push('/apps/e-commerce/contacts');
      setisLoading(false);
    } else {
      setisLoading(true);
      await dispatch(await Actions.updateContact(form));
      props.history.push('/apps/e-commerce/contacts');
      setisLoading(false);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const errs = isFormValid();
    setErrors(errs);

    if (Object.entries(errs).some((err) => err !== '')) {
      return
    }

    submitForm();
  }

  if (isLoading) {
    return <FuseLoading />;
  }


  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={(
        <div className='flex flex-row justify-center w-full'>
          <div className='flex flex-row justify-start w-1/4'>
            <Typography
              className="normal-case flex sm:mb-12"
              component={Link}
              role="button"
              to="/apps/e-commerce/contacts"
              color="inherit">
              <Icon className="text-20">
                {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
              </Icon>
              <span className="mx-4">Contacts</span>
            </Typography>
          </div>
          <div className='flex flex-row justify-center w-2/4'>
            <Typography
              className="text-16 sm:text-20 truncate text-center uppercase"
              style={{ fontWeight: 600 }}
              variant="h6">
              {form?.type ? form.type : 'New Contact Lens'}
            </Typography>
          </div>
          <div className='flex flex-row justify-start w-1/4'></div>
        </div>
      )}
      content={
        (
          <div className="flex flex-col h-260  px-16 py-6 gap-20">
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                  DETAIL
                </h1>
              </div>
              <div className="justify-center p-16 sm:p-24 ">
                <div>
                  <TextField
                    className="mt-8 mb-16"
                    required
                    id="contact-style"
                    name="style"
                    onChange={(e) => handleChange({
                      target: {
                        name: 'style',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    label="Style"
                    type="style"
                    value={form?.style}
                    variant="outlined"
                    error={errors.style}
                    helperText={errors.style}
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    required
                    id="contact-brand"
                    name="brand"
                    onChange={(e) => handleChange({
                      target: {
                        name: 'brand',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    label="Brand"
                    type="brand"
                    value={form?.brand}
                    variant="outlined"
                    error={errors.brand}
                    helperText={errors.brand}
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    required
                    id="contact-model"
                    name="model"
                    onChange={(e) => handleChange({
                      target: {
                        name: 'model',
                        value: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)
                      }
                    })}
                    label="Model"
                    type="model"
                    value={form?.model}
                    variant="outlined"
                    error={errors.model}
                    helperText={errors.model}
                    fullWidth
                  />
                  <TextField
                    className="mt-8 mb-16"
                    required
                    id="contact-basecurve"
                    name="basecurve"
                    onChange={handleChange}
                    label="Base Curve"
                    type="basecurve"
                    value={form?.basecurve}
                    variant="outlined"
                    error={errors.basecurve}
                    helperText={errors.basecurve}
                    fullWidth
                  />
                  <div className='mb-8'>
                    <CustomAutocomplete
                      list={allContacts}
                      form={form}
                      setForm={setForm}
                      handleChange={handleChange}
                      id="packquantity"
                      freeSolo={true}
                      label="Pack Quantity"
                    />
                  </div>
                  <TextField
                    className="mt-8 mb-16"
                    required
                    id="contacdt-price"
                    name="price"
                    onChange={handleChange}
                    label="Price"
                    type="price"
                    value={form?.price}
                    variant="outlined"
                    error={errors.price}
                    helperText={errors.price}
                    fullWidth
                  />
                </div>
              </div>
              <br></br>
            </div>
            <div className="flex flex-col" >
              <Button
                style={{
                  padding: '10px 32px'
                }}
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}>
                Save
              </Button>
            </div>
            {
              routeParams.contactId !== 'new' && (
                <div className="flex flex-col">
                  <ConfirmContactDelete open={open} handleClose={handleClose} form={form} propssent={props} />

                  <Button
                    style={{
                      color: 'red'
                    }}
                    variant="outlined"
                    // onClick={() => setShowModal(true)}
                    onClick={() => {
                      if (routeParams.contactId === 'new') {
                        alert('No Data to delete')
                      }
                      else {
                        setOpen(true);
                      }

                    }}
                  >
                    <Icon>delete</Icon>
                    DELETE
                  </Button>

                </div>
              )
            }
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(NewShowRoom);
