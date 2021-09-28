const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, filler, callback) => { 
    callback(null, path.join(__dirname, '..', 'uploads'));
   },
  fillerName: (req, filter, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  },
});

module.exports = multer({ storage });
