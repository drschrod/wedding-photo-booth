import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,
  },
  gridList: {
    width: 1080,
    height: 1920-608,
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

  const fetchImagePreview = async () => {
    const response = await fetch('/preview', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {},
    });
    console.log(response)
    return response.json();
  }

  useEffect( async () => {    // Update the document title using the browser API    
    if (loading) {
      setLoading(false);   
      const imagePreview = await fetchImagePreview();
      setImages(imagePreview.body.slice(0, 3));
    }
  });
  console.log(images)
  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {images.map((data) => (
          <GridListTile key={data.img} cols={data.cols || 1}>
            <img src={data.img} alt={data.title || ''} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
