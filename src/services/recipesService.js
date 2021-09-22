const recipesModel = require('../models/recipesModel');

const create = async (data) => recipesModel.create(data);

const getRecipes = async () => recipesModel.getRecipes();

module.exports = {
  create,
  getRecipes,
};