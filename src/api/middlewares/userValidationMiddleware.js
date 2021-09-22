const Joi = require('joi');
const { messages, statusCode } = require('../schemas');
const BadRequest = require('./error/BaseError');

const userSchema = Joi.object({
  name: Joi.string().required(),
  password: Joi.string().required(),
  role: Joi.string(),
  email: Joi.string().regex(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/i).required(),
});

const validateUser = (req, res, next) => {
  try {
    const { body } = req;
    const result = userSchema.validate(body);
    if (result.error) {
      throw new BadRequest(messages.INVALID_ENTRIES, statusCode.BAD_REQUEST);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateUser;