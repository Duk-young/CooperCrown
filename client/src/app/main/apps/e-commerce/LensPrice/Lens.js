import { useForm } from '@fuse/hooks';
import CustomAutocomplete from '../ReusableComponents/Autocomplete';
import FuseAnimate from '@fuse/core/FuseAnimate';
import AddLensTypeDialog from './AddLensTypeDialog';
import FusePageCarded from '@fuse/core/FusePageCarded';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import { makeStyles } from '@material-ui/core/styles';
import TableGrid from './TableGrid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import { firestore } from 'firebase';
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
function Lens() {
  const [lensTypes, setLensTypes] = useState([]);
  const { form, handleChange, setForm } = useForm({});
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [disabledState, setDisabledState] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
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
      // console.log(lensTypes)
      // console.log(lensTypes.length)
      // console.log(lensTypes[3]);
      for (let i = 0; i < lensTypes.length; i++) {
        console.log(lensTypes[i]);
      }
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
              <div className="flex flex-col mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 ml-10 sm:text-20 truncate">
                    Lens Pricej
                  </Typography>
                </FuseAnimate>
              </div>
              {/* <div className="flex flex-1 justify-around">
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
              </div> */}
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 ">
          <div className='justify-right'>
            <AddLensTypeDialog open={open} handleClose={handleClose} />

            {!disabledState && (
              <> <Button

                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={() => {
                  setOpen(true);
                }}
                aria-label="add">

                Add New Lens Type
              </Button></>

            )}
          </div>
          <CustomAutocomplete
            list={lensTypes}
            form={form}
            size="small"
            setForm={setForm}
            handleChange={handleChange}
            id="a"
            freeSolo={false}
            label="Select Lens Type"
            customFunction={customFunction}
          />

          <br></br>
          <TableGrid form={form} rows={rows} setRows={setRows} />
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Lens);
