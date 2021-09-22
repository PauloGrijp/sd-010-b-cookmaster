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

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};