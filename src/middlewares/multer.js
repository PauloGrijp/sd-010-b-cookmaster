const multer = require('multer');
const { join } = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, join(__dirname, '..', 'uploads'));
  },
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

module.exports = multer({ storage });