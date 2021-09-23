const connection = require('./connection');

const findEmail = async (email) => {
  const db = await connection();
  const emailFound = await db.collection('users').findOne({ email });

  return emailFound;
};

const createUser = async (userName) => {
  const { name, email, password } = userName;
  const role = 'user';
  const db = await connection();
  const newUser = await db.collection('users').insertOne({ name, email, password, role });
  delete newUser.ops[0].password;

  return newUser.ops[0];
};

module.exports = {
  findEmail,
  createUser,
};

