const Joi = require('@hapi/joi');

const MESSAGE = 'Invalid entries. Try again.';

const schemaUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': MESSAGE,
  'string.email': MESSAGE,
});

module.exports = {
  schemaUser,
};