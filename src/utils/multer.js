const multer = require('multer');

const storage = multer.diskStorage({
    destination: (_req, _file, callback) => {
      callback(null, './src/uploads');
    },
    filename: (req, _file, callback) => {
      const { _id } = req.params;
      callback(null, `${_id}.jpeg`);
    },
  });
const upload = multer({ storage });

module.exports = upload;
