const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllRecipes = async () => {
  const db = await connection();

  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const recipe = await db.collection('recipes').findOne(ObjectId(id));

  if (!recipe) return null;

  return recipe;
};

const createRecipe = async (data) => {
  const db = await connection();
  const recipeRegistry = await db.collection('recipes')
    .insertOne(data);

  return recipeRegistry;
};

const updateRecipe = async ({ id, name, ingredients, preparation }) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const result = await db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } });

  return result;
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};