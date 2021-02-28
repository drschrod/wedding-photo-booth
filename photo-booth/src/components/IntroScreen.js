import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '25%',
    paddingBottom: '25%',
    margin: 'auto',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50%',
    textAlign: 'center'
  },
}));

const IntroScreen = () => {
  const classes = useStyles();
  /** TODO
   * - Draw and animate a simple arrow pointing to the button on Procreate
   * - Use Said image here
   * - Add carousel of images to bottom/top or left and right sides
   */
  const gifs = [
    "https://giphy.com/embed/GVcQtnmqBiEg0",
    "https://giphy.com/embed/HvUbttMjFpVy3J11gA"
  ];
  const [gif, setGif] = useState(gifs[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (!isLoaded) {
      startGifRotation();
      setIsLoaded(true);
    }
    return () => {
      // cleanup
      clearInterval(intervalId);
    }
  }, [gif])
  const startGifRotation = () => {
    const id = setInterval(() => {
      if (gif === gifs[1]) {
        setGif(gifs[0]);
      } else {
        setGif(gifs[1]);
      }
    }, 5000);
    setIntervalId(id);
  }

  return (
    <div tabIndex="-9999" className={classes.root}>
      <h1>Press The Button</h1>
      <iframe 
        src={gif} 
        width="480" height="270" 
        frameBorder="0" 
        allowFullScreen={false}>
      </iframe>
      <h1>To Start</h1>
    </div>

  );
};

export default IntroScreen;
