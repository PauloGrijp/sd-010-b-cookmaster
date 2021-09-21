const connection = require('./connection');

const findByEmail = async (email) => {
  const db = await connection();
  const userFound = await db.collection('users').findOne({ email });

  return userFound;
};

const create = async (user) => {
  const db = await connection();
  const userAdd = await db.collection('users').insertOne(user);

  return userAdd.ops[0];
};

module.exports = { findByEmail, create };
