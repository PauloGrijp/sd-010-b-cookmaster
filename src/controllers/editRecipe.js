const services = require('../services');

const editRecipe = async (req, res, next) => {
  const recipeData = req.body;
  const { id } = req.params;
  const { role, _id: userId } = req.user;
  const editedRecipe = await services.editRecipe({ ...recipeData, id, role, userId });
  if (editedRecipe.message) return next(editedRecipe);
  res.status(200).json(editedRecipe);
};

module.exports = editRecipe;