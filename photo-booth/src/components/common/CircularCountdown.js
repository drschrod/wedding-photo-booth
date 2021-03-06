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
  let circleColor;
  let text = 'SMILE'
  let fontSize = 300;
  switch (props.displayValue) {
    case 3:
        text = 3;
        circleColor = 'red' 
        break;
    case 2:
        text = 2;

        circleColor = 'yellow'
        break;
    case 1:
        text = 1;

        circleColor = 'yellow'
        break;
    default:
        fontSize = 100;
        circleColor = 'green'
        break;
  }
  return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="indeterminate" size={400}  style={{ color: circleColor}}/>
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
                <Typography className={classes.root} variant="h1" component="div" color="black" style={{ fontSize: fontSize + 5, color: 'black' }}>{text}</Typography>

            </Box>
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

                <Typography className={classes.root} variant="h1" component="div" color="white" style={{ fontSize }}>{text}</Typography>
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
