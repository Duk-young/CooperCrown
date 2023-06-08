
import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { toast, Zoom } from 'react-toastify';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FuseLoading from '@fuse/core/FuseLoading';
import MenuItem from '@material-ui/core/MenuItem';
import React, { useEffect, useState } from 'react';
import reducer from '../../dashboards/project/store/reducers';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import withReducer from 'app/store/withReducer';

const useStyles = makeStyles({
    flexGrow: {
        flex: '1'
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

const CustomData = (props) => {

    const { orders, customers, showrooms, exams } = props;
    const [isLoading, setisLoading] = useState(false);
    const classes = useStyles();
    const [lensTypeNames, setLensTypeNames] = useState([]);
    const { form, handleChange, setForm } = useForm({
        lensTypeName: "ALL",
        locationName: "ALL",
        ageRange: "ALL",
        gender: "ALL",
        ethnicity: "ALL",
        state: "ALL",
        orderType: "ALL",
        specificInfo: "ALL"
    });

    const downloadExcel = (data) => {
        if (data.length === 0) {
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

        const columnIds = ['Customer No.', 'First Name', 'Last Name', 'Date of Birth', 'Gender', 'Ethnicity', 'Address', 'City', 'State', 'Zip Code', 'Phone 1', 'Phone 2', 'Email', 'Other Information']
        const columns = ['customerId', 'firstName', 'lastName', 'dobString', 'gender', 'ethnicity', 'address', 'city', 'state', 'zipCode', 'phone1', 'phone2', 'email', 'other']
        const header = columnIds.join('\t') + '\n';
        const rows = data.map(obj => columns.map(col => obj[col]).join('\t')).join('\n');
        const excelData = header + rows;

        const blob = new Blob([excelData], { type: 'application/vnd.ms-excel' });
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = 'Custom Data.xls';
        downloadLink.click();
    };


    useEffect(() => {
        const fetchDetails = async () => {
            setisLoading(true)
            const lensPrice = (
                await firestore().collection('lensPrice').doc('lensPrice').get()
            ).data();
            var keys = Object.keys(lensPrice);
            let lensTypeNames = [];
            keys.forEach((row) => {
                lensTypeNames.push({ lensTypeName: row.replace(/"/g, '') });
            });
            setLensTypeNames(lensTypeNames)
            setisLoading(false)
        }

        fetchDetails()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const filterData = () => {
        let filteredCustomers = JSON.parse(JSON.stringify(customers))
        if (form?.ageRange !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => isCustomerWithinAgeRange(customer, form?.ageRange));
        }
        if (form?.gender !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => customer?.gender === form?.gender);
        }
        if (form?.ethnicity !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => customer?.ethnicity === form?.ethnicity);
        }
        if (form?.state !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => customer?.state === form?.state);
        }
        if (form?.zipCode) {
            filteredCustomers = filteredCustomers.filter(customer => customer?.zipCode === form?.zipCode);
        }
        if (form?.orderType !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => isCustomerHasSpecificOrders(customer, form?.orderType));
        }
        if (form?.specificInfo !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => isCustomerHasSpecificInfo(customer, form?.specificInfo));
        }
        if (form?.locationName !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.locationName === form?.locationName));
        }
        if (form?.lensTypeName !== 'ALL') {
            filteredCustomers = filteredCustomers.filter(customer => orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.lensTypeName === form?.lensTypeName)));
        }

        downloadExcel(filteredCustomers.sort((a, b) => (a.customerId < b.customerId ? -1 : 1)))
    }

    const isCustomerWithinAgeRange = (customer, ageRange) => {
        if (!customer?.dob) return false
        const today = new Date();
        const birthDate = customer?.dob.toDate();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        const [startAge, endAge] = ageRange.split('-');
        return age >= Number(startAge) && age <= Number(endAge);
    };

    const isCustomerHasSpecificOrders = (customer, orderType) => {
        let result
        switch (orderType) {
            case 'CC Frame':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.frameId > 0));
                break;
            case 'Other Frame':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.otherFrame));
                break;
            case 'Own Frame':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.customerFrame));
                break;
            case 'Sunglass':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.lensColour));
                break;
            case 'Progressive':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.lensType === 'progressive'));
                break;
            case 'Distance':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.lensType === 'distance'));
                break;
            case 'Flat Top':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.lensType === 'fTop'));
                break;
            case 'Reading':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.eyeglasses?.some((eyeglass) => eyeglass?.lensType === 'read'));
                break;
            case 'Other Product':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.otherProductInfo?.length > 0);
                break;
            case 'Exam':
                result = exams.some((exam) => exam?.customerId === customer?.customerId);
                break;
            case 'Insurance':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.insuranceCostOne || order?.insuranceCostTwo);
                break;
            case 'Redo':
                result = orders.filter((order) => order?.customerId === customer?.customerId).some((order) => order?.redoOrder);
                break;

            default:
                result = false
                break;
        }
        return result
    };

    const isCustomerHasSpecificInfo = (customer, specificInfo) => {
        let result
        switch (specificInfo) {
            case 'Exam expires in 7 days':
                result = checkExamExpiryInGivenDays('0-7', exams.filter((exam) => exam?.customerId === customer?.customerId).sort((a, b) => (a.examId > b.examId ? -1 : 1))?.[0])
                break;
            case 'Exam expires in 30 days':
                result = checkExamExpiryInGivenDays('0-30', exams.filter((exam) => exam?.customerId === customer?.customerId).sort((a, b) => (a.examId > b.examId ? -1 : 1))?.[0])
                break;
            case 'Exam expires in 60 days':
                result = checkExamExpiryInGivenDays('0-60', exams.filter((exam) => exam?.customerId === customer?.customerId).sort((a, b) => (a.examId > b.examId ? -1 : 1))?.[0])
                break;
            case 'Recently visited within 7 days':
                result = checkRecentVisitInGivenDays('0-7', orders.filter((order) => order?.customerId === customer?.customerId).sort((a, b) => (a.orderId > b.orderId ? -1 : 1))?.[0])
                break;
            case 'Recently visited within 30 days':
                result = checkRecentVisitInGivenDays('0-30', orders.filter((order) => order?.customerId === customer?.customerId).sort((a, b) => (a.orderId > b.orderId ? -1 : 1))?.[0])
                break;
            case 'Recently visited within 60 days':
                result = checkRecentVisitInGivenDays('0-60', orders.filter((order) => order?.customerId === customer?.customerId).sort((a, b) => (a.orderId > b.orderId ? -1 : 1))?.[0])
                break;
            case 'Last visited 300~365 days ago':
                result = checkRecentVisitInGivenDays('300-365', orders.filter((order) => order?.customerId === customer?.customerId).sort((a, b) => (a.orderId > b.orderId ? -1 : 1))?.[0])
                break;
            case 'Last visited 366~547 days ago':
                result = checkRecentVisitInGivenDays('366-547', orders.filter((order) => order?.customerId === customer?.customerId).sort((a, b) => (a.orderId > b.orderId ? -1 : 1))?.[0])
                break;
            case 'Last visited 548~730 days ago':
                result = checkRecentVisitInGivenDays('548-730', orders.filter((order) => order?.customerId === customer?.customerId).sort((a, b) => (a.orderId > b.orderId ? -1 : 1))?.[0])
                break;
            case 'Last visited more than 731 days ago':
                result = checkRecentVisitInGivenDays('731-10000', orders.filter((order) => order?.customerId === customer?.customerId).sort((a, b) => (a.orderId > b.orderId ? -1 : 1))?.[0])
                break;
            case 'Birthday within 7 days':
                result = checkBirthdayWithinGivenDays('0-7', customer)
                break;
            case 'Birthday within 30 days':
                result = checkBirthdayWithinGivenDays('0-30', customer)
                break;
            case 'Birthday within 60 days':
                result = checkBirthdayWithinGivenDays('0-60', customer)
                break;

            default:
                result = false
                break;
        }
        return result
    }

    const checkExamExpiryInGivenDays = (days, exam) => {
        if (!exam) return false

        const currentDate = new Date();
        let expirationDate = exam?.examTime.toDate()
        expirationDate.setFullYear(expirationDate.getFullYear() + 1);
        const timeDifference = expirationDate.getTime() - currentDate.getTime();

        // Calculate the number of milliseconds in a day
        const oneDayInMillis = 24 * 60 * 60 * 1000;

        // Calculate the number of days until the exam expires
        const daysUntilExpiration = Math.floor(timeDifference / oneDayInMillis);

        const [start, end] = days.split('-');
        return (daysUntilExpiration > start && daysUntilExpiration <= end);
    }

    const checkRecentVisitInGivenDays = (days, order) => {
        if (!order) return false;

        const [start, end] = days.split('-');
        const currentDate = new Date();

        const filterStartDate = new Date(currentDate);
        filterStartDate.setDate(filterStartDate.getDate() - end);
        filterStartDate.setHours(0, 0, 0);

        const filterEndDate = new Date(currentDate);
        filterEndDate.setDate(filterEndDate.getDate() - start);
        filterEndDate.setHours(23, 59, 59);

        const orderDate = order?.orderDate.toDate();

        return orderDate >= filterStartDate && orderDate <= filterEndDate;
    };


    const checkBirthdayWithinGivenDays = (days, customer) => {
        if (!customer?.dob) return false
        const [start, end] = days.split('-');
        const today = new Date();

        const filterStartDate = new Date(today);
        filterStartDate.setDate(today.getDate() + parseInt(start));
        filterStartDate.setHours(0, 0, 0);

        const filterEndDate = new Date(today);
        filterEndDate.setDate(today.getDate() + parseInt(end));
        filterEndDate.setHours(23, 59, 59);


        const birthday = new Date(customer?.dob?.seconds * 1000);
        birthday.setFullYear(new Date().getFullYear());

        return birthday >= filterStartDate && birthday <= filterEndDate;
    }

    if (isLoading) return <FuseLoading />;
    return (
        <div className="w-full p-12">
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                        CUSTOM DATA
                    </h1>
                </div>
                <div className="flex flex-col justify-center p-16 sm:p-24 ">
                    <div className="flex flex-row p-6 mb-16 gap-10">
                        <FormControl className="w-1/2">
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
                        <FormControl className="w-1/2">
                            <FormHelperText>Select Age Range</FormHelperText>
                            <Select
                                value={form?.ageRange ?? ''}
                                name="ageRange"
                                onChange={handleChange}
                                autoWidth>
                                {allAgeRanges.map((row, index) => (<MenuItem key={index} value={row}>{row}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="flex flex-row p-6 gap-10">
                        <FormControl className="w-1/2">
                            <FormHelperText>Select Gender</FormHelperText>
                            <Select
                                value={form?.gender ?? ''}
                                name="gender"
                                onChange={handleChange}
                                autoWidth>
                                <MenuItem key={0} value={'ALL'}>ALL</MenuItem>
                                <MenuItem key={1} value={'Male'}>Male</MenuItem>
                                <MenuItem key={2} value={'Female'}>Female</MenuItem>
                                <MenuItem key={3} value={'Other'}>Other</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl className="w-1/2">
                            <FormHelperText>Select Ethnicity</FormHelperText>
                            <Select
                                value={form?.ethnicity ?? ''}
                                name="ethnicity"
                                onChange={handleChange}
                                autoWidth>
                                {allEthnicities.map((row, index) => (<MenuItem key={index} value={row}>{row}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="flex flex-row p-6 mb-16 gap-10">
                        <div className='flex flex-col w-1/2'>
                            <CustomAutocomplete
                                list={allStates}
                                form={form}
                                setForm={setForm}
                                handleChange={handleChange}
                                id="state"
                                freeSolo={false}
                                label="Select State"
                                disabled={false}
                                variant='standard'
                            />
                        </div>
                        <TextField
                            className="w-1/2 mt-16"
                            label="Zip Code"
                            name="zipCode"
                            value={form?.zipCode ?? ''}
                            onChange={handleChange}
                            variant="standard"
                            fullWidth
                        />
                    </div>
                    <div className="flex flex-row p-6 mb-16 gap-10">
                        <FormControl className="w-1/2">
                            <FormHelperText>Order Type</FormHelperText>
                            <Select
                                value={form?.orderType ?? ''}
                                name="orderType"
                                onChange={handleChange}
                                autoWidth>
                                {allOrderTypes.map((row, index) => (<MenuItem key={index} value={row}>{row}</MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl className="w-1/2">
                            <FormHelperText>Specific Info</FormHelperText>
                            <Select
                                value={form?.specificInfo ?? ''}
                                name="specificInfo"
                                onChange={handleChange}
                                autoWidth>
                                {allSpecificOptions.map((row, index) => (<MenuItem key={index} value={row}>{row}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="flex flex-row p-6 mb-16 gap-10">
                        <FormControl className="w-1/2">
                            <FormHelperText>Lens Type</FormHelperText>
                            <Select
                                value={form?.lensTypeName ?? ''}
                                name="lensTypeName"
                                onChange={handleChange}
                                autoWidth>
                                <MenuItem key={'ALL'} value={'ALL'}>{'ALL'}</MenuItem>
                                {lensTypeNames.map((row, index) => (<MenuItem key={index} value={row?.lensTypeName}>{row?.lensTypeName}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <Button
                        className={classes.button}
                        onClick={() => filterData()}
                        variant="contained"
                        color="secondary">
                        Filter and Download
                    </Button>
                </div>
            </div>
        </div>
    );
};

const allAgeRanges = ["ALL", "90+", "85-89", "80-84", "75-79", "70-74", "65-69", "60-64", "55-59", "50-54", "45-49",
    "40-44", "35-39", "30-34", "25-29", "20-24", "15-19", "10-14", "5-9", "0-4"]

const allEthnicities = ["ALL", 'White / Caucasian', 'Black / African American', 'Hispanic / Latino', 'Asian', 'Asian / India & Pakistan',
    'American Indian & Alaska Native', 'Native Hawaiian & Other Pacific Islander', 'Others']

const allStates = [
    {
        state: 'ALL',
        abbreviation: 'ALL'
    },
    {
        state: 'Alabama',
        abbreviation: 'AL'
    },
    {
        state: 'Alaska',
        abbreviation: 'AK'
    },
    {
        state: 'Arizona',
        abbreviation: 'AZ'
    },
    {
        state: 'Arkansas',
        abbreviation: 'AR'
    },
    {
        state: 'California',
        abbreviation: 'CA'
    },
    {
        state: 'Colorado',
        abbreviation: 'CO'
    },
    {
        state: 'Connecticut',
        abbreviation: 'CT'
    },
    {
        state: 'Delaware',
        abbreviation: 'DE'
    },
    {
        state: 'Florida',
        abbreviation: 'FL'
    },
    {
        state: 'Georgia',
        abbreviation: 'GA'
    },
    {
        state: 'Hawaii',
        abbreviation: 'HI'
    },
    {
        state: 'Idaho',
        abbreviation: 'ID'
    },
    {
        state: 'Illinois',
        abbreviation: 'IL'
    },
    {
        state: 'Indiana',
        abbreviation: 'IN'
    },
    {
        state: 'Iowa',
        abbreviation: 'IA'
    },
    {
        state: 'Kansas',
        abbreviation: 'KS'
    },
    {
        state: 'Kentucky',
        abbreviation: 'KY'
    },
    {
        state: 'Louisiana',
        abbreviation: 'LA'
    },
    {
        state: 'Maine',
        abbreviation: 'ME'
    },
    {
        state: 'Maryland',
        abbreviation: 'MD'
    },
    {
        state: 'Massachusetts',
        abbreviation: 'MA'
    },
    {
        state: 'Michigan',
        abbreviation: 'MI'
    },
    {
        state: 'Minnesota',
        abbreviation: 'MN'
    },
    {
        state: 'Mississippi',
        abbreviation: 'MS'
    },
    {
        state: 'Missouri',
        abbreviation: 'MO'
    },
    {
        state: 'Montana',
        abbreviation: 'MT'
    },
    {
        state: 'Nebraska',
        abbreviation: 'NE'
    },
    {
        state: 'Nevada',
        abbreviation: 'NV'
    },
    {
        state: 'New Hampshire',
        abbreviation: 'NH'
    },
    {
        state: 'New Jersey',
        abbreviation: 'NJ'
    },
    {
        state: 'New Mexico',
        abbreviation: 'NM'
    },
    {
        state: 'New York',
        abbreviation: 'NY'
    },
    {
        state: 'North Carolina',
        abbreviation: 'NC'
    },
    {
        state: 'North Dakota',
        abbreviation: 'ND'
    },
    {
        state: 'Ohio',
        abbreviation: 'OH'
    },
    {
        state: 'Oklahoma',
        abbreviation: 'OK'
    },
    {
        state: 'Oregon',
        abbreviation: 'OR'
    },
    {
        state: 'Pennsylvania',
        abbreviation: 'PA'
    },
    {
        state: 'Rhode Island',
        abbreviation: 'RI'
    },
    {
        state: 'South Carolina',
        abbreviation: 'SC'
    },
    {
        state: 'South Dakota',
        abbreviation: 'SD'
    },
    {
        state: 'Tennessee',
        abbreviation: 'TN'
    },
    {
        state: 'Texas',
        abbreviation: 'TX'
    },
    {
        state: 'Utah',
        abbreviation: 'UT'
    },
    {
        state: 'Vermont',
        abbreviation: 'VT'
    },
    {
        state: 'Virginia',
        abbreviation: 'VA'
    },
    {
        state: 'Washington',
        abbreviation: 'WA'
    },
    {
        state: 'West Virginia',
        abbreviation: 'WV'
    },
    {
        state: 'Wisconsin',
        abbreviation: 'WI'
    },
    {
        state: 'Wyoming',
        abbreviation: 'WY'
    }
];

let allOrderTypes = [
    'ALL', 'CC Frame', 'Other Frame', 'Own Frame', 'Sunglass',
    'Progressive', 'Distance', 'Flat Top', 'Reading', 'Other Product', 'Exam', 'Insurance',
    'Redo'
]

const allSpecificOptions = [
    'ALL', 'Exam expires in 7 days', 'Exam expires in 30 days',
    'Exam expires in 60 days', 'Recently visited within 7 days',
    'Recently visited within 30 days', 'Recently visited within 60 days',
    'Last visited 300~365 days ago', 'Last visited 366~547 days ago',
    'Last visited 548~730 days ago', 'Last visited more than 731 days ago',
    'Birthday within 7 days', 'Birthday within 30 days',
    'Birthday within 60 days'
]

export default withReducer('projectDashboardApp', reducer)(CustomData);
