// const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const User = require('../models/userModel');

const userSchm = Joi.object({
  name: Joi.string().min(1).required(),
  email: Joi.string().email().required(),
  password: Joi.required(),
});

const dataErr = (code, message) => ({ code, message });

const createUserService = async (name, email, password) => {
  // console.log(email, name, password);
  const { error } = userSchm.validate({ email, name, password });
  if (error) {
    throw dataErr(400, 'Invalid entries. Try again.');
  }
  const getUserByEmailVal = await userModel.getUserByEmail(email);
  if (getUserByEmailVal) {
    throw dataErr(409, 'Email already registered');
  }
  const user = await User.createUser(email, name, password);
  return { user };
};
module.exports = {
  createUserService,
};