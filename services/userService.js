const userModel = require('../models/userModel');

const createUser = async (name, email, password) => {
  const create = await userModel.create(name, email, password);
  return create;
};

module.exports = {
  createUser,
};