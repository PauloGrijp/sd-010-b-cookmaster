const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();

  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const createRecipe = async (data) => {
  const db = await connection();
  const recipeRegistry = await db.collection('recipes')
    .insertOne(data);

  return recipeRegistry;
};

module.exports = {
  createRecipe,
  getAllRecipes,
};