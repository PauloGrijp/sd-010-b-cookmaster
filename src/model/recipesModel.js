const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createRecipes = async ({ name, ingredients, preparation }) => {
  const auxConnection = await connection();
  console.log(name, ingredients, preparation);
  const result = await auxConnection.collection('recipes')
  .insertOne({ name, ingredients, preparation });
  return result;
};

const getAll = async () => {
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

const updateOne = async (id, aoba) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const auxConnection = await connection();
  await auxConnection.collection('recipes')
  .updateOne({ _id: ObjectId(id) }, { $set: aoba });
  const aux = await auxGetById(id);
  return aux;
};

module.exports = { createRecipes, getAll, auxGetById, updateOne };
