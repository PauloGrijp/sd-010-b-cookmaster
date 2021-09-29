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
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getRecipeById = async (id) => {
  const db = await connect();
  const recipeById = await db.collection('recipes').findOne(ObjectId(id));
  return recipeById;
};

const updateRecipe = async ({ name, ingredients, preparation }, id) => {
  const db = await connect();
  const collection = await db.collection('recipes');
  await collection.updateOne(ObjectId(id), { $set: { name, ingredients, preparation } });
  return { name, ingredients, preparation, id };
};

module.exports = {
  createRecipes,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};