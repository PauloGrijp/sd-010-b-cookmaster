const { addRecipe, allRecipes } = require('../services/recipes');

const requestNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { user: { userId } } = req;

  console.log(userId, 'controller');

  const recipe = await addRecipe(name, ingredients, preparation, userId);

  return res.status(201).json(recipe);
};

const requestListRecipes = async (_req, res) => {
  const recipesList = await allRecipes();

  return res.status(200).json(recipesList);
};

module.exports = {
  requestNewRecipe,
  requestListRecipes,
};
