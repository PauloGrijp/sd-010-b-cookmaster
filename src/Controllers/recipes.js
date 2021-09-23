const { addRecipe, allRecipes } = require('../services/recipes');

const requestNewRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { authorization } = req.headers;

  console.log(name, preparation, ingredients, authorization, 'controller');

  const recipe = await addRecipe(name, ingredients, preparation, authorization);

  console.log(recipe, 'aqui');

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
