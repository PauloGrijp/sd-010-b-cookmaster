const { ObjectID } = require('mongodb');
const connection = require('./connection');

const recipes = 'recipes';

const create = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const result = await db.collection(recipes).insertOne({ name, ingredients, preparation, userId });
  const createdRecipe = result.ops[0];
  return createdRecipe;
};

const getAll = async () => {
  const db = await connection();
  return db.collection(recipes).find({}).toArray();
};

const getById = async (id) => {
  const db = await connection();
  const result = await db.collection(recipes).findOne(ObjectID(id));
  return result;
};

module.exports = {
  create,
  getAll,
  getById,
};