const { createRecipesModel } = require('../models/recipesModel');
// const { errorBusiness } = require('../middlewares/errors');

const createServiceRecipes = async (name, ingredients, preparation) => {
  // if (emailIsExists) {
  //   return errorBusiness('Email already registered');
  // }
  
  const result = await createRecipesModel(name, ingredients, preparation);
  return result;
};

module.exports = {
  createServiceRecipes,
};