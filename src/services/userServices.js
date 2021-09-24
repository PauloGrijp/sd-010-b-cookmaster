const Users = require('../models/usersModel');
const Error = require('../helpers/errors');

const createUser = async (user) => {
  const { email } = user;
  const checkEmail = await Users.findEmail(email);
  if (checkEmail) {
    return Error.conflict('Email already registered');
  }
  return Users.create(user);
};

module.exports = {
  createUser,
};