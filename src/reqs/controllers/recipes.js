const { insertRecipe, getRecipes } = require('../models/recipeModel');

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

module.exports = { createRecipe, recipeList };
