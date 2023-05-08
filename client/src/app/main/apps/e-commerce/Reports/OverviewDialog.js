import Widget9 from '../../dashboards/analytics/widgets/Widget9';
import Dialog from '@material-ui/core/Dialog';
import React from 'react';

const OverviewDialog = (props) => {

    const { title, secondColumn, thirdColumn, data, open, handleClose } = props;

    return (
        <div>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <Widget9 title={title} secondColumn={secondColumn} thirdColumn={thirdColumn} data={data} />
            </Dialog>
        </div>
    );
};
export default OverviewDialog;
