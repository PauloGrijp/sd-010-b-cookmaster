const { StatusCodes } = require('http-status-codes');
const recipesService = require('../services/recipesServices');

const addRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req.user;
  
  // console.log('controller', name, ingredients, preparation);

  const recipeData = { name, ingredients, preparation, userId };
  
  const recipe = await recipesService.addRecipe(recipeData);
  
  // console.log('recebeu do service:', recipe);
  
  return res.status(StatusCodes.CREATED).json(recipe);
};

module.exports = { addRecipe };
