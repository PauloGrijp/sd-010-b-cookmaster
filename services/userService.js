const userModel = require('../models/userModel');

const emailValidate = async (email) => {
  const regexEmail = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);

  if (!email || !regexEmail.test(email)) {
    return null;
  }

  return true;
};

const existentEmail = async (email) => {
  const emailFound = await userModel.findEmail(email);

  return emailFound;
};

const createUser = async (userData) => {
  const userCreated = await userModel.createUser(userData);
  return userCreated;
};

module.exports = {
  emailValidate,
  existentEmail,
  createUser,
};
