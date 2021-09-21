const { createUserData, createAdminData } = require('../models/userModel');
const { ApiError } = require('../utils/ApiError');
const { validateUser, validateUserData } = require('./validations');

const createUser = async ({ name, email, password }) => {
  await validateUser(email);
  await validateUserData(email, name, password);
  const user = await createUserData(name, email, password);
  return user;
};

const createAdminUser = async ({ email, name, password }, role) => {
  await validateUserData(email, name, password);

  if (role !== 'admin') {
    throw new ApiError('Only admins can register new admins', null, 403);
  }
  const user = await createAdminData(name, email, password);
  return user;
};

module.exports = {
  createUser,
  createAdminUser,
};
