const { ObjectId } = require('mongodb');
const { CODE_HTTP } = require('../helpers/responses');
const { connection } = require('./connection');

const createRecipes = async ({ name, ingredients, preparation, userId }) => {
  const db = await connection();
  const { insertedId: id } = await db.collection('recipes')
    .insertOne({ name, ingredients, preparation, userId });
    
  return {
    recipe: { name, ingredients, preparation, userId, _id: id },
  };
};

const getAll = async () => {
  const db = await connection();
  return db.collection('recipes').find().toArray();
};

const getById = async ({ id }) => {
  const db = await connection();
  const resultQuery = await db.collection('recipes').findOne({ _id: ObjectId(id) });
  return resultQuery;
};

module.exports = {
  createRecipes,
  getAll,
  getById,
};