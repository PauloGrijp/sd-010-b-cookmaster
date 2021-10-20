const { userModel } = require('../models');
const validations = require('../validations/validationService');

const createUser = async (name, email, password) => {
  const existingUser = await userModel.findByEmail(email);

  const isExist = validations.userExists(existingUser);

  if (isExist) return isExist;

  return userModel.create(name, email, password);
};

const login = async (email, password) => {
  const existingUser = await userModel.findByEmail(email);

  const isNotAuthenticated = validations.authenticatedLogin(existingUser, password);

  if (!isNotAuthenticated) {
    const { role, _id } = existingUser;
    return { role, userId: _id, email };
  }

  return isNotAuthenticated;
};

module.exports = {
  createUser,
  login,
};
