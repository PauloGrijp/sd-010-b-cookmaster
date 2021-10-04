const UsersModel = require('../models/UsersModel');

const validateEmail = (email) => {
  if (!email || !email.includes('@') || !email.includes('.com')) {
    return true;
  }

  return false;
};

const validatePasswordAndEmail = async (email, password) => {
  const respEmail = validateEmail(email);
  const user = await UsersModel.findEmail(email);

  if (!user || respEmail || user.password !== password) {
    const resp = { message: 'Incorrect username or password' };
    return resp;
  }

  return user;
};

const login = async (password, email) => {
  if (!email || !password) {
    const resp = { message: 'All fields must be filled' };
    return resp;
  }

  const response = await validatePasswordAndEmail(email, password);
  return response;
};

module.exports = {
  login,
};