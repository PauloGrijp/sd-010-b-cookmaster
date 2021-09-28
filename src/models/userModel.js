// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getUserByEmail = async (email) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('users').find({ email }).toArray());
  
  return result;
};

const createUser = async ({ name, email, password }) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: result.insertedId,
    },
  };
};

module.exports = { createUser, getUserByEmail };
