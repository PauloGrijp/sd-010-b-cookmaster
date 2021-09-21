const connection = require('./connection');

const findEmail = async (email) => {
  const db = await connection();
  const emailFound = await db.collection('users').findOne({ email });
  return emailFound;
};

const createUser = async (userData) => {
  const db = await connection();
  const newUser = await db.collection('users').insertOne(userData);

return newUser.ops[0];
};

module.exports = {
  findEmail,
  createUser,
};