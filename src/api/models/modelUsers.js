const connection = require('./connection');

const collection = async () => connection()
  .then((db) => db.collection('users'));

const create = async (name, email, password, role = 'user') => collection()
  .then((col) => col.insertOne({ name, email, password, role }));

const getByEmail = async (email) => collection()
  .then((col) => col.findOne({ email }));

module.exports = { create, getByEmail };
