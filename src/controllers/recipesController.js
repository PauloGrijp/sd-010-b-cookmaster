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

const updateId = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;
  const token = req.headers.authorization;
  if (id.length !== 24 || !token) {
    return next({ status: 401, message: 'missing auth token' });
  }
  const data = await recipesService.updateId(id, body, token);
  if (data.message) {
    return next(data);
  }
  return res.status(200).json(data);
};

const deleteId = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  if (id.length !== 24 || !token) {
    return next({ status: 401, message: 'missing auth token' });
  }
  const exclud = await recipesService.deleteId(id, token);
  if (exclud.message) {
    return next(exclud);
  }
  return res.status(204).send(exclud);
};

module.exports = {
  create,
  getAll,
  updateId,
  deleteId,
  getById,
};