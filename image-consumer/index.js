const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
const path = require('path');
const { uploadConfig, upload } = require('./routes/upload');
const { orderRecentFiles } = require('./routes/preview');


const port = 3001;
const app = express();

app.use(morgan('dev'))
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Upload route
app.post('/upload', uploadConfig.single('image', 100), (req, res) => upload(req.body.file, res));

app.get('/preview', (req, res) => {
  return res.status(200).json({
    body: orderRecentFiles('uploads/', `localhost:${port}/uploads/`)
  });
});

//console.log('Fetch most recent photos for display at the bottom of screen'));
app.listen(port, () => console.log(`Image consumer listening on port: ${port}!`));
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });

app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(cors)