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

module.exports = {
  getAllUsers,
  createUser,
};
