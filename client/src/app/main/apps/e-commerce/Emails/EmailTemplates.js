import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import emailjs from 'emailjs-com';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

function EmailTemplates() {
  const { form, handleChange, setForm } = useForm(null);
  const [disabledState, setDisabledState] = useState(true);
  const [customers, setCustomers] = useState([]);
  const dispatch = useDispatch();

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
  }, []);

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
        </div>
      }
      content={
        form && (
          <div className="flex flex-col w-full p-12">
            <TextField
              className="pb-12"
              disabled={disabledState}
              id="birthday"
              label="Birthday Message"
              type="text"
              name="birthday"
              value={form?.birthday}
              onChange={handleChange}
              multiline
              rows={8}
              variant="outlined"
              fullWidth
            />

            <TextField
              className="pb-12"
              disabled={disabledState}
              id="specialMessage"
              label="Special Sale/Event Message"
              type="text"
              name="specialMessage"
              value={form?.specialMessage}
              onChange={handleChange}
              multiline
              rows={8}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="pb-12 "
              disabled={disabledState}
              id="examExpiry"
              label="Exam Expiration Reminder"
              type="text"
              name="examExpiry"
              value={form?.examExpiry}
              onChange={handleChange}
              multiline
              rows={8}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="pb-12"
              disabled={disabledState}
              id="newCustomer"
              label="New Customer Welcome Email"
              type="text"
              name="newCustomer"
              value={form?.newCustomer}
              onChange={handleChange}
              multiline
              rows={8}
              variant="outlined"
              fullWidth
            />
            <TextField
              className="pb-12"
              disabled={disabledState}
              id="terms"
              label="Terms & Conditions"
              type="text"
              name="terms"
              value={form?.terms}
              onChange={handleChange}
              multiline
              rows={12}
              variant="outlined"
              fullWidth
            />

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
