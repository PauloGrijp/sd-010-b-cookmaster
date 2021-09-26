const connect = require('./connection');

const createRecipesModel = async (name, ingredients, preparation) => {
  const db = await connect();
  const result = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return result;
};

const getAllRecipes = async () => {
  const db = await connect();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

module.exports = {
  createRecipesModel,
  getAllRecipes,
};
