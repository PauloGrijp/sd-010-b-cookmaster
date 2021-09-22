const rescue = require('express-rescue');

const { newRecipeValidation, isValiId } = require('../helpers/validateFields');
const recipesService = require('../services/recipesService');

const create = rescue(async (req, res) => {
  newRecipeValidation(req.body);
  
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;

  const newRecipe = await recipesService.create({ name, ingredients, preparation, userId });

  res.status(201).json({ recipe: newRecipe });
});

const getAll = rescue(async (_req, res) => {
  const allRecipes = await recipesService.getAll();

  res.status(200).json(allRecipes);
});

const getById = rescue(async (req, res) => {
  isValiId(req.params);
  const { id } = req.params;
  const recipe = await recipesService.getById(id);

  if (!recipe) return res.status(404).json({ message: 'recipe not found' });

  res.status(200).json(recipe);
});

module.exports = {
  create,
  getAll,
  getById,
};