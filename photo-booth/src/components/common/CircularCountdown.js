import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Zoom from '@material-ui/core/Zoom';

function CircularProgressWithLabel(props) {
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
                <Typography variant="h1" component="div" color="textSecondary">{props.displayValue}</Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    displayValue: PropTypes.number.isRequired,
};

export default function CircularCountdown({ count }) {
    return <CircularProgressWithLabel  displayValue={count}  />;
}

CircularCountdown.propTypes = {
    count: PropTypes.number.isRequired,
};
