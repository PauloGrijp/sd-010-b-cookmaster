const Joi = require('@hapi/joi');

const schemaUser = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  schemaUser,
};