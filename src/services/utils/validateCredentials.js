const Joi = require('joi');

const MIN_LENGTH_PASSWORD = 3;

const validateCredentials = (userData) => {
  Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string(MIN_LENGTH_PASSWORD).required(),
  }).validate(userData);
};

module.exports = {
  validateCredentials,
};
