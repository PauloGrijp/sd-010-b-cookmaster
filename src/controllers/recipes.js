const recipesService = require('../services/recipes');

const codes = require('../httpcodes');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
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
  const updateInfo = req.body;
  const { _id: userId, role: userRole } = req.user;

  const ids = {
    recipeId: id,
    userId,
  };

  const recipe = await recipesService.editRecipe(updateInfo, ids, userRole);

  return res.status(codes.ok).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id: recipeId } = req.params;
  const { user: { _id: userId } } = req;

  await recipesService.deleteRecipe(recipeId, userId);

  return res.status(codes.noContent).json();
};

const uploadImage = async (req, res) => {
  const { id: recipeId } = req.params;
  const { path } = req.file;
  const { user: { _id: userId, role } } = req;

  const recipe = await recipesService.uploadImage(recipeId, path, userId, role);

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
