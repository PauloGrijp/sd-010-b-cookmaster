const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();
  const recipe = await db.collection('recipes').insertOne(recipeData);
  return recipe.ops[0];
};

const getAll = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));
  return recipe;
};

const updateRecipe = async (recipeId, name, ingredients, preparation) => {
  const db = await connection();
  const recipe = await db.collection('recipes')
  .updateOne({ _id: ObjectId(recipeId) }, { $set: { name, ingredients, preparation } });
  const recipeUpdated = getById(recipeId);
  return recipeUpdated;
};

module.exports = {
  createRecipe,
  getAll,
  getById,
  updateRecipe,
};