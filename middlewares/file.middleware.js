const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
});

const VALID_FILE_TYPES = ['image/png', 'image/jpg', 'image/jpeg'];

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (!VALID_FILE_TYPES.includes(file.mimetype)) {
            const error = new Error('Invalid file type');
            cb(error)
        } else {
            cb(null, true);
        }
    },
});

module.exports = { upload };