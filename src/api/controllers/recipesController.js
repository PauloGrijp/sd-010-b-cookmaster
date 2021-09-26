const recipesServices = require('../services/recipesServices');

const addRecipes = async (req, res) => {
  const { authorization } = req.headers;
  const { name, ingredients, preparation } = req.body;
    const result = await recipesServices.addRecipes(
    authorization, name, ingredients, preparation,
    );
  return res.status(201).json(result);
};

const getRecipeById = async (req, res) => {
  const { id } = req.params;
  const result = await recipesServices.getRecipeById(id);
  return res.status(200).json(result);
};

const getRecipeByAll = async (_req, res) => {
  const result = await recipesServices.getRecipeByAll();
  return res.status(200).json(result);
};

const editRecipes = async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  const result = await recipesServices.editRecipes(token, id, req.body);
  return res.status(200).json(result);
};

const deleteRecipes = async (req, res) => {
  const { id } = req.params;
  const { authorization } = req.headers;
  const result = await recipesServices.deleteRecipes(authorization, id);
  return res.status(204).json(result);
};

module.exports = {
  addRecipes,
  getRecipeById,
  getRecipeByAll,
  editRecipes,
  deleteRecipes,
};