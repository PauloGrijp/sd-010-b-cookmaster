const connection = require('./connection');

const createRecipeModel = async (recipe, _id) => {
  const DB = await connection();
  console.log(recipe);
  const recipeDB = await DB.collection('recipe').insertOne({ recipe: { ...recipe, _id } });
  return recipeDB.ops[0];
};

module.exports = {
  createRecipeModel,
};