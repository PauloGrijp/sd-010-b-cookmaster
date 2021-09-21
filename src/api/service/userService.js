const Joi = require('joi');
const userModel = require('../model/userModel');

const createUser = async ({ name, email, password }) => {
  const { error } = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate({ name, email, password });

  if (error) return 'keyNotExist';

  const findByEmail = await userModel.findByEmail(email);

  if (findByEmail) return 'emailExist';

  const user = await userModel.createUser({ name, email, password });
  
  return user;
};

module.exports = {
  createUser,
};
