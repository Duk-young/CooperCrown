import Dialog from '@material-ui/core/Dialog';
import React, { useState } from 'react';
import { useForm } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import firebaseService from 'app/services/firebaseService';
import { useDispatch } from 'react-redux';
import * as MessageActions from 'app/store/actions/fuse/message.actions';

const useStyles = makeStyles({
    table: {
        minWidth: 450
    },
    button: {
        backgroundColor: '#f15a25',
        color: '#fff',
        marginLeft: '4px',
        marginRight: '4px',
        '&:hover': {
            backgroundColor: '#f47b51',
            color: '#fff'
        }
    }
});

const ChangeEmailPasswordDialog = (props) => {

    const dispatch = useDispatch();
    const { open, handleClose, changeType, uid, setisLoading, mainForm, setMainForm } = props;
    const [emailErrors, setEmailErrors] = useState({});
    const { form, handleChange, setForm } = useForm(null);
    const [passwordErrors, setPasswordErrors] = useState({});
    const classes = useStyles();

    function isFormValid() {
        if (changeType === 'email') {
            const emailErrs = {};

            if (!form?.newEmail) {
                emailErrs.newEmail = "Please enter new email";
            }

            if (form?.confrimEmail !== form?.newEmail) {
                emailErrs.confrimEmail = "Email does not match new email address";
            }

            return emailErrs;
        }

        if (changeType === 'password') {
            const passwordErrs = {};

            if (!form?.newPassword) {
                passwordErrs.newPassword = "Please enter new password";
            }

            if (form?.confrimPassword !== form?.newPassword) {
                passwordErrs.confirmPassword = "password does not match new password";
            }

            return passwordErrs;
        }
    };

    const handleEmailPasswordChange = async (e) => {

        e.preventDefault();

        const allErrs = isFormValid();
        setEmailErrors(allErrs);
        setPasswordErrors(allErrs)
        if (Object.values(allErrs).some((err) => err !== "")) {
            return;
        }

        if (!firebaseService.auth) {
            console.warn(
                "Firebase Service didn't initialize, check your configuration"
            );

            return () => false;
        }

        try {
            setisLoading(true)
            const updateUserEmailPassword = firebaseService.functions.httpsCallable('updateUserEmailPassword');
            if (changeType === 'email') {
                const res = await updateUserEmailPassword({ uid, email: form?.newEmail })
                console.log('formmmmm', res)
                if (res?.data?.errorInfo) {
                    dispatch(MessageActions.showMessage({ message: res?.data?.errorInfo?.message }));
                    setisLoading(false)
                    return 
                }
                await firebaseService.firestoreDb.collection('users').doc(uid).update({ email: form?.newEmail })

                dispatch(MessageActions.showMessage({ message: 'Email changed successfully' }));
            } else if (changeType === 'password') {
                const res2 = await updateUserEmailPassword({ uid, password: form?.newPassword })
                console.log('formmmmm', res2)
                if (res2?.data?.errorInfo) {
                    dispatch(MessageActions.showMessage({ message: res2?.data?.errorInfo?.message }));
                    setisLoading(false)
                    return 
                }

                dispatch(MessageActions.showMessage({ message: 'Password changed successfully' }));
            }
            setMainForm({...mainForm, email: form?.newEmail})
            setisLoading(false)
            handleClose()

        } catch (error) {
            dispatch(MessageActions.showMessage({ message: error.message }));
            console.log('Error while creating a user is:', error)
        }

    }

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={() => {
                    handleClose()
                    setForm(null)
                }}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                {changeType === 'email' && (
                    <>
                        <div className="flex flex-col h-260  px-16 py-6">
                            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                                        CHANGE EMAIL
                                    </h1>
                                </div>
                                <div className="justify-center p-16 sm:p-24 ">
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="New Email"
                                        type="text"
                                        id="newEmail"
                                        name="newEmail"
                                        value={form?.newEmail ?? ''}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={emailErrors.newEmail}
                                        helperText={emailErrors.newEmail}
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="Confirm Email"
                                        id="confrimEmail"
                                        type="text"
                                        name="confrimEmail"
                                        value={form?.confrimEmail ?? ''}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={emailErrors.confrimEmail}
                                        helperText={emailErrors.confrimEmail}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col p-12" >
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                onClick={handleEmailPasswordChange}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
                {changeType === 'password' && (
                    <>
                        <div className="flex flex-col h-260  px-16 py-6">
                            <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                                <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                                    <h1 className="font-700" style={{ color: '#f15a25' }}>
                                        CHANGE PASSWORD
                                    </h1>
                                </div >
                                <div className="justify-center p-16 sm:p-24 ">
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="New Password"
                                        type="password"
                                        id="newPassword"
                                        name="newPassword"
                                        value={form?.newPassword ?? ''}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={passwordErrors.newPassword}
                                        helperText={passwordErrors.newPassword}
                                        fullWidth
                                    />
                                    <TextField
                                        className="mt-8 mb-16"
                                        required
                                        label="Confirm Password"
                                        id="confrimPassword"
                                        type="password"
                                        name="confrimPassword"
                                        value={form?.confrimPassword ?? ''}
                                        onChange={handleChange}
                                        variant="outlined"
                                        error={passwordErrors.confirmPassword}
                                        helperText={passwordErrors.confirmPassword}
                                        fullWidth
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col p-12" >
                            <Button
                                className={classes.button}
                                variant="contained"
                                color="secondary"
                                onClick={handleEmailPasswordChange}>
                                Save
                            </Button>
                        </div>
                    </>
                )}
            </Dialog>
        </div>
    );
};
export default ChangeEmailPasswordDialog;
