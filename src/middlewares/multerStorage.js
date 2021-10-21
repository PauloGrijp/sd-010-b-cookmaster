const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _, callback) => {
    /* eslint no-underscore-dangle: 0 */
    callback(null, `${req.recipe._id}.jpeg`);
  },
});

module.exports = multer({ storage });
