const { userLogin } = require('../models/Login');

const errors = {
  emptyInputs: 'All fields must be filled',
  incorrectEntries: 'Incorrect username or password',
};

const checkEmptyInputs = (email, password) => {
  if (!email || !password) return { message: errors.emptyInputs };

  return {};
};

const verifyPassword = async (email, password) => {
  const response = await userLogin(email, password);
  if (response.loginError) return { message: errors.incorrectEntries };

  return {};
};

module.exports = {
  checkEmptyInputs,
  verifyPassword,
};
