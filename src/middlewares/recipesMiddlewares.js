const recipesService = require('../services/recipesService');

const status400 = 400;

const validateRecipeFields = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  if (!name || !ingredients || !preparation) {
    return res.status(status400).json({ message: 'Invalid entries. Try again.' });
  }
  next();
};

const getRecipe = async (id) => recipesService.getRecipeById(id);

module.exports = {
  validateRecipeFields,
  getRecipe,
};