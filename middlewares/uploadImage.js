const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads/'),
  filename: (req, file, callback) => {
    const { id } = req.params;
   return callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage }).single('image');

module.exports = upload;