const recipesModel = require('../model/recipesModel');
const recipesServices = require('../services/recipesService');

const createRecipe = async (req, res) => {
  const message = 'Invalid entries. Try again.';
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;

  if (!name || !ingredients || !preparation) return res.status(400).json({ message });

  const recipe = await recipesModel.addRecipe(name, ingredients, preparation, _id);
  return res.status(201).json({ recipe });
};

const getRecipes = async (req, res) => {
  const recipes = await recipesModel.findRecipes();
  return res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const product = await recipesServices.findId(id);

  if (product.error) return res.status(404).json({ message: product.message });
  return res.status(200).json(product);
};

const updateRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  await recipesModel.updateRecipe(id, name, ingredients, preparation);
  const findRecipe = await recipesModel.findById(id);
  return res.status(200).json(findRecipe);
};

module.exports = {
  createRecipe,
  getRecipes,
  getById,
  updateRecipe,
};