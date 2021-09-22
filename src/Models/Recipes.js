const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => 
  connection()
    .then((db) => db.collection('recipes').find().toArray());

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('recipes').findOne({ _id: ObjectId(id) }));
};

const newRecipe = async (name, ingredients, preparation, userId) => 
  connection()
    .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
    .then((result) => result.ops[0]);

module.exports = {
  getAll,
  getById,
  newRecipe,
};
