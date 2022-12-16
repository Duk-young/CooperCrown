import { firestore } from 'firebase';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import emailjs from 'emailjs-com';
import { makeStyles } from '@material-ui/core/styles';
import FuseAnimate from '@fuse/core/FuseAnimate';
import EmailFilters from './EmailFilters';
import FusePageCarded from '@fuse/core/FusePageCarded';
import FilterListIcon from '@material-ui/icons/FilterList';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { useDispatch, useSelector } from 'react-redux';
import { validateAgeRange, uniqueElements } from './helper'


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

function EmailTemplates(props) {
  const { form, handleChange, setForm } = useForm(null);
  const [disabledState, setDisabledState] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openFilters, setOpenFilters] = useState(false)

  const dispatch = useDispatch();
  const classes = useStyles();

  const selectedFilters = useSelector(
    ({ eCommerceApp }) => eCommerceApp.emails.selectedFilters
  );

  const handleFilter = () => {
    let modifiedCustomers = [];
    let isFilterFilled = false

    {/*
      * Update Filter to include filter by Order & Showroom
    */}


    if (selectedFilters.ageRange && selectedFilters.ageRange.length !== 0) {
      isFilterFilled = true

      const data = validateAgeRange(selectedFilters, customers);

      modifiedCustomers = [...modifiedCustomers, ...data]
    }

    if (selectedFilters.stateAddress && selectedFilters.stateAddress.length !== 0) {
      isFilterFilled = true
      selectedFilters.stateAddress.forEach(filter => {
        let filteredCustomers = customers.filter(customer => filter.includes(customer?.state))
        modifiedCustomers = [...modifiedCustomers, ...filteredCustomers]
      });
    }

    if (selectedFilters.gender && selectedFilters.gender.length !== 0) {
      isFilterFilled = true
      selectedFilters.gender.forEach(filter => {
        let filteredCustomers = customers.filter(customer => customer?.gender == filter)
        modifiedCustomers = [...modifiedCustomers, ...filteredCustomers]
      });
    }

    if (selectedFilters.ethnicity && selectedFilters.ethnicity.length !== 0) {
      isFilterFilled = true
      selectedFilters.ethnicity.forEach(filter => {
        let filteredCustomers = customers.filter(customer => customer?.ethnicity === filter)
        modifiedCustomers = [...modifiedCustomers, ...filteredCustomers]
      });
    }

    if (selectedFilters.zipCode && selectedFilters.zipCode !== "") {
      isFilterFilled = true
      let filteredCustomers = customers.filter(customer => customer?.zipCode === selectedFilters.zipCode)
      modifiedCustomers = [...modifiedCustomers, ...filteredCustomers]
    }

    return { modifiedCustomers, isFilterFilled };
  }

  const sendNotificationEmail = (customers) => {
    customers.map((row) => {
      if (row?.email) {
        emailjs
          .send(
            'service_yul7h3c',
            'template_k68omtc',
            {
              name: `${row?.firstName} ${row?.lastName}`,
              from_name: 'Cooper Crown',
              message: form?.specialMessage,
              receiver: row?.email
            },
            'bYFxhbkbmnFQsUvjC'
          )
          .then((error) => {
            console.log(error);
          });
      }
      return null;
    });
    dispatch(
      MessageActions.showMessage({
        message: 'Emails Sent Successfully!'
      })
    );
  }

  const sendEventEmail = async () => {
    const { modifiedCustomers, isFilterFilled } = handleFilter();
    const uniqueCustomers = uniqueElements(modifiedCustomers);

    if (isFilterFilled) {
      return dispatch(
        MessageActions.showMessage({
          message: 'No Data Returned for Filtered Options'
        })
      );
    } else if (!isFilterFilled) {
      return sendNotificationEmail(customers)
    } else {
      return sendNotificationEmail(uniqueCustomers)
    }
  };

  useEffect(() => {
    const fetchTemplates = async () => {
      const queryTemplates = (
        await firestore()
          .collection('emailTemplates')
          .doc('emailTemplates')
          .get()
      ).data();
      setForm(queryTemplates.templates);
      const queryCustomers = await firestore().collection('customers').get();
      let resultCustomers = [];
      queryCustomers.forEach((doc) => {
        resultCustomers.push(doc.data());
      });
      setCustomers(resultCustomers);
    };
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // const handleClose = () => {
  //   setOpen(false);
  // };
  // const onSubmit = async () => {
  //   await firestore()
  //     .collection('emailTemplates')
  //     .doc('emailTemplates')
  //     .update({ templates: form });

  //   dispatch(
  //     MessageActions.showMessage({
  //       message: 'Templates Updated Successfully!'
  //     })
  //   );
  // };

  return (
    <FusePageCarded
      header={
        <>
          <div className="flex flex-col w-full items-center  sm:px-18 justify-start">
            <div className="flex-1 items-center">
              <h3 className=" hidden font-700 ">H</h3>
            </div>
            <div className='flex w-full flex-1 items-center justify-start '>
              <div className="flex-1 items-center">
                <h3 className=" hidden font-700 ">H</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-center">
            <div className="flex items-center">
              <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                <Typography className="hidden sm:flex mx-0 sm:mx-12 font-500 text-center" variant="h4">
                  EMAIL TEMPLATE
                </Typography>
              </FuseAnimate>
            </div>
            <div className="flex flex-1 flex-row items-center justify-center pb-10">
              <h3 className=" hidden font-700 ">Hidden</h3>
            </div>
          </div>
          <div className="flex flex-col w-full items-center justify-end pr-20">
            <div className="flex-1 pl-30 items-center">
              <h3 className="ml-40 hidden font-700 ">Hidden</h3>
            </div>
            <div className='flex w-full flex-1 items-center justify-end pr-20 pb-10'>
              <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    disabledState ? setDisabledState(false) : setDisabledState(true)
                  }}
                >
                  {disabledState
                    ? (<span className="sm:flex">edit</span>)
                    : (<span className="sm:flex">save</span>)}
                </Button>
              </FuseAnimate>
            </div>
          </div>
        </>
      }
      content={
        form && (
          <div className="flex flex-col w-full p-12 gap-12">

            {/* <div className="flex flex-row pr-40 justify-end">
                {disabledState && (
                  <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                    onClick={() => {
                      setDisabledState(false);
                    }}
                    >
                    Edit
                  </Button>
                )}
                <br></br>
              </div> */}
            <div className="flex flex-col h-full pt-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                  Welcome Message
                </h1>

              </div>
              <TextField
                // className="border-0"
                disabled={disabledState}
                id="newCustomer"
                type="text"
                name="newCustomer"
                value={form?.newCustomer}
                onChange={handleChange}
                multiline
                rows={8}
                variant="standard"
                style={{ padding: '18.5px 14px' }}
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
              />
            </div>
            <div className="flex flex-col h-full pt-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                  Exam Expiration Reminder
                </h1>
              </div>
              <TextField
                // className="pb-12"
                disabled={disabledState}
                id="examExpiry"
                type="text"
                name="examExpiry"
                value={form?.examExpiry}
                onChange={handleChange}
                multiline
                rows={8}
                variant="standard"
                style={{ padding: '18.5px 14px' }}
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
              />
            </div>

            <div className="flex flex-col h-full pt-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                  Birthday Message
                </h1>
              </div>
              <TextField
                // className="pb-12"
                disabled={disabledState}
                id="birthday"
                type="text"
                name="birthday"
                value={form?.birthday}
                onChange={handleChange}
                multiline
                rows={8}
                variant="standard"
                style={{ padding: '18.5px 14px' }}
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
              />
            </div>
            <div className="flex flex-col h-full pt-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h1 className="font-700" style={{ color: '#f15a25' }}>
                  Terms & Conditions
                </h1>
              </div>
              <TextField
                // className="pb-12"
                disabled={disabledState}
                id="terms"
                type="text"
                name="terms"
                value={form?.terms}
                onChange={handleChange}
                multiline
                rows={12}
                variant="standard"
                style={{ padding: '18.5px 14px' }}
                InputProps={{
                  disableUnderline: true,
                }}
                fullWidth
              />
            </div>
            <div className="flex flex-col h-full pt-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row items-center border-b-1 border-black border-solid">
                <div className='justify-left relative left-20'>
                  {/* <EmailFilters open={open} handleClose={handleClose} /> */}
                  <Button
                    color="primary"
                    style={{ color: '#f15a25' }}
                    onClick={() => setOpenFilters(true)}>
                    <FilterListIcon /> {' '}
                    <p style={{ marginLeft: '5px' }}>FILTER</p>
                  </Button>
                  <EmailFilters open={openFilters} handleClose={() => setOpenFilters(false)} />
                </div>
                <h1 className="font-700 flex-1 text-center" style={{ color: '#f15a25', marginRight: '75px' }}>
                  Sale/Event Message
                </h1>
              </div>
              <TextField
                // className="pb-12"
                disabled={disabledState}
                id="specialMessage"
                type="text"
                name="specialMessage"
                value={form?.specialMessage}
                onChange={handleChange}
                multiline
                rows={8}
                // variant="outlined"
                fullWidth
                variant="standard"
                style={{ padding: '18.5px 14px' }}
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <div className='p-10'>
                <Button
                  disabled={!disabledState}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  fullWidth
                  style={{ padding: '2rem 1rem' }}
                  onClick={sendEventEmail}>
                  <p style={{ marginLeft: '5px' }}>Send Email</p>
                </Button>

              </div>
            </div>
            {/* <div className="flex flex-row w-full ">
              <div className="flex flex-row w-2/3 justify-around"></div>
              <div className="flex flex-row w-1/3 justify-around">
                {disabledState && (
                  <Fab
                    className="ml-20"
                    onClick={() => {
                      setDisabledState(false);
                    }}
                    color="secondary">
                    <Icon>edit</Icon>
                  </Fab>
                )}
                {!disabledState && (
                  <Fab
                    className="ml-20"
                    onClick={() => {
                      onSubmit();
                      setDisabledState(true);
                    }}
                    color="secondary">
                    <Icon>save</Icon>
                  </Fab>
                )}
                {disabledState && (
                  <Button
                    className="ml-20"
                    onClick={sendEventEmail}
                    variant="contained"
                    color="secondary">
                    Send Event Email
                  </Button>
                )}
              </div>
            </div> */}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(EmailTemplates);
