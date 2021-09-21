const Joi = require('joi');

const MESSAGE = 'Invalid entries. Try again.';
module.exports = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).messages({
  'any.required': MESSAGE,
  'string.email': MESSAGE,
});
