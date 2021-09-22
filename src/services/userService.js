const { createNewUser, loginRequest } = require('../models/userModel');

const create = async ({ name, email, password }) => {
  const newUser = await createNewUser({ name, email, password });
  return newUser;
};

const validateLogin = async ({ email, password }) => {
  const user = await loginRequest({ email, password });
  return user;
};

module.exports = { create, validateLogin };
