const userModel = require('../models/user');
const codes = require('../httpcodes');
const validateEmail = require('./emailRegex');

const missingFields = 'All fields must be filled';
const incorrectFields = 'Incorrect username or password';

module.exports = async (email, password) => {
  if (!email || !password) return { error: { code: codes.unhautorized, message: missingFields } };
  if (!validateEmail(email)) {
    return { error: { code: codes.unhautorized, message: incorrectFields } };
  }

  const users = await userModel.getAllUsers();
  if (!users.some((user) => user.email === email)) {
    return { error: { code: codes.unhautorized, message: incorrectFields } };
  }

  return false;
};
