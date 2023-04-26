import { makeStyles } from '@material-ui/core/styles';
import { useForm } from '@fuse/hooks';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles({
  table: {
    minWidth: 450
  },
  button: {
    backgroundColor: '#f15a25',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#f47b51',
      color: '#fff'
    }
  }
});
export default function CheckboxLabels(props) {
  const [checkedshowrroom, setCheckedshowroom] = useState(false);
  const [checkedbayside, setCheckedbayside] = useState(false);
  const [checkedbrooklyndubo, setCheckedbrooklyndubo] = useState(false);
  const [checkedBrooklynBedfordSt, setCheckedBrooklynBedfordSt] = useState(false);
  const [checkedCloster, setCheckedCloster] = useState(false);
  const [checkedFlushing, setCheckedFlushing] = useState(false);
  const [checkedGreenwichVillage, setCheckedGreenwichVillage] = useState(false);
  const [checkedLongIslandCity, setCheckedLongIslandCity] = useState(false);
  const [checkedLongIslandRoslyn, setCheckedLongIslandRoslyn] = useState(false);
  const [checkedManhattan72ndSt, setCheckedManhattan72ndSt] = useState(false);
  const [checkedManhattanMottSt, setCheckedManhattanMottSt] = useState(false);
  const [checkedmanhattanwallstreet, setCheckedmanhattanwallstreet] = useState(false);
  const [checkedsunnyside, setCheckedsunnyside] = useState(false);

  const [checkedstate, setCheckedstate] = useState(false);
  const [checkedcalifornia, setCheckedcalifornia] = useState(false);
  const [checkednewjersey, setCheckednewjersey] = useState(false);
  const [checkednewyork, setCheckednewyork] = useState(false);
  const [checkedvirginia, setCheckedvirginia] = useState(false);
  const [checkedMaryland, setCheckedMaryland] = useState(false);
  const [checkedPennsylvania, setCheckedPennsylvania] = useState(false);

  const [checkedgender, setCheckedgender] = useState(false);
  const [checkedMale, setCheckedMale] = useState(false);
  const [checkedFemale, setCheckedFemale] = useState(false);
  const [checkedgenderOther, setCheckedgenderOther] = useState(false);
 
  const { form, handleChange, setForm } = useForm(null);
  const classes = useStyles();
  const [disabledState] = useState(false);

  const showroomcheckchanged = (state) => {
   
      
      const value = state.target.value;
      setCheckedshowroom(!checkedshowrroom);
      if (value === "showroomall") {
  
        if (!checkedshowrroom === true && !checkedbayside === true
          && !checkedbrooklyndubo === true
          && !checkedBrooklynBedfordSt === true
          && !checkedCloster === true
          && !checkedFlushing === true
          && !checkedGreenwichVillage === true
          && !checkedLongIslandCity === true
          && !checkedLongIslandRoslyn === true
          && !checkedManhattan72ndSt === true
          && !checkedManhattanMottSt === true
          && !checkedmanhattanwallstreet === true
          && !checkedsunnyside === true
         ) {
            
        setForm({
          ...form,
          // showroomall: true,
          Bayside: true,
          brooklyndubo: true,
          BrooklynBedfordSt: true,     
          Closter: true,
           Flushing: true,
           GreenwichVillage: true,
           LongIslandCity: true,
           LongIslandRoslyn: true,
           Manhattan72ndSt: true,
           ManhattanMottSt: true,
           manhattanwallstreet: true,
           sunnyside: true,


        });

      } else {
        setForm({
          ...form,
          Bayside: false,
          brooklyndubo: false,
          BrooklynBedfordSt: false,     
          Closter: false,
           Flushing: false,
           GreenwichVillage: false,
           LongIslandCity: false,
           LongIslandRoslyn: false,
           Manhattan72ndSt: false,
           ManhattanMottSt: false,
           manhattanwallstreet: false,
           sunnyside: false,
        });
      }
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);
     
    }
  }
  const baysidechange = (state) => {

    setCheckedbayside(!checkedbayside)
    if (checkedbayside  === true && 
      (checkedshowrroom === true
      || checkedbrooklyndubo === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall: false
      });

     }
   else if (!checkedbayside === true) {
      setForm({
        ...form,
        bayside: true,

      });

    } 
    else {
      setForm({
        ...form,
        bayside: false,

      });
    }

  };
  const brooklyndubochange = (state) => {

    setCheckedbrooklyndubo(!checkedbrooklyndubo);
    if (checkedbrooklyndubo   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedbrooklyndubo === true) {
      setForm({
        ...form,
        brooklyndubo: true,

      });

    } else {
      setForm({
        ...form,
        brooklyndubo: false,

      });
    }

  };
  const BrooklynBedfordStchange = (state) => {

    setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
    if (checkedBrooklynBedfordSt  === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      ||  checkedbrooklyndubo === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedBrooklynBedfordSt === true) {
      setForm({
        ...form,
        BrooklynBedfordSt: true,

      });

    } else {
      setForm({
        ...form,
        BrooklynBedfordSt: false,

      });
    }

  };
  const Closterchange = (state) => {

    setCheckedCloster(!checkedCloster);
    if (checkedCloster   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedbrooklyndubo === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedCloster === true) {
      setForm({
        ...form,
        Closter: true,

      });

    } else {
      setForm({
        ...form,
        Closter: false,

      });
    }

  };
  const Flushingchange = (state) => {

    setCheckedFlushing(!checkedFlushing);
    if (checkedFlushing   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedbrooklyndubo === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedFlushing === true) {
      setForm({
        ...form,
        Flushing: true,

      });

    } else {
      setForm({
        ...form,
        Flushing: false,

      });
    }

  };
  const GreenwichVillagechange = (state) => {

    setCheckedGreenwichVillage(!checkedGreenwichVillage);
    if (checkedGreenwichVillage   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedbrooklyndubo === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedGreenwichVillage === true) {
      setForm({
        ...form,
        GreenwichVillage: true,

      });

    } else {
      setForm({
        ...form,
        GreenwichVillage: false,

      });
    }

  };
  const LongIslandCitychange = (state) => {

    setCheckedLongIslandCity(!checkedLongIslandCity);
    if (checkedLongIslandCity   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedbrooklyndubo === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedLongIslandCity === true) {
      setForm({
        ...form,
        LongIslandCity: true,

      });

    } else {
      setForm({
        ...form,
        LongIslandCity: false,

      });
    }

  };
   const LongIslandRoslynchange = (state) => {

    setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
    if (checkedLongIslandRoslyn   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedbrooklyndubo === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedLongIslandRoslyn === true) {
      setForm({
        ...form,
        LongIslandRoslyn: true,

      });

    } else {
      setForm({
        ...form,
        LongIslandRoslyn: false,

      });
    }

  };
  const Manhattan72ndStchange = (state) => {

    setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
    if (checkedManhattan72ndSt   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedbrooklyndubo === true
      || checkedManhattanMottSt === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedManhattan72ndSt === true) {
      setForm({
        ...form,
        Manhattan72ndSt: true,

      });

    } else {
      setForm({
        ...form,
        Manhattan72ndSt: false,

      });
    }

  };
  const ManhattanMottStchange = (state) => {

    setCheckedManhattanMottSt(!checkedManhattanMottSt);
    if (checkedManhattanMottSt   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedbrooklyndubo === true
      || checkedmanhattanwallstreet === true
      || checkedsunnyside === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedManhattanMottSt === true) {
      setForm({
        ...form,
        ManhattanMottSt: true,

      });

    } else {
      setForm({
        ...form,
        ManhattanMottSt: false,

      });
    }

  };
  
  const sunnysidechange = (state) => {

    setCheckedsunnyside(!checkedsunnyside);
    if (checkedsunnyside   === true && 
      (checkedshowrroom === true
      || checkedbayside === true
      || checkedBrooklynBedfordSt === true
      || checkedCloster === true
      || checkedFlushing === true
      || checkedGreenwichVillage === true
      || checkedLongIslandCity === true
      || checkedLongIslandRoslyn === true
      || checkedManhattan72ndSt === true
      || checkedManhattanMottSt === true
      || checkedbrooklyndubo === true
      || checkedmanhattanwallstreet === true)
     ) {

      setCheckedshowroom(!checkedshowrroom);
      setCheckedbayside(!checkedbayside);
      setCheckedbrooklyndubo(!checkedbrooklyndubo);
      setCheckedBrooklynBedfordSt(!checkedBrooklynBedfordSt);
      setCheckedCloster(!checkedCloster);
      setCheckedFlushing(!checkedFlushing);
      setCheckedGreenwichVillage(!checkedGreenwichVillage);
      setCheckedLongIslandCity(!checkedLongIslandCity);
      setCheckedLongIslandRoslyn(!checkedLongIslandRoslyn);
      setCheckedManhattan72ndSt(!checkedManhattan72ndSt);
      setCheckedManhattanMottSt(!checkedManhattanMottSt);
      setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
      setCheckedsunnyside(!checkedsunnyside);

      setForm({
        ...form,
        Bayside: false,
        brooklyndubo: false,
        BrooklynBedfordSt: false,     
        Closter: false,
         Flushing: false,
         GreenwichVillage: false,
         LongIslandCity: false,
         LongIslandRoslyn: false,
         Manhattan72ndSt: false,
         ManhattanMottSt: false,
         manhattanwallstreet: false,
         sunnyside: false,
         showroomall:false
      });

     }
   else if (!checkedsunnyside === true) {
      setForm({
        ...form,
        sunnyside: true,

      });

    } else {
      setForm({
        ...form,
        sunnyside: false,

      });
    }

  };
  const statecheckchanged = (state) => {
    const value = state.target.value;
    setCheckedstate(!checkedstate);
    if (value === "stateall") {


      console.log(!checkedstate)
      if (!checkedstate === true && !checkedcalifornia === true
        && !checkednewjersey === true
        && !checkednewyork === true
        && !checkedvirginia === true
        && !checkedMaryland === true
        && !checkedPennsylvania === true) {
        setForm({
          ...form,
          California: true,
          newjersey: true,
          newyork: true,
          Virginia: true,
          Maryland: true,
          Pennsylvania: true
        });

      } else {
        setForm({
          ...form,
          California: false,
          newjersey: false,
          newyork: false,
          Virginia: false,
          Maryland: false,
          Pennsylvania: false
        });
      }
      setCheckedcalifornia(!checkedcalifornia);
      
      setCheckednewjersey(!checkednewjersey);
      setCheckednewyork(!checkednewyork);
      setCheckedvirginia(!checkedvirginia);
      setCheckedMaryland(!checkedMaryland);
      setCheckedPennsylvania(!checkedPennsylvania);

    }
  }
  const californiachange = (state) => {

    setCheckedcalifornia(!checkedcalifornia)
   
    if (checkedcalifornia === true &&
      (checkedstate === true ||
      checkednewjersey === true
      || checkednewyork === true
      || checkedvirginia === true
      || checkedMaryland === true
      || checkedPennsylvania === true) ) {
         
        setCheckedcalifornia(!checkedcalifornia);
        setCheckednewjersey(!checkednewjersey);
        setCheckednewyork(!checkednewyork);
        setCheckedvirginia(!checkedvirginia);
        setCheckedMaryland(!checkedMaryland);
        setCheckedPennsylvania(!checkedPennsylvania);
        setCheckedstate(!checkedstate);
        
        setForm({
          ...form,
          California: false,
          newjersey: false,
          newyork: false,
          Virginia: false,
          Maryland: false,
          Pennsylvania: false,
          stateall: false
        });

      
    }
    else if (!checkedcalifornia === true){
     
        setForm({
          ...form,
          California: true,
          
        });
    }
    else {
      setForm({
        ...form,
        California: false,

      });
    }


  };
  const newjerseychange = (state) => {

    setCheckednewjersey(!checkednewjersey)
    console.log(!checkednewjersey)
    if (checkednewjersey === true &&
      (checkedstate === true ||
        checkedcalifornia === true
      || checkednewyork === true
      || checkedvirginia === true
      || checkedMaryland === true
      || checkedPennsylvania === true) ) {
         
        setCheckedcalifornia(!checkedcalifornia);
        setCheckednewjersey(!checkednewjersey);
        setCheckednewyork(!checkednewyork);
        setCheckedvirginia(!checkedvirginia);
        setCheckedMaryland(!checkedMaryland);
        setCheckedPennsylvania(!checkedPennsylvania);
        setCheckedstate(!checkedstate);
        
        setForm({
          ...form,
          California: false,
          newjersey: false,
          newyork: false,
          Virginia: false,
          Maryland: false,
          Pennsylvania: false,
          stateall: false
        });

      
    }
    else if (!checkednewjersey === true) {
      setForm({
        ...form,
        newjersey: true,

      });  console.log('in')

    } else {
      setForm({
        ...form,
        newjersey: false,

      }); console.log('out')
    }


  };
  const newyorkchange = (state) => {

    setCheckednewyork(!checkednewyork)
    if (checkednewyork === true &&
      (checkedstate === true ||
        checkedcalifornia === true
      || checkednewjersey === true
      || checkedvirginia === true
      || checkedMaryland === true
      || checkedPennsylvania === true) ) {
         
        setCheckedcalifornia(!checkedcalifornia);
        setCheckednewjersey(!checkednewjersey);
        setCheckednewyork(!checkednewyork);
        setCheckedvirginia(!checkedvirginia);
        setCheckedMaryland(!checkedMaryland);
        setCheckedPennsylvania(!checkedPennsylvania);
        setCheckedstate(!checkedstate);
        
        setForm({
          ...form,
          California: false,
          newjersey: false,
          newyork: false,
          Virginia: false,
          Maryland: false,
          Pennsylvania: false,
          stateall: false
        });

      
    }
    else if (!checkednewyork === true) {
      setForm({
        ...form,
        newyork: true,

      });

    } else {
      setForm({
        ...form,
        newyork: false,

      });
    }


  };
  const virginiachange = (state) => {

    setCheckedvirginia(!checkedvirginia)
    if (checkedvirginia  === true &&
      (checkedstate === true ||
        checkedcalifornia === true
      || checkednewjersey === true
      || checkednewyork === true
      || checkedMaryland === true
      || checkedPennsylvania === true) ) {
         
        setCheckedcalifornia(!checkedcalifornia);
        setCheckednewjersey(!checkednewjersey);
        setCheckednewyork(!checkednewyork);
        setCheckedvirginia(!checkedvirginia);
        setCheckedMaryland(!checkedMaryland);
        setCheckedPennsylvania(!checkedPennsylvania);
        setCheckedstate(!checkedstate);
        
        setForm({
          ...form,
          California: false,
          newjersey: false,
          newyork: false,
          Virginia: false,
          Maryland: false,
          Pennsylvania: false,
          stateall: false
        });

      
    }
    else if (!checkedvirginia === true) {
      setForm({
        ...form,
        Virginia: true,

      });

    } else {
      setForm({
        ...form,
        Virginia: false,

      });
    }

  };
  const Marylandchange = (state) => {

    setCheckedMaryland(!checkedMaryland)
    if (checkedMaryland   === true &&
      (checkedstate === true ||
        checkedcalifornia === true
      || checkednewjersey === true
      || checkednewyork === true
      || checkedvirginia === true
      || checkedPennsylvania === true) ) {
         
        setCheckedcalifornia(!checkedcalifornia);
        setCheckednewjersey(!checkednewjersey);
        setCheckednewyork(!checkednewyork);
        setCheckedvirginia(!checkedvirginia);
        setCheckedMaryland(!checkedMaryland);
        setCheckedPennsylvania(!checkedPennsylvania);
        setCheckedstate(!checkedstate);
        
        setForm({
          ...form,
          California: false,
          newjersey: false,
          newyork: false,
          Virginia: false,
          Maryland: false,
          Pennsylvania: false,
          stateall: false
        });

      
    }
    else if (!checkedMaryland === true) {
      setForm({
        ...form,
        Maryland: true,

      });

    } else {
      setForm({
        ...form,
        Maryland: false,

      });
    }

  };
  const Pennsylvaniachange = (state) => {

    setCheckedPennsylvania(!checkedPennsylvania)
    if (checkedPennsylvania   === true &&
      (checkedstate === true ||
        checkedcalifornia === true
      || checkednewjersey === true
      || checkednewyork === true
      || checkedMaryland === true
      || checkedvirginia === true) ) {
         
        setCheckedcalifornia(!checkedcalifornia);
        setCheckednewjersey(!checkednewjersey);
        setCheckednewyork(!checkednewyork);
        setCheckedvirginia(!checkedvirginia);
        setCheckedMaryland(!checkedMaryland);
        setCheckedPennsylvania(!checkedPennsylvania);
        setCheckedstate(!checkedstate);
        
        setForm({
          ...form,
          California: false,
          newjersey: false,
          newyork: false,
          Virginia: false,
          Maryland: false,
          Pennsylvania: false,
          stateall: false
        });

      
    }
    else if (!checkedPennsylvania === true) {
      setForm({
        ...form,
        Pennsylvania: true,

      });

    } else {
      setForm({
        ...form,
        Pennsylvania: false,

      });
    }

  };
  const gendercheckchanged = (state) => {
    const value = state.target.value;
    setCheckedgender(!checkedgender);
    console.log(checkedMale)
    if (value === "genderall") {


      console.log(!checkedgender)
      if (!checkedgender === true){
        console.log('enter')
       if (!checkedMale === true
        && !checkedFemale === true
        && !checkedgenderOther === true) {
        setForm({
          ...form,
          genderall: true,
          Male: true,
          Female: true,
          genderOther: true
        });      console.log('flip')
        setCheckedMale(!checkedMale); 
        setCheckedFemale(!checkedFemale);
        setCheckedgenderOther(!checkedgenderOther);
      }
    }
    else  if (!checkedgender === false && !checkedMale === false
      && !checkedFemale === false
      && !checkedgenderOther === false) {
      setForm({
        ...form,
        genderall: false,
        Male: false,
        Female: false,
        genderOther: false
      });
      setCheckedMale(!checkedMale); 
      setCheckedFemale(!checkedFemale);
      setCheckedgenderOther(!checkedgenderOther);
    }
     else if(checkedMale === true){
        setForm({
          ...form,
          genderall: true,
          Male: true,
          Female: true,
          genderOther: true
        });
      console.log('male')
      setCheckedFemale(!checkedFemale);
      setCheckedgenderOther(!checkedgenderOther);
      }
      else  if(checkedFemale === true){
        setForm({
          ...form,
          genderall: true,
          Male: true,
          Female: true,
          genderOther: true
        });      console.log('female')
      
      setCheckedMale(!checkedFemale);
      setCheckedgenderOther(!checkedgenderOther);
      }
      else  if(checkedgenderOther === true){
        setForm({
          ...form,
          genderall: true,
          Male: true,
          Female: true,
          genderOther: true
        });      console.log('other')
        setCheckedMale(!checkedMale); 
        setCheckedFemale(!checkedFemale);
      }
       
    
  }
  }
  const Malechange = (state) => {

    setCheckedMale(!checkedMale)
    if (checkedMale   === true &&
      (checkedgender === true ||
        checkedFemale === true
      || checkedgenderOther === true
     ) ) {
         
      setCheckedMale(!checkedMale); 
      setCheckedFemale(!checkedFemale);
      setCheckedgenderOther(!checkedgenderOther);
      setCheckedgender(!checkedgender);
        
        setForm({
          ...form,
          genderall: false,
          Male: false,
          Female: false,
          genderOther: false
        });

      
    }
    else if (!checkedMale === true) {
      setForm({
        ...form,
        Male: true,

      });

    } else {
      setForm({
        ...form,
        Male: false,

      });
    }

  };
 
  const Femalechange = (state) => {

    setCheckedFemale(!checkedFemale)
    if (checkedFemale   === true &&
      (checkedgender === true ||
        checkedMale === true
      || checkedgenderOther === true
     ) ) {
         
      setCheckedMale(!checkedMale); 
      setCheckedFemale(!checkedFemale);
      setCheckedgenderOther(!checkedgenderOther);
      setCheckedgender(!checkedgender);
        
        setForm({
          ...form,
          genderall: false,
          Male: false,
          Female: false,
          genderOther: false
        });

      
    }
    else if (!checkedFemale === true) {
      setForm({
        ...form,
        Female: true,

      });

    } else {
      setForm({
        ...form,
        Female: false,

      });
    }

  };
  const genderOtherchange = (state) => {

    setCheckedgenderOther(!checkedgenderOther)
    if (checkedgenderOther   === true &&
      (checkedgender === true ||
        checkedFemale === true
      || checkedMale === true
     ) ) {
         
      setCheckedMale(!checkedMale); 
      setCheckedFemale(!checkedFemale);
      setCheckedgenderOther(!checkedgenderOther);
      setCheckedgender(!checkedgender);
        
        setForm({
          ...form,
          genderall: false,
          Male: false,
          Female: false,
          genderOther: false
        });

      
    }
    else if (!checkedgenderOther === true) {
      setForm({
        ...form,
        genderOther: true,

      });

    } else {
      setForm({
        ...form,
        genderOther: false,

      });
    }

  };


  return (
    <div className="flex flex-col h-260  px-16 py-6">
      <div className="flex flex-col h-260 px-16 py-6">
        <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
          <div className="flex flex-row justify-center border-b-1 border-black border-solid">
            <h1 className="font-700" style={{ color: '#f15a25' }}>
              Filters
            </h1>
          </div>
          <br></br>

          <div className="flex flex-row ">
            <div className="flex-1 flex flex-col ml-20">
              <b><u>SHOWROOM LOCATION</u></b>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedshowrroom}
                    onChange={(e) => { showroomcheckchanged(e); }}
                    disabled={disabledState}
                    name="showroomall"
                    value="showroomall"
                  />
                }
                label="All"
              // {...console.log(form?.showroomall)}


              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedbayside}
                    onChange={baysidechange}
                    disabled={disabledState}
                    name="bayside"
                  // value={form?.bayside}
                  />
                }
                label="Bayside"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedbrooklyndubo}
                    onChange={brooklyndubochange}
                    disabled={disabledState}
                    name="brooklyndubo"
                  />
                }
                label="Brooklyn Dubo"

              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedBrooklynBedfordSt}
                    onChange={BrooklynBedfordStchange}
                    disabled={disabledState}
                    name="BrooklynBedfordSt"
                  />
                }
                label="Brooklyn Bedford St"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedCloster}
                    onChange={Closterchange}
                    disabled={disabledState}
                    name="Closter"
                  />
                }
                label="Closter"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFlushing}
                    onChange={Flushingchange}
                    disabled={disabledState}
                    name="Flushing"
                  />
                }
                label="Flushing"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedGreenwichVillage}
                    onChange={GreenwichVillagechange}
                    disabled={disabledState}
                    name="GreenwichVillage "
                  />
                }
                label="Greenwich Village "
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedLongIslandCity}
                    onChange={LongIslandCitychange}
                    disabled={disabledState}
                    name="LongIslandCity"
                  />
                }
                label="Long Island City"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedLongIslandRoslyn}
                    onChange={LongIslandRoslynchange}
                    disabled={disabledState}
                    name="LongIslandRoslyn"
                  />
                }
                label="Long Island Roslyn"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedManhattan72ndSt}
                    onChange={Manhattan72ndStchange}
                    disabled={disabledState}
                    name="Manhattan72ndSt"
                  />
                }
                label="Manhattan 72nd St"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedManhattanMottSt}
                    onChange={ManhattanMottStchange}
                    disabled={disabledState}
                    name="ManhattanMottSt"
                  />
                }
                label="Manhattan Mott St"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedmanhattanwallstreet}
                    onChange={setCheckedmanhattanwallstreet}
                    disabled={disabledState}
                    name="manhattanwallstreet"
                  />
                }
                label="Manhattan Wallstreet"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedsunnyside}
                    onChange={sunnysidechange }
                    disabled={disabledState}
                    name="sunnyside"
                  />
                }
                label="Sunny Side"
              />

              <br></br><br></br>
              <b><u>STATE BY THE ADDRESS</u></b>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedstate}
                    onChange={(e) => { statecheckchanged(e); }}
                    disabled={disabledState}
                    name="stateall"
                    value="stateall"

                  // {...console.log(form?.newjersey)}
                  />
                }
                label="ALL"

              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedcalifornia}
                    onChange={californiachange}
                    disabled={disabledState}
                    name="California"

                  />
                } 
                label="( CA ) California"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkednewjersey}
                    onChange={newjerseychange}
                    disabled={disabledState}
                    name="newjersey"
                  />

                }
                label="( NJ ) New Jersey"
              //  { ...console.log(form?.newjersey)}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkednewyork}
                    onChange={newyorkchange}
                    disabled={disabledState}
                    name="newyork"

                  />
                }
                label="( NY ) New York"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedvirginia}
                    onChange={virginiachange}
                    disabled={disabledState}
                    name="Virginia"
                  />
                }
                label="( VA ) Virginia"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedMaryland}
                    onChange={Marylandchange}
                    disabled={disabledState}
                    name="Maryland"
                  />
                }
                label="( MD ) Maryland"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedPennsylvania}
                    onChange={Pennsylvaniachange}
                    disabled={disabledState}
                    name="Pennsylvania"
                  />
                }
                label="( PA ) Pennsylvania"
              />

            </div>
            <div className="flex-1 flex flex-col justify-center ">
              <b><u>GENDER</u></b>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedgender}
                    onChange={gendercheckchanged  }
                    disabled={disabledState}
                    name="genderall"
                    value="genderall"
                  />
                }
                label="All"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedMale}
                    onChange={Malechange}
                    disabled={disabledState}
                    name="Male"
                  />
                }
                label="Male"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedFemale}
                    onChange={Femalechange}
                    disabled={disabledState}
                    name="Female"
                  />
                }
                label="Female"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedgenderOther}
                    onChange={genderOtherchange}
                    disabled={disabledState}
                    name="genderOther"
                  />
                }
                label="Other"
              />
              <br></br><br></br>
              <b><u>ORDER TYPE</u></b>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.orderOther}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="orderOther"
                  />
                }
                label="Other"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ccFrame}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ccFrame"
                  />
                }
                label="CC Frame"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.OtherFrame}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="OtherFrame"
                  />
                }
                label="Other Frame"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.OwnFrame}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="OwnFrame"
                  />
                }
                label="Own Frame"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Sunglass}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Sunglass"
                  />
                }
                label="Sunglass"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.polylens}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="polylens"
                  />
                }
                label="Lens ( Poly )"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.lensthin}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="lensthin"
                  />
                }
                label="Lens ( 1.67 )"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.lensthick}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="lensthick"
                  />
                }
                label="Lens ( 1.74 )"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Bluelight}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Bluelight"
                  />
                }
                label="Blue light"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.FlatTop}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="FlatTop"
                  />
                }
                label="Flat Top"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Progressive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Progressive"
                  />
                }
                label="Progressive"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Transition}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Transition"
                  />
                }
                label="Transition"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.OtherProduct}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="OtherProduct"
                  />
                }
                label="Other Product"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.genderOther}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="genderOther"
                  />
                }
                label="Other"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Exam}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Exam"
                  />
                }
                label="Exam"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.Insurance}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="Insurance"
                  />
                }
                label="Insurance"
              />
              <br></br><br></br>


              <b><u>ETHENICITY</u></b>

              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ethnecityall}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ethnecityall"
                  />
                }
                label="ALL"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.WhiteCaucasian}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="WhiteCaucasian"
                  />
                }
                label="White / Caucasian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.HispanicLatino}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="HispanicLatino"
                  />
                }
                label="Hispanic / Latino"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.BlackAfricanAmerican}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="BlackAfricanAmerican"
                  />
                }
                label="Black / African American"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.pureAsian}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="pureAsian"
                  />
                }
                label="Asian"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.AsianIndiaPakistan}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="AsianIndiaPakistan"
                  />
                }
                label="Asian / India and Pakistan"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.AIAN}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="AIAN"
                  />
                }
                label="American Indian and Alaska Native"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.hawaiislander}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="hawaiislander"
                  />
                }
                label="OtheNative Hawaiian and Other Pacific Islanderr"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ethnicityothers}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ethnicityothers"
                  />
                }
                label="Others"
              />
              <br></br>
              <Button

                className={classes.button}
                variant="contained"
                value="clear"

                // color='#f15a25'
                onClick={() => {

                  props.history.push(`/apps/e-commerce/users-management`);
                }}
              >

                Clear All
              </Button>
              <br></br>
            </div>
            <div className="flex-1 flex flex-col  ">

              <b><u>AGE RANGE</u></b>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageall}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageall"
                  />
                }
                label="ALL"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageninetyabove}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageninetyabove"
                  />
                }
                label="Age between 90+"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageaboveeightyfive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageaboveeightyfive"
                  />
                }
                label="Age between 85 - 89"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageaboveeighty}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageaboveeighty"
                  />
                }
                label="Age between 80 - 84"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageaboveseventyfive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageaboveseventyfive"
                  />
                }
                label="Age between 75 - 79"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageaboveseventy}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageaboveseventy"
                  />
                }
                label="Age between 70 - 74"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovesixtyfive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovesixtyfive"
                  />
                }
                label="Age between 65 - 69"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovesixty}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovesixty"
                  />
                }
                label="Age between 60 - 64"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovefiftyfive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovefiftyfive"
                  />
                }
                label="Age between 59 - 55"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovefifty}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovefifty"
                  />
                }
                label="Age between 50 - 54"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovefourtyfive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovefourtyfive"
                  />
                }
                label="Age between 45 - 49"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovefourty}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovefourty"
                  />
                }
                label="Age between 40 - 44"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovethirtyfive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovethirtyfive"
                  />
                }
                label="Age between 35 - 39"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovethirty}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovethirty"
                  />
                }
                label="Age between 30 - 34"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovetwentyfive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovetwentyfive"
                  />
                }
                label="Age between 25 - 29"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovetwenty}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovetwenty"
                  />
                }
                label="Age between 20 - 24"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovefifteen}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovefifteen"
                  />
                }
                label="Age between 15 -19"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageaboveten}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageaboveten"
                  />
                }
                label="Age between 10 - 14"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.ageabovefive}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="ageabovefive"
                  />
                }
                label="Age between 5 - 9"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={form?.agebetweenzerotofour}
                    onChange={handleChange}
                    disabled={disabledState}
                    name="agebetweenzerotofour"
                  />
                }
                label="Age between 0 - 4"
              />
              <br></br><br></br><br></br><br></br><br></br>
              <br></br><br></br><br></br><br></br><br></br>
              <TextField
                className="mt-8 mr-40"

                required
                label="Zip Code"
                id="zipCode"
                type="number"
                name="zipCode"
                value={form?.zipCode}
                onChange={handleChange}
                variant="outlined"
                small

              />

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}