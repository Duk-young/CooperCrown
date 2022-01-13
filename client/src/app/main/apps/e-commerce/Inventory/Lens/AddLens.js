import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FuseAnimate from '@fuse/core/FuseAnimate';
import { useForm } from '@fuse/hooks';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore } from 'firebase';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import * as MessageActions from 'app/store/actions/fuse/message.actions';
import React, { useState, useEffect } from 'react';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

const useStyles = makeStyles((theme) => ({
  layoutRoot: {}
}));

function AddOther(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { form, handleChange, setForm } = useForm(null);
  const [isLoading, setisLoading] = useState(false);
  const routeParams = useParams();

  useEffect(() => {
    const id = routeParams.lensId;
    const fetchLens = async () => {
      const query = await firestore()
        .collection('lens')
        .where('lensId', '==', Number(id))
        .limit(1)
        .get();

      let result = query.docs[0].data();
      result.date = result.date && result.date.toDate();
      result.id = query.docs[0].id;
      setForm(result);
      setisLoading(false);
    };

    if (id) fetchLens();
    else {
      setForm({});
      setisLoading(false);
    }
  }, [routeParams, setForm]);

  if (isLoading) {
    return <FuseLoading />;
  }

  const onSubmit = async () => {
    if (form.lensId) {
      setisLoading(true);

      try {
        const ref = firestore().collection('lens').doc(form?.id);

        let data = {
          ...form,
          date: firestore.Timestamp.fromDate(form?.date),
          initialQuantity: form.quantity
        };

        await ref.set(data);

        dispatch(
          MessageActions.showMessage({
            message: 'Lens detail updated successfully'
          })
        );
        props.history.push('/apps/inventory');
      } catch (error) {
        console.log(error);
      }

      setisLoading(false);
    } else {
      setisLoading(true);

      try {
        const lensId = (
          await firestore().collection('dbConfig').doc('dbConfig').get()
        ).data();

        await firestore()
          .collection('lens')
          .add({
            ...form,
            date: firestore.Timestamp.fromDate(form?.date),
            lensId: lensId?.lensId + 1,
            initialQuantity: form.quantity
          });

        await firestore()
          .collection('dbConfig')
          .doc('dbConfig')
          .update({ lensId: lensId?.lensId + 1 });
        dispatch(
          MessageActions.showMessage({
            message: 'Lens data saved to firebase'
          })
        );

        props.history.push('/apps/inventory');
      } catch (error) {
        console.log(error);
      }
      setisLoading(false);
    }
  };

  return (
    <FusePageCarded
      classes={{
        root: classes.layoutRoot
      }}
      header={
        <div className="py-24">
          <h1>Lens Details</h1>
        </div>
      }
      contentToolbar={
        <div className="px-24">
          <h4>Please fill all the required fields properly!</h4>
        </div>
      }
      content={
        !form ? (
          <></>
        ) : (
          <div className="p-16 sm:p-24 ">
            <div className="flex flex-row items-center flex-wrap">
              <div className="flex w-1/4 ">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.firstName}
                  required
                  label="SKU"
                  autoFocus
                  id="sku"
                  name="sku"
                  value={form?.sku}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>

              <div className="flex w-1/4 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Lens Material"
                  id="material"
                  name="material"
                  value={form?.material}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-1/4 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Sphere"
                  id="sphere"
                  name="sphere"
                  value={form?.sphere}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-1/4 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Cylinder"
                  id="cylinder"
                  name="cylinder"
                  value={form?.cylinder}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="flex flex-row items-center flex-wrap">
              <div className="flex w-200">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid container>
                    <KeyboardDatePicker
                      margin="normal"
                      label="Date"
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      value={form?.date}
                      onChange={(date) => {
                        handleChange({ target: { name: 'date', value: date } });
                      }}
                      KeyboardButtonProps={{
                        'aria-label': 'change date'
                      }}
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
              </div>
              <div className="flex w-200 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Made In"
                  id="madeIn"
                  name="madeIn"
                  value={form?.madeIn}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex w-512 pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Supplier"
                  id="supplier"
                  name="supplier"
                  value={form?.supplier}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Quantity"
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={form?.quantity}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="W.S $"
                  id="ws"
                  name="ws"
                  value={form?.ws}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
              <div className="flex  pl-10">
                <TextField
                  className="mt-8 mb-16"
                  //   error={error?.lastName}
                  required
                  label="Retail $"
                  id="retailRate"
                  name="retailRate"
                  value={form?.retailRate}
                  onChange={handleChange}
                  variant="outlined"
                  fullWidth
                />
              </div>
            </div>
            <div className="ml-52">
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={form?.retail}
                    onChange={handleChange}
                    name="retail"
                  />
                }
                label="Retail Sale"
              />
              <FormControlLabel
                control={
                  <GreenCheckbox
                    checked={form?.wholeSale}
                    onChange={handleChange}
                    name="wholeSale"
                  />
                }
                label="Whole Sale"
              />
            </div>

            <FuseAnimate animation="transition.slideRightIn" delay={300}>
              <Button
                className="whitespace-no-wrap normal-case"
                variant="contained"
                color="secondary"
                onClick={!form ? undefined : onSubmit}>
                Save Details
              </Button>
            </FuseAnimate>
          </div>
        )
      }
    />
  );
}

export default AddOther;
