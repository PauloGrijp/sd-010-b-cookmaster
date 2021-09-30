const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');

async function getAll() {
  const recipes = await recipesModel.getAll();
  return recipes;
}

async function create({ name, ingredients, preparation, email }) {
  if (!name || !ingredients || !preparation) return 'invalid entries';

  const user = await usersModel.getByEmail(email);
  const { _id } = user;
   
  return recipesModel.create({ name, ingredients, preparation, userId: _id });
}

module.exports = {
  getAll,
  create,
};