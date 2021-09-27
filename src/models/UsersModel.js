const connection = require('./connection');

const findEmail = async (email) => {
  const db = await connection();
  const emailUser = await db.collection('users').findOne({ email });
  return emailUser;
};

const createUser = async (name, email) => {
  const db = await connection();
  const create = await db.collection('users').insertOne({ name, email, role: 'user' });
  return { name, email, role: 'user', _id: create.insertedId };
};

module.exports = {
  findEmail,
  createUser,
};