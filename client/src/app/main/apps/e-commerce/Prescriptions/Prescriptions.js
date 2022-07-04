import AddPrescription from './AddPrescription';
import CustomAlert from '../ReusableComponents/CustomAlert';
import FusePageCarded from '@fuse/core/FusePageCarded';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import Typography from '@material-ui/core/Typography';
import { useParams } from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import { firestore } from 'firebase';

function Prescriptions(props) {
  const [openAlertOnBack, setOpenAlertOnBack] = useState(false);
  const [changeOccured, setChangeOccured] = useState(false);
  const [fetchedId, setFetchedId] = useState(0);
  const routeParams = useParams();

  useEffect(() => {
    if (routeParams.prescriptionId) {
      const prescriptionId = routeParams.prescriptionId;
      const fetchDetails = async () => {
        const queryEditPrescription = await firestore()
          .collection('prescriptions')
          .where('prescriptionId', '==', Number(prescriptionId))
          .limit(1)
          .get();

        let resultEditPrescription = queryEditPrescription.docs[0].data();
        setFetchedId(resultEditPrescription?.customerId);
      };
      fetchDetails();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routeParams.customerId]);

  return (
    <FusePageCarded
      header={
        <div>
          <IconButton
            onClick={() => {
              if (changeOccured) {
                setOpenAlertOnBack(true);
              } else if (routeParams.customerId) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                );
              } else {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${fetchedId}`
                );
              }
            }}>
            <Icon className="text-20">arrow_back</Icon>
            <span className="mx-4 text-12">Customer's Profile</span>
          </IconButton>

          <div className="flex flex-row">
            <Icon className="text-20 mt-4">listalt</Icon>
            <Typography className="text-16 pl-16 sm:text-20 truncate">
              Prescription Details
            </Typography>
          </div>
          <CustomAlert
            open={openAlertOnBack}
            setOpen={setOpenAlertOnBack}
            text1="Discard Changes?"
            text2="All the changes will be lost. Are you sure?"
            customFunction={() => {
              if (routeParams.customerId) {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${routeParams.customerId}`
                );
              } else {
                props.history.push(
                  `/apps/e-commerce/customers/profile/${fetchedId}`
                );
              }
            }}
          />
        </div>
      }
      content={<AddPrescription setChangeOccured={setChangeOccured} />}
      innerScroll
    />
  );
}

export default withReducer('eCommerceApp', reducer)(Prescriptions);
