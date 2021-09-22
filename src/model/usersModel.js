const connection = require('./conection');

const getUserByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection('users').findOne({ email }))
    .then((result) => result);

  return user;
};

const create = async (name, email, password) => {
  const { insertedId } = await connection().then((db) =>
    db.collection('users').insertOne({ name, email, password, role: 'user' }));

  return {
    user: {
      name,
      email,
      role: 'user',
      id: insertedId,
    },
  };
};

module.exports = { create, getUserByEmail };
