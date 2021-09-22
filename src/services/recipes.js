const { createRecipe } = require('../models/recipes');

const addRecipe = async (name, ingredients, preparation) => {
  const recipe = await createRecipe(name, ingredients, preparation);

  return recipe;
};

module.exports = {
  addRecipe,
};
