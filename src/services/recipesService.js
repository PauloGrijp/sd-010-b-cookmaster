const recipesModel = require('../models/recipesModel');

const create = async (data) => recipesModel.create(data);

const getRecipes = async () => recipesModel.getRecipes();

const getRecipeById = async (id) => recipesModel.getRecipeById(id);

module.exports = {
  create,
  getRecipes,
  getRecipeById,
};