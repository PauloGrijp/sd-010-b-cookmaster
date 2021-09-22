const { connection } = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const { insertedId } = await db.collection('recipes').insertOne(recipe);
  return insertedId;
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find();
  return recipes;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};
