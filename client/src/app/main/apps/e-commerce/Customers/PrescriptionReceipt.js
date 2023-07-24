import '../Customers/Themes.css';
import { firestore } from 'firebase';
import { useReactToPrint } from 'react-to-print';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import moment from 'moment'
import CanvasDraw from 'react-canvas-draw';
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';
import DocSig from '../Exams/DocSig.PNG'

export default function PrescriptionReceipt(props) {
  const { mainForm, open, handleClose, customer } = props;

  // const [templates, setTemplates] = useState([]);
  const [showroom, setShowroom] = useState(false);
  const [doctor, setDoctor] = useState(false);
  const [saveableCanvas, setSaveableCanvas] = useState();

  const prescriptionReceipt = useRef();
  const handlePrint = useReactToPrint({
    content: () => prescriptionReceipt.current
  });

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
    const fetchDetails = async () => {
      // const queryTemplates = (
      //   await firestore()
      //     .collection('emailTemplates')
      //     .doc('emailTemplates')
      //     .get()
      // ).data();
      // const terms = queryTemplates?.templates?.terms
      //   ? queryTemplates?.templates?.terms.split('<br>')
      //   : '';
      // setTemplates(terms.length ? terms : []);

      if (!mainForm?.showRoomId || !mainForm?.doctorId) {
        setShowroom(null)
        setDoctor(null)
        return true
      }
      const queryShowroom = await firestore()
        .collection('showRooms')
        .where('showRoomId', '==', mainForm?.showRoomId)
        .limit(1)
        .get();
      if (!queryShowroom.empty) {
        let resultShowRoom = queryShowroom.docs[0].data();
        resultShowRoom.id = queryShowroom.docs[0].id;

        setShowroom(resultShowRoom);
      }
      const queryDoctor = await firestore()
        .collection('doctors')
        .where('doctorId', '==', mainForm?.doctorId)
        .limit(1)
        .get();
      if (!queryDoctor.empty) {
        let resultDoctor = queryDoctor.docs[0].data();
        resultDoctor.id = queryDoctor.docs[0].id;

        setDoctor(resultDoctor);
      }
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainForm]);

  useEffect(() => {
    if (mainForm?.docSign && saveableCanvas) saveableCanvas.loadSaveData(mainForm?.docSign)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saveableCanvas])

  return (
    <Dialog
      maxWidth="md"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-center'>
          <Fab
            onClick={handlePrint}
            variant="extended"
            color="primary"
            aria-label="add">
            <AddIcon />
            Print
          </Fab>
        </div>

        <div ref={prescriptionReceipt}>
          <table className='w-full'>
            <tbody className='w-full'>
              <div class="flex flex-col justify-center items-center w-full px-20 h-full">
                <div class="w-full">
                  <div className='flex flex-col w-full justify-center p-10 h-full'>
                    <div className="mx-auto w-160 flex flex-row justify-center py-16">
                      <img className="w-160" src="assets/images/logos/logoblack.svg" alt="logossss" />
                    </div>
                    <p className=' pt-4 font-13pt text-center font-700'>
                      {mainForm?.prescriptionType === 'eyeglassesRx' && 'EYEGLASSES RX'}
                      {mainForm?.prescriptionType === 'contactLensRx' && 'Contact Lens RX'}
                    </p>
                    <div className='flex flex-row justify-between px-60'>
                      <p className=' pt-4 font-10pt text-center font-700'>Exam Date: {mainForm?.prescriptionDate ? moment(mainForm?.prescriptionDate.toDate()).format('MM/DD/YYYY') : ''}</p>
                      <p className=' pt-4 font-10pt text-center font-700'>Expiry Date: {mainForm?.prescriptionDate ? moment(mainForm?.prescriptionDate.toDate()).add(1, 'year').format('MM/DD/YYYY') : ''}</p>
                    </div>
                    <div className='w-full h-2 bg-black my-4'></div>
                    <div className="flex p-16 flex-row w-full my-10">
                      <div className="customer-info w-1/2 h-auto">
                        <div className="py-4 border-1 border-black border-solid rounded-6">
                          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                            <h2 className="font-700" style={{ color: '#f15a25' }}>
                              CUSTOMER INFO
                            </h2>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                              <h3 className="pl-6 font-700 ">ID:</h3>
                            </div>
                            <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                              <h3 className="pl-6 ">{customer.customCustomerId}</h3>
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
                              <h3 className="pl-6 font-700 ">
                                DOB:
                              </h3>
                            </div>
                            <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                              <h3 className="pl-6 ">
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
                              <h3 className="pl-6 font-700">Address:</h3>
                            </div>
                            <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                              <h3 className="pl-6">{customer?.address}</h3>
                            </div>
                          </div>
                          <div className="flex flex-row w-full">
                            <div className="flex flex-col md:w-1/4 w-1/3 border-black border-b-1 border-r-1">
                              <h3 className="pl-6 font-700 ">City:</h3>
                            </div>
                            <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                              <h3 className="pl-6 ">{customer?.city}</h3>
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
                              <h3 className="pl-6 font-700 ">Zip-Code:</h3>
                            </div>
                            <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                              <h3 className="pl-6 ">{customer?.zipCode}</h3>
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
                              <h3 className="pl-6 font-700 ">Phone 2:</h3>
                            </div>
                            <div className="flex flex-col md:w-3/4 w-2/3 border-black border-b-1">
                              <h3 className="pl-6 ">
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
                            <div className="flex flex-col md:w-1/4 w-1/3 border-black border-r-1">
                              <h3 className="pl-6 font-700 ">Other:</h3>
                            </div>
                            <div className="flex flex-col md:w-3/4 w-2/3">
                              <h3 className="pl-6 ">{customer?.other}</h3>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="note ml-10 w-1/2 h-auto">
                        <div className="py-4 border-1 border-black border-solid rounded-6 h-full relative">
                          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                            <h2 className="font-700" style={{ color: '#f15a25' }}>
                              NOTE
                            </h2>
                          </div>
                          <div className="relative">
                            <div className="flex w-full p-8">{customer?.memos}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {mainForm?.prescriptionType === 'eyeglassesRx' && (
                      <div className="w-full my-16">
                        <div className="flex flex-row px-32">
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">SUBJ RX</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Sphere</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Cylinder</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Axis</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Prism/Base</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">VA</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Add</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">VA</h3>
                          </div>
                        </div>
                        <div className="flex flex-row px-20">
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center font-700">OD</h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesSphereOd}
                            </h3>{' '}
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesCylinderOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesAxisOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesPrismOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              20 / {mainForm?.eyeglassesVaOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesAddOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              20 / {mainForm?.eyeglassesVaOd2}
                            </h3>
                          </div>
                        </div>

                        <div className="flex flex-row px-20">
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center font-700">OS</h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesSphereOs}
                            </h3>{' '}
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesCylinderOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesAxisOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesPrismOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              20 / {mainForm?.eyeglassesVaOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.eyeglassesAddOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              20 / {mainForm?.eyeglassesVaOs2}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )}

                    {mainForm?.prescriptionType === 'contactLensRx' && (
                      <div className="p-16 sm:p-24 w-full">
                        <div className="flex flex-row px-20">
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">CL RX</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Sphere</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Cylinder</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Axis</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Add</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">BC</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">DIA</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Brand</h3>
                          </div>
                          <div className="p-8 h-auto flex-1">
                            <h3 className="text-center font-700">Model</h3>
                          </div>
                        </div>
                        <div className="flex flex-row px-20">
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center font-700">OD</h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensSphereOd}
                            </h3>{' '}
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensCylinderOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensAxisOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensAddOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensBcOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensDiaOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensBrandOd}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensModelOd}
                            </h3>
                          </div>
                        </div>

                        <div className="flex flex-row px-20">
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center font-700">OS</h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensSphereOs}
                            </h3>{' '}
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensCylinderOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensAxisOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensAddOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensBcOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensDiaOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensBrandOs}
                            </h3>
                          </div>
                          <div className="p-8 flex-1 h-auto border-grey-400 border-solid border-1 justify-between">
                            <h3 className="text-center">
                              {mainForm?.contactLensModelOs}
                            </h3>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className='flex flex-col w-full px-32'>
                      <p className='font-10pt font-700'>State : {doctor?.licState}</p>
                      <p className='font-10pt font-700'>Licence No. : {doctor?.licNo}</p>
                      <p className='font-10pt font-700'>NPI No. : {doctor?.npiNo}</p>
                      <p className='font-10pt font-700'>Electronically Signed By : Dr. {doctor?.fname} {doctor?.lname}</p>
                      <p className='font-10pt font-700'>Date : {moment().format('MM/DD/YYYY')}</p>
                    </div>
                    <div className='flex'>
                      <CanvasDraw
                        ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
                        brushRadius={1}
                        disabled={true}
                        brushColor={'#000000'}
                        imgSrc={DocSig}
                        lazyRadius="0"
                        canvasWidth={300}
                        canvasHeight={300}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </tbody>

            <tfoot>
              <div class="page-footer-space"></div>
            </tfoot>
          </table>
          <div className='print-footer flex flex-col px-12'>
            <div className='w-full h-2 border-b-1 border-black border-dotted my-8'></div>
            <div class="flex flex-col justify-center items-center w-full">
              <p className='font-10pt font-700 text-center'>{showroom?.locationName} {showroom?.City} {showroom?.State}</p>
              <p className='font-10pt font-700 text-center'>Phone: {showroom?.phoneNo} / {showroom?.email}</p>
              <p className='font-10pt font-700 text-center'>www.coopercwn.com</p>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

PrescriptionReceipt.propTypes = {
  open: PropTypes.bool.isRequired
};
