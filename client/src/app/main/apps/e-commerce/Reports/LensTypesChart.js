import Widget2 from '../../dashboards/analytics/widgets/Widget2';
import React, { useEffect, useState } from 'react';
import FuseLoading from '@fuse/core/FuseLoading';
import CustomAutocomplete from './Autocomplete';
import { firestore } from 'firebase';
import { useForm } from '@fuse/hooks';

const LensTypesChart = (props) => {

  const { orders, widget2 } = props;
  const [data, setData] = useState(false);
  const { form, handleChange, setForm } = useForm({ lensTypeName: '' });
  const [lensTypeNames, setLensTypeNames] = useState([]);


  useEffect(() => {
    let newData = JSON.parse(JSON.stringify(widget2));
    newData.labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
    newData.datasets[0].data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    newData.datasets[0].label = 'Lens Types'

    orders.forEach((order) => {
      const month = order?.orderDate.toDate().getMonth();
      order.eyeglasses.map((pair) => {
        if (form?.lensTypeName !== '' && pair?.lensTypeName === form?.lensTypeName) newData.datasets[0].data[month] += 1;
        return null
      })
    });

    setData(newData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, form]);

  useEffect(() => {
    const fetchDetails = async () => {
      const lensPrice = (
        await firestore().collection('lensPrice').doc('lensPrice').get()
      ).data();
      var keys = Object.keys(lensPrice);
      let lensTypeNames = [];
      keys.forEach((row) => {
        lensTypeNames.push({ lensTypeName: row.replace(/"/g, '') });
      });
      setLensTypeNames(lensTypeNames);
    }

    fetchDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!widget2 || !data) return <FuseLoading />;
  return (
    <div className="w-full py-4">
      <div className="flex flex-row justify-between relative">
        <div className="flex flex-col px-4 w-full">
          <Widget2 title="Lens Types" data={data} />

        </div>
        <div className="absolute top-0 right-0">
          <div className='flex flex-col min-w-160 pr-4'>
            <CustomAutocomplete
              list={lensTypeNames}
              form={form}
              setForm={setForm}
              handleChange={handleChange}
              id="lensTypeName"
              freeSolo={false}
              label="Lens Type"
              disabled={false}
            />
          </div>
        </div>
      </div>
    </div>

  );
};
export default LensTypesChart;
