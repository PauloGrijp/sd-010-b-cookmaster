const connection = require('./connection');

const createUser = async (name, email, password) => {
  const db = await connection();
  const create = await db.collection('users').insertOne({ name, email, password, role: 'users' });
  return { user: {
    name,
    email,
    role: 'user',
    _id: create.insertedId },
  };
};

const findUserByEmail = async (email) => {
const db = await connection();
const find = await db.collection('users').findOne({ email });
return find;
};

module.exports = {
  createUser,
  findUserByEmail,
};