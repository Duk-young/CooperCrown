import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Grid } from '@material-ui/core';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import TableGrid from './TableGrid';

function LensPrice() {
  const dispatch = useDispatch();
  const product = useSelector(({ eCommerceApp }) => eCommerceApp.product);
  const [lensType, setLensType] = useState('');

  const [isLoading, setisLoading] = useState(false);
  const { form, setForm } = useForm(null);

  const routeParams = useParams();

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136'
      }}
      header={
        <div className="flex flex-1 w-full items-center justify-between">
          <div className="flex flex-col items-start max-w-full">
            <div className="flex items-center max-w-full">
              <FuseAnimate animation="transition.expandIn" delay={300}>
                <img
                  className="w-32 sm:w-48 rounded"
                  src="assets/images/ecommerce/product-image-placeholder.png"
                  alt={''}
                />
              </FuseAnimate>
              <div className="flex flex-col min-w-0 mx-8 sm:mc-16">
                <FuseAnimate animation="transition.slideLeftIn" delay={300}>
                  <Typography className="text-16 sm:text-20 truncate">
                    Lens Price
                  </Typography>
                </FuseAnimate>
              </div>
            </div>
          </div>
        </div>
      }
      content={
        <div className="p-16 sm:p-24 ">
          <Grid container>
            {/* <Grid item xs={12} md={4}>
              <TextField
                className="mt-8 mb-16"
                required
                label="Lens Type"
                placeholder="Enter Lens Type"
                autoFocus
                value={lensType}
                onChange={(e) => setLensType(e.target.value)}
                variant="standard"
                fullWidth
              />
            </Grid> */}
            <Grid xs={12}>
              <TableGrid />
            </Grid>
          </Grid>
        </div>
      }
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(LensPrice);
