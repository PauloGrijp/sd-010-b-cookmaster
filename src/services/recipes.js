const model = require('../models/recipes');

const readRecipe = async (id) => {
  const recipe = await model.getOne(id);
  if (!recipe) return null;

  return recipe;
};

const recipeImage = async (id, img) => {
  const recipe = await readRecipe(id);
  const result = { ...recipe, image: img };

  await model.addRecipeImage(id, { image: img });

  return result;
};

module.exports = { readRecipe, recipeImage };
