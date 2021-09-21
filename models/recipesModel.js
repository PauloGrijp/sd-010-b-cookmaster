const { ObjectID } = require('mongodb');
const getConnection = require('./connection');

const create = async (name, ingredients, preparation, userId) => {
  const recipesCollection = await getConnection()
    .then((db) => db.collection('recipes'));

  const response = await recipesCollection
    .insertOne({ name, ingredients, preparation, userId });

  return {
    _id: response.insertedId,
    name,
    ingredients,
    preparation,
    userId,
  };
};

const getAll = async () => {
  const recipesCollection = await getConnection()
    .then((db) => db.collection('recipes'));

  const response = await recipesCollection
    .find().toArray();

  return response;
};

const getOne = async (id) => {
  const recipesCollection = await getConnection()
    .then((db) => db.collection('recipes'));

  const response = await recipesCollection
    .findOne({ _id: new ObjectID(id) });

  return response;
};

const updateOne = async (id, name, ingredients, preparation) => {
  const recipesCollection = await getConnection()
    .then((db) => db.collection('recipes'));

  try {
    const response = await recipesCollection.updateOne(
      { _id: id },
      { $set: { name, ingredients, preparation } },
      );
      if (response) return true;
      return false;
    } catch (err) {
      return err;
    }
};

module.exports = {
  create,
  getAll,
  getOne,
  updateOne,
};