const Joi = require('joi');
const rescue = require('express-rescue');
const Services = require('../services');

const validateCreate = (body) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().required(),
    ingredients: Joi.string().not().empty().required(),
    preparation: Joi.string().not().empty().required(),
  }).validate(body);

  return error;
};

const create = rescue(async (req, res, next) => {
  const recipe = req.body;
  const { userId } = req;

  const entriesError = validateCreate(recipe);

  if (entriesError) return next({ invalidEntries: true });

  const recipeCreate = await Services.recipe.create(recipe, userId);
  
  res.status(201).json({ recipe: recipeCreate });
});

module.exports = { create };
