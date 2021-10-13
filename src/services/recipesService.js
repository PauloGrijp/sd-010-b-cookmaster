const recipesModel = require('../models/recipesModel');

const STATUS_BAD_REQUEST = 400;

const validateRecipeRegistration = (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) {
    return {
      err: {
        status: STATUS_BAD_REQUEST,
        message: { message: 'Invalid entries. Try again.' },
      },
    };
  }
};

async function registeringRecipes(name, ingredients, preparation) {
  if (validateRecipeRegistration(name, ingredients, preparation)) {
    return validateRecipeRegistration(name, ingredients, preparation);
  }
  const newUser = await recipesModel.registeringRecipes(name, ingredients, preparation);

  return newUser;
}

module.exports = {
  registeringRecipes,
};
