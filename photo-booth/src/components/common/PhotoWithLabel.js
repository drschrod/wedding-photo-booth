import React from 'react';
import { Box, Card, CardContent, } from '@material-ui/core';
import Image from 'material-ui-image';
import PropTypes from 'prop-types';

const PhotoWithLabel = (props) => {
    const { photo, height, width, classes, } = props
  const todaysDate = new Date();
  return (
    <div tabIndex="-9999" aria-label="photo with label" className={classes.root}>
      <Card className={classes.cardRoot}>
        <Image
          src={photo}
          aria-label={"main image"}
          aspectRatio={16/9}
          imageStyle={{height, width, }}
          disableSpinner
        />
        <CardContent>
          <Box
            fontWeight="fontWeightBold"
            fontSize={40}
            textAlign="center"
            fontFamily='"Helvetica Neue"'
          >
          {'Esteban & Meagan'}
          </Box>
          <Box
            fontFamily="Monospace"
            fontWeight='fontWeightLight'
            fontSize={20}
            textAlign="center"
            fontStyle="oblique"
            letterSpacing={5}
          >
          {/* {todaysDate.toLocaleString('default', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })} */}
          </Box>
        </CardContent>
      </Card>
    </div>

  );
};

export default PhotoWithLabel;
PhotoWithLabel.propTypes = {
  photo: PropTypes.any,
  height: PropTypes.number,
  width: PropTypes.number,
  classes: PropTypes.object,
};