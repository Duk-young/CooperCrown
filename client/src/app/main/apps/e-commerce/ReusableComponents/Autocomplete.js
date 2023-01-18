import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '.MuiInput-formControl': {
      marginTop: 0
    }
  }
}));

const CustomAutocomplete = (props) => {
  const classes = useStyles();
  const {
    list,
    form,
    handleChange,
    id,
    freeSolo,
    inputType,
    label,
    disabled,
    customFunction
  } = props;
  const [input, setInput] = useState(form ? form[id] : '');
  return (
    <div className={classes.root}>
      <Autocomplete
        options={[...new Set(list?.map((item) => (item[id] ? item[id] : '')))]}
        getOptionLabel={(option) => option[id] || option}
        id={id}
        disabled={disabled}
        value={form ? form[id] : ''}
        inputValue={input}
        freeSolo={freeSolo}
        onInputChange={(e, value) => {
          setInput(value);
          handleChange({
            target: { value: value, name: id }
          });
        }}
        name={id}
        onChange={(_, value) => {
          handleChange({
            target: {
              value: value,
              name: id
            }
          });
          if (customFunction) {
            customFunction(value);
          }
        }}
        renderInput={(params) => (
          <TextField {...params} label={label} type={inputType} />
        )}
      />
    </div>
  );
};

export default withRouter(CustomAutocomplete);
