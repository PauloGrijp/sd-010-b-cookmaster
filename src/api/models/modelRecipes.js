const connection = require('./connection');

const collection = async () => connection()
  .then((db) => db.collection('recipes'));

const create = async (name, ingredients, preparation, userId) => collection()
  .then((col) => col.insertOne({ name, ingredients, preparation, userId }));

module.exports = { create };
