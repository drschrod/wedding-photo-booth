/* eslint-disable react/prop-types */
import React, {useEffect, useState,} from 'react';
import Webcam from 'react-webcam';
import { Box, Paper } from '@material-ui/core';
import CameraOverlay from './CameraOverlay';
import { postImage } from '../../../modules/requests';
import PhotoResultsScreen from '../PhotoResultsScreen';
import InstructionsFooter from '../InstructionsFooter';
import CircularCountdown from '../../common/CircularCountdown';

const oneSecond = 1000;
const defaultTimeBetweenPics = 10;
const getCountDownIntervalLength = (step) => {
  switch (step) {
    case 0:
      return oneSecond * 2
    case 1:
      return oneSecond * 1.5
    case 2:
      return oneSecond * 1
    case 3:
      return oneSecond * 1
    default:
      return oneSecond * 1.5
  }
}
// Purpose:
// To Display the camera feed and photo result
function CameraViewFinder(props) {
    const webcamRef = React.useRef(null);
    const [countDown, setCountDown] = React.useState(-1);
    const [secondsUntilNextRound, setSecondsUntilNextRound] = React.useState(-1);
    const [capturedImg, setCapturedImage] = React.useState(null);

    const endPhotoTimeout = oneSecond * 30;
    const currentlyTakingPhoto = countDown >= 0 && !capturedImg;
    const inBetweenRounds = secondsUntilNextRound > 0;
    const { 
      classes, webcamDimensions, resolution,
    } = props;
    
    function handleKeyUp({ key }) {
      if (process.env.NODE_ENV !== 'production') {
        switch (key) {
          case 't':
            startPhotoCountDown()
            break;
          default:
            // Default force reset page
            console.log('Resetting page');
            window.location.reload(false);
            break;
        }
      } else {
        startPhotoCountDown()
      }
      
    }
    // We need access to the following via props:
    const capture = React.useCallback(async () => {
      // NOTE: Do not specify the dimensions in the getScreenshot fn
      // That causes a mishaped image to be saved
      const screenshot = await webcamRef.current.getScreenshot()
      setCapturedImage(() => screenshot);
      await postImage('/upload', screenshot);
    }, [webcamRef, setCapturedImage, setSecondsUntilNextRound]);
    
    const photoCountdownStep = () => setTimeout(() => {
        setCountDown((prev) => prev - 1);
        if (countDown === 0) {
          capture();
          setSecondsUntilNextRound(() => defaultTimeBetweenPics)
        }
      }, getCountDownIntervalLength(countDown));
    
    const startPhotoCountDown = () => {
      window.removeEventListener('keyup', handleKeyUp);
      setCountDown(() => 3);
    }

    const nextRoundCountdownStep = () => setTimeout(() => {
        if (secondsUntilNextRound > 0) {
          setSecondsUntilNextRound((prev) => prev - 1);
        } else {
          setCapturedImage(() => null);
          window.addEventListener('keyup', handleKeyUp);
        }
    }, oneSecond);

    useEffect(() => {
      if (countDown >= 0) {
        photoCountdownStep();
      }
    }, [countDown])

    useEffect(() => {
      if (secondsUntilNextRound === defaultTimeBetweenPics) {
        setTimeout(() => {
          nextRoundCountdownStep();
        }, 2 * oneSecond);
      } else {
        nextRoundCountdownStep();
      }
    }, [secondsUntilNextRound, setSecondsUntilNextRound])

    useEffect(() => {
      window.addEventListener('keyup', handleKeyUp);
      return function cleanup() {
        window.removeEventListener('keyup', handleKeyUp);
      }
    }, []);

    return (
        <div className={classes.cameraFeed}>
          {inBetweenRounds ? (
              <>
                <PhotoResultsScreen photo={capturedImg} {...{ ...webcamDimensions, endPhotoTimeout }} />
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center" margin="10%">
                  <CircularCountdown count={secondsUntilNextRound} />
                  <h3>Next Photo in</h3>
                </Box>
              </>
            ) :
            (<Paper elevation={4} className={classes.cameraPaper}>
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
              </Box>
            </Paper>)
          }
          {currentlyTakingPhoto && (<Box
              display="flex"
              alignItems="center"
              justifyContent="center" margin="10%">
              <CircularCountdown count={countDown} />
            </Box>)
          }
          {
            !inBetweenRounds && <InstructionsFooter></InstructionsFooter>
          }
        </div>
      )
}

export default CameraViewFinder;




