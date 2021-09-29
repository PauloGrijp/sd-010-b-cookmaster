const { registerRecipe, getAll, findById, 
  update, deleteRecp, addImagePath } = require('../models/recipeModel');

const createRecipe = async (req, res) => {
  const { user } = req.user;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = user;

  const recipe = await registerRecipe({ userId, name, ingredients, preparation });

  res.status(201).json({ recipe });
};

const getAllRecipes = async (req, res) => {
  const { recipes } = await getAll();

  return res.status(200).json(recipes);
};

const findRecipe = async (req, res) => {
  const { id } = req.params;

  const { recipe } = await findById({ id });

  return res.status(200).json(recipe);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;

  const { recipe } = await update({ id, name, ingredients, preparation });

  return res.status(200).json(recipe);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;

  const { recipe } = await deleteRecp({ id });

  return res.status(204).json(recipe);
};

const addImage = async (req, res) => {
  const { id } = req.params;

  const { recipe } = await addImagePath({ id });

  return res.status(200).json(recipe);
};

const errorImage = (error, req, res, _next) => res.status(400).send({ error: error.message });

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
  updateRecipe,
  deleteRecipe,
  errorImage,
  addImage,
};
