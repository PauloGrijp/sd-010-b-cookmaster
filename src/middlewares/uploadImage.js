const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, callback) => callback(null, 'src/uploads'),
  filename: (req, file, callback) => {
    const fileName = req.params.id;
    return callback(null, `${fileName}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
