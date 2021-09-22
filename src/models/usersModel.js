const connection = require('./connection');

const getUserByEmail = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });
  if (user !== null) return user;
};

const createUser = async (name, email, password) => {
  const db = await connection();
  const { insertedId: id } = await db.collection('users')
  .insertOne({ name, email, password, role: 'user' });
  return {
    _id: id,
    name,
    email,
    role: 'user',
  };
};

module.exports = {
  getUserByEmail,
  createUser,
};