const model = require('../Models/Recipes');
const utils = require('../validations/recipes');

const newRecipe = async (name, ingredients, preparation, userId) => {
  utils.validateRecipeBody(name, ingredients, preparation);
  const result = await model.newRecipe(name, ingredients, preparation, userId);
  return result;
};

module.exports = {
  newRecipe,
};
