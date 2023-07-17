import { firestore } from 'firebase';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import FusePageCarded from '@fuse/core/FusePageCarded';
import React, { useState, useEffect } from 'react';
import reducer from '../store/reducers';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import FuseLoading from '@fuse/core/FuseLoading/FuseLoading';


const useStyles = makeStyles((theme) => ({
    header: {
        width: '100%',
        minHeight: 160,
        background: `linear-gradient(to right, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
        color: theme.palette.primary.contrastText,
        backgroundSize: 'cover',
        backgroundColor: theme.palette.primary.dark
    },
    button: {
        backgroundColor: '#f15a25',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#f47b51',
            color: '#fff'
        }
    }
}));

function TermsAndConditions() {

    const classes = useStyles();
    const [isLoading, setisLoading] = useState(false);
    const { form, handleChange, setForm } = useForm(null);
    const [disabledState, setDisabledState] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            const queryTemplates = (
                await firestore()
                    .collection('emailTemplates')
                    .doc('emailTemplates')
                    .get()
            ).data();
            setForm(queryTemplates.templates);
        };
        fetchTemplates();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onSubmit = async () => {
        setisLoading(true)
        setDisabledState(true)
        await firestore().collection('emailTemplates').doc('emailTemplates').update({ templates: form })
        setisLoading(false)
    }


    if (isLoading) return <FuseLoading />
    return (
        <FusePageCarded
            header={
                <div className={clsx(classes.header)}>
                    <div className='flex flex-col justify-center items-center'>
                        <Typography
                            className="flex mx-0 sm:mx-12 uppercase"
                            style={{ fontSize: '3rem', fontWeight: 600 }}
                            variant="h6">
                            Terms And Conditions
                        </Typography>
                    </div>
                    <div className='flex flex-row justify-end mr-20 mt-40'>
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                disabledState ? setDisabledState(false) : onSubmit()
                            }}
                        >
                            {disabledState
                                ? (<span className="sm:flex">edit</span>)
                                : (<span className="sm:flex">save</span>)}
                        </Button>
                    </div>
                </div>
            }
            content={
                form && (
                    <div className="flex flex-col w-full p-12 gap-12">
                        <div className="flex flex-col h-full pt-4 border-1 border-black border-solid rounded-6">
                            <div className="flex flex-row justify-center border-b-1 border-black border-solid">
                                <h1 className="font-700" style={{ color: '#f15a25' }}>
                                    Terms & Conditions
                                </h1>
                            </div>
                            <TextField
                                // className="pb-12"
                                disabled={disabledState}
                                id="terms"
                                type="text"
                                name="terms"
                                value={form?.terms}
                                onChange={handleChange}
                                multiline
                                minRows={30}
                                variant="standard"
                                style={{ padding: '18.5px 14px' }}
                                InputProps={{
                                    disableUnderline: true,
                                }}
                                fullWidth
                            />
                        </div>
                    </div>
                )
            }
            innerScroll
        />
    );
}

export default withReducer('eCommerceApp', reducer)(TermsAndConditions);
