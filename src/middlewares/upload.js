const path = require('path');
const multer = require('multer');

const UPLOADS_FOLDER = path.join(__dirname, '..', 'uploads'); 

const storage = multer.diskStorage({
  destination: path.join(UPLOADS_FOLDER),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const memoryUpload = multer({ storage });

module.exports = {
  memoryUpload,
};