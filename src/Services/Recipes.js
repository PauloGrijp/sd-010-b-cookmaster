const model = require('../Models/Recipes');
const valid = require('../validations/recipes');

const checkRecipeOwner = async (userID, userRole, recipeID) => {
  const recipe = await model.getById(recipeID);
  valid.isRecipe(recipe);
  if (recipe.userId !== userID && userRole !== 'admin') {
    const error = new Error('unauthorized');
    error.code = 401;
    throw error;
  }
};

const getAll = () => model.getAll();

const getById = async (id) => {
  const result = await model.getById(id);
  valid.isRecipe(result);
  return result;
};

const newRecipe = async (name, ingredients, preparation, userId) => {
  valid.validateRecipeBody(name, ingredients, preparation);
  const result = await model.newRecipe(name, ingredients, preparation, userId);
  return result;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  const result = await model.updateRecipe(id, name, ingredients, preparation);
  return result;
};

const addRecipeUrlImage = async (id, imagePath) => {
  const result = await model.addRecipeUrlImage(id, imagePath);
  return result;
};

const deleteRecipe = async (id) => {
  const result = await model.deleteRecipe(id);
  valid.isRecipe(result);
  return result;
};

module.exports = {
  getAll,
  getById,
  newRecipe,
  updateRecipe,
  deleteRecipe,
  checkRecipeOwner,
  addRecipeUrlImage,
};
