const { ObjectId } = require('mongodb');
const recipesModel = require('../model/recipesModel');

const recipeNotFound = { message: 'recipe not found' };

const add = async (name, ingredients, preparation, userId) => {
  const recipe = await recipesModel.add(name, ingredients, preparation, userId);
  if (!recipe) return {};
  return { recipe };
};

const getAll = async () => {
  const recipes = recipesModel.getAll();
  if (!recipes) return {};
  return recipes;
};

const getById = ({ id }) => {
  if (!ObjectId.isValid(id)) return recipeNotFound;
  return recipesModel.getById({ id });
};

module.exports = { add, getAll, getById };