const { registerRecipe, getAll, findById } = require('../models/recipeModel');

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

module.exports = {
  createRecipe,
  getAllRecipes,
  findRecipe,
};
