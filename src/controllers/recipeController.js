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

const updateRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = req.body;

  const updatedRecipe = await recipeService.updateRecipe(recipe, id);
  // Caso haja erro na criação da receita, iniciamos o fluxo de erro
  if (updatedRecipe.error) return next(updatedRecipe);

  // Caso esteja tudo certo, retornamos o status 200 OK, junto com as informações
  // da nova receita
  return res.status(200).json(updatedRecipe);
});

const deleteRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;

  const deletedRecipe = await recipeService.deleteRecipe(id);
  // Caso haja erro na criação do autor, iniciamos o fluxo de erro
  if (deletedRecipe.error) return next(deletedRecipe);
  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  return res.status(204).send();
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};
