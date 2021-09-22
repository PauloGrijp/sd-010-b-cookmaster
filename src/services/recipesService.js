const recipesModel = require('../models/recipesModel');

const getRecipe = async (id) => recipesModel.getRecipe(id);

const create = async (data) => recipesModel.create(data);

const getRecipes = async () => recipesModel.getRecipes();

const getRecipeById = async (id) => recipesModel.getRecipeById(id);

module.exports = {
  create,
  getRecipes,
  getRecipeById,
  getRecipe,
};