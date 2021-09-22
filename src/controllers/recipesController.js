const recipesService = require('../services/recipesService');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id: userId } = req.user;
    const newRecipe = await recipesService.createRecipe(name, ingredients, preparation, userId);
    return res.status(201).json({ recipe: newRecipe });
  } catch (error) {
    const { err: { code, message } } = error;
    return res.status(code).json({ message });
  }
};

const getAllRecipes = async (_req, res) => {
  const allRecipes = await recipesService.getAllRecipes();
  return res.status(200).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getRecipeById(id);
  return res.status(200).json(recipe);
  } catch (error) {
    const { err: { code, message } } = error;
    return res.status(code).json({ message });
  }
};

const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const { _id: userId } = req.user;
    const updatedRecipe = await recipesService
    .updateRecipe(id, body, userId);
    return res.status(200).json(updatedRecipe);
};

const deleteRecipe = async (req, res) => {
    const { id } = req.params;
    await recipesService.deleteRecipe(id);
    return res.status(204).send();
};

const uploadImage = async (req, res) => {
  const { path } = req.file;
  const { id: recipeId } = req.params;
  const recipe = await recipesService.uploadImage(path, recipeId);
  return res.status(200).json(recipe);
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  uploadImage,
};