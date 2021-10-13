const recipesModel = require('../models/recipesModel');

const create = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return {
      err: { status: 400, message: 'Invalid entries. Try again.' } };
    }

  const recipe = await recipesModel.create(name, ingredients, preparation, userId);
  return recipe;
};

const getAll = async () => {
  const recipes = await recipesModel.getAll();
  return recipes;
};

module.exports = { 
  create,
  getAll,
 };  
