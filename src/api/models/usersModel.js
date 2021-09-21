const connection = require('./connection');

const createUser = async (newUser) => {
  const db = await connection();
  const createdUser = await db.collection('users').insertOne(newUser);
  return createdUser.ops[0];
};

const getUserByEmail = async (email) => {
  const db = await connection();
  let userByEmail = null;
  userByEmail = await db.collection('users').findOne({ email });
  return userByEmail;
};

module.exports = {
  createUser,
  getUserByEmail,
};