const connection = require('./connection');

const create = async (body) => {
  const data = await connection()
    .then((db) => db.collection('users').insertOne(body));
  return data;
};

const getByEmail = async (email) => {
  const data = await connection()
  .then((db) => db.collection('users').findOne({ email }));
  return data;
};

module.exports = {
  create,
  getByEmail,
};