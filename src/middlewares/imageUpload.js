const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, `${__dirname}/../uploads`),
  filename: (req, file, callback) => callback(null, `${req.params.id}.jpg`),
});

const upload = multer({ storage }).single('filename');

module.exports = upload;
