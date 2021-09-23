const rescue = require('express-rescue');
const recipesService = require('../services/recipesService');

const create = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await recipesService.create({ name, ingredients, preparation, userId });
  res.status(201).json({ recipe });
});

const getAll = rescue(async (req, res) => {
  const recipes = await recipesService.getAll();
  res.status(200).json(recipes);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  res.status(200).json(recipe);
});

const update = rescue(async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { userId, role } = req;
  
  const newData = { name, ingredients, preparation };
  
  const recipe = await recipesService.update({ id, userId, role }, newData);
  res.status(200).json(recipe);
});

const deleteById = rescue(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const reqData = { id, userId, role };
  await recipesService.deleteById(reqData);
  res.status(204).send();
});

const putImage = rescue(async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const image = `localhost:3000/${req.file.path}`;
  const reqData = { id, userId, role, image };
  const recipeWithImage = await recipesService.putImage(reqData);
  res.status(200).json({ ...recipeWithImage });
});

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
  putImage,
};
