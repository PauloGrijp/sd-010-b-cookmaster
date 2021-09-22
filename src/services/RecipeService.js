const recipeModel = require('../models/RecipeModel');

// const isValidRecipes = (name, ingredients, preparation) => {
//   if (!name || !ingredients || !preparation) {
//     return false;
//   }
//   return true;
// };

const createRecipe = (name, ingredients, preparation, userId) => {
  // const validationRecipes = isValidRecipes(name, ingredients, preparation);
  // if (!validationRecipes) {
  //   return {
  //     status: 400,
  //     message: 'Invalid entries. Try again.',
  //   };  
  // }
  const recipe = recipeModel.createRecipe(name, ingredients, preparation, userId);
  return recipe;
};

module.exports = {
  createRecipe,
};