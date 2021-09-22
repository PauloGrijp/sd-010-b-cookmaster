const Joi = require('joi');

const userValidator = (data) => {
  const user = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return user.validate(data);
};

module.exports = userValidator; 