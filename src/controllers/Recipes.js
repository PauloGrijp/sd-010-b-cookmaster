const Recipe = require('../services/Recipes');
const { CREATE, BAD_REQUEST, SUCCESS, NOT_FOUND } = require('../utils/statusCodes');
const { recipeValidator, recipeIdValidator } = require('../validators/Recipes');

const createRecipe = async (req, res) => {
  const { error } = recipeValidator(req.body);
  
  if (error) return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });
  
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipe = await Recipe.createRecipe({ name, ingredients, preparation, userId: _id });

  return res.status(CREATE).json(recipe);
};

const getAllRecipes = async (_req, res) => {
  const recipes = await Recipe.getAllRecipes();

  return res.status(SUCCESS).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { error } = recipeIdValidator(req.params);

  if (error) return res.status(NOT_FOUND).json({ message: 'recipe not found' });

  const { id } = req.params;
  const recipe = await Recipe.getRecipeById(id);

  return res.status(SUCCESS).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { user } = req;

  const recipesUpdated = await Recipe.updateRecipe({ id, data: req.body, user });

  res.status(SUCCESS).json(recipesUpdated);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};