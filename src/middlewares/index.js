const error = require('./error');
const validateAdmin = require('./validateAdmin');
const validateJWT = require('./validateJWT');
const multerStorage = require('./multerStorage');

module.exports = {
  error,
  validateAdmin,
  validateJWT,
  multerStorage,
};
