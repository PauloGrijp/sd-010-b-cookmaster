const userModel = require('../models/userModel');

const validateEmail = async (email) => {
  const emailRegex = new RegExp(/^[\w.]+@[a-z]+.\w{2,3}$/g);
  if (!email || !emailRegex.test(email)) {
    return null;
  }
return true;
};

const emailExistance = async (email) => {
  const emailFound = await userModel.findEmail(email);

 return emailFound;
};

const createUser = async (userData) => {
  const userCreated = await userModel.createUser(userData);
  return userCreated;
};

module.exports = {
  validateEmail,
  emailExistance,
  createUser,
};