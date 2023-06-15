import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
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

function EmailTemplates() {

  const classes = useStyles();
  const { form, handleChange, setForm } = useForm(null);
  const [disabledState, setDisabledState] = useState(true);

  useEffect(() => {
    const fetchTemplates = async () => {
      const queryTemplates = (
        await firestore()
          .collection('emailTemplates')
          .doc('emailTemplates')
          .get()
      ).data();
      setForm(queryTemplates.templates);
    };
    fetchTemplates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
 

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
            </div>
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(EmailTemplates);
