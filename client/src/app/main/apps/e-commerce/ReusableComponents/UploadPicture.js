
import 'react-image-crop/dist/ReactCrop.css';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import { canvasPreview } from './canvasPreview';
import { firestore, storage } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useDebounceEffect } from './useDebounceEffect';
import { v4 as uuidv4 } from 'uuid';
import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import { useDispatch, useSelector } from 'react-redux';
import { toast, Zoom } from 'react-toastify';
import { setUserData } from 'app/auth/store/actions';

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: '#f15a25',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#f47b51',
            color: '#fff'
        }
    }
}));

export default function UploadPicture(props) {
    const { form, setForm, setisLoading, userId } = props;

    const imgRef = useRef(null);
    const dispatch = useDispatch()
    const classes = useStyles(props);
    const [crop, setCrop] = useState();
    const previewCanvasRef = useRef(null);
    const [open, setOpen] = useState(false);
    const [imgSrc, setImgSrc] = useState('');
    const [completedCrop, setCompletedCrop] = useState();
    const user = useSelector(state => state.auth.user);

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);
            setOpen(true)
            const reader = new FileReader();
            reader.addEventListener('load', () =>
                setImgSrc(reader.result.toString())
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    const onDownloadCropClick = async () => {
        if (!previewCanvasRef.current) {
            toast.error('Please crop the face to save first', {
                position: 'top-center',
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                transition: Zoom
              });
              return
        }

        setisLoading(true)
        const canvas = previewCanvasRef.current;
        canvas.toBlob(async (blob) => {
            if (!blob) {
                toast.error('Process failed. Please try again', {
                    position: 'top-center',
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    transition: Zoom
                  });
                  setisLoading(false)
                  return
            }
            setOpen(false)
            if (form?.pictureId) {
                await storage().ref(`images/${form?.pictureId}`).delete()
            }
            const id = uuidv4();
            await storage().ref(`images/${id}`).put(blob);

            const url = await storage().ref('images').child(id).getDownloadURL();
            await firestore().collection('users').doc(userId).update({ picture: url, pictureId: id })
            setForm({ ...form, picture: url, pictureId: id })

            dispatch(setUserData({
                ...user,
                data: {
                    ...user.data,
                    firestoreDetails: {
                        ...user.data?.firestoreDetails,
                        picture: url,
                    },
                },
            }));
            setisLoading(false)
        }, 'image/jpeg'); // Specify the desired MIME type here (e.g., 'image/jpeg')
    };


    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                );
            }
        },
        100,
        [completedCrop]
    );


    return (
        <>
            <Button variant="contained" component="label" className={classes.button}>
                {form?.picture ? 'Edit Picture' : 'Upload Picture'}
                <input type="file" accept="image/*" onChange={onSelectFile} onClick={(event) => { event.target.value = ''; }} hidden />
            </Button>

            <Dialog open={open} onClose={() => setOpen(false)}>
                <DialogTitle>Crop and Edit Image</DialogTitle>
                <DialogContent>
                    {imgSrc && (
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={16 / 16}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                            />
                        </ReactCrop>

                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={onDownloadCropClick} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <div className="hidden">
                {!!completedCrop && (
                    <>
                        <div>
                            <canvas
                                ref={previewCanvasRef}
                                style={{
                                    border: '1px solid black',
                                    objectFit: 'contain',
                                    width: completedCrop.width,
                                    height: completedCrop.height,
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
