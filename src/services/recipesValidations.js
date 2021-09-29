const recipesValidations = require('../models/recipesModels');

const validateRecipes = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return false;
  }
  return true;
};

const createRecipes = async ({ name, ingredients, preparation }) => {
  const validRecipesFields = validateRecipes(name, ingredients, preparation);
  if (!validRecipesFields) {
    return { message: 'Invalid entries. Try again.' };  
  }
  const { id } = await recipesValidations.createRecipes({ name, ingredients, preparation });
  return { name, ingredients, preparation, id };
};

module.exports = {
  createRecipes,
};