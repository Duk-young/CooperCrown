import { useForm } from '@fuse/hooks';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import Fab from '@material-ui/core/Fab';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FusePageCarded from '@fuse/core/FusePageCarded';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import TableGrid from './TableGrid';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { firestore } from 'firebase';

function LensPrice() {
  const [lensTypes, setLensTypes] = useState([]);
  const { form, handleChange, setForm } = useForm({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const lensPrice = (
        await firestore().collection('lensPrice').doc('lensPrice').get()
      ).data();
      var keys = Object.keys(lensPrice);
      let lensTypes = [];
      keys.forEach((row) => {
        lensTypes.push({ a: row.replace(/"/g, '') });
      });
      setLensTypes(lensTypes);
    };

    fetchDetails();
  }, []);

  const customFunction = async (value) => {
    if (value) {
      const lensPrices = (
        await firestore().collection('lensPrice').doc('lensPrice').get()
      ).data();
      setRows(lensPrices[value]);
    } else {
      setRows([]);
    }
  };

  return (
    <FusePageCarded
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start w-full">
            <div className="flex flex-row items-center w-full">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <img
                  className="w-25 ml-10 sm:w-48 rounded"
                  src="assets/images/ecommerce/product-image-placeholder.png"
                  alt={''}
                />
              </FuseAnimate>
              <div className="flex flex-col mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 ml-10 sm:text-20 truncate">
                    Lens Price
                  </Typography>
                </FuseAnimate>
              </div>
              <div className="flex flex-1 justify-around">
                <div className="flex flex-col px-10 w-1/2 ">
                  <CustomAutocomplete
                    list={lensTypes}
                    form={form}
                    setForm={setForm}
                    handleChange={handleChange}
                    id="a"
                    freeSolo={false}
                    label="Select Lens Type"
                    customFunction={customFunction}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 ">
          <TableGrid form={form} rows={rows} setRows={setRows} />
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(LensPrice);
