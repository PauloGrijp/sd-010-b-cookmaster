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

module.exports = {
  registerNewRecipe,
  getAllRecipes,
};