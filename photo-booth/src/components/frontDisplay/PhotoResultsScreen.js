import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import PhotoWithLabel from '../common/PhotoWithLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    color: 'white',
    width: '89%',
    textAlign: 'center'
  },
  cardRoot: {
    paddingLeft: '5%',
    paddingTop: '3%',
    paddingRight: '5%'
  },
}));
export default function PhotoResultsScreen({photo, height, width}) {
  const classes = useStyles();

  return (<PhotoWithLabel photo={photo} height={0.80 * height} width={0.80 * width} classes={classes}></PhotoWithLabel>)
}

PhotoResultsScreen.propTypes = {
  photo: PropTypes.object,
  height: PropTypes.number,
  width: PropTypes.number,
};
