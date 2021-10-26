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
  const recipe = req.file ? { image: `localhost:3000/src/uploads/${req.file.filename}` } : req.body;
  
  const updatedRecipe = await recipeService.updateRecipe(recipe, id);
  
  if (updatedRecipe.error) return next(updatedRecipe);

  return res.status(200).json(updatedRecipe);
});

const deleteRecipe = rescue(async (req, res, next) => {
  const { id } = req.params;
  
  const deletedRecipe = await recipeService.deleteRecipe(id);

  if (deletedRecipe.error) return next(deletedRecipe);

  return res.status(204).send();
});
// acabei juntando junto com updateRecipe
const getImage = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const path = `${__dirname}/../uploads/${id}.jpeg`;

  // if (img.error) return next(img);

  // Caso não haja nenhum erro, retornamos o product encontrado
  res.status(200).download(path);
});

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
  getImage,
};
