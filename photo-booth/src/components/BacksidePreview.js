import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { fetchImagePreview } from '../modules/requests';
import { Fade, Box, CardMedia, Card, CardContent, Typography } from '@material-ui/core';

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
  const [inState, setIn] = useState(false);

  const refreshSlideShowChoices = async () => {
    setIsLoaded(false);
      const imagePreview = (await fetchImagePreview()).body;
      setSlideshowImgs(imagePreview)
      const imagesSet = imagePreview.map((i) => <img className={classes.carouselImgs} key={i.img} src={i.img} onDragStart={handleDragStart} />,)
      setImages(imagesSet);
      setIsLoaded(true);
      setTimeout(() => {
        refreshSlideShowChoices();
      }, 60000);
  };

  useEffect(async () => {
    if (!isLoaded) {
      await refreshSlideShowChoices();
    }
  });

  useEffect(() => {
    const id = setInterval(() => {
      if (slideShowImgs) {
        setIn(false);
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

  useEffect(() => {
    setTimeout(() => {
      setIn(true);
    }, timeBetweenSlides);
  }, [slideNumber])

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
    <div tabIndex="-9999" className={classes.root}>

      <Card className={classes.cardRoot}>
        <Fade in={inState} timeout={animationSpeed}>
          <CardMedia className={classes.image} image={slideShowImgs[slideNumber].img} />
        </Fade>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {'Esteban & Meagan'}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {'2021'}
          </Typography>
        </CardContent>
      </Card>
      {bottomSlideShow}
    </div>

  );
};

export default BacksidePreview;
