import { firestore } from 'firebase';
import { useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import EditIcon from '@material-ui/icons/Edit';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LabelImportantIcon from '@material-ui/icons/LabelImportant';
import moment from 'moment';
import OrderHistory from './OrderHistory';
import PageviewOutlinedIcon from '@material-ui/icons/PageviewOutlined';
import Paper from '@material-ui/core/Paper';
import PrescriptionReceipt from './PrescriptionReceipt';
import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
    padding: 10,
    textAlign: 'center'
  },
  body: {
    fontSize: 14,
    padding: 10,
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
  const [openPrescriptionReceipt, setOpenPrescriptionReceipt] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState({});
  const [showRooms, setShowRooms] = useState();
  const [disabledState, setDisabledState] = useState(true);
  const dispatch = useDispatch();

  const handlePrescriptionReceiptClose = () => {
    setOpenPrescriptionReceipt(false);
  };

  function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '');
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      var intlCode = match[1] ? '+1 ' : '';
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');
    }
    return phoneNumberString;
  }

  const checkLocationName = (no) => {
    for (var i = 0; i < showRooms.length; i++) {
      if (showRooms[i].showRoomId === no) {
        return showRooms[i].locationName;
      }
    }
  };

  const onMemosChange = async () => {
    await firestore()
      .collection('customers')
      .doc(customer?.id)
      .update({ memos: customer?.memos });

    dispatch(
      MessageActions.showMessage({
        message: 'Memos updated successfully!'
      })
    );
  };

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

      const queryShowroom = await firestore().collection('showRooms').get();
      let showroomdata = [];
      queryShowroom.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(showroomdata);

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
      header={
        <div className=" flex flex-col w-full mt-4 relative">
          <Typography
            className="normal-case flex items-center sm:mb-12 absolute"
            component={Link}
            role="button"
            to="/apps/e-commerce/customers"
            color="inherit">
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4">Customers</span>
          </Typography>
          <div className="flex flex-row w-full px-10 justify-center">
            <div className="flex flex-row">
              <Typography className="text-16 pl-8 sm:text-20 truncate">
                ID: {customer?.customerId}
              </Typography>
            </div>
          </div>
        </div>
      }
      content={
        <div className="flex flex-col w-full">
          <div className="flex p-16 flex-row w-full">
            <div className="customer-info w-1/2 h-auto">
              <div className="py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    CUSTOMER INFO
                  </h2>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-t-1 border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">Customer Id:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-t-1 border-b-1">
                    <h3 className="pl-6 bg-grey-200">{customer.customerId}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700">Name:</h3>
                  </div>
                  <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                    <h3 className="pl-6">{`${customer?.firstName} ${customer.lastName}`}</h3>
                  </div>
                </div>
                <div className="flex flex-row w-full">
                  <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                    <h3 className="pl-6 font-700 bg-grey-200">
                      Date of Birth:
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
                    <h3 className="pl-6 font-700">Sex:</h3>
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
                <div className="flex flex-col p-6">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() =>
                      props.history.push(
                        `/apps/e-commerce/customers/${customer?.customerId}`
                      )
                    }>
                    <EditIcon fontSize="small" />
                    EDIT
                  </Button>
                </div>
              </div>
            </div>
            <div className="note ml-10 w-1/2 h-auto  ">
              <div className="py-4 border-1 border-black border-solid rounded-6 h-full">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    NOTE
                  </h2>
                </div>
                <div className="relative">
                  <div className="flex w-full">
                    <TextField
                      className="my-10 p-2"
                      disabled={disabledState}
                      inputProps={{ style: { fontSize: 20, lineHeight: 1 } }}
                      InputLabelProps={{ style: { fontSize: 16 } }}
                      id="memos"
                      type="text"
                      name="memos"
                      value={customer?.memos}
                      onChange={(e) => {
                        setCustomer({ ...customer, memos: e.target.value });
                      }}
                      multiline
                      rows={13}
                      variant="standard"
                      fullWidth
                    />
                  </div>

                  {disabledState && (
                    <div className="flex flex-col p-2 mt-10">
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setDisabledState(false);
                        }}>
                        <EditIcon fontSize="small" />
                        EDIT
                      </Button>
                    </div>
                  )}
                  {!disabledState && (
                    <div className="flex flex-col p-2">
                      <Button
                        className={classes.button}
                        variant="contained"
                        color="secondary"
                        onClick={() => {
                          setDisabledState(true);
                          onMemosChange();
                        }}>
                        <Icon>save</Icon>
                        SAVE
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="family-tree flex flex-col px-16">
            <div className="py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h2 className="font-700" style={{ color: '#f15a25' }}>
                  FAMILY TREE
                </h2>
              </div>
              <div className="flex flex-col w-full h-auto">
                <TableContainer
                  className="flex flex-col w-full max-h-400"
                  component={Paper}>
                  <Table stickyHeader aria-label="customized table">
                    <TableHead>
                      <TableRow style={{ height: 10 }}>
                        <StyledTableCell>ID</StyledTableCell>
                        <StyledTableCell>FIRST NAME</StyledTableCell>
                        <StyledTableCell>LAST NAME</StyledTableCell>
                        <StyledTableCell>D.O.B</StyledTableCell>
                        <StyledTableCell>GENDER</StyledTableCell>
                        <StyledTableCell>STATE</StyledTableCell>
                        <StyledTableCell>ZIP CODE</StyledTableCell>
                        <StyledTableCell>PHONE</StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {familyMembers
                        .sort((a, b) => (a.customerId > b.customerId ? -1 : 1))
                        .map((row) => (
                          <StyledTableRow
                            key={row.customerId}
                            style={{ height: 10 }}>
                            <StyledTableCell>{row?.customerId}</StyledTableCell>
                            <StyledTableCell>{row?.firstName}</StyledTableCell>
                            <StyledTableCell>{row?.lastName}</StyledTableCell>
                            <StyledTableCell>
                              {moment(row.dob.toDate()).format('MM/DD/YYYY')}
                            </StyledTableCell>
                            <StyledTableCell>{row?.gender}</StyledTableCell>
                            <StyledTableCell>{row?.state}</StyledTableCell>
                            <StyledTableCell>{row?.zipCode}</StyledTableCell>
                            <StyledTableCell>
                              {formatPhoneNumber(row?.phone1)}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>

          <div className="flex flex-col p-16 w-full gap-10">
            <div className="insurance flex flex-col w-full">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    INSURANCE
                  </h2>
                </div>
                <div className="flex flex-col p-12">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/customers/addinsurance/${customer?.customerId}`
                      );
                    }}>
                    + ADD NEW
                  </Button>
                </div>
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col w-full">
                    <TableContainer component={Paper} className="max-h-400">
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Company</StyledTableCell>
                            <StyledTableCell>Primary Holder</StyledTableCell>
                            <StyledTableCell>Policy No</StyledTableCell>
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
                                  {row?.dateCreated}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.insuranceCompany}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.primaryHolder}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {row.policyNo}
                                </StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="RX flex flex-col mt-6 w-full">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    RX
                  </h2>
                </div>
                <div className="flex flex-col p-12">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/customers/addRx/${customer?.customerId}`
                      );
                    }}>
                    + ADD NEW
                  </Button>
                </div>
                <PrescriptionReceipt
                  mainForm={selectedPrescription}
                  openPrescriptionReceipt={openPrescriptionReceipt}
                  handlePrescriptionReceiptClose={
                    handlePrescriptionReceiptClose
                  }
                  customer={customer}
                />

                <div className="flex justify-center">
                  <ButtonGroup
                    variant="text"
                    color="primary"
                    aria-label="text primary button group gap-10">
                    <Button
                      style={{
                        border: 'none',
                        color: prescriptionType === 'eyeglassesRx' && '#f15a25'
                      }}
                      onClick={() => {
                        let eyeglassesRx = prescription.filter(
                          (word) => word.prescriptionType === 'eyeglassesRx'
                        );
                        setFilteredPrescription(eyeglassesRx);
                        setPrescriptionType('eyeglassesRx');
                      }}>
                      EYEGLASSES
                    </Button>
                    <Button
                      style={{
                        border: 'none',
                        color: prescriptionType === 'contactLensRx' && '#f15a25'
                      }}
                      onClick={() => {
                        let contactLensRx = prescription.filter(
                          (word) => word.prescriptionType === 'contactLensRx'
                        );

                        setFilteredPrescription(contactLensRx);
                        setPrescriptionType('contactLensRx');
                      }}>
                      CONTACT LENS
                    </Button>
                    <Button
                      style={{
                        border: 'none',
                        color: prescriptionType === 'medicationRx' && '#f15a25'
                      }}
                      onClick={() => {
                        let medicationRx = prescription.filter(
                          (word) => word.prescriptionType === 'medicationRx'
                        );

                        setFilteredPrescription(medicationRx);
                        setPrescriptionType('medicationRx');
                      }}>
                      MEDICAL
                    </Button>
                  </ButtonGroup>
                </div>
                {prescriptionType === 'eyeglassesRx' && (
                  <div className="flex flex-1 overflow-scroll">
                    <div className="flex flex-col w-full">
                      <TableContainer component={Paper} className="max-h-400">
                        <Table
                          className={classes.table}
                          stickyHeader
                          aria-label="customized table">
                          <TableHead>
                            <TableRow style={{ height: 10 }}>
                              <StyledTableCell>DATE</StyledTableCell>
                              <StyledTableCell>SPHERE</StyledTableCell>
                              <StyledTableCell>CYLINDER</StyledTableCell>
                              <StyledTableCell>AXIS</StyledTableCell>
                              <StyledTableCell>ADD</StyledTableCell>
                              <StyledTableCell>PRISM / BASE</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredPrescription
                              .sort((a, b) =>
                                a.prescriptionId > b.prescriptionId ? -1 : 1
                              )
                              .map((row) => (
                                <StyledTableRow
                                  onClick={() => {
                                    setSelectedPrescription(row);
                                    setOpenPrescriptionReceipt(true);
                                    console.log(row);
                                  }}
                                  key={row.prescriptionId}
                                  style={{ height: 10 }}>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    {row?.onRx ? (
                                      <LabelImportantIcon color="secondary" />
                                    ) : (
                                      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
                                    )}{' '}
                                    {moment(
                                      row?.prescriptionDate.toDate()
                                    ).format('MM/DD/YYYY')}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.eyeglassesSphereOd}</div>
                                      <div>{row.eyeglassesSphereOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.eyeglassesCylinderOd}</div>
                                      <div>{row.eyeglassesCylinderOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.eyeglassesAxisOd}</div>
                                      <div>{row.eyeglassesAxisOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.eyeglassesAddOd}</div>
                                      <div>{row.eyeglassesAddOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.eyeglassesPrismOd}</div>
                                      <div>{row.eyeglassesPrismOs}</div>
                                    </div>
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
                    <div className="flex flex-col w-full">
                      <TableContainer component={Paper} className="max-h-400">
                        <Table
                          className={classes.table}
                          stickyHeader
                          aria-label="customized table">
                          <TableHead>
                            <TableRow style={{ height: 10 }}>
                              <StyledTableCell>DATE</StyledTableCell>
                              <StyledTableCell>SPHERE</StyledTableCell>
                              <StyledTableCell>CYLINDER</StyledTableCell>
                              <StyledTableCell>AXIS</StyledTableCell>
                              <StyledTableCell>ADD</StyledTableCell>
                              <StyledTableCell>MODEL</StyledTableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {filteredPrescription
                              .sort((a, b) =>
                                a.prescriptionId > b.prescriptionId ? -1 : 1
                              )
                              .map((row) => (
                                <StyledTableRow
                                  onClick={() => {
                                    setSelectedPrescription(row);
                                    setOpenPrescriptionReceipt(true);
                                  }}
                                  key={row.prescriptionId}
                                  style={{ height: 10 }}>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    {row?.onRx ? (
                                      <LabelImportantIcon color="secondary" />
                                    ) : (
                                      '\xa0\xa0\xa0\xa0\xa0\xa0\xa0'
                                    )}{' '}
                                    {moment(
                                      row?.prescriptionDate.toDate()
                                    ).format('MM/DD/YYYY')}
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.contactLensSphereOd}</div>
                                      <div>{row.contactLensSphereOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.contactLensCylinderOd}</div>
                                      <div>{row.contactLensCylinderOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.contactLensAxisOd}</div>
                                      <div>{row.contactLensAxisOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    <div className="flex flex-col">
                                      <div>{row.contactLensAddOd}</div>
                                      <div>{row.contactLensAddOs}</div>
                                    </div>
                                  </StyledTableCell>
                                  <StyledTableCell
                                    style={
                                      row?.onRx
                                        ? { color: 'red' }
                                        : { color: 'black' }
                                    }>
                                    {row?.contactLensModel}
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
                    <div className="flex flex-col w-full">
                      <TableContainer component={Paper} className="max-h-400">
                        <Table
                          className={classes.table}
                          stickyHeader
                          aria-label="customized table">
                          <TableHead>
                            <TableRow style={{ height: 10 }}>
                              <StyledTableCell>DATE</StyledTableCell>
                              <StyledTableCell>MEDICATION</StyledTableCell>
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
                                    ).format('MM/DD/YYYY')}
                                  </StyledTableCell>
                                  <StyledTableCell>
                                    <div>{row?.medicationComments}</div>
                                  </StyledTableCell>
                                </StyledTableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="exam-history flex flex-col mt-6 w-full">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                  <h2 className="font-700" style={{ color: '#f15a25' }}>
                    EXAM HISTORY
                  </h2>
                </div>
                <div className="flex flex-col p-12">
                  <Button
                    className={classes.button}
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                      props.history.push(
                        `/apps/e-commerce/customers/addExam/${customer?.customerId}`
                      );
                    }}>
                    + ADD NEW
                  </Button>
                </div>
                <div className="flex flex-1 overflow-scroll">
                  <div className="flex flex-col w-full">
                    <TableContainer component={Paper} className="max-h-400">
                      <Table
                        className={classes.table}
                        stickyHeader
                        aria-label="customized table">
                        <TableHead>
                          <TableRow style={{ height: 10 }}>
                            <StyledTableCell>DATE</StyledTableCell>
                            <StyledTableCell>LOCATION</StyledTableCell>
                            <StyledTableCell>DOCTOR</StyledTableCell>
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
                                    'MM/DD/YYYY'
                                  )}
                                </StyledTableCell>
                                <StyledTableCell>
                                  {checkLocationName(row?.showRoomId)}
                                </StyledTableCell>
                                <StyledTableCell>{row?.doctor}</StyledTableCell>
                              </StyledTableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="order history flex flex-col max-h-400 px-16 py-6">
            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
              <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                <h2 className="font-700" style={{ color: '#f15a25' }}>
                  ORDER HISTORY
                </h2>
              </div>
              <div className="flex flex-col p-12">
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={() => {
                    props.history.push(
                      `/apps/e-commerce/orders/addorder/${customer.customerId}`
                    );
                  }}>
                  + ADD NEW
                </Button>
              </div>
              <OrderHistory customer={customer} />
            </div>
          </div>
        </div>
      }
      innerScroll
    />
  );
};

export default withRouter(CustomerProfile);
