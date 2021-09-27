const getConnection = require('./connection');

const collection = 'users';

async function getByEmail(email) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .findOne({ email });
  return result;
}

async function create({ name, email, password }) {
  const db = await getConnection();
  const result = await db
    .collection(collection)
    .insertOne({ name, email, password });
  return { user: { _id: result.insertedId, name, email, role: 'user' } };
}

module.exports = {
  create,
  getByEmail,
};
