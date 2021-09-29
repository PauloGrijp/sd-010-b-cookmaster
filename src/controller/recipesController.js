const recipesService = require('../services/recipesService');

const add = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { userId } = req.user;
    const { recipe } = await recipesService.add(name, ingredients, preparation, userId);
    return res.status(201).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

const getAll = async (_req, res) => {
  try {
      const recipes = await recipesService.getAll();
      if (!recipes) return res.status(404).json({ message: 'Recipe not found' });
      return res.status(200).json(recipes);
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await recipesService.getById({ id });
    if (recipe.message) {
      return res.status(404).json(recipe);
    }
  return res.status(200).json(recipe);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const update = async (req, res) => {
    const updateRecipe = req.body;
    const { id } = req.params;
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    const recipe = await recipesService.update(id, updateRecipe, authorization);
    if (recipe.err) return res.status(401).json(recipe.err);
    return res.status(200).json(recipe);
};

const remove = async (req, res) => {
    const { id } = req.params;
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).json({ message: 'missing auth token' });
    const deleteRecipe = await recipesService.remove(id, authorization);
    if (deleteRecipe.err) {
      return res.status(401).json(deleteRecipe);
    }
    return res.status(204).json(deleteRecipe);
};

const recipeImage = async (req, res) => {
  try {
  const { id } = req.params;
  const { path } = req.file;
  const recipeUp = `localhost:3000/${path}`;
  const addImage = await recipesService.recipeImage(id, recipeUp);
  return res.status(200).json(addImage);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

module.exports = { add, getAll, getById, update, remove, recipeImage };