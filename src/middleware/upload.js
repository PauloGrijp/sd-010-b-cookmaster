const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'src/uploads');
  },
  filename: (req, file, cb) => {
    const { id } = req.params;
    const name = `${id}.jpeg`;

    cb(null, `${name}`);
  },
});

const upload = (multer({ storage }).single('image'));

module.exports = { upload };