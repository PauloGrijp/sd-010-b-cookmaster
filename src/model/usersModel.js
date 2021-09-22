const { connection } = require('./connection');

const create = async ({ name, email, password }) => {
  await connection()
  .then((db) => db.collection('users')
  .insertOne({ name, email, password, role: 'user' }));
  return { user: { name, email, role: 'user' } };
};

module.exports = {
  create,
};