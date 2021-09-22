const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((result) => result.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((result) => result);

const findById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  
  const getRecipeId = await connection()
    .then((db) => db.collection('recipes').findOne(new ObjectId(id)));  
  
  if (!getRecipeId) return null;
  
  return getRecipeId;
};

module.exports = {
  create,
  getAll,
  findById,
};