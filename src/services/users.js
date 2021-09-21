const Joi = require('joi');
const model = require('../models/users');

function userValidation(name, email, password) {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  if (error) throw error;
}

async function emailValidation(email) {
  const user = await model.findUser(email);
  if (user) {
    const error = new Error('Email already registered');
    error.code = 409;
    throw error;
  }
}

async function newUser(name, email, password, role) {
  userValidation(name, email, password);
  await emailValidation(email);
  const { password: _, ...result } = await model.newUser(name, email, password, role);
  return result;
}

module.exports = {
  newUser,
};
