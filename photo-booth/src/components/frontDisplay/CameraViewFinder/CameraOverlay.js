/* eslint-disable react/prop-types */
import React from 'react';
import { Box } from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';

function CameraOverlay({classes, resolution}) {
    return (<React.Fragment>
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
          <AddRoundedIcon className={classes.crosshairs} ></AddRoundedIcon>
        </Box>
        <Box
          top={resolution.height * 0.1}
          left={resolution.width * 0.1}
          bottom={0}
          right={0}
          position="absolute"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <svg className={classes.viewFinder} {...{ ...resolution }}>
            <rect {...{ width: resolution.width * 0.90, height: resolution.height * 0.90 }} />
          </svg>
        </Box>
      </React.Fragment>);
};

export default CameraOverlay;
