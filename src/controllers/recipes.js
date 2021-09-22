const recipesService = require('../services/recipes');

const codes = require('../httpcodes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation, user } = req.body;
  const { _id: userId } = user;
  const { error, recipe } = await recipesService
    .createRecipe(name, ingredients, preparation, userId);
  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(codes.created).json({ recipe });
};

const getRecipes = async (req, res) => {
  const recipes = await recipesService.getRecipes();

  return res.status(codes.ok).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const { recipe, error } = await recipesService.getRecipeById(id);
  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(codes.ok).json(recipe);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
};
