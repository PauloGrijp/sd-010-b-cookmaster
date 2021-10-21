const { recipesModels } = require('../models');

const create = async (recipe, userId) => recipesModels.create(recipe, userId);

const get = async () => recipesModels.get();

const getById = async (id) => {
  const recipe = await recipesModels.getById(id);
  if (!recipe) {
    return {
      error: {
        code: 404,
        message: 'recipe not found',
      },
    };
  }
  return recipe;
};

const update = async (updatedRecipe, recipeId, { _id, role }) => {
  const { userId: ownerId } = await recipesModels.getById(recipeId);
  const userId = _id;
  if (!(ownerId.equals(userId)) && role !== 'admin') {
    return {
      error: {
        code: 403,
        message: 'Forbidden',
      },
    };
  }
  return recipesModels.update(updatedRecipe, recipeId, userId);
};

const remove = async (id) => {
  const recipeExists = await recipesModels.getById(id);
  if (!recipeExists) {
    return {
      error: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    };
  }
  return recipesModels.remove(id);
};

module.exports = {
  create,
  get,
  getById,
  update,
  remove,
};
