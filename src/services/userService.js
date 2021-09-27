const userModel = require('../models/userModel');
const validations = require('../validations/validationService');

const createUser = async (name, email, password) => {
  const existingUser = await userModel.findByEmail(email);

  const isExist = validations.userExists(existingUser);

  if (isExist) return isExist;

  return userModel.create(name, email, password);
};

module.exports = {
  createUser,
};