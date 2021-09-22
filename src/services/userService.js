const UserModel = require('../models/usersModel');

const repeatedEmail = { code: 409, message: 'Email already registered' };

const alreadyExists = async (email) => UserModel.findByEmail(email);

const create = async (user) => {
  const emailExists = await alreadyExists(user.email);

  if (emailExists) return repeatedEmail;

  const newUser = await UserModel.create(user);
  return newUser;
};

module.exports = {
  create,
};
