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

const getById = async (id) => {
  const recipe = await recipeModel.getById(id);
  return recipe;
};

const editRecipe = async (edition, id) => {
  const { value: { _id } } = await recipeModel.editRecipe(edition, id);
  const result = {
    _id,
    ...edition,
  };
  return result;
};

const getIdByEmail = async (email) => {
  const { _id } = await userModel.getByEmail(email);

  return _id;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getById,
  editRecipe,
  getIdByEmail,
};
