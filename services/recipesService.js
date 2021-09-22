const recipesModel = require('../model/recipesModel');

const findId = async (id) => {
  const product = await recipesModel.findById(id);
  const err = { message: 'recipe not found', error: true };
  if (product === false) return err;
  return product;
};

// const updateRecipe = async (id, name, ingredients, preparation) => {

// }

module.exports = {
  findId,
};