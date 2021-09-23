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

module.exports = {
  create,
  getAllRecipes,
};
