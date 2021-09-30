const connection = require('./mongoConnection');

const create = async (name, email, password) => {
  const db = await connection();

  const newUser = { name, email, password, role: 'user' };

  await db.collection('users').insertOne(newUser);

  return { user: { name, email, role: 'user' } };
};

const getUserData = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  return user;
};

const getUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  if (!user) return false;

  return true;
};

module.exports = {
  create,
  getUserByEmail,
  getUserData,
};