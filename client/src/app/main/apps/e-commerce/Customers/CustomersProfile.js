import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
import Icon from '@material-ui/core/Icon';
import { withRouter } from 'react-router';
import { useParams, Link } from 'react-router-dom';
import { useForm } from '@fuse/hooks';
import PrintIcon from '@material-ui/icons/Print';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FusePageCarded from '@fuse/core/FusePageCarded';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Typography from '@material-ui/core/Typography';

const CustomerProfile = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const [customer, setCustomer] = useState({});
  const [exam, setExam] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [filteredPrescription, setFilteredPrescription] = useState([]);
  const { form, handleChange, setForm } = useForm(null);
  const routeParams = useParams();

  useEffect(() => {
    setisLoading(true);
    const id = routeParams.customerId;
    const fetchCustomer = async () => {
      const queryCustomer = await firestore()
        .collection('customers')
        .where('customerId', '==', Number(id))
        .limit(1)
        .get();

      let resultCustomer = queryCustomer.docs[0].data();
      resultCustomer.dob = resultCustomer.dob && resultCustomer.dob.toDate();
      resultCustomer.id = queryCustomer.docs[0].id;
      setCustomer(resultCustomer);
    };

    const fetchExams = async () => {
      const queryExam = await firestore()
        .collection('exams')
        .where('customerId', '==', Number(id))
        .get();

      let resultExam = [];
      queryExam.forEach((doc) => {
        resultExam.push(doc.data());
      });
      setExam(resultExam);

      const queryPrescription = await firestore()
        .collection('prescriptions')
        .where('customerId', '==', Number(id))
        .get();

      let resultPrescription = [];
      queryPrescription.forEach((doc) => {
        resultPrescription.push(doc.data());
      });
      setPrescription(resultPrescription);
      setisLoading(false);
    };

    fetchCustomer();
    fetchExams();
  }, []);
  if (isLoading) return <FuseLoading />;
  return !customer || !exam || !prescription ? (
    <></>
  ) : (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className="mt-24">
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/customers"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Customers</span>
          </Typography>
          <div className="flex flex-row">
            <Icon className="text-20 mt-4">people</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Customer's Details
            </Typography>
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="p-12 w-1/2 h-auto border-grey-400 border-solid border-1 rounded-20 shadow-10">
              <h1>Customer Info</h1>
              <h2>{`Name: ${customer?.firstName} ${customer.lastName}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 Customer Id: ${customer.customerId}`}</h2>
              <h2>{`DOB: ${customer?.dob.toDateString()}`}</h2>
              <h2>{`Sex: ${customer?.gender}`}</h2>
              <h2>{`Ethnicity: ${customer?.ethnicity}`}</h2>
              <h2>{`Address: ${customer?.address}`}</h2>
              <h2>{`City: ${customer?.city}`}</h2>
              <h2>{`State: ${customer?.state}`}</h2>
              <h2>{`Zip-Code: ${customer?.zipCode}`}</h2>
              <h2>{`Phone 1: ${customer?.phone1}`}</h2>
              <h2>{`Phone 2: ${customer?.phone2}`}</h2>
              <h2>{`Email: ${customer?.email}`}</h2>
              <h2>{`Other: ${customer?.other}`}</h2>
            </div>
            <div className="p-12 ml-10 w-1/2 h-auto border-grey-400 border-solid border-1 rounded-20 shadow-10">
              <h1>Family Tree to be implemented Soon</h1>
            </div>
          </div>

          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="p-12 w-1/3 h-320 border-grey-400 border-solid border-1 rounded-20 shadow-10"></div>
            <div className="flex flex-col p-12 w-1/3 h-320 border-grey-400 border-solid border-1 rounded-20 shadow-10">
              <h2 className="font-700 text-center">Rx</h2>
              <div className="flex justify-center">
                <ButtonGroup
                  variant="text"
                  color="secondary"
                  aria-label="text primary button group">
                  <Button
                    onClick={() => {
                      let eyeglassesRx = prescription.filter(
                        (word) => word.prescriptionType === 'eyeglassesRx'
                      );
                      console.log(eyeglassesRx);
                      setFilteredPrescription(eyeglassesRx);
                    }}>
                    Glasses
                  </Button>
                  <Button
                    onClick={() => {
                      let contactLensRx = prescription.filter(
                        (word) => word.prescriptionType === 'contactLensRx'
                      );
                      console.log(contactLensRx);
                      setFilteredPrescription(contactLensRx);
                    }}>
                    Contacts
                  </Button>
                  <Button
                    onClick={() => {
                      let medicationRx = prescription.filter(
                        (word) => word.prescriptionType === 'medicationRx'
                      );
                      console.log(medicationRx);
                      setFilteredPrescription(medicationRx);
                    }}>
                    Medical
                  </Button>
                </ButtonGroup>
              </div>

              <div className="flex flex-1 ">
                <div className="flex flex-col">
                  {filteredPrescription
                    .sort((a, b) =>
                      a.prescriptionId > b.prescriptionId ? -1 : 1
                    )
                    .map((row) => (
                      <Typography
                        className="normal-case flex items-center sm:mb-12"
                        component={Link}
                        role="button"
                        to={`/apps/e-commerce/customers/profile/viewexam/${row.examId}`}
                        color="inherit">
                        <div className="flex flex-row">
                          <h3 className="ml-12">
                            {row.prescriptionDate.toDate().toDateString()}
                          </h3>
                          <h3 className="ml-12">{row.prescriptionId}</h3>
                          <h3 className="ml-12">{row.prescriptionType}</h3>
                        </div>
                      </Typography>
                    ))}
                </div>
              </div>

              <div className="flex justify-around">
                <Button
                  variant="contained"
                  disabled={true}
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addExam/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<PrintIcon />}>
                  Print
                </Button>
                <Button
                  disabled={true}
                  variant="contained"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addExam/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<EditOutlinedIcon />}>
                  Edit
                </Button>
                <Button
                  variant="contained"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addRx/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<AddCircleOutlineOutlinedIcon />}>
                  Add Rx
                </Button>
              </div>
            </div>
            <div className="p-12 w-1/3 h-320 border-grey-400 border-solid border-1 rounded-20 shadow-10 ">
              <h2 className="font-700 text-center">EXAM HISTORY</h2>
              <div
                className="h-200 flex-wrap overflow-scroll bg-scroll"
                onScroll={(e) => e.stopPropagation()}>
                {exam
                  .sort((a, b) => (a.examId > b.examId ? -1 : 1))
                  .map((row) => (
                    <Typography
                      className="normal-case flex items-center sm:mb-12"
                      component={Link}
                      role="button"
                      to={`/apps/e-commerce/customers/profile/viewexam/${row.examId}`}
                      color="inherit">
                      <div className="flex flex-row">
                        <h3 className="ml-12">
                          {row.examTime.toDate().toDateString()}
                        </h3>
                        <h3 className="ml-12">Comprehensive Exam</h3>
                      </div>
                    </Typography>
                  ))}
              </div>
              <div className="flex justify-end">
                <Button
                  className="justify-center ml-160"
                  variant="contained"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addExam/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<AddCircleOutlineOutlinedIcon />}>
                  New Exam
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
      innerScroll
    />
  );
};

export default withRouter(CustomerProfile);
