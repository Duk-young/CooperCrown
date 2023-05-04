import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { withRouter } from 'react-router';
import React, { useState } from 'react';
import { firestore } from 'firebase';

const CustomAutocomplete1 = (props) => {
  const {
    list,
    form,
    handleChange,
    id,
    freeSolo,
    inputType,
    label,
    setForm,
    disabled
  } = props;
  const [input, setInput] = useState(form[id] ?? '');
  return (
    <Autocomplete
      options={[...new Set(list?.map((item) => (item[id] ? item[id] : '')))]}
      getOptionLabel={(option) => option[id] || option}
      id={id}
      disabled={disabled}
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
          const queryPrescription = await firestore()
            .collection('prescriptions')
            .where('prescriptionId', '==', Number(value))
            .limit(1)
            .get();

          let resultPrescription = queryPrescription.docs[0].data();
          resultPrescription.id = queryPrescription.docs[0].id;
          resultPrescription.prescriptionId = value;
          setForm(resultPrescription);
        }
      }}
      renderInput={(params) => (
        <TextField {...params} label={label} type={inputType} />
      )}
    />
  );
};

export default withRouter(CustomAutocomplete1);
