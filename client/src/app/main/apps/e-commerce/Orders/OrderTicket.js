import '../Customers/Themes.css';
import { firestore } from 'firebase';
import { useReactToPrint } from 'react-to-print';
import AddIcon from '@material-ui/icons/Add';
import BarcodeGenerator from '../ReusableComponents/BarcodeGenerator';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import moment from 'moment'
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';

export default function OrderTicket(props) {
  const {
    mainForm,
    customer,
    open,
    handleClose,
    eyeglasses,
    contactLenses,
  } = props;

  const [showroom, setShowroom] = useState(false);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    const fetchDetails = async () => {
      if (!mainForm?.locationName) return
      const queryShowroom = await firestore()
        .collection('showRooms')
        .where('locationName', '==', mainForm?.locationName)
        .limit(1)
        .get();
        if (queryShowroom.empty) return true
      let resultShowRoom = queryShowroom.docs[0].data();
      resultShowRoom.id = queryShowroom.docs[0].id;

      setShowroom(resultShowRoom);
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog
      maxWidth="xs"
      fullWidth
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}>
      <div className='flex flex-col w-full'>
        <div className='flex flex-row justify-center my-10'>
          <Fab
            onClick={handlePrint}
            variant="extended"
            color="primary"
            aria-label="add">
            <AddIcon />
            Print
          </Fab>
        </div>

        <div ref={componentRef}>
          <div class="flex justify-center items-center">
            <div class="thermal-paper p-2">
              <div className='flex flex-col w-full justify-center p-10'>
                <p className='font-12pt text-center font-700'>{showroom?.locationName}</p>
                <p className='font-12pt text-center font-700'>{showroom?.State}</p>
                <div className='flex flex-row justify-between items-center'>
                  <p className='flex-1 pt-4 font-14pt text-left font-700'>{mainForm?.redoOrder ? 'REDO' : ''}</p>
                  <p className='flex-1 pt-4 font-9pt text-center font-400'>{moment(mainForm?.orderDate).format('MM/DD/YYYY')}</p>
                  <p className='flex-1 pt-4 font-14pt text-right font-700'>{mainForm?.rushFrameOrder ? 'RUSH' : ''}</p>
                </div>
                <div className='flex flex-row justify-between items-center'>
                  <p className='pt-4 font-9pt text-left font-700'>{customer?.customCustomerId}</p>
                  <p className='pt-4 font-9pt text-right font-700'>{customer?.firstName} {customer?.lastName}</p>
                </div>
                <div className='w-full div-3px bg-black my-4'></div>
                {customer?.memos && (
                  <div>
                    <p className='pt-4 font-9pt text-center font-700'>NOTE</p>
                    <p className='pt-4 font-9pt text-left'>{customer?.memos}</p>
                    <div className='w-full h-2 bg-black my-4'></div>
                  </div>
                )}
                {eyeglasses?.length > 0 && (
                  <div>
                    <p className='py-6 font-9pt text-center font-700'>EYEGLASSES PRESCRIPTION</p>
                    <div className="flex flex-row w-full">
                      <div className="w-20">
                        <p className='font-7pt text-center font-700'>Rx</p>
                      </div>
                      <div className="w-1/6">
                        <p className='font-7pt text-center font-700'>Sphere</p>
                      </div>
                      <div className="w-1/6">
                        <p className='font-7pt text-center font-700'>Cylinder</p>
                      </div>
                      <div className="w-1/6">
                        <p className='font-7pt text-center font-700'>Axis</p>
                      </div>
                      <div className="w-1/6">
                        <p className='font-7pt text-center font-700'>Add</p>
                      </div>
                      <div className="w-2/6">
                        <p className='font-7pt text-center font-700'>Prism/Base</p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full border-collapse">
                      <div className="w-20 border-box">
                        <p className='font-7pt text-center'>OD</p>
                      </div>
                      <div className="w-1/6 border-box">
                        <p className='font-7pt text-center'>{!isNaN(Number(eyeglasses[0]?.eyeglassesSphereOd)) ? Number(eyeglasses[0]?.eyeglassesSphereOd).toFixed(2) : eyeglasses[0]?.eyeglassesSphereOd}</p>
                      </div>
                      <div className="w-1/6 border-box">
                        <p className='font-7pt text-center'>{!isNaN(Number(eyeglasses[0]?.eyeglassesCylinderOd)) ? Number(eyeglasses[0]?.eyeglassesCylinderOd).toFixed(2) : eyeglasses[0]?.eyeglassesCylinderOd}</p>
                      </div>
                      <div className="w-1/6 border-box">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.eyeglassesAxisOd}</p>
                      </div>
                      <div className="w-1/6 border-box">
                        <p className='font-7pt text-center'>{!isNaN(Number(eyeglasses[0]?.eyeglassesAddOd)) ? Number(eyeglasses[0]?.eyeglassesAddOd).toFixed(2) : eyeglasses[0]?.eyeglassesAddOd}</p>
                      </div>
                      <div className="w-2/6 border-box border-r-1">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.eyeglassesPrismOd}</p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full border-collapse">
                      <div className="w-20 border-box border-b-1">
                        <p className='font-7pt text-center'>OD</p>
                      </div>
                      <div className="w-1/6 border-box border-b-1">
                        <p className='font-7pt text-center'>{!isNaN(Number(eyeglasses[0]?.eyeglassesSphereOs)) ? Number(eyeglasses[0]?.eyeglassesSphereOs).toFixed(2) : eyeglasses[0]?.eyeglassesSphereOs}</p>
                      </div>
                      <div className="w-1/6 border-box border-b-1">
                        <p className='font-7pt text-center'>{!isNaN(Number(eyeglasses[0]?.eyeglassesCylinderOs)) ? Number(eyeglasses[0]?.eyeglassesCylinderOs).toFixed(2) : eyeglasses[0]?.eyeglassesCylinderOs}</p>
                      </div>
                      <div className="w-1/6 border-box border-b-1">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.eyeglassesAxisOs}</p>
                      </div>
                      <div className="w-1/6 border-box border-b-1">
                        <p className='font-7pt text-center'>{!isNaN(Number(eyeglasses[0]?.eyeglassesAddOs)) ? Number(eyeglasses[0]?.eyeglassesAddOs).toFixed(2) : eyeglasses[0]?.eyeglassesAddOs}</p>
                      </div>
                      <div className="w-2/6 border-box border-r-1 border-b-1">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.eyeglassesPrismOs}</p>
                      </div>
                    </div>

                    <div className="flex flex-row w-full px-32 pt-6">
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>PD</p>
                      </div>
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>OU</p>
                      </div>
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>OD</p>
                      </div>
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>OS</p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full border-collapse px-32">
                      <div className="w-1/4 border-box">
                        <p className='font-7pt text-center'>Distance</p>
                      </div>
                      <div className="w-1/4 border-box">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.pdOuDistance}</p>
                      </div>
                      <div className="w-1/4 border-box">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.pdOdDistance}</p>
                      </div>
                      <div className="w-1/4 border-box border-r-1">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.pdOsDistance}</p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full border-collapse px-32 pb-6">
                      <div className="w-1/4 border-box border-b-1">
                        <p className='font-7pt text-center'>Near</p>
                      </div>
                      <div className="w-1/4 border-box border-b-1">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.pdOuNear}</p>
                      </div>
                      <div className="w-1/4 border-box border-b-1">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.pdOdNear}</p>
                      </div>
                      <div className="w-1/4 border-box border-r-1 border-b-1">
                        <p className='font-7pt text-center'>{eyeglasses[0]?.pdOsNear}</p>
                      </div>
                    </div>
                    <div className='w-full h-2 bg-black my-4'></div>
                  </div>
                )}
                {eyeglasses.map((row, index) => (
                  <div>
                    <p className='pt-4 font-9pt text-center font-700'>EYEGLASSES ORDER {mainForm?.customOrderId}-E{index + 1}</p>
                    <div className='flex flex-row w-full'>
                      <div className='flex flex-col w-1/2 border-box my-8 border-b-1'>
                        <p className='pt-4 font-9pt text-center font-700'>Frame</p>
                        <p className='pl-4 font-9pt text-left'>Brand: {row?.frameBrand}</p>
                        <p className='pl-4 font-9pt text-left'>Model: {row?.frameModel}</p>
                        <p className='pl-4 font-9pt text-left'>Color: {row?.frameColour}</p>
                        <p className='pl-4 font-9pt text-left'>Seg Ht OD: {row?.segHtOd}</p>
                        <p className='pl-4 font-9pt text-left'>Seg Ht OS: {row?.segHtOs}</p>
                      </div>
                      <div className='flex flex-col w-1/2 border-box my-8 border-b-1 border-r-1'>
                        <p className='pt-4 font-9pt text-center font-700'>Lens</p>
                        <p className='pl-4 font-9pt text-left'>{row?.lensType}</p>
                        <p className='pl-4 font-9pt text-left'>Lens Type: {row?.lensTypeName}</p>
                        <p className='pl-4 font-9pt text-left'>Color / Tint: {row?.lensColour}</p>
                        <p className='pl-4 font-9pt text-left'>Detail: {row?.lensDetail}</p>
                      </div>
                    </div>
                    {mainForm?.shipFrameToCustomerLogic && (<p className='pt-4 px-32 font-9pt text-left'> - Ship To Customer</p>)}
                    {row?.frameLater && (<p className='pt-4 px-32 font-9pt text-left'> - Frame to Come Later</p>)}
                    {row?.orderFrameInsurance && (<p className='px-32 font-9pt text-left'> - Order Frame From Insurance</p>)}
                    {row?.cutLensOnly && (<p className='pt-12 px-32 font-9pt text-left'> - Cut Lens Only</p>)}
                    {row?.orderLensInsurance && (<p className='px-32 font-9pt text-left'> - Order Lens From Insurance</p>)}
                    <div className='flex flex-row justify-center my-8'>
                      <BarcodeGenerator text={`${mainForm?.customOrderId}-E${index + 1}`} />
                    </div>
                    <div className='w-full h-2 bg-black my-4'></div>
                  </div>
                ))}
                {contactLenses?.length > 0 && (
                  <div>
                    <p className='py-6 font-9pt text-center font-700'>CONTACT LENS PRESCRIPTION</p>
                    <div className="flex flex-row w-full">
                      <div className="w-20">
                        <p className='font-7pt text-center font-700'>Rx</p>
                      </div>
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>Sphere</p>
                      </div>
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>Cylinder</p>
                      </div>
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>Axis</p>
                      </div>
                      <div className="w-1/4">
                        <p className='font-7pt text-center font-700'>Add</p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full border-collapse">
                      <div className="w-20 border-box">
                        <p className='font-7pt text-center'>OD</p>
                      </div>
                      <div className="w-1/4 border-box">
                        <p className='font-7pt text-center'>{!isNaN(Number(contactLenses[0]?.contactLensSphereOd)) ? Number(contactLenses[0]?.contactLensSphereOd).toFixed(2) : contactLenses[0]?.contactLensSphereOd}</p>
                      </div>
                      <div className="w-1/4 border-box">
                        <p className='font-7pt text-center'>{!isNaN(Number(contactLenses[0]?.contactLensCylinderOd)) ? Number(contactLenses[0]?.contactLensCylinderOd).toFixed(2) : contactLenses[0]?.contactLensCylinderOd}</p>
                      </div>
                      <div className="w-1/4 border-box">
                        <p className='font-7pt text-center'>{contactLenses[0]?.contactLensAxisOd}</p>
                      </div>
                      <div className="w-1/4 border-box border-r-1">
                        <p className='font-7pt text-center'>{!isNaN(Number(contactLenses[0]?.contactLensAddOd)) ? Number(contactLenses[0]?.contactLensAddOd).toFixed(2) : contactLenses[0]?.contactLensAddOd}</p>
                      </div>
                    </div>
                    <div className="flex flex-row w-full border-collapse">
                      <div className="w-20 border-box border-b-1">
                        <p className='font-7pt text-center'>OS</p>
                      </div>
                      <div className="w-1/4 border-box border-b-1">
                        <p className='font-7pt text-center'>{!isNaN(Number(contactLenses[0]?.contactLensSphereOs)) ? Number(contactLenses[0]?.contactLensSphereOs).toFixed(2) : contactLenses[0]?.contactLensSphereOs}</p>
                      </div>
                      <div className="w-1/4 border-box border-b-1">
                        <p className='font-7pt text-center'>{!isNaN(Number(contactLenses[0]?.contactLensCylinderOs)) ? Number(contactLenses[0]?.contactLensCylinderOs).toFixed(2) : contactLenses[0]?.contactLensCylinderOs}</p>
                      </div>
                      <div className="w-1/4 border-box border-b-1">
                        <p className='font-7pt text-center'>{contactLenses[0]?.contactLensAxisOs}</p>
                      </div>
                      <div className="w-1/4 border-box border-b-1 border-r-1">
                        <p className='font-7pt text-center'>{!isNaN(Number(contactLenses[0]?.contactLensAddOs)) ? Number(contactLenses[0]?.contactLensAddOs).toFixed(2) : contactLenses[0]?.contactLensAddOs}</p>
                      </div>
                    </div>

                    <div className='w-full h-2 bg-black my-4'></div>
                  </div>
                )}
                {contactLenses.map((row, index) => (
                  <div>
                    <p className='pt-4 font-9pt text-center font-700'>CONTACT LENS ORDER {mainForm?.customOrderId}-CL{index + 1}</p>
                    <div className='flex flex-row w-full'>
                      <div className='flex flex-col w-1/2 border-box my-8 border-b-1'>
                        <p className='pt-4 font-9pt text-center font-700'>OD</p>
                        <p className='pl-4 font-9pt text-left'>Style: {row?.contactLensStyleOd}</p>
                        <p className='pl-4 font-9pt text-left'>Brand: {row?.contactLensBrandOd}</p>
                        <p className='pl-4 font-9pt text-left'>Model: {row?.contactLensNameOd}</p>
                        <p className='pl-4 font-9pt text-left'>Base Curve: {row?.contactLensBaseCurveOd}</p>
                      </div>
                      <div className='flex flex-col w-1/2 border-box my-8 border-b-1 border-r-1'>
                        <p className='pt-4 font-9pt text-center font-700'>OS</p>
                        <p className='pl-4 font-9pt text-left'>Style: {row?.contactLensStyleOs}</p>
                        <p className='pl-4 font-9pt text-left'>Brand: {row?.contactLensBrandOs}</p>
                        <p className='pl-4 font-9pt text-left'>Model: {row?.contactLensNameOs}</p>
                        <p className='pl-4 font-9pt text-left'>Base Curve: {row?.contactLensBaseCurveOs}</p>
                      </div>
                    </div>
                    {mainForm?.shipContactLensToCustomerLogic && (<p className='pt-4 px-32 font-9pt text-left'> - Ship To Customer</p>)}
                    {row?.orderFromShowroom && (<p className='pt-4 px-32 font-9pt text-left'> - Order From Showroom</p>)}
                    {row?.contactLensInsurance && (<p className='px-32 font-9pt text-left'> - Order From Insurance</p>)}
                    <div className='flex flex-row justify-center my-8'>
                      <BarcodeGenerator text={`${mainForm?.customOrderId}-CL${index + 1}`} />
                    </div>
                    <div className='w-full h-2 bg-black my-4'></div>
                  </div>
                ))}
                <div className='flex flex-row w-full mt-192'>
                  <div className='flex flex-row w-2/3 justify-center border-box'>
                    <BarcodeGenerator text={mainForm?.customOrderId} />
                  </div>
                  <div className='flex flex-col w-1/3 justify-center border-box border-r-1'>
                    <p className='font-9pt text-center font-700'>{showroom?.locationName}</p>
                    <p className='font-9pt text-center font-700'>{showroom?.State}</p>
                    <p className='font-9pt text-center'>{moment(mainForm?.orderDate).format('MM/DD/YYYY')}</p>
                  </div>
                </div>
                <div className='flex flex-row w-full mb-60'>
                  <div className='flex flex-row w-2/3 justify-center border-box border-b-1'>
                    <p className='font-12pt text-center font-700'>{`${customer?.firstName} ${customer?.lastName}`}</p>
                  </div>
                  <div className='flex flex-col w-1/3 justify-center border-box border-r-1 border-b-1'>
                    <p className='font-12pt text-center font-700'>{mainForm?.rushFrameOrder ? 'RUSH' : ''}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

OrderTicket.propTypes = {
  open: PropTypes.bool.isRequired
};
