const recipesModel = require('../models/recipesModel');

function validateFields(name, ingredients, preparation) {
  if (!name || !ingredients || !preparation) return false;

  return true;
}

async function createRecipe({ name, ingredients, preparation, userId }) {
  const newRecipe = await recipesModel.createRecipe({ name, ingredients, preparation, userId });

  return newRecipe;
}

async function getAllRecipes() {
  const recipes = await recipesModel.getAllRecipes();

  return recipes;
}

async function getRecipeById(id) {
  const recipe = recipesModel.getRecipeById(id);

  return recipe;
}

async function editRecipe(params, body, user) {
  const recipe = await recipesModel.editRecipe(params.id, body, user.id);

  return recipe;
}

async function excludeRecipe(id) {
  const recipe = await recipesModel.excludeRecipe(id);

  return recipe;
}

async function uploadImage(filename) {
  const result = await recipesModel.uploadImage(filename);

  const id = filename.slice(0, 24);
  
  if (result === 1) {
      const recipe = await getRecipeById(id);
      return recipe;
  }

  return { errorType: 'no change on database', error: { message: 'unable to update recipe' } };
}

module.exports = {
  validateFields,
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  excludeRecipe,
  uploadImage,
};