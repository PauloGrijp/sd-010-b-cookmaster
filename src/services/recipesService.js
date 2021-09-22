const recipesModel = require('../models/recipesModel');

// const getRecipe = async (id) => recipesModel.getRecipe(id);

const create = async (data) => recipesModel.create(data);

const getRecipes = async () => recipesModel.getRecipes();

const getRecipeById = async (id) => recipesModel.getRecipeById(id);

const edit = async (data) => recipesModel.edit(data);

const exclude = async (recipeId) => recipesModel.exclude(recipeId);

module.exports = {
  create,
  getRecipes,
  getRecipeById,
  edit,
  exclude,
};