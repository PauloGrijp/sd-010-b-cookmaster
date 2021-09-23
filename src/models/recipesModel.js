const connection = require('./connection');

const addRecipe = async (recipe) => {
  const db = await connection();
  
  const result = await db.collection('recipes').insertOne(recipe);
  
  console.log('model', result);
  
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();

  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

module.exports = { addRecipe, getAllRecipes };
