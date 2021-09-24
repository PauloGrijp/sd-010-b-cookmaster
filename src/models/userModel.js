const connect = require('./connection');
require('dotenv').config();

const getUser = async (name) => {
  const db = await connect();
  const result = await db.collection('users').findOne({ name });
  return result;
};

const getUserByEmail = async (email) => {
  const db = await connect();
  const result = await db.collection('users').findOne({ email });
  return result;
};

const createUser = async (name, email, password) => {
  const db = await connect();
  const result = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
  return { role: result.ops[0].role, id: result.insertedId };
};

const getAll = async () => {
  const db = await connect();
  const result = await db.collection('users').find().toArray();
  return result; 
};

module.exports = {
  getUserByEmail,
  createUser,
  getAll,
  getUser,
};