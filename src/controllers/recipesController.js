const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const create = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { userId } = req;
  const recipe = await recipesService.create({ name, ingredients, preparation, userId });
  res.status(201).json({ recipe });
};

const getAll = async (req, res) => {
  const recipes = await recipesModel.getAll();
  res.status(200).json(recipes);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  res.status(200).json(recipe);
};

const update = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { id } = req.params;
  const { userId, role } = req;
  
  const reqData = { id, name, ingredients, preparation, userId, role };
  
  const recipe = await recipesService.update(reqData);
  res.status(200).json(recipe);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { userId, role } = req;
  const reqData = { id, userId, role };
  await recipesModel.deleteById(reqData);
  res.status(204).send();
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  deleteById,
};
