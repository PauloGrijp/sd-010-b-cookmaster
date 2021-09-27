const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipe = (recipeData) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeData }));

const getAllRecipes = () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));
};

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
};