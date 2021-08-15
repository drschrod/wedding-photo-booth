import React, { useEffect } from 'react';
import CountDownScreen from './CountDownScreen';
import PhotoResultsScreen from './frontDisplay/PhotoResultsScreen';
import { makeStyles } from '@material-ui/core/styles';
import { postImage } from '../modules/requests';
import { resolutions, videoConstraints } from '../modules/camera';
import { Box } from '@material-ui/core';
import CameraViewfinder from './frontDisplay/CameraViewFinder';
import InstructionsFooter from './frontDisplay/InstructionsFooter';

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
    borderRadius: 5,
  },
  lensCover: {
    fill: 'black',
    strokeWidth: 10,
    stroke: 'black',
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
    const screenshot = await webcamRef.current.getScreenshot()
    setCapturedImage(() => screenshot);

    setPhotoWasJustTaken(true);
    setCurrentlyTakingPhoto(false);
    await postImage('/upload', screenshot);
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

    return function cleanup() {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div tabIndex="1" className={classes.root}>
      <CameraViewfinder {...{ classes, webcamDimensions, resolution: resolutions['qHD'], photoWasJustTaken, webcamRef }}></CameraViewfinder>
      {photoWasJustTaken ?
        <PhotoResultsScreen photo={capturedImg} {...{ ...webcamDimensions, endPhotoTimeout }} />
        : null}
      {currentlyTakingPhoto ?
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center" margin="10%">
          <CountDownScreen count={countDown} zoomInOrOut={zoomInOrOut} />
        </Box> :
        <InstructionsFooter></InstructionsFooter>
      }
    </div>
  );
}

export default PhotoBooth;




