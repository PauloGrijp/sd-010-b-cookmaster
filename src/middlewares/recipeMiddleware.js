const { validateRecipe } = require('../schemas/recipeSchemas');

const isValidRecipe = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  const { code, message } = await validateRecipe({ name, ingredients, preparation });

  if (message) return res.status(code).json({ message });

  next();
};

module.exports = {
  isValidRecipe,
};