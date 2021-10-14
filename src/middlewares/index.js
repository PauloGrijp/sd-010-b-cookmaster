const errorMiddleware = require('./errorMiddleware');
const validateJWT = require('./validateJWT');
const upload = require('./upload');

module.exports = {
  errorMiddleware,
  validateJWT,
  upload,
};
