const multer = require('multer');
const path = require('path');

// Source: https://app.betrybe.com/course/live-lectures/sd-cohort-10-b#aula-282-nodejs-upload-de-arquivos-com-multer
const staticDestination = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, staticDestination);
  },
  filename: (req, file, callback) => {
    const { id } = req.params;
    callback(null, `${id}.jpeg`);
  },
});

const upload = multer({ storage });

module.exports = upload;
