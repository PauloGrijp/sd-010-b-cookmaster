const { ObjectId } = require('mongodb');
const connect = require('./connection');

const add = async (name, ingredients, preparation, userId) => {
  const db = await connect();
  const result = await db.collection('recipes')
  .insertOne({ name, ingredients, preparation, userId });
  const recipe = result.ops[0];
    return { recipe };
};

const getAll = async () => {
  const db = await connect();
  const recipes = await db.collection('recipes').find().toArray();
  return recipes;
};

const getById = async ({ id }) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connect();
  const recipeId = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return recipeId;
};

module.exports = { add, getAll, getById };