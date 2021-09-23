const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (body) => {
  const data = await connection()
    .then((db) => db.collection('recipes').insertOne(body));
  return data;
};

const getAll = async () => {
  const data = await connection()
  .then((db) => db.collection('recipes').find().toArray());
  return data;
};

const getById = async (id) => {
  const data = await connection()
  .then((db) => db.collection('recipes').findOne(ObjectId(id)));
  return data;
};

module.exports = {
  create,
  getAll,
  getById,
};