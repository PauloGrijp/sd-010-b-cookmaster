const rescue = require('express-rescue');

const { recipeService } = require('../services');

const createRecipe = rescue(async (req, res, next) => {
  const recipeInfo = req.body;
  const { userId } = req;

  const newRecipe = await recipeService.createRecipe(recipeInfo, userId);

  if (newRecipe.error) return next(newRecipe);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // da nova receita
  return res.status(201).json(newRecipe);
});

const getAllRecipes = rescue(async (_req, res, _next) => {
  const recipes = await recipeService.getAllRecipes();

  res.status(200).json(recipes);
});

const getRecipeById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipeService.getRecipeById(id);
  
  if (recipe.error) return next(recipe);

  // Caso não haja nenhum erro, retornamos o product encontrado
  res.status(200).json(recipe);
});
module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};
