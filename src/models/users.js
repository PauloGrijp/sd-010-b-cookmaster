const connection = require('../api/connection');

const userExists = async (email) => {
  const db = await connection();

  const exists = await db.collection('users').findOne({ email });

  return exists;
};

const create = async (usuario) => {
  const db = await connection();

  const newUser = {
    name: usuario.name,
    email: usuario.email,
    password: usuario.password,
    role: 'user',
  };

  const user = await db.collection('users').insertOne(newUser);

  return user.ops[0];
};

const getUser = async (name) => {
  const db = await connection();

  const user = await db.collection('users').findOne(name);

  return user;
};

module.exports = {
  create,
  userExists,
  getUser,
};
