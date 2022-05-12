import React from 'react';
import moment from 'moment';
import { connectRange } from 'react-instantsearch-dom';

// Prerequisite: install rheostat@4
import 'rheostat/initialize';
import Rheostat from 'rheostat';
import 'rheostat/css/rheostat.css';

const RangeSlider = ({ min, max, currentRefinement, canRefine, refine }) => {
  const [stateMin, setStateMin] = React.useState(min);
  const [stateMax, setStateMax] = React.useState(max);

  React.useEffect(() => {
    if (canRefine) {
      setStateMin(currentRefinement.min);
      setStateMax(currentRefinement.max);
    }
  }, [currentRefinement.min, currentRefinement.max]);

  if (min === max) {
    return null;
  }

  const onChange = ({ values: [min, max] }) => {
    if (currentRefinement.min !== min || currentRefinement.max !== max) {
      refine({ min, max });
    }
  };

  const onValuesUpdated = ({ values: [min, max] }) => {
    setStateMin(min);
    setStateMax(max);
  };

  return (
    <Rheostat
      min={min}
      max={max}
      values={[currentRefinement.min, currentRefinement.max]}
      onChange={onChange}
      onValuesUpdated={onValuesUpdated}>
      <div className="flex flex-row justify-between">
        <div>{moment(stateMin).format('MM/DD/YYYY')}</div>
        <div>{moment(stateMax).format('MM/DD/YYYY')}</div>
      </div>
    </Rheostat>
  );
};

const CustomRangeSlider = connectRange(RangeSlider);

export default CustomRangeSlider;
