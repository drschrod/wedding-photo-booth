import React from 'react';
import Zoom from '@material-ui/core/Zoom';
import PropTypes from 'prop-types';
import CircularCountdown from './common/CircularCountdown';

export default function CountDownScreen(props) {
  return (
      <Zoom in={props.zoomInOrOut}>
          <CircularCountdown {...props}></CircularCountdown>
      </Zoom>
  );
}

CountDownScreen.propTypes = {
  count: PropTypes.number.isRequired,
  zoomInOrOut: PropTypes.bool.isRequired,
};