import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      color: 'white'
    },
  }));

function CircularProgressWithLabel(props) {
  const classes = useStyles();
  return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="indeterminate" size={400}  />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography className={classes.root} variant="h1" component="div" color="white">{props.displayValue}</Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    displayValue: PropTypes.number.isRequired,
    zoomInOrOut: PropTypes.bool.isRequired
};

export default function CircularCountdown({ count }) {
    return <CircularProgressWithLabel  displayValue={count}  />;
}

CircularCountdown.propTypes = {
    count: PropTypes.number.isRequired,
};
