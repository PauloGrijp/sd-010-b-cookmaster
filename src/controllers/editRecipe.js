const services = require('../services');

const editRecipe = async (req, res, next) => {
  const recipe = req.body;
  const editedRecipe = await services.editRecipe(recipe);
  if (editedRecipe.message) return next(editedRecipe);
  res.status(200).json(editedRecipe);
};

module.exports = editRecipe;