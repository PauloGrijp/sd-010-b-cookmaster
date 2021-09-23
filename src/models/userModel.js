const { ObjectId } = require('bson');
const connection = require('./connection');

const uniqueEmail = async (email) => {
  const db = await connection();
  const emailSearch = await db.collection('users').findOne({ email });
  if (!emailSearch) {
    return true;
  }
  return false;
};

const signUp = async ({ name, password, email }) => {
  const db = await connection();
  const result = await db.collection('users').insertOne({ email, password, name, role: 'user' });
  return { user: {
    name,
    email,
    role: 'user',
    _id: result.insertedId } };
};

const findUser = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const getUserById = async (userId) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ _id: ObjectId(userId) });
  return user;
};

module.exports = {
  uniqueEmail,
  signUp,
  findUser,
  getUserById,
};