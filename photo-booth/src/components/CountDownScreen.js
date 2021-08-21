import React from 'react';
import PropTypes from 'prop-types';
import CircularCountdown from './common/CircularCountdown';

export default function CountDownScreen(props) {
  return (
          <CircularCountdown {...props}></CircularCountdown>
  );
}

CountDownScreen.propTypes = {
  count: PropTypes.number.isRequired,
};