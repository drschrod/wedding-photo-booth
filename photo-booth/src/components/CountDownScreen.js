import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Webcam from 'react-webcam';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: 'black',
        color: 'white'
    },
  }));

const CountDownScreen = () => {
  const classes = useStyles();
    /** TODO
     * - Draw and animate a simple arrow pointing to the button on Procreate
     * - Use Said image here
     */
  return (
    <Paper elevation={3} tabIndex="-9999" className={classes.root}>
        <h1>Press The Button</h1>
        <h2>To Start</h2>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
    </Paper>
  
  );
};

export default CountDownScreen;
