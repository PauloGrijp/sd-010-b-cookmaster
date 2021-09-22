const recipesModel = require('../model/recipesModel');

const findId = async (id) => {
  const product = await recipesModel.findById(id);
  const err = { message: 'recipe not found', error: true };
  if (product === false) return err;
  return product;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  await recipesModel.updateRecipe(id, name, ingredients, preparation);
  const findRecipe = await recipesModel.findById(id);
  return findRecipe;
};

const updateImgRecipe = async (id, image) => {
  await recipesModel.updateImgRecipe(id, image);
  const findRecipe = await recipesModel.findById(id);
  return findRecipe;
};

module.exports = {
  findId,
  updateRecipe,
  updateImgRecipe,
};