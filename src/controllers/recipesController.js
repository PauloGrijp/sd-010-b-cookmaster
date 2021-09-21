const { registerRecipe } = require('../models/recipeModel');

const createRecipe = async (req, res) => {
  const { user } = req.user;
  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = user;
  
  const recipe = await registerRecipe({ userId, name, ingredients, preparation });

  res.status(201).json({ recipe });
};

module.exports = {
  createRecipe,
};