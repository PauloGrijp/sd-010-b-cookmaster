const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, _file, callback) => {
    const id = req.params.recipeId;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};