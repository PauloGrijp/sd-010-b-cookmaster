const Error = require('../utils/createObjError');
const Recipes = require('../models/Recipes');

const findById = async (id) => {
  const recipe = await Recipes.findById(id);
  if (!recipe) return Error.notFound('recipe not found');
  return recipe;
};

module.exports = {
  create: Recipes.create,
  getAll: Recipes.getAll,
  findById,
  update: Recipes.update,
  excluse: Recipes.excluse,
  addImage: Recipes.addImage,
};
