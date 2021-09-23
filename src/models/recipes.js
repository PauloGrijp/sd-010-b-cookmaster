const { ObjectId } = require('mongodb');
const connect = require('./connection');

const registerRecipe = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const recipeResult = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
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

const editRecipe = async ({ id, name, ingredients, preparation, userId }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation, userId } },
    );
  return { _id: id, name, ingredients, preparation, userId };
};

module.exports = { registerRecipe, getAllRecipes, getRecipeById, editRecipe };