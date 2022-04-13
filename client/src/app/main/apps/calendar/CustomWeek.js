import PropTypes from 'prop-types';
import React from 'react';

import Week from 'react-big-calendar/lib/Week';
import TimeGrid from 'react-big-calendar/lib/TimeGrid';

function workWeekRange(date, options) {
  return Week.range(date, options).filter(
    (d) => [0].indexOf(d.getDay()) === -1
  );
}

class CustomWeek extends React.Component {
  render() {
    let { date, ...props } = this.props;
    let range = workWeekRange(date, this.props);

    return <TimeGrid {...props} range={range} eventOffset={15} />;
  }
}

CustomWeek.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired
};

CustomWeek.defaultProps = TimeGrid.defaultProps;

CustomWeek.range = workWeekRange;

CustomWeek.navigate = Week.navigate;

CustomWeek.title = (date, { localizer }) => {
  let [start, ...rest] = workWeekRange(date, { localizer });

  return localizer.format({ start, end: rest.pop() }, 'dayRangeHeaderFormat');
};

export default CustomWeek;
