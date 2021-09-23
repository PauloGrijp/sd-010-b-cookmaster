const Recipe = require('../services/Recipes');
const { CREATE, BAD_REQUEST } = require('../utils/statusCodes');
const recipeValidator = require('../validators/Recipes');

const createRecipe = async (req, res) => {
  const { error } = recipeValidator(req.body);

  if (error) return res.status(BAD_REQUEST).json({ message: 'Invalid entries. Try again.' });

  const { name, ingredients, preparation } = req.body;
  const recipe = await Recipe.createRecipe({ name, ingredients, preparation });

  return res.status(CREATE).json(recipe);
};

module.exports = {
  createRecipe,
};