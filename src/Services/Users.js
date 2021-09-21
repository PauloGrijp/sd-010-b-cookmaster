const Joi = require('joi');
const model = require('../Models/Users');

const newUserValidation = (name, email, password) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });
  
  if (error) throw error;
};

const alreadyExists = async (email) => {
  const user = await model.findByEmail(email);
  if (user) {
    const error = new Error('Email already registered');
    error.status = 409;
    throw error;
  }
};

const newUser = async (name, email, password, role) => {
  newUserValidation(name, email, password);
  await alreadyExists(email);
  const { password: _, ...result } = await model.newUser(name, email, password, role);
  return result;
};

module.exports = {
  newUser,
};
