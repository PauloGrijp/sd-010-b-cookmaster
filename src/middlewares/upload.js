const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, _, callback) => {
    callback(null, `${req.recipe.id}.jpeg`);
  },
});

module.exports = multer({ storage });
