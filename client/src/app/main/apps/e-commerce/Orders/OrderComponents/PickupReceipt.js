import { firestore } from 'firebase';
import Dialog from '@material-ui/core/Dialog';
import Fab from '@material-ui/core/Fab';
import CanvasDraw from 'react-canvas-draw';
import moment from 'moment'
import DocSig from '../../Exams/DocSig.PNG'
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    button: {
        backgroundColor: '#f15a25',
        color: '#fff',
        width: '100%',
        '&:hover': {
            backgroundColor: '#f47b51',
            color: '#fff'
        }
    },
}));

export default function PickupReceipt(props) {
    const { mainForm, setMainForm, open, handleClose, eyeglasses, contactLenses } = props;
    const [saveableCanvas, setSaveableCanvas] = useState();
    const [disabledState, setDisabledState] = useState(false);
    const classes = useStyles();

    const handleSavePickupReceipt = async () => {
        setDisabledState(true)
        await firestore().collection('orders').doc(mainForm?.id).update({ pickupSign: mainForm?.pickupSign, pickupDate: firestore.Timestamp.fromDate(new Date()) })
        handleClose()
    }


    useEffect(() => {
        if (mainForm?.pickupSign && saveableCanvas) saveableCanvas.loadSaveData(mainForm?.pickupSign)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveableCanvas])

    return (
        <Dialog
            maxWidth="sm"
            fullWidth
            onClose={handleClose}
            aria-labelledby="simple-dialog-title"
            open={open}>
            <div className='flex flex-col w-full p-20 my-20'>
                <Typography className="text-20 font-700 text-center">
                    I Have Read And Aknowlege Cooper Crwn Store Policy.
                </Typography>
                <Typography className="text-20 font-700 text-center my-16">
                    Order Is Completed and I am Picking Up
                </Typography>
                {eyeglasses?.length > 0 && eyeglasses.map((row, index) => (
                    <Typography className="text-20 font-700 text-center my-6 text-red-300">
                        ORDER No. {mainForm?.customOrderId}-E{index + 1}
                    </Typography>
                ))}
                {contactLenses?.length > 0 && contactLenses.map((row, index) => (
                    <Typography className="text-20 font-700 text-center my-6 text-red-300">
                        ORDER No. {mainForm?.customOrderId}-CL{index + 1}
                    </Typography>
                ))}
                <Typography className="text-20 font-700 text-right my-6 mr-10">
                    {mainForm?.pickupDate ? moment(mainForm?.pickupDate.toDate()).format('MM/DD/YYYY') : moment().format('MM/DD/YYYY')}
                </Typography>
                <div className='flex justify-center'>
                    <div className="relative">
                        <CanvasDraw
                            ref={(canvasDraw) => setSaveableCanvas(canvasDraw)}
                            brushRadius={1}
                            disabled={disabledState || mainForm?.pickupDate}
                            brushColor={'#000000'}
                            imgSrc={DocSig}
                            onChange={() => {
                                setMainForm({ ...mainForm, pickupSign: saveableCanvas.getSaveData() });
                            }}
                            lazyRadius="0"
                            style={{
                                border: 1,
                                borderColor: '#000',
                                borderStyle: 'solid'
                            }}
                        />
                        <Fab
                            onClick={() => {
                                saveableCanvas.eraseAll();
                            }}
                            color="secondary"
                            disabled={disabledState || mainForm?.pickupDate}
                            className={classes.fab}>
                            Reset
                        </Fab>
                    </div>
                </div>
                <div className='flex flex-row p-20'>
                    <Button
                        className={classes.button}
                        variant="contained"
                        disabled={disabledState || mainForm?.pickupDate}
                        onClick={handleSavePickupReceipt}
                        aria-label="add">
                        Save Receipt
                    </Button>
                </div>
            </div>
        </Dialog>
    );
}

PickupReceipt.propTypes = {
    open: PropTypes.bool.isRequired
};
