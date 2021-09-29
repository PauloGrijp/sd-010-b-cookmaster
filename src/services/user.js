const userModel = require('../models/user');
const validateUserCreation = require('../util/validateUserCreation');
const userWithoutPassword = require('../util/userWithoutPassword');
const validateLoginInput = require('../util/validateLogin');

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

const login = async (email, password) => {
  const validation = await validateLoginInput(email, password);
  if (validation) return validation;

  const user = await userModel.getUserByEmail(email);
  if (user.password !== password) {
    return {
      error: { code: codes.unhautorized, message: 'Incorrect username or password' },
    };
  }
  return userWithoutPassword(user);
};

const createAdminUser = async (name, email, password, role) => {
  const user = await userModel.createAdminUser(name, email, password, role);

  return userWithoutPassword(user);
};

module.exports = {
  createUser,
  login,
  createAdminUser,
};
