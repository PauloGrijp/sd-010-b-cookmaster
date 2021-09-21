const { ObjectId } = require('mongodb');
const getConnection = require('./connection');

const findById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  
  const user = await getConnection()
    .then((db) => db.collection('users').findOne({ _id: ObjectId(id) }));

  return user;
};

const emailAlreadyExists = async (email) => {
  const user = await getConnection()
    .then((db) => db.collection('users').findOne({ email }));

  return user;
};

const create = async ({ name, email }) => {
  const db = await getConnection();

  const register = await db.collection('users').insertOne({ name, email, role: 'user' });
  return register;
};

module.exports = {
  create,
  emailAlreadyExists,
  findById,
};
