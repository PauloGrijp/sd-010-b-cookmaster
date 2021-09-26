const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connection();
  const recipe = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
  return { recipe: { ...recipe.ops[0] } };
};
const getAllRecipes = async () => {
  const db = await connection();
  const allRecipes = await db.collection('recipes').find().toArray();
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const recipe = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipe;
};
module.exports = { createRecipe, getAllRecipes, getRecipeById };
