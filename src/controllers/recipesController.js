const service = require('../services/recipesService');
const model = require('../models/recipesModel');

const validateFields = async (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const validation = await service.validateFields(name, ingredients, preparation);
  if (!validation) return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
  next();
};

const createRecipe = async (req, res) => {
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const response = await model.create(name, ingredients, preparation, _id);
  return res.status(201).json({ recipe: response });
};

const getAllRecipes = async (_req, res) => {
  const response = await model.getAll();
  return res.status(200).json(response);
};

const getRecipe = async (req, res) => {
  const { id } = req.params;
  const response = await model.getById(id);
  if (!response) { 
    return res.status(404).json({ message: 'recipe not found' }); 
  }
    return res.status(200).json(response);
};

const authUser = async (req, res, next) => {
  const { id } = req.params;
  const { _id, role } = req.user;
  const authentication = await service.authUser(id, _id, role);
  if (!authentication) {
    return res.status(401).json({ message: 'missing auth token' });
  }
  next();
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { name, ingredients, preparation } = req.body;
  const { _id } = req.user;
  const response = await model.update(id, name, ingredients, preparation, _id);
  return res.status(200).json(response);
};

const removeRecipe = async (req, res) => {
  const { id } = req.params;
  await model.remove(id);
  return res.status(204).json();
};

const updateRecipeImage = async (req, res) => {
  const { filename } = req.file;
  const { id } = req.params;
  try {
    const response = await model.updateImage(id, filename);
    res.status(200).json(response);
  } catch (error) {
    return res.status(401).json({ message: 'missing auth token' });
  }
};

module.exports = { 
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
  authUser, 
  removeRecipe,
  updateRecipeImage,
};
