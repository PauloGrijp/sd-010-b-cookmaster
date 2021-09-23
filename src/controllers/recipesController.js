const recipesService = require('../services/recipesService');
const recipesModel = require('../models/recipesModel');

const create = async (req, res, next) => {
  const { body } = req;
  const token = req.headers.authorization;
  const data = await recipesService.create(body, token);
  if (data.message) {
    return next(data);
  }
  return res.status(201).json(data);
};

const getAll = async (_req, res) => {
  try {
    const find = await recipesModel.getAll();
    console.log(find);
    return res.status(200).json(find);
  } catch (err) {
    return err;
  }
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const recipe = await recipesService.getById(id);
  if (recipe.message) {
    return next(recipe);
  }
  return res.status(200).json(recipe);
};

module.exports = {
  create,
  getAll,
  getById,
};