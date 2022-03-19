import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import React, { useState } from 'react';
import { firestore } from 'firebase';

const DiscountAutocomplete = (props) => {
  const { list, form, handleChange, id, freeSolo, inputType, label, setForm } =
    props;
  const [input, setInput] = useState(form[id] ? form[id] : '');
  return (
    <Autocomplete
      options={[...new Set(list?.map((item) => (item[id] ? item[id] : '')))]}
      getOptionLabel={(option) => option[id] || option}
      fullWidth
      id={id}
      value={form[id] ? form[id] : ''}
      inputValue={input}
      freeSolo={freeSolo}
      onInputChange={(e, value) => {
        setInput(value);
        handleChange({
          target: { value: value, name: id }
        });
      }}
      name={id}
      onChange={async (_, value) => {
        handleChange({
          target: {
            value: value,
            name: id
          }
        });
        if (value) {
          const queryDiscounts = await firestore()
            .collection('discounts')
            .where('code', '==', value)
            .limit(1)
            .get();

          let resultDiscounts = queryDiscounts.docs[0].data();
          resultDiscounts.id = queryDiscounts.docs[0].id;
          setForm({
            ...form,
            discount: resultDiscounts?.amount
          });
        } else {
          setForm({
            ...form,
            discount: undefined
          });
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} type={inputType} margin="normal" />
      )}
    />
  );
};

export default withRouter(DiscountAutocomplete);
