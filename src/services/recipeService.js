const recipeModel = require('../models/recipeModel');

const ifExist = (array) => array.every((entrie) => entrie);

const validations = async ({ name, ingredients, preparation, userId }) => {
  const ifExists = ifExist([name, ingredients, preparation]);
  if (!ifExists) return { erro: { code: 400, message: 'Invalid entries. Try again.' } };

  return recipeModel.create({ name, ingredients, preparation, userId });
};

module.exports = { validations };