const connection = require('./connection');

const create = async (name, ingredients, preparation, userId) => connection()
  .then((db) => db.collection('recipes').insertOne({ name, ingredients, preparation, userId }))
  .then((result) => result.ops[0]);

const getAll = async () => connection()
  .then((db) => db.collection('recipes').find().toArray())
  .then((result) => result);

module.exports = {
  create,
  getAll,
};