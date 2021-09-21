const Joi = require('joi');
const usersModel = require('../model/usersModel');

const isValid = (name, email, password) => {
  const message = { message: 'Invalid entries. Try again.' };

  const user = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = user.validate({ name, email, password });
  if (error) return message;
  };

const createUser = async (name, email, password) => {
  const err = await isValid(name, email, password);
  if (err) return { err, error: true };
  
  const user = await usersModel.addUsers(name, email, password);
  return { _id: user.insertedId, name, email, role: 'user' };
};

module.exports = {
  createUser,
};