const userModel = require('../models/user');
const validateUserCreation = require('../util/validateUserCreation');
const userWithoutPassword = require('../util/userWithoutPassword');

const codes = require('../httpcodes');

const createUser = async (name, email, password) => {
  const validation = await validateUserCreation(name, email, password);

  if (validation) return validation;

  const users = await userModel.getAllUsers();

  const duplicatedEmail = users.some((user) => user.email === email);
  if (duplicatedEmail) {
    return {
      error: { code: codes.conflict, message: 'Email already registered' },
    };
  }

  const user = await userModel.createUser(name, email, password);

  return userWithoutPassword(user);
};

module.exports = {
  createUser,
};
