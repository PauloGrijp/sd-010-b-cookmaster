const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');
// const userModel = require('./userModel');

const create = async ({ name, ingredients, preparation }) => {
    const usersCollection = await mongoConnection.getConnection()
      .then((db) => db.collection('recipes'));
    const createdUser = await usersCollection.insertOne({ name, ingredients, preparation });
    return {
      name,
      ingredients,
      preparation,
      _id: createdUser.insertedId,
    };
  };

const getAll = async () => {
  const recipesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));
  const recipeList = await recipesCollection.find().toArray();
  return recipeList;
};

const getById = async (id) => {
  const recipesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));
  const recipeListId = await recipesCollection.findOne({ _id: ObjectId(id) });
  return recipeListId;
};

module.exports = { create, getAll, getById };
