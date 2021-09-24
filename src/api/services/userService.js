const jwt = require('jsonwebtoken');
const Joi = require('@hapi/joi');
const userModel = require('../models/userModel');

const createUser = async (email, name, password) => {
  const { error } = userSchm.validate({ email, name, password });
  if (error) {
    throw dataErr(400, 'Invalid entries. Try again.');
  }
  const getUser = await User.getUserByEmail(email);
  if (getUser) {
    throw dataErr(409, 'Email already registered');
  }
  const user = await userModel.createNewUser(email, name, password);
  return { user };
};
module.exports = {
  createUser,
};