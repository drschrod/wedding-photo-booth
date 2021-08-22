import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { resolutions, videoConstraints } from '../../modules/camera';
import CameraViewfinder from './CameraViewFinder';

const webcamDimensions = videoConstraints();

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

  return (
    <div tabIndex="1" className={classes.root}>
      <CameraViewfinder {...{ classes, webcamDimensions, resolution: resolutions['qHD'], }}></CameraViewfinder>
    </div>
  );
}

export default PhotoBooth;




