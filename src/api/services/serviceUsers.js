const User = require('../models/modelUsers');
const { hasName, hasEmail, isEmailValid, hasPassword } = require('../schema/validations');

const create = async (name, email, password, role) => {
  const validateName = hasName(name);
  if (validateName.message) return validateName;

  const validateEmail = hasEmail(email);
  if (validateEmail.message) return validateEmail;

  const regexEmail = isEmailValid(email);
  if (regexEmail.message) return regexEmail;

  const validatePassword = hasPassword(password);
  if (validatePassword.message) return validatePassword;

  return User.create(name, email, password, role);
};

const findEmail = async (email) => {
  const foundEmail = await User.findEmail(email);

  if (foundEmail) return false;

  return true;
};

module.exports = {
  create,
  findEmail,
};