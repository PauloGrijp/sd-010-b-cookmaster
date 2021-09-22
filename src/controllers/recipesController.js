const recipesService = require('../services/recipesService');

function validateFields(req, res, next) {
  const { name, ingredients, preparation } = req.body;

  if (!recipesService.validateFields(name, ingredients, preparation)) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
}

async function createRecipe(req, res) {
  const { name, ingredients, preparation } = req.body;
  // const { _id } = req.user;

  const newRecipe = await recipesService
    .createRecipe({ name, ingredients, preparation, userId: 1 });

  res.status(201).json({
    recipe:
      newRecipe,
  });
}

async function getAllRecipes(req, res) {
  const recipes = await recipesService.getAllRecipes();

  return res.status(200).json(recipes);
}

async function getRecipeById(req, res) {
  const { id } = req.params;

  const recipe = await recipesService.getRecipeById(id);

  if (!recipe) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  return res.status(200).json(recipe);
}

module.exports = {
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
