const RecipeModel = require('../models/RecipesModel');

const createRecipe = async (name, ingredients, preparation, userId) => {
  if (!name || !ingredients || !preparation) {
    return { message: 'Invalid entries. Try again.' };
  }

  const recipe = await RecipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = {
  createRecipe,
};