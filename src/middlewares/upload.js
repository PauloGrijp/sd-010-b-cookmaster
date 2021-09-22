const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'src/uploads');
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    const newFilename = `${id}.jpeg`;
    callback(null, newFilename);
  },
});

const uploadMiddleware = multer({ storage }).single('image');
module.exports = uploadMiddleware;
