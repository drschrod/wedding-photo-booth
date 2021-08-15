const fs = require('fs');
const { checkDiskSpace } = require('./diskHealth');

const decodeBase64Image = (base64Image) => {
  const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  const response = {};

  if (matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = matches[1];
  response.data = new Buffer.from(matches[2], 'base64');
  checkDiskSpace();
  return response;
};

const saveImage = (data, filename) => fs.writeFile(filename, data, { encoding: 'base64' }, (err) => {
  console.log(`Image successfull saved to ${filename}.`);
});

module.exports = {
  decodeBase64Image,
  saveImage,
};
