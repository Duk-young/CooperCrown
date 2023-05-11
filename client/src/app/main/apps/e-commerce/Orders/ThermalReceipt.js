import '../Customers/Themes.css';
import { firestore } from 'firebase';
import { useReactToPrint } from 'react-to-print';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import logo from './images/logo.JPG';
import moment from 'moment'
import PropTypes from 'prop-types';
import React, { useEffect, useState, useRef } from 'react';

export default function ThermalReceipt(props) {
  const {
    mainForm,
    open,
    handleClose,
    eyeglasses,
    contactLenses,
    medication,
    otherProductInfo,
    payments,
    handleTotal,
    handleBalance
  } = props;

  const [templates, setTemplates] = useState([]);

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
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
    };
    fetchDetails();
  }, []);

  return (
    <Dialog
      maxWidth="xs"
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

        <div ref={componentRef}>
          <div class="flex justify-center items-center">
            <div class="thermal-paper p-2">
              <div className='flex flex-col w-full border-1 border-black justify-center p-10'>
                <p className='font-12pt text-center'>cooper crown</p>
                <div className="mx-auto w-28">
                  <img src={logo} alt="" />
                </div>
                <p className=' pt-4 font-12pt text-center'>RECEIPT</p>
                <div className='flex flex-row justify-between'>
                  <p className=' pt-4 font-9pt text-center font-700'>Order No. {mainForm?.customOrderId}</p>
                  <p className=' pt-4 font-9pt text-center font-700'>{moment(mainForm?.orderDate).format('MM/DD/YYYY')}</p>
                </div>
                <div className='w-full h-2 bg-black my-4'></div>
                {eyeglasses.map((row, index) => (
                  <div key={index} className='flex flex-row w-full justify-between px-10 pb-6'>
                    <div>
                      <p className='font-9pt font-700'>-{row?.frameBrand ?? '-'}</p>
                      <p className='pl-6 font-7pt font-700'>{row.frameModel ?? '-'} / {row.frameColour ?? '-'}</p>
                      <p className='pl-6 font-7pt font-700'>{row.lensType ?? '-'} / {row.lensTypeName ?? '-'}</p>
                      <p className='pl-6 font-7pt font-700'>{row.lensColour ?? '-'} / {row.lensTypeName ?? '-'}</p>
                    </div>
                    <div>
                      <p className='font-7pt font-700'>{(Number(row?.frameRate || 0) + Number(row?.lensRate || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    </div>
                  </div>
                ))}
                {contactLenses.map((row, index) => (
                  <div key={index} className='flex flex-row w-full justify-between px-10 pb-6'>
                    <div>
                      <p className='font-9pt font-700'>-{row?.contactLensStyleOd ?? '-'}</p>
                      <p className='pl-6 font-7pt font-700'>{row.contactLensBrandOd ?? '-'} / {row.contactLensNameOd ?? '-'}</p>
                      <p className='pl-6 font-7pt font-700'>{row.contactLensBaseCurveOd ?? '-'} / {row.contactLensPackQtyOd ?? '-'}</p>
                    </div>
                    <div>
                      <p className='font-7pt font-700'>{(Number(row?.contactLensRate || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    </div>
                  </div>
                ))}
                {medication.map((row, index) => (
                  <div key={index} className='flex flex-row w-full justify-between px-10 pb-6'>
                    <div>
                      <p className='font-9pt font-700'>-{row?.name ?? '-'}</p>
                    </div>
                    <div>
                      <p className='font-7pt font-700'>{(Number(row?.price || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    </div>
                  </div>
                ))}
                {otherProductInfo.map((row, index) => (
                  <div key={index} className='flex flex-row w-full justify-between px-10 pb-6'>
                    <div>
                      <p className='font-9pt font-700'>-{row?.otherProductBrand ?? '-'}</p>
                      <p className='pl-6 font-7pt font-700'>{row.otherProductModel ?? '-'} / {row.otherProductColour ?? '-'}</p>
                      <p className='pl-6 font-7pt font-700'>{row.otherProductMaterial ?? '-'} / {row.otherProductSize ?? '-'}</p>
                    </div>
                    <div>
                      <p className='font-7pt font-700'>{(Number(row?.otherProductPrice || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                    </div>
                  </div>
                ))}
                <div className='w-full h-2 border-b-1 border-black border-dotted my-8'></div>
                <div className='flex flex-row w-full justify-between px-10 pb-6'>
                  <p className='pl-6 font-9pt font-700'>Sub Total</p>
                  <p className='font-7pt font-700'>${handleTotal().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                </div>
                {mainForm?.discount && (
                  <div className='flex flex-row w-full justify-between px-10'>
                    <p className='font-9pt font-700'>Discount</p>
                    <p className='font-7pt font-700'>-${Number(mainForm?.discount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                  </div>
                )}
                {(mainForm?.insuranceCostOne || mainForm?.insuranceCostTwo) && (
                  <div className='flex flex-row w-full justify-between px-10'>
                    <p className='font-9pt font-700'>Insurance Coverage</p>
                    <p className='font-7pt font-700'>-${(((+mainForm?.insuranceCostOne) || 0) + ((+mainForm?.insuranceCostTwo) || 0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                  </div>
                )}
                {payments?.length > 0 && (
                  <div className='flex flex-row w-full justify-between px-10 pb-10'>
                    <p className='font-9pt font-700'>Payments</p>
                    <p className='font-7pt font-700'>-${payments.reduce((a, b) => +a + +b.amount, 0).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                  </div>
                )}
                <div className='flex flex-row w-full justify-between px-10 pb-10'>
                  <p className='font-9pt font-700'>Balance</p>
                  <p className='font-7pt font-700'>${handleBalance().toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</p>
                </div>
                <div className='mt-12'>
                  {templates.map((row) => (
                    <p className='font-7pt font-grey'>{row}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

ThermalReceipt.propTypes = {
  open: PropTypes.bool.isRequired
};
