const multer = require('multer');

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, 'uploads');
    },
    filename: (_req, file, callback) => {
      callback(null, file.originalname);
    },
  });
  const upload = multer({ storage });

module.exports = upload;
