import React, { useEffect } from 'react';
import Switch from '@material-ui/core/Switch';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import CircularCountdown from './common/CircularCountdown';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 180,
  },
  container: {
    display: 'flex',
  },
  paper: {
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

export default function CountDownScreen(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.container}>
      <Zoom in={props.zoomInOrOut}>
        <Paper elevation={4} className={classes.paper}>
          <CircularCountdown {...props}></CircularCountdown>
        </Paper>
      </Zoom>
      </div>
    </div>
  );
}

CountDownScreen.propTypes = {
  count: PropTypes.number.isRequired,
  zoomInOrOut: PropTypes.bool.isRequired,
};