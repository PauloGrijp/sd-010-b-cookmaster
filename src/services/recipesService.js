const { validRecipes, checkRecipe } = require('../middlewares/recipesMiddlewares');
const { getAllRecipesM, getRecipeIdM, createRecipeM, updateRecipeM,
  uploadImgRecipeM, deleteRecipeM } = require('../model/recipesModel');

const createRecipeS = async (name, ingredients, preparation, userId) => {
  validRecipes(name, ingredients, preparation);
  const result = await createRecipeM(name, ingredients, preparation, userId);
  return result;
};
const getAllRecipesS = () => getAllRecipesM();
const getRecipeIdS = async (id) => {
  const result = await getRecipeIdM(id);
  checkRecipe(result);
  return result;
};
const updateRecipeS = async (id, name, ingredients, preparation) => {
  const result = await updateRecipeM(id, name, ingredients, preparation);
  return result;
};
const deleteRecipeS = async (id) => {
  const result = await deleteRecipeM(id);
  checkRecipe(result);
  return result;
};
const uploadImgRecipeS = async (id, imagePath) => {
  const result = await uploadImgRecipeM(id, imagePath);
  return result;
};
const getAuthorRecipeS = async (userID, userRole, recipeID) => {
  const recipe = await getRecipeIdM(recipeID);
  checkRecipe(recipe);
  if (recipe.userId !== userID && userRole !== 'admin') {
    const error = new Error('unauthorized');
    error.code = 401;
    throw error;
  }
};

module.exports = {
  getAllRecipesS,
  getRecipeIdS,
  createRecipeS,
  updateRecipeS,
  deleteRecipeS,
  getAuthorRecipeS,
  uploadImgRecipeS,
};
