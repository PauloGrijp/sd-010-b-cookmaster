const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: path.join(__dirname, '..', 'uploads'),
  filename: (req, _file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpg`);
  },
});

const memoryUpload = multer({ storage });

module.exports = {
  memoryUpload,
};