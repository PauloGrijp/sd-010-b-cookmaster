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

module.exports = {
  createRecipe,
  getAll,
};