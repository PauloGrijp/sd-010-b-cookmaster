const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipes = async ({ name, ingredients, preparation }) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('recipes').insertOne(
    { name, ingredients, preparation },
    );
  return { name, ingredients, preparation, id };
};

const getAllRecipes = async () => {
  const db = await connect();
  const allRecipes = await db.collection('recipes').findOne().toArray();
  return allRecipes;
};

const getRecipeById = async (id) => {
  const db = await connect();
  const recipeById = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeById;
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
};