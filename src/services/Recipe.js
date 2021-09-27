const Recipe = require('../models/Recipe');

const BAD_REQUEST = 400;

const getAll = async () => Recipe.getAll();

const generateError = (message, status) => (
  {
    error: {
      message,
      status,
    },
  }
);

const findById = async (id) => {
  const recipe = await Recipe.findById(id);

  if (!recipe) return generateError('recipe not found', 404);
  
  return recipe;
};

const create = async (recipe) => {
  if (!recipe.name || !recipe.ingredients || !recipe.preparation) {
    return generateError('Invalid entries. Try again.', BAD_REQUEST);
  }
  return Recipe.create(recipe);
};

const update = async (id, recipe) => {
  Recipe.update(id, recipe);
  return Recipe.findById(id);
};

const remove = async (id) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) return generateError('Wrong sale ID format');

  return Recipe.remove(id) ? recipe : null;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};