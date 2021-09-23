const { ObjectId } = require('mongodb');
const connection = require('./connection');

const addRecipe = async (recipe) => {
  const db = await connection();
  
  const result = await db.collection('recipes').insertOne(recipe);
  
  return result.ops[0];
};

const getAllRecipes = async () => {
  const db = await connection();

  const recipes = await db.collection('recipes').find().toArray();

  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  
  return recipe;
};

module.exports = { addRecipe, getAllRecipes, getRecipeById };
