const Joi = require('joi');
const { messages, statusCode } = require('../schemas');
const Unauthorized = require('./error/BaseError');

const loginRequiredValuesSchema = Joi.object({
  password: Joi.string().required(),
  email: Joi.string().required(),
});

const validateLogin = (req, _res, next) => {
  try {
    const { body } = req;

    const resultRequiredValues = loginRequiredValuesSchema.validate(body);
    if (resultRequiredValues.error) {
      throw new Unauthorized(messages.EMAIL_PASSWORD_REQUIRED, statusCode.UNAUTHORIZED);
    }

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateLogin;