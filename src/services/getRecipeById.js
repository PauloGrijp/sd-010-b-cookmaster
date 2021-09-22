const models = require('../models');

const getRecipeById = async (id) => {
  const recipe = await models.getRecipeById(id);
  if (!recipe) return { message: 'recipe not found' };
  return recipe;
};

module.exports = getRecipeById;