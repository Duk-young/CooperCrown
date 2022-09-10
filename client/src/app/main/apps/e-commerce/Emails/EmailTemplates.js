import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import emailjs from 'emailjs-com';
import {makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import EmailFilters from './EmailFilters';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import React, { useState, useEffect } from 'react';
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
function EmailTemplates(props) {
  const { form, handleChange, setForm } = useForm(null);
  const [disabledState, setDisabledState] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const classes = useStyles();

  const sendEventEmail = async () => {
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
  const handleClose = () => {
    setOpen(false);
  };
  const onSubmit = async () => {
    await firestore()
      .collection('emailTemplates')
      .doc('emailTemplates')
      .update({ templates: form });

    dispatch(
      MessageActions.showMessage({
        message: 'Templates Updated Successfully!'
      })
    );
  };

  return (
    <FusePageCarded
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex items-center">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Icon className="text-32">people</Icon>
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="hidden sm:flex mx-0 sm:mx-12" variant="h6">
                Email Templates
              </Typography>
            </FuseAnimate>
            
          </div>
          {/* <FuseAnimate animation="transition.slideRightIn" delay={300}>
              
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
                </FuseAnimate> */}
        </div>
              //   disabled={!canBeSubmitted()}
              //   onClick={async () => {
              //     if (routeParams.discountId === 'new') {
              //       setisLoading(false);
              //       await dispatch(await Actions.saveDiscount(form));
              //       setisLoading(true);
              //     } else {
              //       setisLoading(false);
              //       await dispatch(await Actions.updateDiscount(form));
              //       setisLoading(true);
              //     }
              //   }}>
              //   Save
              // </Button>
           
      }
      content={
        form && (
          <div className="flex flex-col w-full p-12">
            
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
     <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            Welcome Message
            </h1>

            </div>
            <TextField
              className="pb-12"
              disabled={disabledState}
              id="newCustomer"
              type="text"
              name="newCustomer"
              value={form?.newCustomer}
              onChange={handleChange}
              multiline
              rows={8}
              variant="outlined"
              fullWidth
            />
            </div>
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            Exam Expiration Reminder
            </h1>
            </div>
            <TextField
              className="pb-12 "
              disabled={disabledState}
              id="examExpiry"
              type="text"
              name="examExpiry"
              value={form?.examExpiry}
              onChange={handleChange}
              multiline
              rows={8}
              fullWidth
            />
            </div>

            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            Birthday Message
            </h1>
            </div>
            <TextField
              className="pb-12"
              disabled={disabledState}
              id="birthday"
              type="text"
              name="birthday"
              value={form?.birthday}
              onChange={handleChange}
              multiline
              rows={8}             
              fullWidth
            />
            </div>
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            Terms & Conditions
            </h1>
            </div>
            <TextField
              className="pb-12"
              disabled={disabledState}
              id="terms"
             
              type="text"
              name="terms"
              value={form?.terms}
              onChange={handleChange}
              multiline
              rows={12}
              variant="outlined"
              fullWidth
            />
</div>
<div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <div className='justify-left'>
            {/* <EmailFilters open={open} handleClose={handleClose} /> */}

            
          <Fab
            onClick={() => {
             props.history.push('/apps/e-commerce/emailtemplates/filter')
            }}
            variant="extended"
            color="primary"
            aria-label="add">
            check
          </Fab>
        
            </div>
            <h1 className="font-700" style={{ color: '#f15a25' }}>
            Sale/Event Message
            </h1>
            </div>
            <TextField
              className="pb-12"
              disabled={disabledState}
              id="specialMessage"
             
              type="text"
              name="specialMessage"
              value={form?.specialMessage}
              onChange={handleChange}
              multiline
              rows={8}
              fullWidth
            />
            </div>
            <div className="flex flex-row w-full ">
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
            </div>
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(EmailTemplates);
