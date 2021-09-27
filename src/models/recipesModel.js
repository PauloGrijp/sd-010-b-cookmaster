const connection = require('./connection');

const createRecipe = (recipeData) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ ...recipeData }));

module.exports = {
  createRecipe,
};