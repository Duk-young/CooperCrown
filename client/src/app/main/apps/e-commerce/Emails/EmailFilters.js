import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { useHistory } from 'react-router-dom';
import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseLoading from '@fuse/core/FuseLoading';
import { firestore, storage } from 'firebase';
import FusePageCarded from '@fuse/core/FusePageCarded';
import { useForm, useDeepCompareEffect } from '@fuse/hooks';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Icon from '@material-ui/core/Icon';
import { useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import withReducer from 'app/store/withReducer';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { stubTrue } from 'lodash';


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
export default function EmailFilters({ open, handleClose }) {
  const [isLoading, setisLoading] = useState(true);
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

  const [orderType, setOrderType] = useState({
    orderTypeAll: false,
    ccFrame: false,
    otherFrame: false,
    ownFrame: false,
    sunglass: false,
    polyLens: false,
    lensThin: false,
    lensThick: false,
    blueLight: false,
    flatTop: false,
    progressive: false,
    transition: false,
    otherProduct: false,
    other: false,
    exam: false,
    insurance: false
  });

  const [ethnicity, setEthnicity] = useState({
    ethnicityAll: false,
    whiteCaucasian: false,
    hispanicLatino: false,
    blackAfricanAmerican: false,
    pureAsian: false,
    asianIndiaPakistan: false,
    AIAN: false,
    hawaiIslander: false,
    ethnicityOthers: false
  })

  const [ageRange, setAgeRange] = useState({
    ageRangeAll: false,
    ageninetyabove: false,
    ageaboveeightyfive: false,
    ageaboveeighty: false,
    ageaboveseventyfive: false,
    ageaboveseventy: false,
    ageabovesixtyfive: false,
    ageabovesixty: false,
    ageabovefiftyfive: false,
    ageabovefifty: false,
    ageabovefourtyfive: false,
    ageabovefourty: false,
    ageabovethirtyfive: false,
    ageabovethirty: false,
    ageabovetwentyfive: false,
    ageabovetwenty: false,
    ageabovefifteen: false,
    ageaboveten: false,
    ageabovefive: false,
    agebetweenzerotofour: false
  })

  const { form, handleChange, setForm } = useForm(null);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const routeParams = useParams();
  const [disabledState, setDisabledState] = useState(false);

  const showroomcheckchanged = (state) => {


    const value = state.target.value;
    setCheckedshowroom(!checkedshowrroom);
    if (value === "showroomall") {

      if (!checkedshowrroom === true && !checkedbayside == true
        && !checkedbrooklyndubo == true
        && !checkedBrooklynBedfordSt == true
        && !checkedCloster == true
        && !checkedFlushing == true
        && !checkedGreenwichVillage == true
        && !checkedLongIslandCity == true
        && !checkedLongIslandRoslyn == true
        && !checkedManhattan72ndSt == true
        && !checkedManhattanMottSt == true
        && !checkedmanhattanwallstreet == true
        && !checkedsunnyside == true
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
    if (checkedbayside === true &&
      (checkedshowrroom == true
        || checkedbrooklyndubo == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
    if (checkedbrooklyndubo === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedBrooklynBedfordSt === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedbrooklyndubo == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedCloster === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedbrooklyndubo == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedFlushing === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedbrooklyndubo == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedGreenwichVillage === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedbrooklyndubo == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedLongIslandCity === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedbrooklyndubo == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedLongIslandRoslyn === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedbrooklyndubo == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedManhattan72ndSt === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedbrooklyndubo == true
        || checkedManhattanMottSt == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
    if (checkedManhattanMottSt === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedbrooklyndubo == true
        || checkedmanhattanwallstreet == true
        || checkedsunnyside == true)
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
        showroomall: false
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
  const manhattanwallstreetchange = (state) => {

    setCheckedmanhattanwallstreet(!checkedmanhattanwallstreet);
    if (checkedmanhattanwallstreet === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedbrooklyndubo == true
        || checkedsunnyside == true)
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
        showroomall: false
      });

    }
    else if (!checkedmanhattanwallstreet === true) {
      setForm({
        ...form,
        manhattanwallstreet: true,

      });

    } else {
      setForm({
        ...form,
        manhattanwallstreet: false,

      });
    }

  };
  const sunnysidechange = (state) => {

    setCheckedsunnyside(!checkedsunnyside);
    if (checkedsunnyside === true &&
      (checkedshowrroom == true
        || checkedbayside == true
        || checkedBrooklynBedfordSt == true
        || checkedCloster == true
        || checkedFlushing == true
        || checkedGreenwichVillage == true
        || checkedLongIslandCity == true
        || checkedLongIslandRoslyn == true
        || checkedManhattan72ndSt == true
        || checkedManhattanMottSt == true
        || checkedbrooklyndubo == true
        || checkedmanhattanwallstreet == true)
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
        showroomall: false
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
      if (!checkedstate === true && !checkedcalifornia == true
        && !checkednewjersey == true
        && !checkednewyork == true
        && !checkedvirginia == true
        && !checkedMaryland == true
        && !checkedPennsylvania == true) {
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
        checkednewjersey == true
        || checkednewyork == true
        || checkedvirginia == true
        || checkedMaryland == true
        || checkedPennsylvania == true)) {

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
    else if (!checkedcalifornia === true) {

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
        checkedcalifornia == true
        || checkednewyork == true
        || checkedvirginia == true
        || checkedMaryland == true
        || checkedPennsylvania == true)) {

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

      }); console.log('in')

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
        checkedcalifornia == true
        || checkednewjersey == true
        || checkedvirginia == true
        || checkedMaryland == true
        || checkedPennsylvania == true)) {

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
    if (checkedvirginia === true &&
      (checkedstate === true ||
        checkedcalifornia == true
        || checkednewjersey == true
        || checkednewyork == true
        || checkedMaryland == true
        || checkedPennsylvania == true)) {

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
    if (checkedMaryland === true &&
      (checkedstate === true ||
        checkedcalifornia == true
        || checkednewjersey == true
        || checkednewyork == true
        || checkedvirginia == true
        || checkedPennsylvania == true)) {

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
    if (checkedPennsylvania === true &&
      (checkedstate === true ||
        checkedcalifornia == true
        || checkednewjersey == true
        || checkednewyork == true
        || checkedMaryland == true
        || checkedvirginia == true)) {

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
      if (!checkedgender === true) {
        console.log('enter')
        if (!checkedMale == true
          && !checkedFemale == true
          && !checkedgenderOther == true) {
          setForm({
            ...form,
            genderall: true,
            Male: true,
            Female: true,
            genderOther: true
          }); console.log('flip')
          setCheckedMale(!checkedMale);
          setCheckedFemale(!checkedFemale);
          setCheckedgenderOther(!checkedgenderOther);
        }
      }
      else if (!checkedgender === false && !checkedMale == false
        && !checkedFemale == false
        && !checkedgenderOther == false) {
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
      else if (checkedMale === true) {
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
      else if (checkedFemale === true) {
        setForm({
          ...form,
          genderall: true,
          Male: true,
          Female: true,
          genderOther: true
        }); console.log('female')

        setCheckedMale(!checkedFemale);
        setCheckedgenderOther(!checkedgenderOther);
      }
      else if (checkedgenderOther === true) {
        setForm({
          ...form,
          genderall: true,
          Male: true,
          Female: true,
          genderOther: true
        }); console.log('other')
        setCheckedMale(!checkedMale);
        setCheckedFemale(!checkedFemale);
      }


    }
  }
  const Malechange = (state) => {

    setCheckedMale(!checkedMale)
    if (checkedMale === true &&
      (checkedgender === true ||
        checkedFemale == true
        || checkedgenderOther == true
      )) {

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
    if (checkedFemale === true &&
      (checkedgender === true ||
        checkedMale == true
        || checkedgenderOther == true
      )) {

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
    if (checkedgenderOther === true &&
      (checkedgender === true ||
        checkedFemale == true
        || checkedMale == true
      )) {

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

  const handleOrderTypeChange = (event) => {
    setOrderType({ ...orderType, [event.target.name]: event.target.checked });
    setForm({
      ...form,
      [event.target.name]: event.target.checked
    })
  };

  const handleEthnicityChange = (event) => {
    setEthnicity({ ...ethnicity, [event.target.name]: event.target.checked });
    setForm({
      ...form,
      [event.target.name]: event.target.checked
    })
  };
  const handleAgeRangeChange = (event) => {
    setAgeRange({ ...ageRange, [event.target.name]: event.target.checked });
    setForm({
      ...form,
      [event.target.name]: event.target.checked
    })
  };

  useEffect(() => {
    if (orderType.orderTypeAll) {
      setOrderType({
        ...orderType,
        ccFrame: true,
        otherFrame: true,
        ownFrame: true,
        sunglass: true,
        polyLens: true,
        lensThin: true,
        lensThick: true,
        blueLight: true,
        flatTop: true,
        progressive: true,
        transition: true,
        otherProduct: true,
        other: true,
        exam: true,
        insurance: true
      })
      setForm({
        ...form,
        ...orderType
      })
    } else if (!orderType.orderTypeAll) {
      setOrderType({
        ...orderType,
        ccFrame: false,
        otherFrame: false,
        ownFrame: false,
        sunglass: false,
        polyLens: false,
        lensThin: false,
        lensThick: false,
        blueLight: false,
        flatTop: false,
        progressive: false,
        transition: false,
        otherProduct: false,
        other: false,
        exam: false,
        insurance: false
      })
      setForm({
        ...form,
        ...orderType
      })
    }
  }, [orderType.orderTypeAll])

  useEffect(() => {
    if (ethnicity.ethnicityAll) {
      setEthnicity({
        ...ethnicity,
        whiteCaucasian: true,
        hispanicLatino: true,
        blackAfricanAmerican: true,
        pureAsian: true,
        asianIndiaPakistan: true,
        AIAN: true,
        hawaiIslander: true,
        ethnicityOthers: true
      })
      setForm({
        ...form,
        ...ethnicity
      })
    } else if (!ethnicity.ethnicityAll) {
      setEthnicity({
        ...ethnicity,
        whiteCaucasian: false,
        hispanicLatino: false,
        blackAfricanAmerican: false,
        pureAsian: false,
        asianIndiaPakistan: false,
        AIAN: false,
        hawaiIslander: false,
        ethnicityOthers: false
      })
      setForm({
        ...form,
        ...ethnicity
      })
    }
  }, [ethnicity.ethnicityAll])

  useEffect(() => {
    if (ageRange.ageRangeAll) {
      setAgeRange({
        ...ageRange,
        ageninetyabove: true,
        ageaboveeightyfive: true,
        ageaboveeighty: true,
        ageaboveseventyfive: true,
        ageaboveseventy: true,
        ageabovesixtyfive: true,
        ageabovesixty: true,
        ageabovefiftyfive: true,
        ageabovefifty: true,
        ageabovefourtyfive: true,
        ageabovefourty: true,
        ageabovethirtyfive: true,
        ageabovethirty: true,
        ageabovetwentyfive: true,
        ageabovetwenty: true,
        ageabovefifteen: true,
        ageaboveten: true,
        ageabovefive: true,
        agebetweenzerotofour: true
      })
      setForm({
        ...form,
        ...ageRange
      })
    } else if (!ageRange.ageRangeAll) {
      setAgeRange({
        ...ageRange,
        ageninetyabove: false,
        ageaboveeightyfive: false,
        ageaboveeighty: false,
        ageaboveseventyfive: false,
        ageaboveseventy: false,
        ageabovesixtyfive: false,
        ageabovesixty: false,
        ageabovefiftyfive: false,
        ageabovefifty: false,
        ageabovefourtyfive: false,
        ageabovefourty: false,
        ageabovethirtyfive: false,
        ageabovethirty: false,
        ageabovetwentyfive: false,
        ageabovetwenty: false,
        ageabovefifteen: false,
        ageaboveten: false,
        ageabovefive: false,
        agebetweenzerotofour: false
      })
      setForm({
        ...form,
        ...ageRange
      })
    }
  }, [ageRange.ageRangeAll])

  const {
    orderTypeAll,
    ccFrame,
    otherFrame,
    ownFrame,
    sunglass,
    polyLens,
    lensThin,
    lensThick,
    blueLight,
    flatTop,
    progressive,
    transition,
    otherProduct,
    other,
    exam,
    insurance
  } = orderType;

  const {
    ethnicityAll,
    whiteCaucasian,
    hispanicLatino,
    blackAfricanAmerican,
    pureAsian,
    asianIndiaPakistan,
    AIAN,
    hawaiIslander,
    ethnicityOthers
  } = ethnicity;

  const {
    ageRangeAll,
    ageninetyabove,
    ageaboveeightyfive,
    ageaboveeighty,
    ageaboveseventyfive,
    ageaboveseventy,
    ageabovesixtyfive,
    ageabovesixty,
    ageabovefiftyfive,
    ageabovefifty,
    ageabovefourtyfive,
    ageabovefourty,
    ageabovethirtyfive,
    ageabovethirty,
    ageabovetwentyfive,
    ageabovetwenty,
    ageabovefifteen,
    ageaboveten,
    ageabovefive,
    agebetweenzerotofour
  } = ageRange;

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <>
          <div className="flex flex-col h-260  px-16 py-6">
            <div className="flex flex-col h-260 px-16 py-6">
              <div className="flex flex-col h-full py-4 border-1 border-black border-solid rounded-6">
                <div className="flex flex-row items-center border-b-1 border-black border-solid">
                  <h1 className="font-700 flex-1 text-center" style={{ color: '#f15a25' }}>
                    Filters
                  </h1>
                  <div className='justify-right relative right-20' style={{ right: '2rem', }}>
                    <IconButton aria-label="close" onClick={handleClose} style={{ fontSize: '2rem', alignSelf: 'end', padding: 0 }}>
                      <CloseIcon />
                    </IconButton>
                  </div>
                </div>
                <br></br>
                <div className='p-20'>
                  <div className="flex flex-row">
                    <div className="flex-1 flex flex-col">
                      <div className='showroom__location mb-20'>
                        <p className='font-bold text-underline'>SHOWROOM LOCATION</p>
                        <div className='flex flex-col'>
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
                                onChange={sunnysidechange}
                                disabled={disabledState}
                                name="sunnyside"
                              />
                            }
                            label="Sunny Side"
                          />
                        </div>
                      </div>
                      <div className='state__address'>
                        <p className='font-bold text-underline'>STATE BY THE ADDRESS</p>
                        <div className='flex flex-col mb-20'>
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
                    <div className="flex-1 flex flex-col">
                      <div className='gender mb-20'>
                        <p className='font-bold text-underline'>GENDER</p>
                        <div className='flex flex-col'>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={checkedgender}
                                onChange={gendercheckchanged}
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
                        </div>
                      </div>
                      <div className='order__type mb-20'>
                        <p className='font-bold text-underline'>ORDER TYPE</p>
                        <div className='flex flex-col'>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={orderTypeAll}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="orderTypeAll"
                              />
                            }
                            label="ALL"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ccFrame}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="ccFrame"
                              />
                            }
                            label="CC Frame"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={otherFrame}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="otherFrame"
                              />
                            }
                            label="Other Frame"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ownFrame}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="ownFrame"
                              />
                            }
                            label="Own Frame"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={sunglass}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="sunglass"
                              />
                            }
                            label="Sunglass"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={polyLens}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="polyLens"
                              />
                            }
                            label="Lens ( Poly )"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={lensThin}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="lensThin"
                              />
                            }
                            label="Lens ( 1.67 )"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={lensThick}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="lensThick"
                              />
                            }
                            label="Lens ( 1.74 )"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={blueLight}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="blueLight"
                              />
                            }
                            label="Blue light"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={flatTop}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="flatTop"
                              />
                            }
                            label="Flat Top"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={progressive}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="progressive"
                              />
                            }
                            label="Progressive"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={transition}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="transition"
                              />
                            }
                            label="Transition"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={otherProduct}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="otherProduct"
                              />
                            }
                            label="Other Product"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={other}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="other"
                              />
                            }
                            label="Other"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={exam}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="exam"
                              />
                            }
                            label="Exam"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={insurance}
                                onChange={handleOrderTypeChange}
                                disabled={disabledState}
                                name="insurance"
                              />
                            }
                            label="Insurance"
                          />

                        </div>
                      </div>
                      <div className='ethnicity'>
                        <p className='font-bold text-underline'>ETHENICITY</p>
                        <div className='flex flex-col'>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ethnicityAll}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="ethnicityAll"
                              />
                            }
                            label="ALL"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={whiteCaucasian}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="whiteCaucasian"
                              />
                            }
                            label="White / Caucasian"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={hispanicLatino}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="hispanicLatino"
                              />
                            }
                            label="Hispanic / Latino"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={blackAfricanAmerican}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="blackAfricanAmerican"
                              />
                            }
                            label="Black / African American"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={pureAsian}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="pureAsian"
                              />
                            }
                            label="Asian"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={asianIndiaPakistan}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="asianIndiaPakistan"
                              />
                            }
                            label="Asian / India and Pakistan"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={AIAN}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="AIAN"
                              />
                            }
                            label="American Indian and Alaska Native"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={hawaiIslander}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="hawaiIslander"
                              />
                            }
                            label="OtheNative Hawaiian and Other Pacific Islanderr"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ethnicityOthers}
                                onChange={handleEthnicityChange}
                                disabled={disabledState}
                                name="ethnicityOthers"
                              />
                            }
                            label="Others"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className='age__range'>
                        <p className='font-bold text-underline'>AGE RANGE</p>
                        <div className='flex flex-col mb-20'>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageRangeAll}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageRangeAll"
                              />
                            }
                            label="ALL"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageninetyabove}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageninetyabove"
                              />
                            }
                            label="Age between 90+"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageaboveeightyfive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageaboveeightyfive"
                              />
                            }
                            label="Age between 85 - 89"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageaboveeighty}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageaboveeighty"
                              />
                            }
                            label="Age between 80 - 84"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageaboveseventyfive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageaboveseventyfive"
                              />
                            }
                            label="Age between 75 - 79"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageaboveseventy}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageaboveseventy"
                              />
                            }
                            label="Age between 70 - 74"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovesixtyfive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovesixtyfive"
                              />
                            }
                            label="Age between 65 - 69"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovesixty}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovesixty"
                              />
                            }
                            label="Age between 60 - 64"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovefiftyfive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovefiftyfive"
                              />
                            }
                            label="Age between 59 - 55"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovefifty}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovefifty"
                              />
                            }
                            label="Age between 50 - 54"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovefourtyfive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovefourtyfive"
                              />
                            }
                            label="Age between 45 - 49"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovefourty}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovefourty"
                              />
                            }
                            label="Age between 40 - 44"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovethirtyfive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovethirtyfive"
                              />
                            }
                            label="Age between 35 - 39"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovethirty}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovethirty"
                              />
                            }
                            label="Age between 30 - 34"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovetwentyfive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovetwentyfive"
                              />
                            }
                            label="Age between 25 - 29"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovetwenty}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovetwenty"
                              />
                            }
                            label="Age between 20 - 24"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovefifteen}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovefifteen"
                              />
                            }
                            label="Age between 15 -19"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageaboveten}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageaboveten"
                              />
                            }
                            label="Age between 10 - 14"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={ageabovefive}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="ageabovefive"
                              />
                            }
                            label="Age between 5 - 9"
                          />
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={agebetweenzerotofour}
                                onChange={handleAgeRangeChange}
                                disabled={disabledState}
                                name="agebetweenzerotofour"
                              />
                            }
                            label="Age between 0 - 4"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='flex pt-20 px-20 pb-40'>
                    <Button
                      className={classes.button}
                      variant="contained"
                      value="clear"
                      fullWidth
                      onClick={handleClose}
                    >
                      Clear All
                    </Button>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </Dialog>
    </>
  );
}
