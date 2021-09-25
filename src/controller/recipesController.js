const jwt = require('jsonwebtoken');
const recipesService = require('../services/recipesService');

const segredo = 'seusecretdetoken';

const create = async (req, res) => {
  const token = req.headers.authorization;
  const { data: { _id } } = jwt.verify(token, segredo);
  const result = await recipesService.create(req.body, _id);
  if (result.message) { return res.status(400).json({ message: result.message }); }
  console.log(result);
  return res.status(201).json(result);
};

const getAll = async (_req, res) => {
  const result = await recipesService.getAll();
  return res.status(200).json(result);
};

const findById = async (req, res) => {
  const { id } = req.params;
  const result = await recipesService.findById(id);
  if (result.message) { return res.status(404).json({ message: result.message }); }
  return res.status(200).json(result);
};

module.exports = {
  create,
  getAll,
  findById,
};