const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (recipe) => {
  const db = await connection();
  const createdRecipe = await db.collection('recipes').insertOne(recipe);
  return createdRecipe.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;
  const db = await connection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  const updatedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return updatedRecipe;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
