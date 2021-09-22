const validateLogin = require('./loginValidationMiddleware');
const validateUser = require('./userValidationMiddleware');

module.exports = { validateUser, validateLogin };