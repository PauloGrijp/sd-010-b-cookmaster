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

const getAllRecipes = async (req, res) => {
  const response = await model.getAll();
  return res.status(200).json(response);
};

module.exports = { validateFields, createRecipe, getAllRecipes };
