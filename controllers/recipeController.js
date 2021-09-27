const { ObjectId } = require('mongodb');
const service = require('../services/recipeService');

const createRecipe = async (req, res) => {
  try {
    const { name, ingredients, preparation } = req.body;
    const { _id } = req.user;

    const create = await service.createRecipe(name, ingredients, preparation, _id);

    res.status(201).json(create);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const getAllRecipes = async (_req, res) => {
  try {
    const recipes = await service.getAll();
    return res.status(200).json(recipes);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

const getRecipeById = async (req, res) => {
 try {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  const recipe = await service.getById(id);

  if (!recipe) {
    return res.status(404).json({ message: 'recipe not found' });
  }

  return res.status(200).json(recipe);
 } catch (err) {
  return res.status(401).json({ message: err.message });
 }
};

const updateRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, ingredients, preparation } = req.body;
    const updatedRecipe = await service.updateRecipe({ id, name, ingredients, preparation });
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const { id } = req.params;
    const exclude = await service.deleteRecipe(id);
    return res.status(204).json(exclude);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

const insertImage = async (req, res) => {
  try {
    const { id } = req.params;
    const insert = await service.insertImage(id);
    return res.status(200).json(insert);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  insertImage,
};