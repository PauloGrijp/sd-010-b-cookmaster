const recipesService = require('../services/recipesService');

const verifyRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  }
  next();
};

const createRecipe = (req, res, next) => {
  const { _id } = req.user;
  const { name, ingredients, preparation } = req.body;
};

module.exports = {
  verifyRecipe,
};