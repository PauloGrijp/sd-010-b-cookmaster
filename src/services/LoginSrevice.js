const UsersModel = require('../models/UsersModel');

const validateEmail = (email) => {
  if (!email || !email.includes('@') || !email.includes('.com')) {
    return true;
  }
  return false;
};

const validatePasswordEmail = async (email, password) => {
  const emailIsNotValide = validateEmail(email);
  const emailUser = await UsersModel.findEmail(email);

  if (!emailUser || emailIsNotValide || emailUser.password !== password) {
    return { message: 'Incorrect username or password' };
  }

  return emailUser;
};

const login = async (email, password) => {
  if (!email || !password) {
    return { message: 'All fields must be filled' };
  }

  const validate = await validatePasswordEmail(email, password);
  return validate;
};

module.exports = {
  login,
};