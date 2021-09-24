const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerNewRecipe = async (recipe, userInfo) => {
  const { _id } = userInfo;
  const newRecipe = { ...recipe, userId: _id };
  const db = await connection.getConnection();
  const registeredRecipe = await db.collection('recipes').insertOne(newRecipe);

  return { recipe: { _id: registeredRecipe.insertedId, ...newRecipe } };
};

const getAllRecipes = async () => {
  const db = await connection.getConnection();
  const allRecipes = await db.collection('recipes').find().toArray();
  
  return allRecipes;
};

const getRecipeById = async (id) => {
  const db = await connection.getConnection();
  const searchedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });

  if (searchedRecipe) return searchedRecipe;
  return false;
};

module.exports = {
  registerNewRecipe,
  getAllRecipes,
  getRecipeById,
};