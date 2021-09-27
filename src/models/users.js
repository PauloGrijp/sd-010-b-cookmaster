const connection = require('../api/connection');

const userExists = async (email) => {
  const db = await connection();

  const exists = await db.collection('users').findOne({ email });

  return exists;
};

const create = async (user) => {
  const db = await connection();

  const newUSer = {
    name: user.name,
    email: user.email,
    password: user.password,
    role: 'user',
  };

  const users = await db.collection('users').insertOne(newUSer);

  return users.ops;
};

module.exports = {
  create,
  userExists,
};
