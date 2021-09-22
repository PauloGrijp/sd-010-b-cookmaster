const recipeModel = require('../model/recipeModel');
const userModel = require('../model/userModel');

const createRecipe = async (recipe, email) => {
  const { _id } = await userModel.getByEmail(email);
  const idRecipe = await recipeModel.createRecipe(recipe);
  return {
    userId: _id,
    _id: idRecipe,
  };
};

const getAllRecipes = async () => {
  const recipes = await recipeModel.getAllRecipes();
  return recipes.toArray();
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
