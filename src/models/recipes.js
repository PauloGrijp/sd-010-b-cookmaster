const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerRecipe = async (name, ingredients, preparation) => {
  const db = await connect();
  const recipeResult = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  const recipe = recipeResult.ops[0];
  return { recipe };
};

const getAllRecipes = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};
module.exports = { registerRecipe, getAllRecipes, getRecipeById };