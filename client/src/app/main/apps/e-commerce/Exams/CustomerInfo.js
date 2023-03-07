import { withRouter } from 'react-router';
import React from 'react';
import TextField from '@material-ui/core/TextField';

const CustomerInfo = (props) => {
  const { form, handleChange, customer, formatPhoneNumber, disabledState, setCustomer } = props;

  return (
    <div className="flex p-16 flex-row w-full">
        <div className=" w-1/2 h-600">
          <div className="py-8  border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                CUSTOMER INFO
              </h1>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-t-1 border-b-1 border-r-1">
                <h3 className="pl-6 font-700 ">Customer Id</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-t-1 border-b-1">
                <h3 className="pl-6 ">{customer.customerId}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">First Name</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.firstName}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Last Name</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer.lastName}</h3>
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
                  {customer?.dob.toDateString()}
                </h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Gender:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.gender}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Ethnicity:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.ethnicity}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Address:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.address}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">City:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.city}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">State:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.state}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Zip-Code:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.zipCode}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Phone 1:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">
                  {formatPhoneNumber(customer?.phone1)}
                </h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Phone 2:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">
                  {formatPhoneNumber(customer?.phone2)}
                </h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700">Email:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6">{customer?.email}</h3>
              </div>
            </div>
            <div className="flex flex-row w-full">
              <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                <h3 className="pl-6 font-700 bg-grey-200">Other:</h3>
              </div>
              <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                <h3 className="pl-6 bg-grey-200">{customer?.other}</h3>
              </div>
            </div>
       <br></br>
          </div>


          <div className=" p-8 py-6 my-10 border-1 border-black border-solid rounded-6">
            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
              <h1 className="font-700" style={{ color: '#f15a25' }}>
                Occupation
              </h1>
            </div>

            <TextField
              className="px-25"
              fullWidth
              disabled={disabledState}
              id="outlined-multiline-static"
              value={form?.occupation}
              onChange={handleChange}
              name={'occupation'}
            />
            <br></br> 
          </div>
        
        </div>

        <div className="ml-10 w-1/2 h-600  ">
          <div className="w-full">
            <div className="flex flex-col h-600 px-16">
              <div className="flex flex-col h-600 py-8 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h1 className="font-700" style={{ color: '#f15a25' }}>
                    Note
                  </h1>
                </div>

                <TextField
                  className="px-25"
                  fullWidth
                  disabled={disabledState}
                  id="outlined-multiline-static"
                  multiline
                  minRows={25}
                  value={customer?.medicalHistory}
                  onChange={(e) => {
                    setCustomer({
                      ...customer,
                      medicalHistory: e.target.value
                    });
                  }}
                  name={'medicalHistory'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default withRouter(CustomerInfo);
