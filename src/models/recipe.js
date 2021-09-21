const connection = require('./connection');

const create = async (recipe) => {
  const db = await connection();
  const recipeAdd = await db.collection('recipes').insertOne(recipe);

  return recipeAdd.ops[0];
};

const listRecipes = async () => {
  const db = await connection();
  const recipeList = await db.collection('recipes').find().toArray();

  return recipeList;
};

module.exports = { create, listRecipes };
