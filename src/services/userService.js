const userModel = require('../model/usersModel');

const create = (user) => userModel.create(user);

module.exports = {
  create,
};