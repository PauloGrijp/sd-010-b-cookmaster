const { getConnection } = require('./connection');

const getAllUsers = async () => {
  const users = await getConnection()
    .then((db) => db.collection('users').find().toArray());

  return users;
};

const createUser = async (name, email, password) => {
  const user = await getConnection()
    .then((db) => db.collection('users').insertOne({
      name,
      email,
      password,
      role: 'user',
    }))
    .then((response) => response.ops[0]);

  return user;
};

const getUserByEmail = async (email) => {
  const user = await getConnection()
    .then((db) => db.collection('users').findOne({ email }));

  return user;
};

const createAdminUser = async (name, email, password, role) => {
  const user = await getConnection()
    .then((db) => db.collection('users').insertOne({
      name,
      email,
      password,
      role,
    }))
    .then((response) => response.ops[0]);

  return user;
};

module.exports = {
  getAllUsers,
  createUser,
  getUserByEmail,
  createAdminUser,
};
