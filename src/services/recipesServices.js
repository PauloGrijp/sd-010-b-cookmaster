const recipesModel = require('../models/recipesModel');

const invalidEntries = {
  error: {
    status: 400,
    message: 'Invalid entries. Try again.',
  },
};

const createRecipe = async (recipeData) => {
  const { name, ingredients, preparation, userId } = recipeData;
  if (!name || !ingredients || !preparation) return invalidEntries;
  const { insertedId } = await recipesModel.createRecipe(recipeData);

  return {
    recipe: {
      _id: insertedId,
      name,
      ingredients,
      preparation,
      userId,
    },
  };
};

module.exports = {
  createRecipe,
};