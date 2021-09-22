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

module.exports = { create, getAll };
