import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import React, { useState } from 'react';

const CustomAutocomplete = (props) => {
  const { list, form, handleChange, id, freeSolo, inputType, label, disabled } =
    props;
  const [input, setInput] = useState(form[id]);
  return (
    <Autocomplete
      options={[...new Set(list?.map((item) => (item[id] ? item[id] : '')))]}
      getOptionLabel={(option) => option[id] || option}
      id={id}
      disabled={disabled}
      value={form[id]}
      inputValue={input}
      freeSolo={freeSolo}
      onInputChange={(e, value) => {
        setInput(value);
        handleChange({
          target: { value: value, name: id }
        });
      }}
      name={id}
      onChange={(_, value) =>
        handleChange({
          target: {
            value: value,
            name: id
          }
        })
      }
      renderInput={(params) => (
        <TextField {...params} label={label} type={inputType} margin="normal" />
      )}
    />
  );
};

export default withRouter(CustomAutocomplete);
