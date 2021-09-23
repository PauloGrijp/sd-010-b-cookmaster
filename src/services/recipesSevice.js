const recipesModel = require('../models/recipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
const create = await recipesModel.createRecipe(name, ingredients, preparation, userId);
return create;
};

const getRecipesAll = () => recipesModel.getRecipesAll();

module.exports = { createRecipe, getRecipesAll };