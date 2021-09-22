const mongo = require('mongodb');
const connection = require('./connection');

const COLLECTION_NAME = 'recipes';

const createNewRecipe = async (name, ingredients, preparation, userId) => {
  const { ops: recipe } = await connection().then((db) => 
    db.collection(COLLECTION_NAME).insertOne({ name, ingredients, preparation, userId }));
  return { recipe: recipe[0] };
};

const getAllRecipes = async () => {
  const allRecipes = await connection().then((db) => 
    db.collection(COLLECTION_NAME).find().toArray());
  return allRecipes;
};

const getRecipeById = async (id) => {
  if (!mongo.ObjectId.isValid(id)) return false;
  const comparisonId = new mongo.ObjectId(id);
  const recipe = await connection().then((db) =>
   db.collection(COLLECTION_NAME).findOne({ _id: comparisonId }));
  return recipe;
};

const updateRecipe = async (id, name, ingredients, preparation) => {
  if (!mongo.ObjectId.isValid(id)) return null;
  const comparisonId = new mongo.ObjectId(id);
  await connection().then((db) => 
    db.collection(COLLECTION_NAME).updateOne({ _id: comparisonId }, {
      $set: { name, ingredients, preparation },
    }));
};

module.exports = {
  createNewRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
};