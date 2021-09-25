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

const updateRecipe = async (id, recipe) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();

  await db.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: recipe },
  );

  const getRecipe = await db.collection('recipes').findOne(ObjectId(id));
  
  return getRecipe;
};

const deleteRecipe = async (id) => {
  const db = await connection();

  const deletedRecipe = await db.collection('recipes').findOneAndDelete({ _id: ObjectId(id) });

  return deletedRecipe;
};

module.exports = { addRecipe, getAllRecipes, getRecipeById, updateRecipe, deleteRecipe };
