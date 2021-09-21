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

const listRecipes = rescue(async (_req, res, _next) => {
  const recipeList = await Services.recipe.listRecipes();

  res.status(200).json(recipeList);
});

const create = rescue(async (req, res, next) => {
  const recipe = req.body;
  const { userId } = req;

  const entriesError = validateCreate(recipe);

  if (entriesError) return next({ invalidEntries: true });

  const recipeCreate = await Services.recipe.create(recipe, userId);

  res.status(201).json({ recipe: recipeCreate });
});

const findRecipe = rescue(async (req, res, _next) => {
  const { id } = req.params;
  
  const recipeFound = await Services.recipe.findRecipe(id);

  if (!recipeFound) return res.status(404).json({ message: 'recipe not found' });
  
  res.status(200).json(recipeFound);
});

module.exports = { create, listRecipes, findRecipe };
