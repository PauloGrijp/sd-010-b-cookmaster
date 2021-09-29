const User = require('../models/modelUsers');
const { hasName,
  hasEmail,
  isEmailValid,
  hasPassword,
  hasEmailLogin,
  hasPasswordLogin,
} = require('../schema/validations');

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

const login = async (email, password) => {
  const validateLoginEmail = hasEmailLogin(email);
  if (validateLoginEmail.message) return validateLoginEmail;

  const validateLoginPassword = hasPasswordLogin(password);
  if (validateLoginPassword.message) return validateLoginPassword;

  const logInto = await User.login(email, password);
  // console.log(logInto);
  if (!logInto) {
    return {
      message: 'Incorrect username or password',
    };
  }

  return logInto;
};

module.exports = {
  create,
  findEmail,
  login,
};