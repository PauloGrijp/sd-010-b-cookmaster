const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const getByEmail = async (email) => {
  const db = await connection();
  const findedEmail = await db.collection('users').findOne({
    email,
  });
  return findedEmail;
};

const createUser = async (user) => {
  const db = await connection();
  const { insertedId } = await db.collection('users').insertOne(user);
  return insertedId;
};

const getById = async (id) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ _id: ObjectId(id) });
  return user;
};

const getByEmailAndPassword = async (email, password) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email, password });
  return user;
};

module.exports = {
  getByEmail,
  createUser,
  getById,
  getByEmailAndPassword,
};
