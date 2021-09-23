const userModel = require('../models/userModel');

const createUser = async (name, email) => {
  const create = await userModel.create(name, email);
  return create;
};

module.exports = {
  createUser,
};