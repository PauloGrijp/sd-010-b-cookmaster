const connection = require('./connection');
const { ObjectId } = require('mongodb');

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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipe,
};