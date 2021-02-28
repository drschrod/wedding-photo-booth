import React, { Component } from 'react';
import IntroScreen from './components/IntroScreen';
import CountDownScreen from './components/CountDownScreen';
import PhotoResultsScreen from './components/PhotoResultsScreen';
import { makeStyles } from '@material-ui/core/styles';
import Webcam from 'react-webcam';
import { postImage } from './modules/requests';
import { resolutions, videoConstraints } from './modules/camera';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
    // borderStyle: 'solid',
    // borderWidth: '5px'
    backgroundColor: '#424955',
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
    // font-size: calc(10px + 2vmin);
  },
  paper: {
    // paddingTop: theme.spacing(2),
    // paddingBottom: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function PhotoBooth() {
  const classes = useStyles();
  const webcamRef = React.useRef(null);
  const [photoWasJustTaken, setPhotoWasJustTaken] = React.useState(null);

  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot(resolutions['1080p']);
    setPhotoWasJustTaken(true);
    setTimeout(() => {
      // TODO: Put progress bar to show timeout
      // Pick the timeout length
      setPhotoWasJustTaken(false);
    }, 5000);
    await postImage('/upload', imageSrc);
  }, [webcamRef, setPhotoWasJustTaken]);

  const onKeyUp = (e) => {
    if (e.key === 't') {
      capture();
    }
  };
  return (
    <div tabIndex="1" onKeyPress={onKeyUp} className={classes.root}>
      <Webcam
        ref={webcamRef}
        mirrored={true}
        audio={false}
        screenshotFormat="image/png"
        screenshotQuality={1}
        forceScreenshotSourceSize={false}
        imageSmoothing={true}
        videoConstraints={videoConstraints}
      />
      {/* <IntroScreen /> */}
      {/* <CountDownScreen /> */}
      {photoWasJustTaken ? <PhotoResultsScreen /> : null }
    </div>

  );
}

export default PhotoBooth;




