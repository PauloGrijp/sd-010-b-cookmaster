const Joi = require('joi');
const { messages, statusCode } = require('../schemas');
const BadRequest = require('./error/BaseError');

const recipeSchema = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
});

const validateRecipeInsertion = (req, _res, next) => {
  try {
    const { body } = req;
    const result = recipeSchema.validate(body);
    if (result.error) {
      throw new BadRequest(messages.INVALID_ENTRIES, statusCode.BAD_REQUEST);
    }
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validateRecipeInsertion;