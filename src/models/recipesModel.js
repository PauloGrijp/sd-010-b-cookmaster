const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createRecipesModel = async (name, ingredients, preparation) => {
  const db = await connect();
  const result = await db.collection('recipes').insertOne({ name, ingredients, preparation });
  return result;
};

const getAllRecipes = async () => {
  const db = await connect();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getRecipesById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  return result;
};

module.exports = {
  createRecipesModel,
  getAllRecipes,
  getRecipesById,
};
