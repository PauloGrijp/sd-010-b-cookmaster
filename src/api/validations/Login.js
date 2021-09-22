const { userLogin } = require('../models/Login');

const errors = {
  emptyInputs: 'All fields must be filled',
  incorrectEntries: 'Incorrect username or password',
};

// const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const checkEmptyInputs = (email, password) => {
  if (!email || !password) return { message: errors.emptyInputs };

  return {};
};

// const checkEmailFormat = (email) => {
//   if (!emailRegEx.test(email)) return { message: errors.incorrectEntries };

//   return {};
// };

const verifyPassword = async (email, password) => {
  const response = await userLogin(email, password);
  if (response.loginError) return { message: errors.incorrectEntries };

  return {};
};

module.exports = {
  checkEmptyInputs,
  // checkEmailFormat,
  verifyPassword,
};
