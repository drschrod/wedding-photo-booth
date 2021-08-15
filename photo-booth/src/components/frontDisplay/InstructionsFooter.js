import React from 'react';
import { Box, Typography, Grid } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import KeyboardArrowDownRoundedIcon from '@material-ui/icons/KeyboardArrowDownRounded';

function InstructionsFooter() {
    return (
        <div>
          <Box
            left='10%'
            right='10%'
            bottom={0}
            margin='auto'
            position="absolute"
            justify='space-around'
            fontWeight="fontWeightBold"
            fontSize={60}
            textAlign="center"
            fontStyle="oblique"
          >
            Push Button to Take a Picture
            <Grid item>< KeyboardArrowDownRoundedIcon style={{ fontSize: 300 }} ></KeyboardArrowDownRoundedIcon></Grid>
          </Box>
        </div>
      );
}

export default InstructionsFooter;