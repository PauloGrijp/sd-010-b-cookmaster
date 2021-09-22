const connection = require('./connection');

const create = async (body) => {
  const data = await connection()
    .then((db) => db.collection('recipes').insertOne(body));
  return data;
};

module.exports = {
  create,
};