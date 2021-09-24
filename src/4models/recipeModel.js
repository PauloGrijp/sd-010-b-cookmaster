const connection = require('./connection');

const createRecipeModel = async (recipe, userId) => {
  const DB = await connection();
  const recipeDB = await DB.collection('recipes').insertOne({ ...recipe, userId });
  return { recipe: recipeDB.ops[0] };
};

const getRecipesModel = async () => connection()
  .then((DB) => DB.collection('recipes').find().toArray());

module.exports = {
  createRecipeModel,
  getRecipesModel,
};