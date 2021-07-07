import React, { Component, useEffect, useState } from 'react';
import CountDownScreen from './CountDownScreen';
import BorderLinearProgress from './common/LinearProgress';
import PhotoResultsScreen from './PhotoResultsScreen';
import { makeStyles } from '@material-ui/core/styles';
import Webcam from 'react-webcam';
import { postImage } from '../modules/requests';
import { resolutions, videoConstraints } from '../modules/camera';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { Box, Typography, Paper, Grid, rgbToHex } from '@material-ui/core';
import Fade from '@material-ui/core/Fade';

const webcamDimensions = videoConstraints();
const oneSecond = 1000;
const photoCountdownSpeed = oneSecond * 1.5;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#424955',
    maxHeight: '100%',
    height: '100%',
    width: '100%',
    paddingTop: '5%',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: 'white'
  },
  cameraPaper: {
    zIndex: 999,
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: webcamDimensions.width,
    backgroundColor: 'white'
  },
  cameraFeed: {
    zIndex: 998,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crosshairs: {
    color: "white",
    opacity: 0.5,
    fontSize: 100,
  },
  viewFinder: {
    fill: 'None',
    strokeWidth: 10,
    stroke: 'white',
    opacity: 0.5,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  lensCover: {
    fill: 'black',
    strokeWidth: 10,
    stroke: 'black',
    // opacity: 0.5,
    position: "absolute",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }
}));

function PhotoBooth() {
  const classes = useStyles();
  const webcamRef = React.useRef(null);
  const countDownInterval = React.useRef(null);
  const [photoWasJustTaken, setPhotoWasJustTaken] = React.useState(false);
  const [currentlyTakingPhoto, setCurrentlyTakingPhoto] = React.useState(false);
  const [countDown, setCountDown] = React.useState(3);
  const [capturedImg, setCapturedImage] = React.useState(null);
  const [zoomInOrOut, setZoomInOrOut] = React.useState(false);

  const endPhotoTimeout = oneSecond * 30;
  const resetCountdownInterval = () => {
    try {
      clearInterval(countDownInterval.current)
    } catch (error) {
      console.log('Failed to clear interval, probably because it was never set', { countDownInterval });
    }
  }

  const forceResetPage = () => {
    console.log('Resetting page');
    window.location.reload(false);
  };

  const capture = React.useCallback(async () => {
    // NOTE: Do not specify the dimensions in the getScreenshot fn
    // That causes a mishaped image to be saved
    setCapturedImage(webcamRef.current.getScreenshot());
    setPhotoWasJustTaken(true);
    setCurrentlyTakingPhoto(false);
    await postImage('/upload', capturedImg);
  }, [webcamRef, setPhotoWasJustTaken, setCapturedImage]);

  useEffect(() => {
    if (photoWasJustTaken) {
      console.log('useEffect: photoWasJustTaken')
      resetCountdownInterval();
      setTimeout(() => {
        console.log('useEffect: photoWasJustTaken - timeout action')
        setPhotoWasJustTaken(false);
      }, endPhotoTimeout);
      return;
    }
  }, [photoWasJustTaken]);

  useEffect(() => {
    if (currentlyTakingPhoto) {
      countDownInterval.current = setInterval(() => {
        if (countDown === 0) {
          setZoomInOrOut(false);
          setCountDown(3);
          capture();
        } else {
          setCountDown(countDown - 1);
          console.log(countDown)
        }
      }, photoCountdownSpeed)
    }
    // if (photoWasJustTaken && countDown === 0) {
    //   countDownInterval.current = setInterval(() => {
    //     if (countDown === 0) {
    //       setZoomInOrOut(false);
    //       setCountDown(3);
    //       capture();
    //     } else {
    //       setCountDown(countDown - 1);
    //       console.log(countDown)
    //     }
    //   }, photoCountdownSpeed)
    // }

    return () => clearInterval(countDownInterval.current);
  }, [countDown, currentlyTakingPhoto])

  useEffect(() => {
    function handleKeyDown(e) {
      switch (e.key) {
        case 't':
          if (!currentlyTakingPhoto) {
            setZoomInOrOut(true)
            setCurrentlyTakingPhoto(true);
          }
          break;
        default:
          forceResetPage();
          break;
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    window.open('/back')
    // Don't forget to clean up
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);
  

  // TEMP Component breakdown
  const CameraViewfinder = (
    <div className={classes.cameraFeed}>
      <Paper elevation={4} className={classes.cameraPaper}>
        <Box position="relative" display="inline-flex">
          <Webcam
            ref={webcamRef}
            mirrored={true}
            audio={false}
            screenshotFormat="image/png"
            screenshotQuality={1}
            forceScreenshotSourceSize={true}
            imageSmoothing={false}
            videoConstraints={webcamDimensions}
            {...{...resolutions['qHD']}}
          />
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
            top={resolutions['qHD'].height  * 0.1}
            left={resolutions['qHD'].width * 0.1}
            bottom={0}
            right={0}
            position="absolute"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <svg className={classes.viewFinder} {...{...resolutions['qHD']}}>
              <rect {...{ width: resolutions['qHD'].width * 0.90, height: resolutions['qHD'].height * 0.90}}  />
            </svg> 
          </Box>
          <Fade in={photoWasJustTaken}>
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
            <svg className={classes.lensCover} {...{...resolutions['qHD']}}>
              <rect {...{ width: resolutions['qHD'].width, height: resolutions['qHD'].height}}  />
            </svg> 
          </Box>
            </Fade>
          
        </Box>
      </Paper>
    </div>
  )
  // -------------------------
  const InstructionsFooter = (
    <div>
        <Box
          left='10%'
          right='10%'
          bottom={0}
          margin='auto'
          position="absolute"
          justify='space-around'
        >
          <Typography align='center' variant="h2" >
            Push Button to Take a Picture
            </Typography>
          <Grid container direction="row" justify='space-around'>
            <Grid item>< ArrowDownwardIcon style={{ fontSize: 100 }} ></ArrowDownwardIcon></Grid>
            <Grid item>< ArrowDownwardIcon style={{ fontSize: 100 }} ></ArrowDownwardIcon></Grid>
            <Grid item>< ArrowDownwardIcon style={{ fontSize: 100 }} ></ArrowDownwardIcon></Grid>
          </Grid>
        </Box>
      </div>
  );
  return (
    <div tabIndex="1" className={classes.root}>
      
      {CameraViewfinder}
      { currentlyTakingPhoto ? 
          <Box 
            display="flex"
            alignItems="center"
            justifyContent="center" margin="10%">
              <CountDownScreen count={countDown} zoomInOrOut={zoomInOrOut} />
          </Box> : 
          null
      }
      

      {/* {photoWasJustTaken || true ?  */}
      { photoWasJustTaken ?
              <PhotoResultsScreen photo={capturedImg} {...{...webcamDimensions, endPhotoTimeout}}/>

      : null }
      {/* Lower Half of screen has instructions. ie; press the damn button */}
      {InstructionsFooter}
    </div>
  );
}

export default PhotoBooth;




