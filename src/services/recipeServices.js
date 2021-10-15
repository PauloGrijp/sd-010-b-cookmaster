const { createRecipe } = require('../models/recipesModel');

const createNewRecipe = async (user, name, ingredients, preparation) => {
  const newRecipe = await createRecipe(user, name, ingredients, preparation);

  return newRecipe;
};

module.exports = {
  createNewRecipe,
};
