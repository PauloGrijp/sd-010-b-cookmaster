// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const emailExists = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user !== null;
};

const create = async ({ name, email, password }) => {
  const db = await connection();
  const userRegistry = await db.collection('users').insertOne({ name, email, password });

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: userRegistry.insertedId,
    },
  };
};

module.exports = {
  emailExists,
  create,
};