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

module.exports = { validateFields, createRecipe, getAllRecipes, getRecipe };
