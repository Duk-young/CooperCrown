import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600]
    }
  },
  checked: {}
})((props) => <Checkbox color="default" {...props} />);

export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    Reports: false,
    dReports: false,
    inventory: false,
    addInventoryPage: false,
    graphPages: false,
    showRoomDetails: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className="ml-52">
      <FormGroup>
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.reports}
              onChange={handleChange}
              name="reports"
            />
          }
          label="Reports"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.dReports}
              onChange={handleChange}
              name="dReports"
            />
          }
          label="Detailed Reports"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.inventory}
              onChange={handleChange}
              name="inventory"
            />
          }
          label="Inventory"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.addInventoryPage}
              onChange={handleChange}
              name="addInventoryPage"
            />
          }
          label="Add Inventory Page"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.graphPages}
              onChange={handleChange}
              name="graphPages"
            />
          }
          label="Graph Pages"
        />
        <FormControlLabel
          control={
            <GreenCheckbox
              checked={state.showRoomDetails}
              onChange={handleChange}
              name="showRoomDetails"
            />
          }
          label="Showroom Details Page"
        />
      </FormGroup>
    </div>
  );
}
