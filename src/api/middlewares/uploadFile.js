const multer = require('multer');
// const path = require('path');

const storage = multer.diskStorage({
  // destination: (_req, _file, callback) => callback(null, path.join(__dirname, '..', 'uploads')),
  destination: (_req, _file, callback) => callback(null, 'src/uploads'),
  filename: (req, _file, callback) => callback(null, `${req.params.id}.jpeg`),
});

module.exports = multer({ storage }).single('image');
