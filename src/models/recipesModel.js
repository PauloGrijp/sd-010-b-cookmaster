const connection = require('./connection');

const createRecipe = (recipeData) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeData }));

const getAllRecipes = () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray());

module.exports = {
  createRecipe,
  getAllRecipes,
};