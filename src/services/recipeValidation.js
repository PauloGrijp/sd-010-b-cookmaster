const recipeModel = require('../models/recipes');

const recipeNotFound = { message: 'recipe not found' };

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const look4Recipe = await recipeModel.getRecipeById(id);
  if (!look4Recipe) { return res.status(404).json(recipeNotFound); }
  next();
};
