const { insertRecipe } = require('../models/recipeModel');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const insert = await insertRecipe(name, ingredients, preparation, _id);
  return res.status(201).json(insert);
};

module.exports = { createRecipe };
