const { getOne, addRecipeImage } = require('../model/recipes');

const readRecipe = async (id) => {
  const recipe = await getOne(id);
  return recipe;
};

const localRecipeImage = async (id, img) => {
  const recipe = await readRecipe(id);
  const result = { ...recipe, image: img };

  await addRecipeImage(id, { image: img });

  return result;
};

module.exports = { readRecipe, localRecipeImage };