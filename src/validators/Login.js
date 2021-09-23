const Joi = require('joi');

const loginValidator = (data) => {
  const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return login.validate(data);
};

module.exports = loginValidator; 