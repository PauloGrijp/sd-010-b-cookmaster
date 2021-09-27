const connection = require('./connection');

const postRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

module.exports = { postRecipe, getRecipes };
