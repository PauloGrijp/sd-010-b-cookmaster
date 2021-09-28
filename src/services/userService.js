const userModel = require('../models/userModel');
const validations = require('../validations/validationService');

const createUser = async (name, email, password) => {
  const existingUser = await userModel.findByEmail(email);

  const isExist = validations.userExists(existingUser);

  if (isExist) return isExist;

  return userModel.create(name, email, password);
};

const login = async (email, password) => {
  const existingUser = await userModel.findByEmail(email);

  const isAuthenticated = validations.authenticatedLogin(existingUser, password);

  if (!isAuthenticated) {
    const { role, _id } = existingUser;
    return { role, _id };
  }

  return isAuthenticated;
};

module.exports = {
  createUser,
  login,
};