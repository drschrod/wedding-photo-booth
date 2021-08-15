const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const { uploadConfig, upload } = require('./routes/upload');
const { orderRecentFiles } = require('./routes/preview');

const port = 3000;
const app = express();

// Middleware
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(cors);
// app.use(morgan('dev'));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ROUTES
// Upload route
app.post('/upload', uploadConfig.single('image', 100), (req, res) => upload(req.body.file, res));

app.get('/preview', (req, res) => res.status(200).json({
  body: orderRecentFiles('uploads/', `localhost:${port}/uploads/`),
}));
app.use('/static', express.static(path.join(__dirname, '../build/static')));
app.get('/*', (req, res) => {  res.sendFile(path.join(__dirname, '../build/index.html'));})
app.get('/favicon.ico', (req, res) => res.status(204));

// END ROUTES
// app.use((req, res, next) => {
//   res.sendFile(path.join(__dirname, "..", "build", "index.html"));
// });

app.listen(port, () => console.log(`Image consumer listening on port: ${port}!`));
app.all('/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', '*');
  next();
});


