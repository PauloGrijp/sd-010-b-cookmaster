const services = require('../services');

const deleteRecipe = async (req, res, next) => {
  const { id } = req.params;
  const { role, _id: userId } = req.user;
  const deletedRecipe = await services.deleteRecipe({ id, role, userId });
  if (deletedRecipe.message) return next(deletedRecipe);
  res.status(204).end();
};

module.exports = deleteRecipe;