import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

export default function SimpleAccordion(props) {
    const { showrooms, form, setForm, disabled } = props;
    const classes = useStyles();
    if (!showrooms) return null
    return (
        <div className={classes.root}>
            {showrooms.map((location, index) => (
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography className={classes.heading}>{location?.locationName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {location?.locationAddress} {location?.State}
                        </Typography>
                        <IconButton
                            key="close"
                            aria-label="Close"
                            className='m-0 p-0 pl-10'
                            disabled={disabled}
                            onClick={() => {
                                let newShowrooms = showrooms
                                newShowrooms.splice(index, 1)
                                setForm({...form, showrooms: newShowrooms})
                            }}>
                            <Icon>delete</Icon>
                        </IconButton>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
