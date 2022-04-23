import { firestore } from 'firebase';
import { useParams, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import FuseAnimate from '@fuse/core/FuseAnimate';
import IconButton from '@material-ui/core/IconButton';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Paper from '@material-ui/core/Paper';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import moment from 'moment';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 12,
    padding: 5,
    textAlign: 'center'
  },
  body: {
    fontSize: 12,
    padding: 0,
    textAlign: 'center'
  }
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 450
  }
});

const CustomerProfile = (props) => {
  const [isLoading, setisLoading] = useState(true);
  const classes = useStyles();
  const [customer, setCustomer] = useState({});
  const [exam, setExam] = useState([]);
  const [prescription, setPrescription] = useState([]);
  const [insurances, setInsurances] = useState([]);
  const [prescriptionType, setPrescriptionType] = useState('eyeglassesRx');
  const [filteredPrescription, setFilteredPrescription] = useState([]);
  const [familyMembers, setFamilyMembers] = useState([]);
  const routeParams = useParams();

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
      const queryFamilyMembers = await firestore()
        .collection('customers')
        .where('family', '==', resultCustomer?.family)
        .get();
      let resultFamilyMembers = [];
      queryFamilyMembers.forEach((doc) => {
        resultFamilyMembers.push(doc.data());
      });
      setFamilyMembers(resultFamilyMembers);
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

      let eyeglassesRx = resultPrescription.filter(
        (word) => word.prescriptionType === 'eyeglassesRx'
      );
      setFilteredPrescription(eyeglassesRx);
      setPrescriptionType('eyeglassesRx');

      const queryInsurance = await firestore()
        .collection('insurances')
        .where('customerId', '==', Number(id))
        .get();

      let resultInsurance = [];
      queryInsurance.forEach((doc) => {
        resultInsurance.push(doc.data());
      });
      setInsurances(resultInsurance);

      setisLoading(false);
    };

    fetchCustomer();
    fetchExams();
  }, [routeParams.customerId]);
  if (isLoading) return <FuseLoading />;
  return !customer || !exam || !prescription || !insurances ? (
    <></>
  ) : (
    <FusePageCarded
      classes={{
        content: 'flex',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className=" flex flex-col w-full mt-24">
          <Typography
            className="normal-case flex items-center sm:mb-12"
            component={Link}
            role="button"
            to="/apps/e-commerce/customers"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Customers</span>
          </Typography>
          <div className="flex flex-row w-full px-10 justify-between">
            <div className="flex flex-row">
              <Icon className="text-28 ">people</Icon>
              <Typography className="text-16 pl-8 sm:text-20 truncate">
                Customer's Details
              </Typography>
            </div>
            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                onClick={() =>
                  props.history.push(
                    `/apps/e-commerce/customers/${customer?.customerId}`
                  )
                }
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary">
                <EditIcon fontSize="small" />
                Edit
              </Button>
            </FuseAnimate>
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="p-12 w-1/3 h-auto  rounded-20 shadow-2">
              <h1 className="underline font-700">Customer Info</h1>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-t-1 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Customer Id:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-t-1 border-b-1">
                  <h2 className="pl-6">{customer.customerId}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Name:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{`${customer?.firstName} ${customer.lastName}`}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Date of Birth:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.dob.toDateString()}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Sex:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.gender}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Ethnicity:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.ethnicity}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Address:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.address}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">City:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.city}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">State:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.state}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Zip-Code:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.zipCode}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Phone 1:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">
                    {formatPhoneNumber(customer?.phone1)}
                  </h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Phone 2:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">
                    {formatPhoneNumber(customer?.phone2)}
                  </h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Email:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.email}</h2>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1 border-r-1">
                  <h2 className="pl-6 font-700">Other:</h2>
                </div>
                <div className="flex flex-col w-1/2 border-teal-400 border-b-1">
                  <h2 className="pl-6">{customer?.other}</h2>
                </div>
              </div>
            </div>
            <div className="p-12 ml-10 w-2/3 h-auto  rounded-20 shadow-10">
              <h1 className="underline font-700">Family Tree:</h1>
              <div className="flex flex-col w-full h-288">
                <TableContainer
                  className="flex flex-col w-full"
                  component={Paper}>
                  <Table stickyHeader aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ height: 10 }}>
                        <StyledTableCell>Sr#</StyledTableCell>
                        <StyledTableCell>NAME</StyledTableCell>
                        <StyledTableCell>BIRTHDAY</StyledTableCell>
                        <StyledTableCell>GENDER</StyledTableCell>
                        <StyledTableCell>ID</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {familyMembers
                        .sort((a, b) => (a.customerId > b.customerId ? -1 : 1))
                        .map((row, index) => (
                          <StyledTableRow
                            key={row.customerId}
                            style={{ height: 10 }}>
                            <StyledTableCell>{index + 1}</StyledTableCell>
                            <StyledTableCell>{`${row?.lastName}, ${row?.firstName} `}</StyledTableCell>
                            <StyledTableCell>
                              {moment(row.dob.toDate()).format('MM-DD-YYYY')}
                            </StyledTableCell>
                            <StyledTableCell>{row?.gender}</StyledTableCell>
                            <StyledTableCell>
                              <Link
                                to={`/apps/e-commerce/customers/profile/${row.customerId}`}>
                                <h3 className="text-black">
                                  {row?.customerId}
                                </h3>
                              </Link>
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>

          <div className="flex flex-row p-16 sm:p-24 w-full">
            <div className="flex flex-col p-12 w-1/3 h-320  rounded-20 shadow-10">
              <h2 className="font-700 text-center">INSURANCE</h2>

              <div className="flex flex-1 overflow-scroll">
                <div className="flex flex-col ">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      stickyHeader
                      aria-label="customized table">
                      <TableHead>
                        <TableRow style={{ height: 10 }}>
                          <StyledTableCell>Insurance</StyledTableCell>
                          <StyledTableCell>Holder</StyledTableCell>
                          <StyledTableCell>Policy #</StyledTableCell>
                          <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {insurances
                          .sort((a, b) =>
                            a.insuranceId > b.insuranceId ? -1 : 1
                          )
                          .map((row) => (
                            <StyledTableRow
                              key={row.insuranceId}
                              style={{ height: 10 }}>
                              <StyledTableCell>
                                {row.insuranceCompany}
                              </StyledTableCell>
                              <StyledTableCell>
                                {row.primaryHolder}
                              </StyledTableCell>
                              <StyledTableCell>{row.policyNo}</StyledTableCell>
                              <StyledTableCell>
                                <IconButton
                                  onClick={() => {
                                    props.history.push(
                                      `/apps/e-commerce/customers/profile/editinsurance/${row.insuranceId}`
                                    );
                                  }}
                                  aria-label="edit">
                                  <EditIcon fontSize="small" />
                                </IconButton>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  className="justify-center ml-160"
                  variant="contained"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/customers/addinsurance/${customer?.customerId}`
                    );
                  }}
                  color="secondary"
                  size="large"
                  startIcon={<AddCircleOutlineOutlinedIcon />}>
                  Add Insurance
                </Button>
              </div>
            </div>
            <div className="flex flex-col p-12 ml-6 w-1/3 h-320  rounded-20 shadow-10">
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
                      setFilteredPrescription(eyeglassesRx);
                      setPrescriptionType('eyeglassesRx');
                    }}>
                    Glasses
                  </Button>
                  <Button
                    onClick={() => {
                      let contactLensRx = prescription.filter(
                        (word) => word.prescriptionType === 'contactLensRx'
                      );

                      setFilteredPrescription(contactLensRx);
                      setPrescriptionType('contactLensRx');
                    }}>
                    Contacts
                  </Button>
                  <Button
                    onClick={() => {
                      let medicationRx = prescription.filter(
                        (word) => word.prescriptionType === 'medicationRx'
                      );

                      setFilteredPrescription(medicationRx);
                      setPrescriptionType('medicationRx');
                    }}>
                    Medical
                  </Button>
                </ButtonGroup>
              </div>
              {prescriptionType === 'eyeglassesRx' && (
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col ">
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>SPH</StyledTableCell>
                            <StyledTableCell>CYL</StyledTableCell>
                            <StyledTableCell>AXIS</StyledTableCell>
                            <StyledTableCell>ADD</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredPrescription
                            .sort((a, b) =>
                              a.prescriptionId > b.prescriptionId ? -1 : 1
                            )
                            .map((row) => (
                              <StyledTableRow
                                key={row.prescriptionId}
                                style={{ height: 10 }}>
                                <StyledTableCell>
                                  {moment(
                                    row?.prescriptionDate.toDate()
                                  ).format('MM-DD-YYYY')}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesSphereOd}</div>
                                    <div>{row.eyeglassesSphereOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesCylinderOd}</div>
                                    <div>{row.eyeglassesCylinderOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesAxisOd}</div>
                                    <div>{row.eyeglassesAxisOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.eyeglassesAddOd}</div>
                                    <div>{row.eyeglassesAddOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <IconButton
                                    disabled={true}
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/${row.customerId}`
                                      );
                                    }}
                                    aria-label="view">
                                    <PageviewOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/editprescription/${row.prescriptionId}`
                                      );
                                    }}
                                    aria-label="edit">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}

              {prescriptionType === 'contactLensRx' && (
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col ">
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>SPH</StyledTableCell>
                            <StyledTableCell>CYL</StyledTableCell>
                            <StyledTableCell>AXIS</StyledTableCell>
                            <StyledTableCell>ADD</StyledTableCell>
                            <StyledTableCell>Options</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredPrescription
                            .sort((a, b) =>
                              a.prescriptionId > b.prescriptionId ? -1 : 1
                            )
                            .map((row) => (
                              <StyledTableRow
                                key={row.prescriptionId}
                                style={{ height: 10 }}>
                                <StyledTableCell>
                                  {moment(
                                    row?.prescriptionDate.toDate()
                                  ).format('MM-DD-YYYY')}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensSphereOd}</div>
                                    <div>{row.contactLensSphereOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensCylinderOd}</div>
                                    <div>{row.contactLensCylinderOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensAxisOd}</div>
                                    <div>{row.contactLensAxisOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="flex flex-col">
                                    <div>{row.contactLensAddOd}</div>
                                    <div>{row.contactLensAddOs}</div>
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <IconButton
                                    disabled={true}
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/${row.customerId}`
                                      );
                                    }}
                                    aria-label="view">
                                    <PageviewOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/editprescription/${row.prescriptionId}`
                                      );
                                    }}
                                    aria-label="edit">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}

              {prescriptionType === 'medicationRx' && (
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col ">
                    <TableContainer component={Paper}>
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Medication</StyledTableCell>

                            <StyledTableCell>Options</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {filteredPrescription
                            .sort((a, b) =>
                              a.prescriptionId > b.prescriptionId ? -1 : 1
                            )
                            .map((row) => (
                              <StyledTableRow
                                key={row.prescriptionId}
                                style={{ height: 10 }}>
                                <StyledTableCell>
                                  {moment(
                                    row?.prescriptionDate.toDate()
                                  ).format('MM-DD-YYYY')}
                                </StyledTableCell>
                                <StyledTableCell>
                                  <div className="w-136 truncate">
                                    {row?.medicationComments}
                                  </div>
                                </StyledTableCell>
                                <StyledTableCell>
                                  <IconButton
                                    disabled={true}
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/${row.customerId}`
                                      );
                                    }}
                                    aria-label="view">
                                    <PageviewOutlinedIcon fontSize="small" />
                                  </IconButton>
                                  <IconButton
                                    onClick={() => {
                                      props.history.push(
                                        `/apps/e-commerce/customers/profile/editprescription/${row.prescriptionId}`
                                      );
                                    }}
                                    aria-label="edit">
                                    <EditIcon fontSize="small" />
                                  </IconButton>
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
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
            <div className="flex flex-col ml-6 p-12 w-1/3 h-320  rounded-20 shadow-10 ">
              <h2 className="font-700 text-center">EXAM HISTORY</h2>

              <div className="flex flex-1 overflow-scroll">
                <div className="flex flex-col ">
                  <TableContainer component={Paper}>
                    <Table
                      className={classes.table}
                      stickyHeader
                      aria-label="customized table">
                      <TableHead>
                        <TableRow style={{ height: 10 }}>
                          <StyledTableCell>Date</StyledTableCell>
                          <StyledTableCell>Exam Type</StyledTableCell>

                          <StyledTableCell>Options</StyledTableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {exam
                          .sort((a, b) => (a.examId > b.examId ? -1 : 1))
                          .map((row) => (
                            <StyledTableRow
                              key={row.examId}
                              style={{ height: 10 }}>
                              <StyledTableCell>
                                {moment(row?.examTime.toDate()).format(
                                  'MM-DD-YYYY'
                                )}
                              </StyledTableCell>
                              <StyledTableCell>
                                Comprehensive Exam
                              </StyledTableCell>
                              <StyledTableCell>
                                <IconButton
                                  onClick={() => {
                                    props.history.push(
                                      `/apps/e-commerce/customers/profile/viewexam/${row.examId}`
                                    );
                                  }}
                                  aria-label="view">
                                  <PageviewOutlinedIcon fontSize="small" />
                                </IconButton>
                              </StyledTableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
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
