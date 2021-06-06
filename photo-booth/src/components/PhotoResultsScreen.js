import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { fetchImagePreview } from '../modules/requests';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: '7%',
    maxWidth: 540,
    margin: 'auto',
  },
  media: {
    margin: 'auto',
    marginBottom: '3%',
    // paddingTop: '3%', // 16:9
    // paddingBottom: '3%', // 16:9
    height: '92%',
    width: '92%',
    objectFit: 'cover',
    borderRadius: '20px',
    // borderWidth: '5px',
    borderStyle: 'solid',
    borderLeftStyle: 'dashed',
    borderRightStyle: 'dashed',
    borderRightColor: 'black',
    borderLeftColor: 'black',
    borderRightWidth: '10px',
    borderLeftWidth: '10px',
    // background: 'black',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

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
export default function PhotoResultsScreen() {
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {    // Update the document title using the browser API    
    if (loading) {
      const imagePreview = await fetchImagePreview();
      setImages(imagePreview.body.slice(0, 3));
      setLoading(false);
    }
  });
  // TODO: 
  // - Add animations
  return (
    <div className={classes.root}>

      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="pic" className={classes.avatar}>
              {'E&M'}
              {/* NOTE: Maybe put a photo of esteban and meagan here? */}
            </Avatar>
          }
          title={"Esteban & Meagan Get Married"}
          subheader="September 14, 2021"
        />
        {loading ? null : <>
          <CardMedia
            className={classes.media}
            component="img"
            src={images[0].img}
            title="t"
          />
        </>}

      </Card>

    </div>
  );
}
