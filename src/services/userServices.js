const Users = require('../models/usersModel');

const createUser = async (user) => Users.createUser(user);

module.exports = {
  createUser,
};