const service = require('../services/recipesService');

const createNewRecipe = async (req, res) => {
  const { authorization: token } = req.headers;
  const { name, ingredients, preparation } = req.body;
  const result = await service.createNewRecipe(name, ingredients, preparation, token);
  if (result.err) {
    return res.status(result.status).json(result.err);
  }
  res.status(201).json(result);
};

const getAllRecipes = async (_req, res) => {
  const allRecipes = await service.getAllRecipes();
  res.status(200).json(allRecipes);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getRecipeById(id);
  if (result.err) {
    return res.status(result.status).json(result.err);
  }
  res.status(200).json(result);
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const { name, ingredients, preparation } = req.body;
  const body = { name, ingredients, preparation };
  const result = await service.updateRecipe(id, body, token);
  if (result.err) {
    return res.status(result.status).json(result.err);
  }
  res.status(200).json(result);
};

const deleteRecipe = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const response = await service.deleteRecipe(id, token);
  if (response.err) {
    return res.status(response.status).json(response.err);
  }
  return res.status(204);
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};