import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CheckboxesGroup from 'app/main/apps/e-commerce/Users/users-management/CheckBoxGroup.js';
import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles, Typography } from '@material-ui/core';
import { firestore } from 'firebase';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFilledInput-root': {
      background: 'rgb(232, 241, 250)'
    }
  }
}));

function UsersManagementContent(props) {
  const classes = useStyles();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(null);
  const ref = useRef();

  const handleChange = (event) => {
    setCurrentUser(event.target.value);
  };

  useEffect(() => {
    firestore()
      .collection('users')
      .where('Role', '==', 'Staff')
      .onSnapshot((e) => {
        if (e?.docs) {
          setUsers(e.docs);
        }
      });
  }, []);

  return (
    <div className="w-full flex flex-col  ">
      <div className="flex flex-row xs:w-full  lg:w-1/2 justify-between items-center m-10 ">
        <Typography className="mr-8 " variant="h6">
          Select User
        </Typography>
        <FormControl variant="outlined" fullWidth>
          <InputLabel id="demo-simple-select-outlined-label">User</InputLabel>
          <Select
            className={`${classes.root}`}
            ref={ref}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={currentUser}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            onClose={() => {
              ref?.current?.blur && ref.current.blur();
            }}
            label="User">
            {users?.map((item) => (
              <MenuItem value={item.id}>{item?.data()?.email}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <Typography className="mr-8 ml-20" variant="h6">
        Grant Access to
      </Typography>
      <CheckboxesGroup />
      <Button
        variant="contained"
        color="primary"
        className="min-w-2 ml-40 self-start"
        size="large"
        startIcon={<SaveIcon />}>
        Save
      </Button>
      <div></div>
      <div></div>
    </div>
  );
}

export default withRouter(UsersManagementContent);
