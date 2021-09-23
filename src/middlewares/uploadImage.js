const multer = require('multer');

  const storage = multer.diskStorage({
      destination: (_req, _file, callback) => {
          callback(null, `${__dirname}/../uploads`);
      },
      filename: (req, _file, callback) => {
          callback(null, `${req.params.id}.jpeg`);
      },
  });
  const upload = multer({ storage }).single('image');

module.exports = upload;