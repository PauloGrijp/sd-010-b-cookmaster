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

module.exports = {
  createRecipe,
  getAllRecipes,
};