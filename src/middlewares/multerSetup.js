const multer = require('multer');
const path = require('path');

const uploadWithMulter = multer({
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, path.join(__dirname, '..', 'uploads'));
    },
    filename: (req, file, callback) => {
      const { id } = req.params;
      callback(null, `${id}.jpeg`);
    },
  }),
});

module.exports = {
  uploadWithMulter,
};
