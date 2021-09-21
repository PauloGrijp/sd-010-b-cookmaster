const connection = require('./connection');

const createRecipe = async (recipeData) => {
  const db = await connection();
  const recipe = await db.collection('recipe').insertOne(recipeData);
  return recipe.ops[0];
};

module.exports = {
  createRecipe,
};