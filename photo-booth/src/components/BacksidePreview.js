import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { fetchImagePreview } from '../modules/requests';
import { Box } from '@material-ui/core';
import PhotoWithLabel from './common/PhotoWithLabel';
import { resolutions } from '../modules/camera';

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
  },
  slideShow: {
    padding: '30%'
  },
  cardRoot: {
    margin: '5%',
    paddingLeft: '5%',
    paddingTop: '5%',
    paddingRight: '5%'
  },
  image: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  lowerCarousel: {
    height: '100%',
    width: '100%',
    bottom: '0px',
    position: 'fixed'
  }
}));
const timeBetweenSlides = 3500;
const animationSpeed = 2500;
const timePerSlide = 10000 + (animationSpeed * 2) + timeBetweenSlides;

const BacksidePreview = () => {
  const classes = useStyles();
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };

  const handleDragStart = (e) => e.preventDefault();
  const [isLoaded, setIsLoaded] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [images, setImages] = useState([]);
  const [slideShowImgs, setSlideshowImgs] = useState([]);
  const [slideNumber, setSlideNumber] = useState(0);

  const refreshSlideShowChoices = async () => {
    const imagePreview = (await fetchImagePreview()).body;
    setSlideshowImgs(() => imagePreview)
    const imagesSet = imagePreview.map((i) => <img className={classes.carouselImgs} key={i.img} src={i.img} onDragStart={handleDragStart} />,)
    setImages(() => imagesSet);
    setIsLoaded(true);
    setTimeout(() => {
      refreshSlideShowChoices();
    }, 60000);
  };

  useEffect(async () => {
    if (!isLoaded) {
      await refreshSlideShowChoices();
    }
  }, []);

  useEffect(() => {
    try {
      clearInterval(intervalId);
    } catch (error) {
      // Its fine this is a safety precaution
    }
    const id = setInterval(() => {
      if (slideShowImgs) {
        setSlideNumber(prevState => {
          const nextSlide = prevState + 1;
          return nextSlide >= slideShowImgs.length ? 0 : nextSlide;
        })
      }
    }, timePerSlide);
    setIntervalId(id);
    return () => {
      clearInterval(intervalId);
    }
  }, [images])

  if (!isLoaded) {
    return null;
  }

  const bottomSlideShow = (<div>
    <Box
      left='0%'
      right='0%'
      bottom='10%'
      margin='auto'
      position="absolute"
      justify='space-around'
    >
      <AliceCarousel
        autoPlay={true}
        responsive={responsive}
        disableButtonsControls={true}
        disableDotsControls={true}
        infinite={true}
        items={images}
        animationEasingFunction={'linear'}
        autoPlayInterval={0}
        animationDuration={8000}
      />
    </Box>
  </div>);

  return (
    <>
      <PhotoWithLabel photo={slideShowImgs[slideNumber].img} height={resolutions['qHD'].height * 0.9} width={resolutions['qHD'].width * 0.9} classes={classes}></PhotoWithLabel>
      {bottomSlideShow}
    </>

  );
};

export default BacksidePreview;
