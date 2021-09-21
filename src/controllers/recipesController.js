const recipesService = require('../services/recipesService');

const verifyRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  console.log(name, ingredients, preparation);
  if (!name || !ingredients || !preparation) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }
  next();
};

const createRecipe = async (req, res) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
  const recipeCreated = await recipesService.createRecipe({
     userId: _id, name, ingredients, preparation, 
    });
  return res.status(201).json({ recipe: recipeCreated });
};

module.exports = {
  verifyRecipe,
  createRecipe,
};