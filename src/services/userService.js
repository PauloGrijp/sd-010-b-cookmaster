const UserModel = require('../models/usersModel');

const repeatedEmail = { code: 409, message: 'Email already registered' };

const alreadyExists = async (email) => UserModel.findByEmail(email);

const create = async (name, email, password) => {
  const emailExists = await alreadyExists(email);

  if (emailExists) return repeatedEmail;

  const newUser = await UserModel.create(name, email, password);
  return newUser;
};

module.exports = {
  create,
};
