const UserModel = require('../models/usersModel');

const create = async (user) => {
  const newUser = await UserModel.create(user);
  return newUser;
};

module.exports = {
  create,
};
