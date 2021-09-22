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

const update = async ({ id, name, ingredients, preparation }) => {
  if (!ObjectId.isValid(id)) return null;
  const recipesCollection = await mongoConnection.getConnection();
  const recipeAtt = await recipesCollection.collection('recipes').updateOne(
    { _id: ObjectId(id) }, { $set: { name, ingredients, preparation } },
  );
  return recipeAtt;
};

const exclude = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const recipesCollection = await mongoConnection.getConnection();
  const recipeDel = await recipesCollection.collection('recipes').deleteOne({ _id: ObjectId(id) });
  return recipeDel;
};

module.exports = { create, getAll, getById, update, exclude };
