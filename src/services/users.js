const { userModel } = require('../models');

const postUsersService = async (name, email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const validateEmail = emailRegex.test(email);
  if (!name || !email || !password || !validateEmail) {
    return { err: { status: 400, message: 'Invalid entries. Try again.' } }; 
  }
  return userModel.postUser(name, email, password);
};

const checkEmailPassword = async (email, password) => {
  if (!email || !password) {
    return { err: { status: 401, message: 'All fields must be filled' } }; 
  }
  const checkedEmailPassword = await userModel.checkEmailPassword(email, password);
  if (!await checkedEmailPassword) {
    return { err: { status: 401, message: 'Incorrect username or password' } }; 
  }
  return checkedEmailPassword;
};

module.exports = { checkEmailPassword, postUsersService };
