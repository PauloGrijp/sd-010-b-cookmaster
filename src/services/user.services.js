const { create } = require('../models/user.model');

const createUser = async (name, email) => {
  const newUser = await create(name, email);
  return newUser;
};

module.exports = {
  createUser,
};