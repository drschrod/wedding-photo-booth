/* eslint-disable react/prop-types */
import React from 'react';
import { Box, Fade } from '@material-ui/core';

function PhotoResult({ classes, resolution, photoWasJustTaken }) {
    return (<Fade in={photoWasJustTaken}>
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
            <svg className={classes.lensCover} {...resolution}>
            <rect {...resolution} />
            </svg>
        </Box>
    </Fade>);
} 

export default PhotoResult;