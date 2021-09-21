const { createNewUser } = require('../models/userModel');

const create = async ({ name, email, password }) => {
  const newUser = await createNewUser({ name, email, password });
  return newUser;
};

module.exports = { create };
