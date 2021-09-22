const services = require('../services');

const getRecipeById = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await services.getRecipeById(id);
  if (recipe.message) return next(recipe);
  res.status(200).json(recipe);
};

module.exports = getRecipeById;