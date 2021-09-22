const recipesModel = require('../models/recipes');

const validateRecipeCreation = require('../util/validateRecipeCreation');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const { error } = validateRecipeCreation(name, ingredients, preparation);
  if (error) return { error };

  const recipe = await recipesModel.createRecipe(name, ingredients, preparation, userId);
  console.log('services', recipe);

  return { recipe };
};

// const getRecipes = async () => {
//   const recipes = await recipesModel.getRecipes();

//   return recipes;
// };

module.exports = {
  createRecipe,
  // getRecipes,
};
