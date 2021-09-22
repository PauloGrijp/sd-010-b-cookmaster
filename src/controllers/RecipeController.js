const code = require('http-status-codes');
const RecipeService = require('../services/RecipeService');

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { message } = await RecipeService.createRecipe({ 
    name, ingredients, preparation, /* , userId  */ 
  });

  if (message) {
    return res.status(code.BAD_REQUEST).json({ message });
  }

  return res.status(code.CREATED).json({ name, ingredients, preparation /*  userId */ });
};

module.exports = {
  createRecipe,
};