const recipesModel = require('../models/recipesModel');
const usersModel = require('../models/usersModel');

async function getAll() {
  const recipes = await recipesModel.getAll();
  return recipes;
}

async function getById({ id }) {
  if (id.length < 24) return 'wrong id';
  
  const recipe = await recipesModel.getById({ id });

  if (!recipe) return 'wrong id';
  
  return recipe;
}

async function create({ name, ingredients, preparation, email }) {
  if (!name || !ingredients || !preparation) return 'invalid entries';

  const user = await usersModel.getByEmail(email);
  const { _id } = user;
   
  return recipesModel.create({ name, ingredients, preparation, userId: _id });
}

async function update({ name, ingredients, preparation, email }) {
  if (!name || !ingredients || !preparation) return 'invalid entries';

  const user = await usersModel.getByEmail(email);
  const { _id } = user;
   
  return recipesModel.update({ name, ingredients, preparation, userId: _id });
}

module.exports = {
  getAll,
  getById,
  create,
  update,
};