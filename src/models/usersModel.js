const connection = require('./connection');

async function createUser({ name, email, password }) {
  const db = await connection();
  const role = 'user';
  const { insertedId: _id } = await db.collection('users')
    .insertOne({ name, email, password, role });

  return { _id, name, email, role };
}

async function getUserEmail(email) {
  const db = await connection();

  const userEmail = await db.collection('users').findOne({ email });

  return userEmail;
}

module.exports = {
  createUser,
  getUserEmail,
};