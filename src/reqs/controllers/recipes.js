const { insertRecipe, getRecipes, getOneRecipes } = require('../models/recipeModel');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const insert = await insertRecipe(name, ingredients, preparation, _id);
  return res.status(201).json(insert);
};

const recipeList = async (req, res) => {
  const list = await getRecipes();
  return res.status(200).json(list); 
};

const oneRecipe = async (req, res) => {
  const { id } = req.params;
  if (id.length <= 23) return res.status(404).json({ message: 'recipe not found' });
  const result = await getOneRecipes(id);
  if (result === 0) return res.status(404).json({ message: 'recipe not found' });
  return res.status(200).json(result);
};

module.exports = { createRecipe, recipeList, oneRecipe };
