const express = require('express');
const morgan = require('morgan');
const path = require('path');
const { uploadConfig, upload } = require('./routes/upload');
const { orderRecentFiles } = require('./routes/preview');

const port = 3000;
const app = express();

const uploadsPath = 'public/uploads';
// Middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static('public'));
app.use(morgan('dev'));

// ROUTES
// Upload route: Accepts new images taken by the photobooth and saves them to the uploads directory
app.post('/upload', uploadConfig.single('image', 100), (req, res) => upload(req.body.file, res));

app.get('/preview', (req, res) => res.status(200).json({
  body: orderRecentFiles(`${uploadsPath}/`, `localhost:${port}/${uploadsPath}/`),
}));
app.get('/*', (req, res) => {  res.sendFile(path.join(__dirname, '../build/index.html'));})

// END ROUTES

app.listen(port, () => console.log(`Image consumer listening on port: ${port}!`));
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


