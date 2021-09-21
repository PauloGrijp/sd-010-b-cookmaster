const rescue = require('express-rescue');
// const { ObjectID } = require('mongodb');
const Joi = require('joi');
const RecipesService = require('../services/recipesService');

const create = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { error } = Joi.object({
    name: Joi.string().required(),
    ingredients: Joi.string().required(),
    preparation: Joi.string().required(),
  }).validate(req.body);

  if (error) return res.status(400).json({ message: 'Invalid entries. Try again.' });
  const { userId } = res;

  const newRecipe = await RecipesService.create(name, ingredients, preparation, userId);
  if (newRecipe.err) return next(newRecipe.err);
  console.log(newRecipe);
  return res.status(201).json({
    recipe: {
      ...newRecipe,
    },
  });
});

const getAll = rescue(async (_req, res, _next) => {
  const allRecipes = await RecipesService.getAll();
  return res.status(200).json(allRecipes);
});

const getOne = rescue(async (req, res, _next) => {
  const { id } = req.params;

  if (id.length < 24) return res.status(404).json({ message: 'recipe not found' });

  const response = await RecipesService.getOne(id);
  if (!response) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(response);
});

const updateOne = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { role, userId } = res;
  const { name, ingredients, preparation } = req.body;

  const recipe = await RecipesService.getOne(id);
  console.log(recipe);

  if (userId === recipe.userId || role === 'admin') {
    await RecipesService.updateOne(id, name, ingredients, preparation);
    return res.status(200).json({ _id: id, name, ingredients, preparation, userId });
  }
  return res.status(401).json({ message: 'not authorized to edit this recipe' });
});

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
};