const { createRecipe } = require('../models/recipesModel');

const createNewRecipe = async (_id, name, ingredients, preparation) => {
  const newRecipe = await createRecipe(_id, name, ingredients, preparation);

  return newRecipe;
};

module.exports = {
  createNewRecipe,
};
