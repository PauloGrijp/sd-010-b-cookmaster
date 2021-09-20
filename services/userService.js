const UserModel = require('../models/userModel');

const create = async (name, email, password, role) => {
  const response = await UserModel.create(name, email, password, role);
  return response;
};

const findByEmail = async (email) => {
  const response = await UserModel.findByEmail(email);
  return response;
};

module.exports = {
  create,
  findByEmail,
};