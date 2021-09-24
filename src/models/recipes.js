const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const create = async (recipe) => {
  const db = await getConnection();

  const newRecipe = await db.collection('recipes').insertOne(recipe);
  return newRecipe.ops[0];
};

const getAllRecipes = async () => {
  const db = await getConnection();
  const recipes = await db.collection('recipes').find({}).toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  const db = await getConnection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};

const updateRecipe = async (id, recipe) => {
  const { name, ingredients, preparation } = recipe;
  const db = await getConnection();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, ingredients, preparation } },
  );
  const updatedRecipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return updatedRecipe;
};

module.exports = {
  create,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};
