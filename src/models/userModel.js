// const { ObjectId } = require('mongodb');
const connectionMongo = require('./connection');

const create = async (name, email, password, role) => {
  const db = await connectionMongo();
  const user = await db.collection('users').insertOne({ name, email, password, role });
  return { user: { name, email, role, _id: user.insertedId } };
};

const getByEmail = async (email) => {
  const db = await connectionMongo();
  const user = await db.collection('users').findOne({ email });
  return user;
};

module.exports = { create, getByEmail };
