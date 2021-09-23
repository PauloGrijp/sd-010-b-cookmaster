const { usersModel } = require('../models');

const checkEmailPassword = async (email, password) => {
  if (!email || !password) {
    return { err: { status: 401, message: 'All fields must be filled' } }; 
  }
  const checkedEmailPassword = await usersModel.checkEmailPassword(email, password);
  if (!await checkedEmailPassword) {
    return { err: { status: 401, message: 'Incorrect username or password' } }; 
  }
  return checkedEmailPassword;
};

module.exports = { checkEmailPassword };
