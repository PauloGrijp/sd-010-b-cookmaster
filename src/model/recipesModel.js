const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async (aoba) => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('recipes').insertOne({ aoba });
  return result;
};

const auxGetAll = async () => {
  const auxConnection = await connection();
  const result = await auxConnection.collection('recipes').find().toArray();
  return result;
};

const auxGetById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  const result = await auxConnection.collection('recipes')
  .findOne(ObjectId(id));
  return result;
};

module.exports = { createRecipes, auxGetAll, auxGetById };
