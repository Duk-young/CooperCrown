import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';
import SearchDialouge from '../SearchDialouge';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    width: '100%',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  },
  noBorder: {
    width: '100%',
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none'
    }
  }
});

const CustomerInfo = (props) => {
  const classes = useStyles();
  const { form, handleChange, customer, disabledState, setNewCustomer } = props;

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  return (
    <div className="flex flex-row p-16 sm:p-24 w-full gap-20">
      <div className="customer-info py-8  border-1 w-1/2 border-black border-solid rounded-6">
        <div className="flex flex-row justify-center border-b-1 border-black border-solid">
          <SearchDialouge
            type="text"
            title="CUSTOMER INFO"
            setCustomer={setNewCustomer}
          />
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-t-1 border-b-1 border-r-1">
            <h3 className="pl-6 font-700 ">Customer Id</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-t-1 border-b-1">
            <h3 className="pl-6 ">
              {customer ? customer.customerId : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700 bg-grey-200">First Name</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6 bg-grey-200">
              {customer ? customer?.firstName : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700">Last Name</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6">
              {customer ? customer?.lastName : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 bg-grey-200 font-700">
              Date of Birth
            </h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6 bg-grey-200">
              {customer ? customer?.dob.toDateString() : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700">Gender:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6">
              {customer ? customer?.gender : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700 bg-grey-200">Ethnicity:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6 bg-grey-200">
              {customer ? customer?.ethnicity : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700">Address:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6">
              {customer ? customer?.address : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700 bg-grey-200">City:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6 bg-grey-200">
              {customer ? customer?.city : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700">State:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6">
              {customer ? customer?.state : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700 bg-grey-200">Zip-Code:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6 bg-grey-200">
              {customer ? customer?.zipCode : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700">Phone 1:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6">
              {customer ? formatPhoneNumber(customer?.phone1) : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700 bg-grey-200">Phone 2:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6 bg-grey-200">
              {customer ? formatPhoneNumber(customer?.phone2) : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700">Email:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6">
              {customer ? customer?.email : ''}
            </h3>
          </div>
        </div>
        <div className="flex flex-row w-full">
          <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
            <h3 className="pl-6 font-700 bg-grey-200">Other:</h3>
          </div>
          <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
            <h3 className="pl-6 bg-grey-200">
              {customer ? customer?.other : ''}
            </h3>
          </div>
        </div>
        <br></br>
      </div>

      <div className="notes py-8 border-1 w-1/2 border-black border-solid rounded-6">
        <div className="flex flex-row justify-center border-b-1 border-black border-solid">
          <h2 className="font-700" style={{ color: '#f15a25' }}>
            NOTES
          </h2>
        </div>
        <TextField
          id="outlined-multiline-static"
          multiline
          rows={18}
          variant="outlined"
          name="customerNote"
          className={classes.noBorder}
          disabled={disabledState}
          value={form?.customerNote}
          onChange={handleChange}
        />
        <br></br>
      </div>
    </div>
  );
};

export default withRouter(CustomerInfo);
