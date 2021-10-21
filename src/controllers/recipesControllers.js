const rescue = require('express-rescue');
const Joi = require('@hapi/joi');
const { recipesServices } = require('../services');

const recipeSchema = Joi.object({
  name: Joi
    .string()
    .required(),
  ingredients: Joi
    .string()
    .required(),
  preparation: Joi
    .string()
    .required(),
})
  .messages({ 'any.required': 'Invalid entries. Try again.' });

const create = rescue(async (req, res, next) => {
  const { error } = recipeSchema.validate(req.body);
  if (error) return next(error);

  const { name, ingredients, preparation } = req.body;
  const { _id: userId } = req.user;
  const recipe = await recipesServices.create({ name, ingredients, preparation }, userId);
  if (recipe.error) return next(recipe.error);

  res.status(201).json(recipe);
});

const get = rescue(async (_, res) => {
  const recipes = await recipesServices.get();
  res.status(200).json(recipes);
});

const getById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesServices.getById(id);
  if (recipe.error) return next(recipe.error);
  res.status(200).json(recipe);
});

const update = rescue(async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const { id: recipeId } = req.params;
  const { user } = req;
  const recipe = await recipesServices.update({ name, ingredients, preparation }, recipeId, user);
  if (recipe.error) return next(recipe.error);
  res.status(200).json(recipe);
});

const upload = rescue(async (req, _, next) => {
  const { id: recipeId } = req.params;
  const { user } = req;
  const image = `localhost:3000/src/uploads/${recipeId}.jpeg`;
  const recipe = await recipesServices.update({ image }, recipeId, user);
  if (recipe.error) return next(recipe.error);
  req.recipe = recipe;
  next();
});

const remove = rescue(async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesServices.remove(id);
  if (recipe && recipe.error) return next(recipe.error);
  res.status(204).json({ message: 'ok' });
});

module.exports = {
  create,
  get,
  getById,
  update,
  remove,
  upload,
};
