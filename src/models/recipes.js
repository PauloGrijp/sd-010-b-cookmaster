const { ObjectId } = require('mongodb');
const connection = require('./connection');

exports.createRecipe = async (recipe) => {
  db = await connection();
  const newRecipe = db.collection('recipes').insertOne(recipe);
  return newRecipe;
};

exports.getRecipes = async () => {
  db = await connection();
  const recipes = db.collection('recipes').find({}).toArray();
  return recipes;
};

exports.findRecipe = async (id) => {
  db = await connection();
  return db.collection('recipes').findOne(new ObjectId(id));
};

exports.updateRecipe = async (id, recipe) => {
  db = await connection();
  return db.collection('recipes').updateOne({ _id: new ObjectId(id) }, { $set: recipe });
};

exports.deleteRecipe = async (recipeId) => {
  db = await connection();
  return db.collection('recipes').deleteOne({ _id: new ObjectId(recipeId) });
};
