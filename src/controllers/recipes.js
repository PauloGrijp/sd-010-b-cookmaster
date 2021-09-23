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

const getRecipes = async (_req, res) => {
  const recipes = await recipesService.getRecipes();

  return res.status(codes.ok).json(recipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;

  const { recipe, error } = await recipesService.getRecipeById(id);
  if (error) return res.status(error.code).json({ message: error.message });

  return res.status(codes.ok).json(recipe);
};

const editRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation, user } = req.body;
  const { _id: userId } = user;

  const ids = {
    recipeId: id,
    userId,
  };

  const recipe = await recipesService.editRecipe(name, ingredients, preparation, ids);

  return res.status(codes.ok).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const { user: { _id: userId } } = req.body;

  await recipesService.deleteRecipe(recipeId, userId);

  return res.status(codes.noContent).json();
};

const uploadImage = async (req, res) => {
  const { filename, path } = req.file;
  const id = filename.split('.')[0];

  const recipe = await recipesService.uploadImage(id, path);

  return res.status(200).json(recipe);
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  editRecipe,
  deleteRecipe,
  uploadImage,
};
