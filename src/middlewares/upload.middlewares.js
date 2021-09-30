const multer = require('multer');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => callback(null, 'src/uploads/'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
   return callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = upload;