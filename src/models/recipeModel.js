const { ObjectId } = require('mongodb');
const connection = require('./connection');

const postRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

module.exports = { postRecipe, getRecipes, getRecipeById };
