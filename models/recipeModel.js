const connection = require('./connection');

const createRecipe = async (data) => {
  const db = await connection();
  const recipeRegistry = await db.collection('recipes')
    .insertOne(data);

  return recipeRegistry;
};

module.exports = {
  createRecipe,
};