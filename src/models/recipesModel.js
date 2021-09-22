const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function createRecipe({ name, ingredients, preparation, userId }) {
  const db = await connection();

  const newRecipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });

  return newRecipe.ops[0];
}

async function getAllRecipes() {
  const db = await connection();

  const newRecipe = await db.collection('recipes').find().toArray();

  return newRecipe;
}

async function getRecipeById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  return recipe;
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};