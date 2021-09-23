const { fieldValidator, tokenValidator } = require('../middleware/recipes');
const { modelRecipes } = require('../models/recipes');

const servRecipes = async (recipes, tokenReceived) => { 
  const { name, ingredients, preparation } = recipes;
  const invalidator = await fieldValidator(name, ingredients, preparation);
  if (invalidator) {
    return invalidator;
  }

  const invalidatoken = await tokenValidator(tokenReceived);
  if (invalidatoken) {
    return invalidatoken;
  }

   return modelRecipes(recipes, tokenReceived);
};

module.exports = {
 servRecipes,
};