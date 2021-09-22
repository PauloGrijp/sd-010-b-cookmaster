const model = require('../models/recipesModel');

const validateFields = async (name, ingredients, preparation) => {
  if (!name || !ingredients || !preparation) return false;
  return true;
};

const authUser = async (recipeId, userId, role) => {
  const getRecipe = await model.getById(recipeId);
  if (getRecipe.userId === userId || role === 'admin') {
    return true;
  }
};

module.exports = { validateFields, authUser };
