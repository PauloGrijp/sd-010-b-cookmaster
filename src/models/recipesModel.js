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

async function editRecipe(_id, { name, ingredients, preparation }, userId) {
  if (!ObjectId.isValid(_id)) return null;

  const db = await connection();

  await db.collection('recipes').updateOne(
    { _id: ObjectId(_id) }, { $set: { name, ingredients, preparation, userId } },
  );

  return { _id, name, ingredients, preparation, userId };
}

async function excludeRecipe(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  const recipe = await db.collection('recipes').deleteOne({ _id: ObjectId(id) });

  return recipe;
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  editRecipe,
  excludeRecipe,
};