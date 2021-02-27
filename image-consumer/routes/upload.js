const multer = require('multer');
const { decodeBase64Image,
    saveImage,} = require('../helpers/fileSaver');
const MB = 1000000;

const uploadConfig = multer({ 
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + path.extname(file.originalname));
        }
    }), 
    fileFilter: (req, file, cb) => {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }, 
    limits: { fieldSize: MB*10 } 
});

const upload = (file, res) => {
    try {
        console.log('Upload Request Received')
        const { data } = decodeBase64Image(file);
        saveImage(data, `uploads/${+ new Date()}-photo.png`);
        return res.status(201).json({
            message: 'Image uploaded successfully'
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: 'Image upload failed'
        });
    }
}

module.exports = {
    upload,
    uploadConfig,
}