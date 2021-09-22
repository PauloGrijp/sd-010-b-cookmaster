const connect = require('./connection');

const registerRecipe = async (name, ingredients, preparation) => {
  const db = await connect();
  const recipeResult = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  const recipe = recipeResult.ops[0];
  return { recipe };
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

module.exports = { registerRecipe, getAllRecipes };