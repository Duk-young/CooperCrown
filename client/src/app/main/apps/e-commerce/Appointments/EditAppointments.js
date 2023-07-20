import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { sortAlphabetically } from '../ReusableComponents/HelperFunctions';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import CustomerInfo from './CustomerInfo';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseLoading from '@fuse/core/FuseLoading';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    orangeButton: {
        backgroundColor: '#f15a25',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#f47b51',
            color: '#fff'
        }
    }
});

const EditAppointments = (props) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [customer, setCustomer] = useState({});
    const [showRooms, setShowRooms] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const { form, handleChange, setForm } = useForm(null);


    useEffect(() => {
        setisLoading(true);
        const id = routeParams.appointmentId;
        const fetchDetails = async () => {

            let appointment = (await firestore().collection('appointments').doc(id).get()).data()
            appointment.start = appointment.start.toDate()
            appointment.end = appointment.end.toDate()
            setForm(appointment)

            const queryCustomer = await firestore().collection('customers').where('customerId', '==', Number(appointment?.customerId)).limit(1).get();

            let resultCustomer = queryCustomer.docs[0].data();
            resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
            resultCustomer.id = queryCustomer.docs[0].id;
            setCustomer(resultCustomer);

            const queryAppointments = await firestore().collection('appointments').get();

            let resultAppointments = [];
            queryAppointments.forEach((doc) => {
                resultAppointments.push(doc.data());
            });

            setAppointments(resultAppointments);

            let showroomdata = [];
            const queryShowrooms = await firestore().collection('showRooms').get();

            queryShowrooms.forEach((doc) => {
                showroomdata.push(doc.data());
            });
            setShowRooms(showroomdata);

            const queryDoctors = await firestore().collection('doctors').get();
            let doctorsData = [];
            queryDoctors.forEach((doc) => {
                doctorsData.push(doc.data());
            });

            doctorsData = sortAlphabetically(doctorsData, 'fullName')
            setDoctors(doctorsData.filter((obj) => { return obj.showrooms?.some((showroom) => showroom.showRoomId === appointment?.showRoomId) }))
            setisLoading(false);
        };
        fetchDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [routeParams.appointmentId]);

    if (isLoading) return <FuseLoading />;

    const onSubmit = async () => {
        setisLoading(true);

        try {
            const dbConfig = (await firestore().collection('dbConfig').doc('dbConfig').get()).data();

            await firestore().collection('appointments').doc(routeParams.appointmentId).update({
                start: firestore.Timestamp.fromDate(form?.start),
                end: firestore.Timestamp.fromDate(
                    moment(form?.start).add(form?.duration, 'm').toDate()
                ),
                duration: form?.duration,
                medicalHistory: customer?.medicalHistory ?? '',
                doctorId: form?.doctorId,
                doctorName: doctors?.filter((doc) => doc?.doctorId === form?.doctorId)?.[0]?.fullName || ''
            })

            await firestore().collection('customers').doc(customer?.id).update({
                medicalHistory: customer?.medicalHistory ?? '',
                recentUpdated: dbConfig?.recentUpdated + 1
            });

            await firestore().collection('dbConfig').doc('dbConfig').update({ recentUpdated: dbConfig?.recentUpdated + 1 });

            dispatch(MessageActions.showMessage({ message: 'Appointment updated Successfully' }));

            props.history.push('/apps/calendar');
        } catch (error) {
            console.log(error);
        }
        setisLoading(false);
    };

    return !customer ? (
        <></>
    ) : (
        <div className="flex flex-col w-full">
            <div className="flex flex-col w-full">
                <div className="flex flex-row p-16 sm:p-24 w-full gap-10">
                    <div className='w-1/2'>
                        <CustomerInfo customer={customer} />
                    </div>
                    <div className="w-1/2 h-auto relative">
                        <div className="w-full border-1 border-black border-solid rounded-6">
                            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                                <h1 className="font-700 truncate" style={{ color: '#f15a25' }}>
                                    APPOINTMENT DETAILS
                                </h1>
                            </div>
                            <div className='flex flex-col w-full gap-10 p-16 mb-6'>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        margin="none"
                                        id="date-picker-dialog"
                                        label="Select Date"
                                        format="MM/dd/yyyy"
                                        value={form?.start}
                                        onChange={(date) => {
                                            handleChange({
                                                target: { name: 'start', value: date }
                                            });
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date'
                                        }}
                                    />
                                    <KeyboardTimePicker
                                        margin="none"
                                        id="time-picker"
                                        label="Select Start Time"
                                        minutesStep={15}
                                        value={form?.start}
                                        onChange={(date) => {
                                            handleChange({
                                                target: { name: 'start', value: date }
                                            });
                                        }}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change time'
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                                <FormControl>
                                    <FormHelperText>Select duration from the list</FormHelperText>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="ethnicityId"
                                        defaultValue={form?.duration}
                                        value={form?.duration}
                                        name="duration"
                                        onChange={handleChange}
                                        autoWidth>
                                        <MenuItem value={15}>15 Minutes</MenuItem>
                                        <MenuItem value={30}>30 Minutes</MenuItem>
                                        <MenuItem value={45}>45 Minutes</MenuItem>
                                        <MenuItem value={60}>One Hour</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormHelperText>Select doctor from the list</FormHelperText>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="doctorId"
                                        value={form?.doctorId}
                                        name="doctorId"
                                        onChange={handleChange}
                                        autoWidth>
                                        {doctors.map((row) => (
                                            <MenuItem value={row?.doctorId}>
                                                {row?.fullName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl>
                                    <FormHelperText>Select showroom from the list</FormHelperText>
                                    <Select
                                        labelId="demo-simple-select-autowidth-label"
                                        id="showRoomId"
                                        disabled
                                        defaultValue={form?.showRoomId}
                                        value={form?.showRoomId}
                                        name="showRoomId"
                                        onChange={handleChange}
                                        autoWidth>
                                        {showRooms.map((row) => (
                                            <MenuItem value={row?.showRoomId}>
                                                {row?.locationName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row  w-full">
                    <div className="p-8 w-full h-auto relative">
                        <TextField
                            className="p-10"
                            fullWidth
                            id="outlined-multiline-static"
                            label="Medical History"
                            multiline
                            rows={15}
                            value={customer?.medicalHistory}
                            onChange={(e) => {
                                setCustomer({
                                    ...customer,
                                    medicalHistory: e.target.value
                                });
                            }}
                            name={'medicalHistory'}
                            variant="outlined"
                        />
                    </div>
                </div>
                <div className='flex flex-col w-full p-16'>
                    <Button
                        className={classes.orangeButton}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                            if (form?.showRoomId && form?.duration) {
                                let start = firestore.Timestamp.fromDate(form?.start);
                                let end = firestore.Timestamp.fromDate(
                                    moment(form?.start).add(form?.duration, 'm').toDate()
                                );
                                let count = 0;
                                appointments
                                    .filter((word) => word.showRoomId === form?.showRoomId && word?.appointmentId !== form?.appointmentId)
                                    .map((row) => {
                                        if (
                                            (start >= row?.start && start < row?.end) ||
                                            (end > row?.start && end <= row?.end) ||
                                            (row?.start >= start && row?.start < end) ||
                                            (row?.end > start && row?.end <= end)
                                        ) {
                                            count++;
                                        }
                                        return null;
                                    });
                                if (count > 0) {
                                    toast.error('Selected slot is unavailable!', {
                                        position: 'top-center',
                                        autoClose: 5000,
                                        hideProgressBar: false,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        transition: Zoom
                                    });
                                } else {
                                    onSubmit();
                                }
                            } else {
                                toast.error('Showroom and duration are mandatory fields', {
                                    position: 'top-center',
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    transition: Zoom
                                });
                            }
                        }}>
                        Save Details
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default withRouter(EditAppointments);
