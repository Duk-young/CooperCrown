import { firestore } from 'firebase';
import { toast, Zoom } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useForm } from '@fuse/hooks';
import { useParams } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import Button from '@material-ui/core/Button';
import DateFnsUtils from '@date-io/date-fns';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseLoading from '@fuse/core/FuseLoading';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker
} from '@material-ui/pickers';
import { sortAlphabetically } from '../ReusableComponents/HelperFunctions';

const EditAppointments = (props) => {
    const dispatch = useDispatch();
    const routeParams = useParams();
    const [customer, setCustomer] = useState({});
    const [showRooms, setShowRooms] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [appointments, setAppointments] = useState([]);
    const { form, handleChange, setForm } = useForm(null);

    function formatPhoneNumber(phoneNumberString) {
        var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            var intlCode = match[1] ? '+1 ' : '';
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
        }
        return phoneNumberString;
    }

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
            <div className="flex flex-row p-16 sm:p-24 w-full">
                <div className="p-8 w-1/3 h-auto border-grey-400 border-solid border-1">
                    <h1 className="underline font-700">Patient Details</h1>
                    <h2>{`Customer Id: ${customer.customerId}`}</h2>
                    <h2>{`Name: ${customer?.firstName} ${customer.lastName} `}</h2>
                    <h2>{`Address: ${customer.address}, ${customer.state}, ${customer.zipCode}`}</h2>
                    <h2>{`Phone: ${formatPhoneNumber(customer.phone1)}`}</h2>
                    <h2>{`Email: ${customer.email}`}</h2>
                    <h2>{`DOB: ${customer.dob.toDateString()}`}</h2>
                    <h2>{`Sex: ${customer.gender}`}</h2>
                </div>
                <div className="p-8 w-2/3 h-auto relative">
                    <h1>Appointment Details</h1>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justifyContent="space-around">
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
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <div className="flex flex-col w-full">
                        <div className="flex flex-row justify-around p-12">
                            <FormControl>
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
                                <FormHelperText>Select duration from the list</FormHelperText>
                            </FormControl>
                            <FormControl>
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
                                <FormHelperText>Select doctor from the list</FormHelperText>
                            </FormControl>
                        </div>
                        <div className="flex flex-row justify-center">
                            <FormControl>
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
                                <FormHelperText>Select showroom from the list</FormHelperText>
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
            {/* <FuseAnimate animation="transition.slideRightIn" delay={300}> */}
            <Button
                className="whitespace-no-wrap normal-case"
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
            {/* </FuseAnimate> */}
        </div>
    );
};

export default withRouter(EditAppointments);
