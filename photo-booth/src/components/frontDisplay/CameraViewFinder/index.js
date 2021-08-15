/* eslint-disable react/prop-types */
import React from 'react';
import Webcam from 'react-webcam';
import { Box, Paper } from '@material-ui/core';
import CameraOverlay from './CameraOverlay';
import PhotoResult from './PhotoResult';

function CameraViewFinder(props) {
    const {classes, webcamDimensions, resolution, webcamRef } = props;
    return (
        <div className={classes.cameraFeed}>
          <Paper elevation={4} className={classes.cameraPaper}>
            <Box position="relative" display="inline-flex">
              <Webcam
                ref={webcamRef}
                mirrored={true}
                audio={false}
                screenshotFormat="image/png"
                screenshotQuality={1}
                forceScreenshotSourceSize={false}
                minScreenshotHeight={1080}
                minScreenshotWidth={1920}
                imageSmoothing={false}
                videoConstraints={webcamDimensions}
                {...{ ...resolution }}
              />
              <CameraOverlay {...props}></CameraOverlay>
              <PhotoResult {...props}></PhotoResult>
            </Box>
          </Paper>
        </div>
      )
}

export default CameraViewFinder;




