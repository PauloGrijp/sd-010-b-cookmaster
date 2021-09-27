const { ObjectId } = require('mongodb');
const connection = require('./connection');

const postRecipe = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }));

const getRecipes = async () => connection()
  .then((db) => db.collection('recipes').find().toArray());

const getRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));

const putRecipeById = async (id, name, ingredients, preparation) => connection()
  .then((db) => db.collection('recipes')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, ingredients, preparation } }))
  .then(() => ({ _id: id, name, ingredients, preparation })); 

const deleteRecipeById = async (id) => connection()
  .then((db) => db.collection('recipes').deleteOne({ _id: ObjectId(id) }));

module.exports = { postRecipe, getRecipes, getRecipeById, putRecipeById, deleteRecipeById };
