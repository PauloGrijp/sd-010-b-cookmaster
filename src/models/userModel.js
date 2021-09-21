// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const findEmail = async (email) => {
  const db = await connection();
  const emailFound = await db.collection('users').findOne({ email });
  return emailFound;
};

const createUser = async (userData) => {
  const { name, email, password } = userData;
  const role = 'user';
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  delete newUser.ops[0].password; // remove a senha para não ser exibida no front

return newUser.ops[0];
};

module.exports = {
  findEmail,
  createUser,
};