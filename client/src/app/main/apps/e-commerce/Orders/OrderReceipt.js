import '../Customers/Themes.css';
import { firestore } from 'firebase';
import { useReactToPrint } from 'react-to-print';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import moment from 'moment'
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';

export default function OrderReceipt(props) {
  const { mainForm, open, handleClose, eyeglasses, contactLenses, medication, otherProductInfo, payments, handleTotal, handleBalance } = props;

  const [templates, setTemplates] = useState([]);
  const [showroom, setShowroom] = useState(false);

  const orderReceipt = useRef();
  const handlePrint = useReactToPrint({
    content: () => orderReceipt.current
  });

  useEffect(() => {
    const fetchDetails = async () => {
      const queryTemplates = (
        await firestore()
          .collection('emailTemplates')
          .doc('emailTemplates')
          .get()
      ).data();
      const terms = queryTemplates?.templates?.terms
        ? queryTemplates?.templates?.terms.split('<br>')
        : '';
      setTemplates(terms.length ? terms : []);

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

        <div ref={orderReceipt}>
          <table className='w-full'>
            <tbody className='w-full'>
              <div class="flex flex-col justify-center items-center w-full px-20 h-full">
                <div class="w-full">
                  <div className='flex flex-col w-full justify-center p-10 h-full'>
                    <div className="mx-auto w-160 flex flex-row justify-center py-16">
                      <img className="w-160" src="assets/images/logos/logoblack.svg" alt="logossss" />
                    </div>
                    <p className=' pt-4 font-13pt text-center font-700'>RECEIPT</p>
                    <div className='flex flex-row justify-between px-60'>
                      <p className=' pt-4 font-10pt text-center font-700'>Order No. {mainForm?.customOrderId}</p>
                      <p className=' pt-4 font-10pt text-center font-700'>{moment(mainForm?.orderDate).format('MM/DD/YYYY')}</p>
                    </div>
                    <div className='w-full h-2 bg-black my-4'></div>
                    {eyeglasses?.map((row, index) => (
                      <div key={index} className='flex flex-row w-full justify-between pl-64 pr-60 py-10'>
                        <div className='flex flex-row w-1/6'>
                          <p className='font-10pt text-left font-700'> - Eyeglasses</p>
                        </div>
                        <div className='flex flex-row w-4/6'>
                          <p className='pl-6 font-10pt text-leftfont-700'>{row?.frameBrand ?? '-'} / {row.frameModel ?? '-'} / {row.frameColour ?? '-'} /
                            {row.lensType ?? '-'} / {row.lensTypeName ?? '-'} / {row.lensColour ?? '-'}</p>
                        </div>
                        <div className='flex flex-col w-1/6'>
                          <p className='font-10pt text-right font-700'>{(Number(row?.frameRate || 0) + Number(row?.lensRate || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        </div>
                      </div>
                    ))}
                    {contactLenses?.map((row, index) => (
                      <div key={index} className='flex flex-row w-full justify-between pl-64 pr-60 py-10'>
                        <div className='flex flex-row w-1/6'>
                          <p className='font-10pt text-left font-700'> - Contact Lens</p>
                        </div>
                        <div className='flex flex-col w-4/6'>
                          <p className='pl-6 font-10pt text-leftfont-700'>{row?.contactLensStyleOd ?? '-'} / {row.contactLensBrandOd ?? '-'} /
                            {row.contactLensBaseCurveOd ?? '-'} / {row.contactLensBaseCurveOd ?? '-'} Unit Rate: {row?.clOdRate} x Qty: {row?.contactLensQtyOd}</p>
                          <p className='pl-6 font-10pt text-leftfont-700'>{row?.contactLensStyleOs ?? '-'} / {row.contactLensBrandOs ?? '-'} /
                            {row.contactLensBaseCurveOs ?? '-'} / {row.contactLensBaseCurveOs ?? '-'} Unit Rate: {row?.clOsRate} x Qty: {row?.contactLensQtyOs}</p>
                        </div>
                        <div className='flex flex-col w-1/6'>
                          <p className='font-10pt text-right font-700'>{(Number(row?.contactLensRate || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        </div>
                      </div>
                    ))}
                    {medication.map((row, index) => (
                      <div key={index} className='flex flex-row w-full justify-between pl-64 pr-60 py-10'>
                        <div className='flex flex-row w-2/6'>
                          <p className='font-10pt text-left font-700'> - {row?.name ?? '-'}</p>
                        </div>
                        <div className='w-3/6 hidden'></div>
                        <div className='flex flex-col w-1/6'>
                          <p className='font-10pt text-right font-700'>{(Number(row?.price || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        </div>
                      </div>
                    ))}
                    {otherProductInfo.map((row, index) => (
                      <div key={index} className='flex flex-row w-full justify-between pl-64 pr-60 py-10'>
                        <div className='flex flex-row w-1/6'>
                          <p className='font-10pt text-left font-700'> - {row?.otherProductBrand ?? '-'}</p>
                        </div>
                        <div className='flex flex-row w-4/6'>
                          <p className='pl-6 font-10pt text-leftfont-700'>{row.otherProductModel ?? '-'} / {row.otherProductColour ?? '-'} /
                            {row.otherProductMaterial ?? '-'} / {row.otherProductSize ?? '-'}</p>
                        </div>
                        <div className='flex flex-col w-1/6'>
                          <p className='font-10pt text-right font-700'>{(Number(row?.otherProductPrice || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        </div>
                      </div>
                    ))}
                    <div className='w-full h-2 border-b-1 border-black border-solid my-8'></div>

                    <div className='flex flex-row w-full'>
                      <div className='flex flex-row w-2/3'></div>
                      <div className='flex flex-col w-1/3 pr-60'>
                        <div className='flex flex-row justify-between py-12'>
                          <p className='font-10pt font-700'>Sub Total</p>
                          <p className='font-10pt font-700'>${handleTotal().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        </div>
                        {mainForm?.discount && (
                          <div className='flex flex-row w-full justify-between'>
                            <p className='font-10pt font-700'>Discount</p>
                            <p className='font-10pt font-700'>-${Number(mainForm?.discount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                          </div>
                        )}
                        {(mainForm?.insuranceCostOne || mainForm?.insuranceCostTwo) && (
                          <div className='flex flex-row w-full justify-between'>
                            <p className='font-10pt font-700'>Insurance Coverage</p>
                            <p className='font-10pt font-700'>-${(((+mainForm?.insuranceCostOne) || 0) + ((+mainForm?.insuranceCostTwo) || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                          </div>
                        )}
                        {payments?.length > 0 && (
                          <div className='flex flex-row w-full justify-between'>
                            <p className='font-10pt font-700'>Payments</p>
                            <p className='font-10pt font-700'>-${payments.reduce((a, b) => +a + +b.amount, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                          </div>
                        )}
                        <div className='flex flex-row w-full justify-between py-12'>
                          <p className='font-10pt font-700'>Balance</p>
                          <p className='font-10pt font-700'>${handleBalance().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                        </div>
                      </div>
                    </div>


                    <div className='px-40 mt-20'>
                      {templates.map((row) => (
                        <p className='font-7pt font-grey'>{row}</p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </tbody>

            <tfoot>
              <div class="page-footer-space"></div>
            </tfoot>
          </table>
          <div className='print-footer flex flex-col px-12 mb-16'>
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

OrderReceipt.propTypes = {
  open: PropTypes.bool.isRequired
};
