import React, { Component, useEffect, useState } from 'react';
import IntroScreen from './IntroScreen';
import CountDownScreen from './CountDownScreen';
import PhotoResultsScreen from './PhotoResultsScreen';
import { makeStyles } from '@material-ui/core/styles';
import Webcam from 'react-webcam';
import { postImage } from '../modules/requests';
import { resolutions, videoConstraints } from '../modules/camera';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const webcamDimensions=videoConstraints('SD');
const oneSecond = 1000;
const photoCountdownSpeed = oneSecond * 1.5;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#424955',
    maxHeight: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    backgroundColor: 'dark'
  },
  cameraPaper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: webcamDimensions.width,
    backgroundColor: 'white'
  },
  cameraFeed: {
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
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

  const resetCountdownInterval = () => {
    try {
      clearInterval(countDownInterval.current)
    } catch (error) {
      console.log('Failed to clear interval, probably because it was never set', {countDownInterval});
    }
  }

  const forceResetPage = () => {
    console.log('Resetting page');
    window.location.reload(false); 
  };

  const capture = React.useCallback(async () => {
    setPhotoWasJustTaken(true);
    setCapturedImage(webcamRef.current.getScreenshot(resolutions['1080p']));
    await postImage('/upload', capturedImg);
  }, [webcamRef, setPhotoWasJustTaken, setCapturedImage]);
  
  useEffect(() => {
    if (photoWasJustTaken) {
      console.log('useEffect: photoWasJustTaken')
      setCurrentlyTakingPhoto(false);
      resetCountdownInterval();
      // NOTE add progress bar to this timeout
      setTimeout(() => {
        console.log('useEffect: photoWasJustTaken - timeout action')
        setPhotoWasJustTaken(false);
      }, oneSecond*10);
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
    
    return () => clearInterval(countDownInterval.current);
  }, [countDown, currentlyTakingPhoto])

  const onKeyUp = (e) => {
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
  };

  return (
    <div tabIndex="1" onKeyPress={onKeyUp} className={classes.root}>
        <Grid container spacing={2} direction="column">
          <Grid item className={classes.cameraFeed}>
            <Paper elevation={4} className={classes.cameraPaper}>
            <Webcam
              ref={webcamRef}
              mirrored={true}
              audio={false}
              screenshotFormat="image/png"
              screenshotQuality={1}
              forceScreenshotSourceSize={false}
              imageSmoothing={true}
              videoConstraints={webcamDimensions}
            />
            </Paper>
            
          </Grid>
          {/* <Grid item>
            <Typography variant="h1" style={{ cursor: 'pointer' }}>
              {"Esteban & Meagan"}
            </Typography>
          </Grid> */}
        </Grid>
      {/* Lower Half of screen has instructions. ie; press the damn button */}
      <Paper className={classes.paper}>
        <Grid container spacing={2} direction="column">
          <Grid item>
            <Typography variant="h1" >
              Press Button to Start!
            </Typography>
          </Grid>
        </Grid>
        {/* <CountDownScreen count={countDown} zoomInOrOut={zoomInOrOut}  /> */}
        { currentlyTakingPhoto  ? <CountDownScreen count={countDown} zoomInOrOut={zoomInOrOut} /> : null}
        { photoWasJustTaken ? <PhotoResultsScreen /> : null }
      </Paper>
    </div>
  );
}

export default PhotoBooth;




