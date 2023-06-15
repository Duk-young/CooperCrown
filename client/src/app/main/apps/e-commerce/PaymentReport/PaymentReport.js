import { firestore } from 'firebase';
import { toast, Zoom } from 'react-toastify';
import { useForm } from '@fuse/hooks';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FusePageSimple from '@fuse/core/FusePageSimple';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment'
import Paper from '@material-ui/core/Paper';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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

const StyledDatePicker = withStyles((theme) => ({
    root: {
        '& label.Mui-focused': {
            color: 'white'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'yellow'
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'white'
            },
            '&:hover fieldset': {
                borderColor: 'white'
            },
            '&.Mui-focused fieldset': {
                borderColor: 'yellow'
            }
        }
    }
}))(TextField);

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        textAlign: 'center'
    },
    body: {
        fontSize: 14,
        padding: 10,
        color: theme.palette.common.black,
        textAlign: 'center'
    }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover
        },
        '&:hover': {
            backgroundColor: 'lightyellow !important'
        }
    }
}))(TableRow);

function PaymentReport(props) {
    const classes = useStyles(props);
    const [payments, setPayments] = useState([]);
    const [filteredPayments, setFilteredPayments] = useState([]);
    const { form, handleChange, setForm } = useForm({ locationName: 'ALL' });
    const [showrooms, setShowrooms] = useState([]);

    useEffect(() => {
        const fetchPaymentDetails = async () => {
            const queryOrderPayments = await firestore().collection('orderPayments').get();

            let resultAllPayments = [];
            queryOrderPayments.forEach((doc) => {
                resultAllPayments.push({ ...doc.data(), paymentType: 'order' });
            });

            const queryInsurancePayments = await firestore()
                .collection('insurancePayments')
                .get();

            queryInsurancePayments.forEach((doc) => {
                resultAllPayments.push({ ...doc.data(), paymentType: 'insurance' });
            });

            setPayments(resultAllPayments)
            setFilteredPayments(resultAllPayments)

            const queryShowrooms = await firestore().collection('showRooms').get();
            let showroomsData = [];
            queryShowrooms.forEach((doc) => {
                showroomsData.push(doc.data());
            });
            setShowrooms(showroomsData)
        };

        fetchPaymentDetails();
    }, []);

    const filterData = () => {
        let newPayments = payments
        if (form?.locationName !== 'ALL') {
            newPayments = newPayments.filter((payment) => payment?.locationName === form?.locationName)
        }
        if (form?.start || form?.end) {
            let start = form?.start ?? firestore.Timestamp.fromDate(new Date('01/01/2000'))
            let end = form?.end ?? firestore.Timestamp.fromDate(new Date())

            newPayments = newPayments.filter((payment) => payment?.paymentDate >= start && payment?.paymentDate <= end)
        }

        setFilteredPayments(newPayments)
    }

    const downloadExcel = (filteredPayments) => {
        if (filteredPayments?.length === 0) {
            toast.error('Nothing to download', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom
            });
            return;
        }
        const formattedArray = filteredPayments.map(obj => ({
            ...obj,
            dateString: obj.paymentDate.toDate().toLocaleDateString('en-US', {
              month: '2-digit',
              day: '2-digit',
              year: 'numeric',
            }),
          }));

        const columnIds = ['Payment Date', 'Order No', 'First Name', 'Last Name', 'Amount', 'Payment Method', 'Payment Type', 'Location']
        const columns = ['dateString', 'customOrderId', 'firstName', 'lastName', 'amount', 'paymentMode', 'paymentType', 'locationName']
        const header = columnIds.join('\t') + '\n';
        const rows = formattedArray.map(obj => columns.map(col => obj[col]).join('\t')).join('\n');
        const excelData = header + rows;

        const blob = new Blob([excelData], { type: 'application/vnd.ms-excel' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'Payment Report.xls';
        downloadLink.click();
    };


    return (
        <FusePageSimple
            content={
                <div className="flex flex-col w-full">
                    <div className={clsx(classes.header)}>
                        <div className='flex flex-col h-full w-full'>
                            <div className='flex flex-row w-full justify-center'>
                                <Typography
                                    className="flex uppercase"
                                    style={{ fontSize: '3rem', fontWeight: 600 }}
                                    variant="h6">
                                    PAYMENT REPORT
                                </Typography>
                            </div>
                            <div className='flex flex-row w-full pt-32 pb-16'>
                                <div className='flex flex-col items-center w-1/3'>
                                    <div className="date-picker w-full flex flex-row gap-10 pl-4 justify-around">
                                        <StyledDatePicker
                                            id="date"
                                            label="Start Date"
                                            type="date"
                                            variant="outlined"
                                            style={{ border: 'none' }}
                                            defaultValue={form?.start}
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { color: 'white' }
                                            }}
                                            InputProps={{
                                                inputProps: {
                                                    style: { color: 'white', fontSize: '10px' }
                                                }
                                            }}
                                            onChange={(e) => {
                                                handleChange({
                                                    target: {
                                                        name: 'start',
                                                        value: firestore.Timestamp.fromDate(
                                                            new Date(e.target.value)
                                                        )
                                                    }
                                                });
                                            }}
                                        />
                                        <StyledDatePicker
                                            id="date"
                                            label="End Date"
                                            type="date"
                                            style={{ border: 'none' }}
                                            defaultValue={form?.end}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: true,
                                                style: { color: 'white' }
                                            }}
                                            InputProps={{
                                                inputProps: {
                                                    style: { color: 'white', fontSize: '10px' }
                                                }
                                            }}
                                            onChange={(e) => {
                                                handleChange({
                                                    target: {
                                                        name: 'end',
                                                        value: firestore.Timestamp.fromDate(
                                                            new Date(e.target.value)
                                                        )
                                                    }
                                                });
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col items-center w-1/3'>
                                    <Paper
                                        className="flex items-center w-full px-8 py-4 rounded-8 bg-transparent border-1 border-white border-solid"
                                        elevation={1}>
                                        <Icon style={{ color: 'orange' }}>search</Icon>
                                        <Input
                                            placeholder="Search"
                                            className="flex flex-1 mx-8 min-h-40 bg-transparent text-white"
                                            disableUnderline
                                            fullWidth
                                            onChange={(e) => {
                                                const inputValue = e.target.value.toLowerCase()
                                                if (inputValue && inputValue !== '') {
                                                    let newPayments = []

                                                    payments.map((payment) => {
                                                        if ((payment?.customOrderId && payment?.customOrderId.includes(inputValue))
                                                            || (payment?.firstName && payment?.firstName.toLowerCase().includes(inputValue))
                                                            || (payment?.lastName && payment?.lastName.toLowerCase().includes(inputValue))
                                                            || (payment?.amount && payment?.amount.includes(inputValue))
                                                            || (payment?.paymentMode && payment?.paymentMode.toLowerCase().includes(inputValue)) 
                                                            || (payment?.paymentType && payment?.paymentType.toLowerCase().includes(inputValue))) {
                                                            newPayments.push(payment)
                                                        }
                                                        return true
                                                    })
                                                    setFilteredPayments(newPayments);
                                                    setForm('ALL')
                                                } else {
                                                    filterData()
                                                    setForm('ALL')
                                                }
                                            }}
                                            inputProps={{
                                                'aria-label': 'Search'
                                            }}
                                        />
                                    </Paper>
                                </div>
                                <div className='flex flex-row items-center justify-evenly w-1/3'>
                                    <div>
                                        <Button
                                            className={classes.button}
                                            style={{ width: '150px' }}
                                            onClick={() => filterData()}
                                            variant="contained"
                                            color="secondary">
                                            Filter
                                        </Button>
                                    </div>
                                    <div className='pl-4'>
                                        <Button
                                            className={classes.button}
                                            style={{ width: '150px' }}
                                            onClick={() => downloadExcel(filteredPayments)}
                                            variant="contained"
                                            color="primary">
                                            Download
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-row w-full justify-between p-16 items-center'>
                        <div className='flex flex-row w-3/4'>
                            <TextField
                                style={{ width: '100px' }}
                                label="Cash Total"
                                variant="outlined"
                                size="small"
                                className="px-12"
                                value={`$ ${filteredPayments.reduce((accumulator, currentValue) => {
                                    if (currentValue?.paymentMode === 'Cash') {
                                        return accumulator + +currentValue?.amount;
                                    } else {
                                        return accumulator;
                                    }
                                }, 0)}`}
                            />
                            <TextField
                                style={{ width: '100px' }}
                                label="Credit Total"
                                variant="outlined"
                                size="small"
                                className="px-12"
                                value={`$ ${filteredPayments.reduce((accumulator, currentValue) => {
                                    if (currentValue?.paymentMode === 'Credit Card') {
                                        return accumulator + +currentValue?.amount;
                                    } else {
                                        return accumulator;
                                    }
                                }, 0)}`}
                            />
                            <TextField
                                style={{ width: '100px' }}
                                label="Check Total"
                                variant="outlined"
                                size="small"
                                className="px-12"
                                value={`$ ${filteredPayments.reduce((accumulator, currentValue) => {
                                    if (currentValue?.paymentMode === 'Cheque') {
                                        return accumulator + +currentValue?.amount;
                                    } else {
                                        return accumulator;
                                    }
                                }, 0)}`}
                            />
                            <TextField
                                style={{ width: '100px' }}
                                label="Insurance Total"
                                variant="outlined"
                                size="small"
                                className="px-12"
                                value={`$ ${filteredPayments.reduce((accumulator, currentValue) => {
                                    if (currentValue?.paymentType === 'insurance') {
                                        return accumulator + +currentValue?.amount;
                                    } else {
                                        return accumulator;
                                    }
                                }, 0)}`}
                            />
                            <TextField
                                style={{ width: '100px' }}
                                label="Gift Total"
                                variant="outlined"
                                size="small"
                                className="px-12"
                                value={`$ ${filteredPayments.reduce((accumulator, currentValue) => {
                                    if (currentValue?.paymentMode === 'Store Credit / Gift Card') {
                                        return accumulator + +currentValue?.amount;
                                    } else {
                                        return accumulator;
                                    }
                                }, 0)}`}
                            />
                        </div>
                        <FormControl className='w-1/4'>
                            <FormHelperText>Select Location</FormHelperText>
                            <Select
                                value={form?.locationName ?? ''}
                                name="locationName"
                                onChange={handleChange}
                                autoWidth>
                                <MenuItem key={'ALL'} value={'ALL'}>{'ALL'}</MenuItem>
                                {showrooms.map((row, index) => (<MenuItem key={index} value={row?.locationName}>{row?.locationName}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <Table stickyHeader aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>PAYMENT DATE</StyledTableCell>
                                <StyledTableCell>ORDER NO</StyledTableCell>
                                <StyledTableCell>NAME</StyledTableCell>
                                <StyledTableCell>AMOUNT</StyledTableCell>
                                <StyledTableCell>METHOD</StyledTableCell>
                                <StyledTableCell>TYPE</StyledTableCell>
                                <StyledTableCell>LOCATION</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredPayments.sort((a, b) => (a.paymentDate < b.paymentDate ? -1 : 1)).map((hit, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{moment(hit?.paymentDate.toDate()).format('MM/DD/YYYY')}</StyledTableCell>
                                    <StyledTableCell>{hit?.customOrderId}</StyledTableCell>
                                    <StyledTableCell>{`${hit?.firstName ?? ''} ${hit?.lastName ?? ''}`}</StyledTableCell>
                                    <StyledTableCell>{`$ ${Number(hit?.amount).toLocaleString()}`}</StyledTableCell>
                                    <StyledTableCell>{hit?.paymentMode}</StyledTableCell>
                                    <StyledTableCell>{hit?.paymentType === 'order' ? "Order" : 'Insurance'}</StyledTableCell>
                                    <StyledTableCell>{hit?.locationName}</StyledTableCell>
                                    <StyledTableCell>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            }
            innerScroll
        />
    );
}

export default withReducer('eCommerceApp', reducer)(PaymentReport);
