const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

// req 4
const registerRecipe = async ({ name, ingredients, preparation }) => {
  const dbConnection = await connection();
  const { insertedId: id } = await dbConnection.collection('recipes')
    .insertOne({ name, ingredients, preparation });
  return { name, ingredients, preparation, id };
};

// req 4
const findAllRecipes = async () => {
  const dbConnection = await connection();
  const allRecipes = await dbConnection.collection('recipes').find().toArray();
  return allRecipes;
};

// req 5
const findRecipeById = async (id) => {
  const dbConnection = await connection();
  const recipeById = await dbConnection.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeById;
};

module.exports = {
  registerRecipe,
  findAllRecipes,
  findRecipeById,
};
