const userModel = require('../model/usersModel');

const blank = (value1, value2) => (!value1 || !value2);

const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i; 
const validateEmail = (email) => !regexEmail.test(email);
const validatePassword = (password) => (password < 8);
const errorMessage = {
  message: 'All fields must be filled',
};

const errorEmailOrPassword = {
  message: 'Incorrect username or password',
};

const validations = ({ email, password }) => {
  switch (true) {
    case blank(email, password): return errorMessage;
    case validateEmail(email): return errorEmailOrPassword;
    case validatePassword(password): return errorEmailOrPassword;
    default: return false;
  }
};

const login = async (user) => {
  const isNotValid = validations(user);
  if (isNotValid) { return isNotValid; }
  const result = await userModel.findByEmail(user.email);
  if (!result || result.password !== user.password) { return errorEmailOrPassword; }
  return result;
};

module.exports = {
  login,
};