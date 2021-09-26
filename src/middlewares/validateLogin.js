const modelsLogin = require('../models/login');

const errors = {
  emptyInputs: 'All fields must be filled',
  invalid: 'Incorrect username or password',
};

const checkEmptyInputs = (email, password) => {
  if (!email || !password) return { message: errors.emptyInputs };

  return {};
};

const verifyPassword = async (email, password) => {
  const result = await modelsLogin.userLogin(email, password);
  if (result.loginError) return { message: errors.invalid };

  return {};
};

module.exports = {
  checkEmptyInputs,
  verifyPassword,
};