const UserModel = require('../models/UserModel');

const message = 'Invalid entries. Try again';

const requiredFields = (name, email, password) => {
  if (!name || !email || !password) {
    return false;
  }
  return true;
};

const isValidEmail = (email) => {
  const regexEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
  if (!regexEmail.test(email)) {
    return false;
  }
  return true;
};

const createUser = async (name, email, password) => {
  const fieldValid = requiredFields(name, email, password);
  const emailValid = isValidEmail(email);
  if (!fieldValid || !emailValid) {
    return {
      message,
      status: 400,
    };
  }
};

module.exports = {
  createUser,
};