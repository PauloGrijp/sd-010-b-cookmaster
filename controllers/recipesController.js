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

  const recipe = await recipesServices.findId(id);

  if (recipe.error) return res.status(404).json({ message: recipe.message });
  return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  
  const recipe = await recipesServices.updateRecipe(id, name, ingredients, preparation);
  return res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  await recipesModel.deleteRecipe(id);
  return res.status(204).json();
};

const updateImg = async (req, res) => {
  const { id } = req.params;
  const URL = `localhost:3000/src/uploads/${id}.jpeg`;
  const update = await recipesServices.updateImgRecipe(id, URL);
  console.log(update);
  return res.status(200).json(update);
};

module.exports = {
  createRecipe,
  getRecipes,
  updateRecipe,
  deleteRecipe,
  updateImg,
  getById,
};