const multer = require('multer');

const upload = multer({ dest: '../sd-010-b-cookmaster/src/uploads/' });

module.exports = upload;
