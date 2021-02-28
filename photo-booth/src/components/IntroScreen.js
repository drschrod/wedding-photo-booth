import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { fetchImagePreview } from '../modules/requests';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '25%',
    paddingBottom: '25%',
    margin: 'auto',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    textAlign: 'center'
  },
  carouselImgs: {
    height: '100%',
    width: '100%'
  }
}));

const IntroScreen = () => {
  const classes = useStyles();
  /** TODO
   * - Draw and animate a simple arrow pointing to the button on Procreate
   * - Use Said image here
   * - Add carousel of images to bottom/top or left and right sides
   */

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
};
  const gifs = [
    "https://giphy.com/embed/GVcQtnmqBiEg0",
    "https://giphy.com/embed/HvUbttMjFpVy3J11gA"
  ];
  const handleDragStart = (e) => e.preventDefault();
  const [gif, setGif] = useState(gifs[0]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [images, setImages] = useState([]);
  // IDEA: hashtag photo scraper pulls images and puts them into separate folder, idk
  useEffect( async () => {
    if (!isLoaded) {
      const imagePreview = await fetchImagePreview();
      const images = imagePreview.body.map((i) => <img className={classes.carouselImgs} key={i.img} src={i.img} onDragStart={handleDragStart} />,)
      setImages(images);
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
      <AliceCarousel 
        autoPlayDirection={'rtl'}
        autoPlay={true} 
        responsive={responsive} 
        disableButtonsControls={true} 
        disableDotsControls={true} 
        infinite={true} 
        items={images}
        animationEasingFunction={'linear'}
        autoPlayInterval={0}
        animationDuration={2000}
      />
      <h1>Press The Button</h1>
      <iframe 
        src={gif} 
        width="480" height="270" 
        frameBorder="0" 
        allowFullScreen={false}>
      </iframe>
      <h1>To Start</h1>
      <AliceCarousel 
        autoPlay={true} 
        responsive={responsive} 
        disableButtonsControls={true} 
        disableDotsControls={true} 
        infinite={true} 
        items={images}
        animationEasingFunction={'linear'}
        autoPlayInterval={0}
        animationDuration={2000}
      />
    </div>

  );
};

export default IntroScreen;
