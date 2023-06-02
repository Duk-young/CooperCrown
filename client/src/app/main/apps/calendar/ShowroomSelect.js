import React, { useState, useEffect } from 'react';
import { firestore } from 'firebase';
import { useForm } from '@fuse/hooks';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';

export default function ShowroomSelect({ setEvents, setCurrentShowroom }) {
  const appointments = useSelector(
    ({ calendarApp }) => calendarApp.events.entities
  );
  const { handleChange } = useForm(null);
  const [showRooms, setShowRooms] = useState([]);
  const [selectedShowroom, setSelectedShowroom] = useState(null);
  const userData = useSelector(state => state.auth.user.data.firestoreDetails);

  useEffect(() => {
    const fetchDetails = async () => {
      let showroomdata = [];
      const queryShowrooms = await firestore().collection('showRooms').get();

      queryShowrooms.forEach((doc) => {
        showroomdata.push(doc.data());
      });
      setShowRooms(showroomdata);
      if(userData?.userRole === 'staff') {
        let filteredEvents = appointments.filter(
          (word) => word.showRoomId === userData?.showRoomId
        );
  
        setEvents(filteredEvents);
        setSelectedShowroom(userData?.showRoomId)
        setCurrentShowroom(userData?.showRoomId)
      }
    };
    fetchDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData, appointments]);

  return !showRooms ? (
    <></>
  ) : (
    <div className="flex flex-col w-1/2 pl-2">
      <FormControl>
        <FormHelperText>Select Showroom</FormHelperText>
        <Select
          labelId="demo-simple-select-autowidth-label"
          value={selectedShowroom ?? ''}
          disabled={userData?.userRole === 'staff'}
          onChange={(e) => {
            handleChange(e);

            let filteredEvents = appointments.filter(
              (word) => word.showRoomId === e.target.value
            );

            setEvents(filteredEvents);
            setCurrentShowroom(e?.target?.value)
            setSelectedShowroom(e?.target?.value)
          }}
          autoWidth>
          {showRooms.map((row) => (
            <MenuItem value={row?.showRoomId}>{row?.locationName}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
