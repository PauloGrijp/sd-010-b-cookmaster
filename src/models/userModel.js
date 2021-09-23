// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const userExists = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user !== null;
};

const create = async ({ name, email, password }) => {
  const db = await connection();
  const createdUser = await db.collection('users')
  .insertOne({ name, email, password, role: 'user' });

  return { user: { name, email, role: 'user', _id: createdUser.insertedId } };
};

module.exports = { create, userExists };