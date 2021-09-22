const jwt = require('jsonwebtoken');
const recipesService = require('../services/recipesService');
const userController = require('./userController');

const status200 = 200;
const status401 = 401;
const secret = 'minhaSenha';

const getRecipe = async (id) => recipesService.getRecipeById(id);

const create = async (req, res) => {
  const token = req.headers.authorization;
  const { name, ingredients, preparation } = req.body;
  try {
    const { email } = jwt.verify(token, secret);
    const result = await recipesService.create({ email, name, ingredients, preparation });
    return res.status(201).json(result);
  } catch (err) {
    return res.status(status401).json({ message: 'jwt malformed' });
  }
};

const getRecipes = async (req, res) => {
  try {
    const result = await recipesService.getRecipes();
    return res.status(status200).json(result);
  } catch (err) {
    return res.status(500).json({ message: 'Erro interno', error: err.message });
  }
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await recipesService.getRecipeById(id);
    return res.status(status200).json(result);
  } catch (err) {
    return res.status(404).json({ message: 'recipe not found' });
  }
};

const edit = async (req, res) => {
  const recipeId = req.params.id;
  const { name, ingredients, preparation } = req.body;
  const token = req.headers.authorization; 
  if (!token) {
    return res.status(status401).json({ message: 'missing auth token' });
  }
  try {
    jwt.verify(token, secret);
    // const { _id } = await userController.getUser(email);
    const { userId } = await getRecipe(recipeId);
    // if (userId !== _id && role !== 'admin') {
    //   return res.status(status401).json({ message: 'Unauthorized' });
    // }
    const result = await recipesService.edit({ name, ingredients, preparation, recipeId });
    return res.status(status200).json({ ...result, userId });
  } catch (err) {
    return res.status(status401).json({ message: 'jwt malformed' });
  }
};

const exclude = async (req, res) => {
  const token = req.headers.authorization;
  const { id: recipeId } = req.params;
  if (!token) {
    return res.status(status401).json({ message: 'missing auth token' });
  }
  const { email, role } = jwt.verify(token, secret);
  const user = await userController.getUser(email);
  if (email === user.email || role === 'admin') {
    const result = await recipesService.exclude(recipeId);
    return res.status(204).json(result);
  }
  return res.status(status401).json({ message: 'Unauthorized' });
};

module.exports = {
  create,
  getRecipes,
  getRecipeById,
  edit,
  exclude,
};