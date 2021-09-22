const jwt = require('jsonwebtoken');
const recipesService = require('../services/recipesService');

const status200 = 200;
const status401 = 401;
const secret = 'minhaSenha';

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
module.exports = {
  create,
  getRecipes,
  getRecipeById,
};