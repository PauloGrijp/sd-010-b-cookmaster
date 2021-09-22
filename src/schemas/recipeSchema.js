const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().not().empty().required(),
  ingredients: Joi.string().not().empty().required(),
  preparation: Joi.string().not().empty().required(),
});

module.exports = schema;