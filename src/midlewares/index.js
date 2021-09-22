const { userValidation, validateEmail } = require('./userValidation');
const { userLogin, validatePwd } = require('./loginValidation');

module.exports = { userValidation, validateEmail, userLogin, validatePwd };