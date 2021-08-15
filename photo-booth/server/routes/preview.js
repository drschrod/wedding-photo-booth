const fs = require('fs');
const path = require('path');

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const orderRecentFiles = (dir, route) => fs.readdirSync(dir)
  .filter((file) => fs.lstatSync(path.join(dir, file)).isFile())
  .map((file) => {
    const multiplier = getRandomInt(4);
    return {
      img: `uploads/${file}`,
      cols: 1,
      rows: 3,
      mtime: fs.lstatSync(path.join(dir, file)).mtime,
    };
  })
  .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

module.exports = {
  orderRecentFiles,
};
