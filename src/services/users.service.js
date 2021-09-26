const UserModel = require('../models/users.model');
const UserValidation = require('../schemas/users.schema');

const createUser = async (name, email, password, role) => {
  UserValidation.validationCreateUser(name, email, password);
  await UserValidation.userExists(email);
  const newUser = await UserModel.createUser(name, email, password, role);
  return newUser;
};

module.exports = { createUser };