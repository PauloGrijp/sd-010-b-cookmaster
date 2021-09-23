const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (recipe) => {
  const db = await getConnection();

  const newRecipe = await db.collection('recipes').insertOne(recipe);
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
};
