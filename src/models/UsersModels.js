const connection = require('./connection');

const COLLECTION = 'users';

const createItem = async (name, email, password) => {
  const user = await connection()
    .then((db) => db.collection(COLLECTION)
      .insertOne({ name, email, password, role: 'user' }));

  return {
    user: {
      name,
      email,
      role: 'user',
      _id: user.insertedId,
    },
  };
};

const getByEmail = async (email) => {
  const user = await connection()
    .then((db) => db.collection(COLLECTION)
    .findOne({ email }));

  return user;
};

module.exports = {
  createItem,
  getByEmail,
};