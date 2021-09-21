const Joi = require('joi');
const models = require('../models');

const createUser = async (newUser) => {
  const validate = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }).validate(newUser);
  if (validate.error) return { message: 'Invalid entries. Try again.' };
  const userCreated = await models.createUser(newUser);
  if (!userCreated) return { message: 'Email already registered' };
  return userCreated;
};

module.exports = createUser;