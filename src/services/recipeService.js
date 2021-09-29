const model = require('../models/recipeModel');

const readRecipe = async (id) => {
  const recipe = await model.getOne(id);
  if (!recipe) return null;

  return recipe;
};

const recipeImage = async (id, img) => {
    const recipe = await readRecipe(id);
    const image = { ...recipe, image: img };

    await model.addRecipeImage(id, { image: img });

    return image;
};

module.exports = { readRecipe, recipeImage };
