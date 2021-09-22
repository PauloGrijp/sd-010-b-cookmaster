const connect = require('./connection');

const registerRecipe = async (name, ingredients, preparation) => {
  const db = await connect();
  const recipeResult = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  const recipe = recipeResult.ops[0];
  return { recipe };
};

module.exports = { registerRecipe };