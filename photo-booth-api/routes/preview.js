const fs = require("fs");
const path = require("path");

const getMostRecentFile = (dir) => {
  const files = orderReccentFiles(dir);
  console.log(files);
  return files.length ? files[0] : undefined;
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const orderRecentFiles = (dir, route) => fs.readdirSync(dir)
  .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
  .map((file) => {
    const multiplier = getRandomInt(4)
    return {
      img: `uploads/${file}`,
      cols: 1,
      rows: 3,
      mtime: fs.lstatSync(path.join(dir, file)).mtime
    };
  })
  .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

const getSortedImages = (req, res) => {
  // const tileData = [{
  //   img: image,
  //   title: 'Image',
  //   author: 'author',
  //   cols: 2,
  // }];
  getMostRecentFile('uploads/')
}

module.exports = {
  getSortedImages,
  getMostRecentFile,
  orderRecentFiles,
}
