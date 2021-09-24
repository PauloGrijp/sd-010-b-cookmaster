const { checkRecipe, validRecipes } = require('../middlewares/recipesMiddlewares');
const { getAllRecipesM, createRecipesM, getIdRecipesM, updateRecipesM,
  deleteRecipesM } = require('../model/recipesModel');

const createRecipesS = async (name, ingredients, preparation, userId) => {
  validRecipes(name, ingredients, preparation);
  const result = await createRecipesM(name, ingredients, preparation, userId);
  return result;
};
const getAllRecipesS = () => getAllRecipesM();
const getIdRecipesS = async (id) => {
  const result = await getIdRecipesM(id);
  checkRecipe(result);
  return result;
};
const updateRecipesS = async (id, name, ingredients, preparation) => {
  const result = await updateRecipesM(id, name, ingredients, preparation);
  return result;
};
const deleteRecipesS = async (id) => {
  const result = await deleteRecipesM(id);
  checkRecipe(result);
  return result;
};
const authorRecipesS = async (userID, userRole, recipeID) => {
  const recipe = await getIdRecipesM(recipeID);
  checkRecipe(recipe);
  if (recipe.userId !== userID && userRole !== 'admin') {
    const error = new Error('unauthorized');
    error.code = 401;
    throw error;
  }
};

module.exports = {
  getAllRecipesS,
  getIdRecipesS,
  createRecipesS,
  updateRecipesS,
  deleteRecipesS,
  authorRecipesS,
};
