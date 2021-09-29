const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function createRecipe(recipe) {
  const { user, name, ingredients, preparation } = recipe;
  const db = await connection();
  const { id } = user;
  
  const result = await db.collection('recipes').insertOne({
    userId: id, name, ingredients, preparation,
  });
  return result.ops[0];
}

async function getAllRecipes() {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();

  return result;
}

async function getRecipe(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return result;
}

async function updateRecipe(id, recipe) {
  if (!ObjectId.isValid(id)) return null;
  const { name, ingredients, preparation } = recipe;
  const db = await connection();
  const result = await db.collection('recipes')
    .findOneAndUpdate({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }, { returnOriginal: false });
  
  return result.value;
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
  updateRecipe,
};