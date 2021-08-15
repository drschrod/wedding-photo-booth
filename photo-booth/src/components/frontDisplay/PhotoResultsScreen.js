import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, } from '@material-ui/core';
import Image from 'material-ui-image';
import PropTypes from 'prop-types';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';



/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function PhotoResultsScreen({photo, height, width, endPhotoTimeout}) {
  const useStyles = makeStyles((theme) => ({
    cameraPaper: {
      padding: theme.spacing(2),
      paddingBottom: '2%',
      width: width * 0.85,
      height: height,
      margin: 'auto',
      backgroundColor: 'white'
    },
  }));
  const classes = useStyles();
  const [show, setShow] = useState(true)
  const enter = 2000;
  const exit = endPhotoTimeout - enter * 1.5;
  useEffect(() => {
    setTimeout(() => setShow(state => false), exit)
  }, [])

  return (
      <Fade  in={show} timeout={{ exit: 1500}}>
      <Slide direction="down" in={true} timeout={{ enter }} mountOnEnter unmountOnExit>
        <Paper elevation={4} className={classes.cameraPaper}>
          <Image
            src={photo}
            onClick={() => console.log('onClick')}
            aspectRatio={16/9}
            imageStyle={{height: 0.85 * height, width: 0.85 * width, }}
            disableSpinner
          />
        </Paper>
        
      </Slide>
    </Fade>
    
    
  )
}

PhotoResultsScreen.propTypes = {
  photo: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
  endPhotoTimeout: PropTypes.number,
};
