const Joi = require('joi');

const validEntries = (name, ingredients, preparation) => {
  const entries = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  });
  const { error } = entries.validate({ name, ingredients, preparation });
  if (error) return false;
  return true;
};

module.exports = {
  validEntries,
};