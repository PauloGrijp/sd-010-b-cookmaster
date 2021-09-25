const rescue = require('express-rescue');
const Joi = require('joi');
const recipeService = require('../services/recipesSevice');

const createRecipes = rescue(async (req, res, next) => {
const { name, ingredients, preparation } = req.body;

const { _id } = req.user;
const userId = _id;
const { error } = Joi.object({
  name: Joi.string().required(),
  ingredients: Joi.string().required(),
  preparation: Joi.string().required(),
}).validate(req.body);
if (error) {
  return next('userAndRecipes');
}
const create = await recipeService.createRecipe(name, ingredients, preparation, userId);

return res.status(201).json(create);
});

const getRecipesAll = rescue(async (req, res, _next) => {
  const result = await recipeService.getRecipesAll();
  return res.status(200).json(result);
});

const getRecipeId = rescue(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const getRecipe = await recipeService.getRecipesId(id);
  if (!getRecipe) {
    return next('recipeNotFound');
  }
  res.status(200).json(getRecipe);
});

const updateRecipe = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { body } = req;
  const { user } = req;
  const update = await recipeService.updateRecipe(id, body, user);
  res.status(200).json(update);
});
const deleteRecipe = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const deleteData = await recipeService.deleteRecipe(id);
  res.status(204).json(deleteData);
});
const updateImage = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const { path } = req.file;
  const image = `localhost:3000/${path}`;
  const update = await recipeService.updateImage(id, image);
  res.status(200).json(update);
});
module.exports = {
  createRecipes,
  getRecipesAll,
  getRecipeId,
  updateRecipe,
  deleteRecipe,
  updateImage,
};