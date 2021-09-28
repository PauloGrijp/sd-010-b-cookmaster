const rescue = require('express-rescue');
const service = require('../services/Recipe');

const getAll = rescue(async (_req, res) => {
  const recipes = await service.getAll();

  res.status(200).json(recipes);
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const recipe = await service.findById(id);

  if (recipe.error) return next(recipe.error);

  res.status(200).json(recipe);
});

const create = rescue(async (req, res, next) => {
  const { _id: userId } = req.user;
  const newRecipe = await service.create({ ...req.body, userId });

  if (newRecipe.error) return next(newRecipe.error);

  return res.status(201).json(newRecipe);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  const data = req.file ? { image: req.file.filename } : req.body;
  const updatedRecipe = await service.update(id, data);

  if (updatedRecipe.error) return next(updatedRecipe.error);

  return res.status(200).json(updatedRecipe);
});

const remove = rescue(async (req, res, next) => {
  const { id } = req.params;

  const removedProduct = await service.remove(id);

  if (removedProduct.error) return next(removedProduct.error);

  return res.status(204).json(removedProduct);
});

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};