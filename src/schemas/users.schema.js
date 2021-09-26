const Joi = require('joi');
const UserModel = require('../models/users.model');

const validationCreateUser = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  if (error) throw error;
};

const userExists = async (email) => {
  const user = await UserModel.getUserByEmail(email);
  if (user) {
    const error = new Error('Email already registered');
    error.code = 409;
    throw error;
  }
};

module.exports = { validationCreateUser, userExists };