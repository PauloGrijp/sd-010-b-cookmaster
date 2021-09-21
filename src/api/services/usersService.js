const Joi = require('joi');
const usersModel = require('../models/usersModel');

const { ERROR_INVALID_ENTRIES, ERROR_EMAIL_CONFLICT } = require('./msgErrors');

const checkUser = Joi.object().keys({
  name: Joi.string().not().empty().required(),
  email: Joi.string().not().empty().required()
  .email(),
  password: Joi.string().not().empty().required(),
});

const createUser = async (newUser, role = 'user') => {
  const { email } = newUser;
  const { error } = checkUser.validate(newUser);
  if (error) { throw ERROR_INVALID_ENTRIES; }

  const emailExists = await usersModel.getUserByEmail(email);
  if (emailExists) { throw ERROR_EMAIL_CONFLICT; }

  const user = { ...newUser };
  user.role = role;
  const createdUser = await usersModel.createUser(user);
  delete createdUser.password;
  return {
    status: 201,
    createdUser,
  };
};

module.exports = {
  createUser,
};
