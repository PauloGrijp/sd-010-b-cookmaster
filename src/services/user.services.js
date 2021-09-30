const { create } = require('../models/user.model');

const createUser = async (name, email, password) => {
  const newUser = await create(name, email, password);
  return newUser;
};

module.exports = {
  createUser,
};