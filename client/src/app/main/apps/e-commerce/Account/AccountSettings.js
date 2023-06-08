import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import reducer from '../store/reducers';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles((theme) => ({
  header: {
    minHeight: 160,
    background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
    color: theme.palette.primary.contrastText,
    backgroundSize: 'cover',
    backgroundColor: theme.palette.primary.dark
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
}));

function AccountSettings(props) {

  const dispatch = useDispatch();
  const routeParams = useParams();
  const classes = useStyles(props);
  const [isLoading, setisLoading] = useState(false);
  const [showrooms, setShowrooms] = useState(false);
  const { form, handleChange, setForm } = useForm(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setisLoading(true)

      const queryUser = (await firestore().collection('users').doc(routeParams?.uid).get()).data()
      setForm(queryUser)

      let showroomData = [];
      const queryShowrooms = await firestore()
        .collection('showRooms')
        .get();

      queryShowrooms.forEach((doc) => {
        showroomData.push(doc.data());
      });
      setShowrooms(showroomData);

      setisLoading(false);
    }
    fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async () => {
    setisLoading(true)
    await firestore().collection('users').doc(routeParams?.uid).update(form)
    dispatch(MessageActions.showMessage({ message: 'User updated successfully' }));
    setisLoading(false)
  }

  if (isLoading) return <FuseLoading />

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        form && (
          <div className="flex flex-col w-full">
            <div className={clsx(classes.header)}>
              <div className="flex flex-col p-4 w-full justify-center items-center">
                <Typography
                  className="hidden sm:flex mx-0 sm:mx-12 uppercase"
                  style={{ fontSize: '3rem', fontWeight: 600 }}
                  variant="h6">
                  ACCOUNTS SETTING
                </Typography>
                <Typography
                  className="hidden sm:flex mx-0 sm:mx-12"
                  style={{ fontSize: '1.5rem', fontWeight: 600 }}
                  variant="h6">
                  {form?.email ?? ''}
                </Typography>
              </div>
              <div className="flex pl-8 items-center">
                <div className="flex flex-col w-1/3"></div>
                <div className="flex flex-col w-1/3"></div>
                <div className="flex flex-row w-1/3 justify-end mr-16 items-center">
                  <div>
                    <Button
                      className={classes.button}
                      onClick={onSubmit}
                      variant="contained"
                      color="secondary">
                      <span className="hidden sm:flex">SAVE DETAILS</span>
                      <span className="flex sm:hidden">SAVE</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      content={
        form && (
          <div className="p-16 sm:p-24 ">
            <div className="flex flex-col h-260  px-16 py-6">

              <div>
                <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                  <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                      ACCOUNT INFO
                    </h1>
                  </div>
                  <div>
                    <div className="flex flex-col justify-center p-16 sm:p-24 ">
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          required
                          label="Showroom"
                          id="showroom"
                          disabled
                          type="text"
                          value={(showrooms?.length > 0 && showrooms.find(room => room.showRoomId === form?.showRoomId)?.locationName) ?? ''}
                          variant="outlined"
                        />
                        <TextField
                          className="w-1/2"
                          required
                          label="State"
                          id="user-State"
                          name="State"
                          type="text"
                          value={form?.State ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          required
                          label="First Name"
                          id="user-fname"
                          name="fname"
                          type="text"
                          value={form?.fname ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullwidth
                        />
                        <TextField
                          className="w-1/2"
                          required
                          label="Last Name"
                          id="user-lname"
                          name="lname"
                          type="text"
                          value={form?.lname ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullwidth
                        />
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          required
                          id="user-address"
                          name="address"
                          onChange={handleChange}
                          label="Address"
                          type="address"
                          value={form?.address ?? ''}
                          variant="outlined"
                          fullwidth
                        />
                        <TextField
                          className="w-1/2"
                          required
                          label="City"
                          id="user-city"
                          name="city"
                          type="text"
                          value={form?.city ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                          fullwidth
                        />
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <div className="flex flex-row flex-wrap w-1/2">
                          <TextField
                            id="date"
                            required
                            label="Date Of Birth"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={form?.dob ?? ''}
                            variant='outlined'
                            fullWidth
                            onChange={(e) => {
                              handleChange({
                                target: {
                                  name: 'dob',
                                  value: e.target.value
                                }
                              });
                            }}
                          />
                        </div>
                        <FormControl className="w-1/2">
                          <FormHelperText>Gender</FormHelperText>
                          <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="user-Gender"
                            value={form?.Gender ?? ''}
                            name="Gender"
                            onChange={handleChange}
                            autoWidth>
                            <MenuItem value={'Male'}>Male</MenuItem>
                            <MenuItem value={'Female'}>Female</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          required
                          label="Phone 1"
                          id="user-phone1"
                          name="phone1"
                          type="phone"
                          value={form?.phone1 ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                        />
                        <TextField
                          className="w-1/2"
                          required
                          label="Zip Code"
                          id="user-zipcode"
                          name="zipcode"
                          type="Number"
                          value={form?.zipcode ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </div>
                      <div className="flex flex-row p-6 mb-16 gap-10">
                        <TextField
                          className="w-1/2"
                          label="Phone 2"
                          id="user-phone2"
                          name="phone2"
                          type="phone"
                          value={form?.phone2 ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                        />
                        <TextField
                          className="w-1/2"
                          label="Other"
                          id="user-other"
                          name="other"
                          type="text"
                          value={form?.other ?? ''}
                          onChange={handleChange}
                          variant="outlined"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(AccountSettings);
