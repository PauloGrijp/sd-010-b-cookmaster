const { fieldValidator, tokenValidator } = require('../middleware/recipes');
const { modelRecipes, modelListById } = require('../models/recipes');
const { idValidator } = require('../middleware/recipes');

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

const servListByID = async (id) => { 
  const invalidator = await idValidator(id);
  if (invalidator) {
    return invalidator;
  }
  const result = await modelListById(id);
  if (!result) return { err: { message: 'recipe not found' }, code: 404 };
 return result;
};

module.exports = {
 servRecipes,
 servListByID,
};