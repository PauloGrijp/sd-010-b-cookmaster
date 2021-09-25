const { connection } = require('./connection');

const create = async ({ name, email, password }) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('users')
  .insertOne({ name, email, password, role: 'user' }));
  return { name, email, role: 'user', _id: insertedId };
};

const findByEmail = async (email) => {
  const result = await connection()
  .then((db) => db.collection('users')
  .findOne({ email }));
  return result;
};

module.exports = {
  create,
  findByEmail,
};